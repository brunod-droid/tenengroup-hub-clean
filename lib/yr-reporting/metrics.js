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
  const d = text.match(/(\d+(?:[.,]\d+)?)\s*d/);
  const h = text.match(/(\d+(?:[.,]\d+)?)\s*h/);
  const m = text.match(/(\d+(?:[.,]\d+)?)\s*m/);
  const s = text.match(/(\d+(?:[.,]\d+)?)\s*s/);
  if (d) hours += toNumber(d[1]) * 24;
  if (h) hours += toNumber(h[1]);
  if (m) hours += toNumber(m[1]) / 60;
  if (s) hours += toNumber(s[1]) / 3600;
  if (hours > 0) return hours;
  if (text.includes(":")) {
    const parts = text.split(":").map(Number);
    if (parts.length === 3 && parts.every(Number.isFinite)) return parts[0] + parts[1] / 60 + parts[2] / 3600;
    if (parts.length === 2 && parts.every(Number.isFinite)) return parts[0] / 60 + parts[1] / 3600;
  }
  return toNumber(text);
}

function normalize(value = "") {
  return String(value).toLowerCase().replace(/\ufeff/g, "").replace(/[_-]/g, " ").replace(/\s+/g, " ").trim();
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
    if (labelRegex.test(normalize(getLabel(row)))) return parser(getCurrent(row));
  }
  return 0;
}

function findKey(row = {}, regexes = []) {
  return Object.keys(row || {}).find((key) => regexes.some((regex) => regex.test(normalize(key))));
}

function valueBy(row = {}, regexes = [], parser = toNumber) {
  const key = findKey(row, regexes);
  return key ? parser(row[key]) : 0;
}

function sumBy(rows = [], regexes = []) {
  return (rows || []).reduce((sum, row) => sum + valueBy(row, regexes), 0);
}

function avgBy(rows = [], regexes = [], parser = toNumber) {
  const vals = [];
  (rows || []).forEach((row) => {
    const v = valueBy(row, regexes, parser);
    if (Number.isFinite(v) && v > 0) vals.push(v);
  });
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
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

function roleRank(role = "") {
  const r = normalize(role);
  if (r.includes("ai")) return 1;
  if (r.includes("human")) return 2;
  if (r.includes("management")) return 3;
  return 9;
}

function ticketAssignee(row = {}) {
  return cleanName(row["Assignee name"] || row["Assignee"] || row.assignee || row.Agent || row.Name || "");
}

function ticketCsat(row = {}) {
  return toNumber(row["Survey score"] || row.CSAT || row["Customer Satisfaction"] || 0);
}

function ticketMessages(row = {}) {
  return toNumber(row["Number of agent messages"] || row["Agent messages"] || row["Messages sent during the period"] || row["Messages sent"] || row.Messages || 0);
}

function ticketFRT(row = {}) {
  const seconds = toNumber(row["First response time (s)"]);
  if (seconds > 0) return seconds / 3600;
  return parseDurationToHours(row["First Response Time"] || row["First response time"] || row.FRT || "");
}

function buildAgentDrilldown(tickets = [], agentMetrics = []) {
  const map = {};
  function ensure(name) {
    const group = agentGroup(name);
    if (!map[group]) map[group] = { name: group, role: agentRole(group), assignedTickets: 0, messagesSent: 0, csatTotal: 0, csatCount: 0, frtTotal: 0, frtCount: 0 };
    return map[group];
  }

  tickets.forEach((ticket) => {
    const assignee = ticketAssignee(ticket);
    if (!assignee) return;
    const item = ensure(assignee);
    item.assignedTickets += 1;
    const msg = ticketMessages(ticket);
    if (msg > 0) item.messagesSent += msg;
    const csat = ticketCsat(ticket);
    if (csat > 0) { item.csatTotal += csat; item.csatCount += 1; }
    const frt = ticketFRT(ticket);
    if (frt > 0) { item.frtTotal += frt; item.frtCount += 1; }
  });

  agentMetrics.forEach((row) => {
    const name = row.Agent || row.Name || row.agent || row.name || row["Agent name"] || row["Assignee name"];
    if (!name) return;
    const item = ensure(name);
    const msg = valueBy(row, [/messages.*sent/, /^messages$/, /^sent$/]);
    if (msg > 0) item.messagesSent = msg;
    const frt = valueBy(row, [/sla/, /first.*response/, /^frt$/], parseDurationToHours);
    if (frt > 0 && item.frtCount === 0) { item.frtTotal = frt; item.frtCount = 1; }
    const csat = valueBy(row, [/csat/, /satisfaction/]);
    if (csat > 0 && item.csatCount === 0) { item.csatTotal = csat; item.csatCount = 1; }
    const ticketsCount = valueBy(row, [/tickets.*answered/, /tickets.*handled/, /^tickets$/, /closed/, /solved/]);
    if (ticketsCount > 0 && item.assignedTickets === 0) item.assignedTickets = ticketsCount;
  });

  return Object.values(map)
    .map((item) => ({
      name: item.name,
      role: item.role,
      assignedTickets: item.assignedTickets,
      messagesSent: item.messagesSent,
      avgCsat: item.csatCount ? item.csatTotal / item.csatCount : 0,
      csatCount: item.csatCount,
      avgFirstResponseHours: item.frtCount ? item.frtTotal / item.frtCount : 0
    }))
    .filter((a) => a.assignedTickets > 0 || a.messagesSent > 0 || a.avgCsat > 0 || a.avgFirstResponseHours > 0)
    .sort((a, b) => roleRank(a.role) - roleRank(b.role) || b.assignedTickets - a.assignedTickets);
}

function weightedSla(agents = [], filterFn = () => true) {
  const valid = agents.filter((a) => filterFn(a) && a.avgFirstResponseHours > 0 && a.assignedTickets > 0);
  const tickets = valid.reduce((sum, a) => sum + a.assignedTickets, 0);
  if (!tickets) return 0;
  return valid.reduce((sum, a) => sum + a.avgFirstResponseHours * a.assignedTickets, 0) / tickets;
}

export function isPaidOrder(row = {}) {
  if (row.Orders !== undefined || row.orders !== undefined) return true;

  const paidAt = row["Paid at"] || row["Paid At"] || row["paid at"];
  const financialStatus = normalize(row["Financial Status"] || row["financial status"] || "");
  const cancelledAt = row["Cancelled at"] || row["Cancelled At"] || row["cancelled at"];

  if (cancelledAt && String(cancelledAt).trim()) return false;
  if (paidAt !== undefined) return String(paidAt || "").trim() !== "";
  if (financialStatus) return financialStatus === "paid" || financialStatus === "partially refunded";
  return true;
}

function countOrders(orders = []) {
  const explicit = sumBy(orders, [/^orders$/, /order count/, /total orders/]);
  if (explicit > 0) return explicit;

  const seen = new Set();
  let count = 0;
  orders.forEach((row, index) => {
    if (!isPaidOrder(row)) return;
    const key = String(row.Id || row.ID || row.id || row.Name || row.name || `row-${index}`).trim();
    if (seen.has(key)) return;
    seen.add(key);
    count += 1;
  });
  return count;
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

  const ticketsCreated = sumBy(volume, [/tickets.*created/, /created/, /new.*tickets/]) || totalTicketsRows;
  const actionableTickets = totalTicketsRows ? assignedTickets : Math.max(ticketsCreated - unassignedTickets, 0);
  const ticketsClosed = sumBy(volume, [/tickets.*closed/, /closed/, /solved/, /resolved/]);
  const backlog = sumBy(volume, [/open.*backlog/, /backlog/, /open.*tickets/, /^open$/]) || Math.max(ticketsCreated - ticketsClosed, 0);

  const ordersCount = countOrders(orders);

  const ticketCsatValues = tickets.map(ticketCsat).filter((v) => v > 0);
  const csatFromTickets = ticketCsatValues.length ? ticketCsatValues.reduce((a, b) => a + b, 0) / ticketCsatValues.length : 0;
  const csat = firstPositive(verticalMetric(cx, /average csat|^csat$|customer satisfaction/), avgBy(cx, [/csat/, /satisfaction/]), csatFromTickets);
  const csatCount = ticketCsatValues.length || sumBy(cx, [/csat.*count/, /survey.*responses/, /responses/]) || 0;

  const firstResponseTime = firstPositive(verticalMetric(cx, /first response time|^frt$/, parseDurationToHours), avgBy(workload, [/first.*response|^frt$/], parseDurationToHours));
  const resolutionTime = firstPositive(verticalMetric(cx, /resolution time|average resolution|^art$/, parseDurationToHours), avgBy(workload, [/resolution.*time|^art$/], parseDurationToHours));

  const explicitSla = firstPositive(verticalMetric(cx, /^sla$|sla %|service level|within sla|met sla/), avgBy(cx, [/^sla$|sla %|service level|within sla|met sla/]));
  let slaValue = 0, slaUnit = "";
  if (explicitSla > 0 && explicitSla <= 1) { slaValue = explicitSla * 100; slaUnit = "%"; }
  else if (explicitSla > 1 && explicitSla <= 100) { slaValue = explicitSla; slaUnit = "%"; }
  else if (firstResponseTime > 0) { slaValue = firstResponseTime; slaUnit = "h"; }

  const agentDrilldown = buildAgentDrilldown(tickets, agents);
  const slaGlobal = weightedSla(agentDrilldown) || slaValue;
  const slaNotch = weightedSla(agentDrilldown, (a) => a.role === "AI answer");
  const slaAgents = weightedSla(agentDrilldown, (a) => a.role === "Human agent");

  const totalMessagesSent = agentDrilldown.reduce((sum, a) => sum + (a.messagesSent || 0), 0)
    || sumBy(agents, [/messages.*sent/, /^messages$/, /^sent$/])
    || sumBy(tickets, [/number.*agent.*messages/, /messages.*sent/]);

  const topChannels = channels.map((row) => ({
    name: row.Channel || row.Name || row.channel || row.name || "Unknown channel",
    value: toNumber(row.Tickets || row.Count || row.Volume || 0)
  })).filter((x) => x.value > 0).sort((a, b) => b.value - a.value).slice(0, 10);

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
    unpaidOrRemovedOrders: 0,
    ticketsPerOrder: ordersCount ? actionableTickets / ordersCount : 0,
    csat,
    csatCount,
    slaValue,
    slaUnit,
    slaGlobal,
    slaNotch,
    slaAgents,
    firstResponseTime,
    resolutionTime,
    agentDrilldown,
    topAgents: agentDrilldown,
    topChannels,
    drivers: extractDriversFromTickets(tickets, settings).slice(0, 12),
    debug: {
      ticketsRows: tickets.length,
      ordersRows: orders.length,
      ordersCount,
      agentMetricsRows: agents.length,
      ticketColumns: Array.from(new Set(tickets.flatMap((row) => Object.keys(row || {})))),
      orderColumns: Array.from(new Set(orders.flatMap((row) => Object.keys(row || {})))),
      agentMetricsColumns: Array.from(new Set(agents.flatMap((row) => Object.keys(row || {})))),
      cxRows: cx.length,
      cxColumns: Array.from(new Set(cx.flatMap((row) => Object.keys(row || {}))))
    }
  };
}

export function aggregateMonthly(reports = [], settings) {
  const weekly = reports.map((report) => ({ week: report.week, metrics: calculateWeeklyMetrics(report, settings) }));
  const totals = weekly.reduce((acc, item) => ({
    ticketsCreated: acc.ticketsCreated + item.metrics.ticketsCreated,
    actionableTickets: acc.actionableTickets + item.metrics.actionableTickets,
    totalMessagesSent: acc.totalMessagesSent + item.metrics.totalMessagesSent,
    unassignedTickets: acc.unassignedTickets + item.metrics.unassignedTickets,
    ordersCount: acc.ordersCount + item.metrics.ordersCount,
    backlog: item.metrics.backlog || acc.backlog
  }), { ticketsCreated: 0, actionableTickets: 0, totalMessagesSent: 0, unassignedTickets: 0, ordersCount: 0, backlog: 0 });

  return {
    weekly,
    totals,
    averages: {
      ticketsPerOrder: totals.ordersCount ? totals.actionableTickets / totals.ordersCount : 0
    }
  };
}
