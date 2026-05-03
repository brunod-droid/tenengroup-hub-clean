import { extractDriversFromTickets } from "./tags";

export function toNumber(value) {
  if (value === null || value === undefined || value === "" || value === "N/A") return 0;
  const parsed = Number(String(value).replace(/[,$%]/g, "").replace(",", ".").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseDurationToHours(value) {
  if (!value || value === "N/A") return 0;
  const text = String(value).trim().toLowerCase();

  let hours = 0;
  const dayMatch = text.match(/(\d+(?:[.,]\d+)?)\s*d/);
  const hourMatch = text.match(/(\d+(?:[.,]\d+)?)\s*h/);
  const minuteMatch = text.match(/(\d+(?:[.,]\d+)?)\s*m/);
  const secondMatch = text.match(/(\d+(?:[.,]\d+)?)\s*s/);

  if (dayMatch) hours += toNumber(dayMatch[1]) * 24;
  if (hourMatch) hours += toNumber(hourMatch[1]);
  if (minuteMatch) hours += toNumber(minuteMatch[1]) / 60;
  if (secondMatch) hours += toNumber(secondMatch[1]) / 3600;

  if (hours > 0) return hours;

  if (text.includes(":")) {
    const parts = text.split(":").map(Number);
    if (parts.length === 3 && parts.every(Number.isFinite)) return parts[0] + parts[1] / 60 + parts[2] / 3600;
    if (parts.length === 2 && parts.every(Number.isFinite)) return parts[0] / 60 + parts[1] / 3600;
  }

  return toNumber(text);
}

function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/\ufeff/g, "")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getLabel(row = {}) {
  if (row[" "] !== undefined) return row[" "];
  if (row[""] !== undefined) return row[""];
  if (row["Metric"] !== undefined) return row["Metric"];
  if (row["metric"] !== undefined) return row["metric"];

  const firstKey = Object.keys(row || {})[0];
  return firstKey ? row[firstKey] : "";
}

function getCurrent(row = {}) {
  if (row["current period"] !== undefined) return row["current period"];
  if (row["Current period"] !== undefined) return row["Current period"];
  if (row["Current Period"] !== undefined) return row["Current Period"];
  if (row["current"] !== undefined) return row["current"];
  if (row["value"] !== undefined) return row["value"];

  const keys = Object.keys(row || {});
  return keys.length > 1 ? row[keys[1]] : "";
}

function verticalMetric(rows = [], labelRegex, parser = toNumber) {
  for (const row of rows || []) {
    const label = normalize(getLabel(row));
    if (labelRegex.test(label)) return parser(getCurrent(row));
  }
  return 0;
}

function findKey(row = {}, regexes = []) {
  return Object.keys(row || {}).find((key) => regexes.some((regex) => regex.test(normalize(key))));
}

function getValueByRegex(row = {}, regexes = [], parser = toNumber) {
  const key = findKey(row, regexes);
  return key ? parser(row[key]) : 0;
}

function sumBy(rows = [], regexes = []) {
  return (rows || []).reduce((sum, row) => sum + getValueByRegex(row, regexes), 0);
}

function avgBy(rows = [], regexes = [], parser = toNumber) {
  const values = [];
  (rows || []).forEach((row) => {
    const value = getValueByRegex(row, regexes, parser);
    if (Number.isFinite(value) && value > 0) values.push(value);
  });
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function firstPositive(...values) {
  return values.find((value) => Number.isFinite(value) && value > 0) || 0;
}

function cleanName(value = "") {
  return String(value || "").trim();
}

function agentGroup(name = "") {
  const n = normalize(name);
  if (!n) return "Unassigned";
  if (n.includes("taylor") || n.includes("notch")) return "Notch (Taylor)";
  if (n.includes("antonette") || n.includes("antoinette")) return "Antonette";
  if (n.includes("kyrene")) return "Kyrene";
  if (n.includes("neva")) return "Neva";
  if (n.includes("roi")) return "Roi";
  return cleanName(name);
}

function agentRole(name = "") {
  const n = normalize(name);
  if (!n) return "Unassigned";
  if (n.includes("taylor") || n.includes("notch")) return "AI answer";
  if (n.includes("neva") || n.includes("roi")) return "Management";
  return "Human agent";
}

function ticketAssignee(row = {}) {
  return cleanName(row["Assignee name"] || row["Assignee"] || row["assignee"] || row["Agent"] || row["Name"] || "");
}

function ticketCsat(row = {}) {
  return toNumber(row["Survey score"] || row["CSAT"] || row["Customer Satisfaction"] || 0);
}

function ticketMessages(row = {}) {
  return toNumber(row["Messages sent during the period"] || row["Messages sent"] || row["Messages"] || 0);
}

function ticketFirstResponseHours(row = {}) {
  const seconds = toNumber(row["First response time (s)"]);
  if (seconds > 0) return seconds / 3600;
  return parseDurationToHours(row["First Response Time"] || row["First response time"] || row["FRT"] || "");
}

function buildAgentDrilldown(tickets = [], agentMetrics = []) {
  const map = {};

  function ensure(name) {
    const group = agentGroup(name);
    if (!map[group]) {
      map[group] = {
        name: group,
        role: agentRole(group),
        assignedTickets: 0,
        messagesSent: 0,
        csatTotal: 0,
        csatCount: 0,
        firstResponseTotal: 0,
        firstResponseCount: 0,
        source: "tickets"
      };
    }
    return map[group];
  }

  tickets.forEach((ticket) => {
    const rawAssignee = ticketAssignee(ticket);
    if (!rawAssignee) return;
    const item = ensure(rawAssignee);
    item.assignedTickets += 1;

    const messages = ticketMessages(ticket);
    if (messages > 0) item.messagesSent += messages;

    const csat = ticketCsat(ticket);
    if (csat > 0) {
      item.csatTotal += csat;
      item.csatCount += 1;
    }

    const frt = ticketFirstResponseHours(ticket);
    if (frt > 0) {
      item.firstResponseTotal += frt;
      item.firstResponseCount += 1;
    }
  });

  agentMetrics.forEach((row) => {
    const rawName = row.Agent || row.Name || row.agent || row.name || row["Agent name"] || row["Assignee name"];
    if (!rawName) return;

    const item = ensure(rawName);
    item.source = "tickets + agents metrics";

    const messages = getValueByRegex(row, [/messages.*sent/, /^messages$/, /^sent$/]);
    if (messages > 0) item.messagesSent = messages;

    const sla = getValueByRegex(row, [/sla/, /first.*response/, /^frt$/], parseDurationToHours);
    if (sla > 0 && item.firstResponseCount === 0) {
      item.firstResponseTotal = sla;
      item.firstResponseCount = 1;
    }

    const csat = getValueByRegex(row, [/csat/, /satisfaction/]);
    if (csat > 0 && item.csatCount === 0) {
      item.csatTotal = csat;
      item.csatCount = 1;
    }

    const ticketsCount = getValueByRegex(row, [/tickets.*answered/, /tickets.*handled/, /^tickets$/, /closed/, /solved/]);
    if (ticketsCount > 0 && item.assignedTickets === 0) item.assignedTickets = ticketsCount;
  });

  return Object.values(map)
    .map((item) => ({
      name: item.name,
      role: item.role,
      assignedTickets: item.assignedTickets,
      messagesSent: item.messagesSent,
      avgCsat: item.csatCount ? item.csatTotal / item.csatCount : 0,
      avgFirstResponseHours: item.firstResponseCount ? item.firstResponseTotal / item.firstResponseCount : 0,
      source: item.source
    }))
    .sort((a, b) => b.assignedTickets - a.assignedTickets);
}

export function calculateWeeklyMetrics(report, settings) {
  const data = report?.data || {};
  const tickets = data.tickets || [];
  const volume = data.volume || [];
  const workload = data.workload || [];
  const cx = data.cx || [];
  const agents = data.agents || [];
  const channels = data.channels || [];
  const orders = data.orders || [];

  const totalTicketsRows = tickets.length;
  const unassignedTickets = tickets.filter((ticket) => !ticketAssignee(ticket)).length;
  const assignedTickets = Math.max(totalTicketsRows - unassignedTickets, 0);

  const ticketsCreatedFromVolume = sumBy(volume, [/tickets.*created/, /created/, /new.*tickets/]);
  const ticketsCreated = ticketsCreatedFromVolume || totalTicketsRows;
  const actionableTickets = totalTicketsRows ? assignedTickets : Math.max(ticketsCreated - unassignedTickets, 0);

  const ticketsClosed = sumBy(volume, [/tickets.*closed/, /closed/, /solved/, /resolved/]);
  const backlog = sumBy(volume, [/open.*backlog/, /backlog/, /open.*tickets/, /^open$/]) || Math.max(ticketsCreated - ticketsClosed, 0);
  const ordersCount = sumBy(orders, [/orders/, /order count/, /total orders/]) || orders.length;

  const csat = firstPositive(
    verticalMetric(cx, /average csat|^csat$|customer satisfaction/),
    avgBy(cx, [/csat/, /satisfaction/])
  );

  const firstResponseTime = firstPositive(
    verticalMetric(cx, /first response time|^frt$/, parseDurationToHours),
    avgBy(workload, [/first.*response|^frt$/], parseDurationToHours)
  );

  const resolutionTime = firstPositive(
    verticalMetric(cx, /resolution time|average resolution|^art$/, parseDurationToHours),
    avgBy(workload, [/resolution.*time|^art$/], parseDurationToHours)
  );

  const explicitSla = firstPositive(
    verticalMetric(cx, /^sla$|sla %|service level|within sla|met sla/),
    avgBy(cx, [/^sla$|sla %|service level|within sla|met sla/])
  );

  let slaValue = 0;
  let slaUnit = "";
  if (explicitSla > 0 && explicitSla <= 1) {
    slaValue = explicitSla * 100;
    slaUnit = "%";
  } else if (explicitSla > 1 && explicitSla <= 100) {
    slaValue = explicitSla;
    slaUnit = "%";
  } else if (firstResponseTime > 0) {
    slaValue = firstResponseTime;
    slaUnit = "h";
  }

  const agentDrilldown = buildAgentDrilldown(tickets, agents);
  const totalMessagesSent =
    agentDrilldown.reduce((sum, agent) => sum + (agent.messagesSent || 0), 0) ||
    sumBy(agents, [/messages.*sent/, /^messages$/, /^sent$/]) ||
    sumBy(tickets, [/messages.*sent/]);

  const topChannels = channels
    .map((row) => ({
      name: row.Channel || row.Name || row.channel || row.name || "Unknown channel",
      value: toNumber(row.Tickets || row.Count || row.Volume || 0)
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return {
    ticketsCreated,
    ticketsCreatedRaw: ticketsCreated,
    actionableTickets,
    totalTicketsRows,
    unassignedTickets,
    assignedTickets,
    ticketsClosed,
    totalMessagesSent,
    backlog,
    ordersCount,
    ticketsPerOrder: ordersCount ? actionableTickets / ordersCount : 0,
    csat,
    slaValue,
    slaUnit,
    firstResponseTime,
    resolutionTime,
    agentDrilldown,
    topAgents: agentDrilldown,
    topChannels,
    drivers: extractDriversFromTickets(tickets, settings).slice(0, 12),
    debug: {
      ticketsRows: tickets.length,
      agentMetricsRows: agents.length,
      ticketColumns: Array.from(new Set(tickets.flatMap((row) => Object.keys(row || {})))),
      agentMetricsColumns: Array.from(new Set(agents.flatMap((row) => Object.keys(row || {})))),
      cxRows: cx.length,
      cxColumns: Array.from(new Set(cx.flatMap((row) => Object.keys(row || {}))))
    }
  };
}

export function aggregateMonthly(reports = [], settings) {
  const weekly = reports.map((report) => ({
    week: report.week,
    metrics: calculateWeeklyMetrics(report, settings)
  }));

  const totals = weekly.reduce(
    (acc, item) => ({
      ticketsCreated: acc.ticketsCreated + item.metrics.ticketsCreated,
      actionableTickets: acc.actionableTickets + item.metrics.actionableTickets,
      totalMessagesSent: acc.totalMessagesSent + item.metrics.totalMessagesSent,
      unassignedTickets: acc.unassignedTickets + item.metrics.unassignedTickets,
      ordersCount: acc.ordersCount + item.metrics.ordersCount,
      backlog: item.metrics.backlog || acc.backlog
    }),
    { ticketsCreated: 0, actionableTickets: 0, totalMessagesSent: 0, unassignedTickets: 0, ordersCount: 0, backlog: 0 }
  );

  return {
    weekly,
    totals,
    averages: {
      csat: average(weekly.map((item) => item.metrics.csat)),
      slaValue: average(weekly.map((item) => item.metrics.slaValue)),
      firstResponseTime: average(weekly.map((item) => item.metrics.firstResponseTime)),
      resolutionTime: average(weekly.map((item) => item.metrics.resolutionTime)),
      ticketsPerOrder: totals.ordersCount ? totals.actionableTickets / totals.ordersCount : 0
    }
  };
}

function average(values = []) {
  const valid = values.filter((value) => Number.isFinite(value) && value > 0);
  return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
}
