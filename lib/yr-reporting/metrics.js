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

function sumBy(rows = [], regexes = []) {
  return (rows || []).reduce((sum, row) => {
    const key = findKey(row, regexes);
    return sum + toNumber(key ? row[key] : 0);
  }, 0);
}

function avgBy(rows = [], regexes = [], parser = toNumber) {
  const values = [];
  (rows || []).forEach((row) => {
    const key = findKey(row, regexes);
    if (key && row[key] !== undefined && row[key] !== "") {
      const value = parser(row[key]);
      if (Number.isFinite(value) && value > 0) values.push(value);
    }
  });
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function firstPositive(...values) {
  return values.find((value) => Number.isFinite(value) && value > 0) || 0;
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

  const ticketsCreated = sumBy(volume, [/tickets.*created/, /created/, /new.*tickets/]) || tickets.length;
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

  const topAgents = agents
    .map((row) => ({ name: row.Agent || row.Name || row.agent || row.name || "Unknown agent", value: toNumber(row.Tickets || row.Closed || row.Solved || row.Count || 0) }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const topChannels = channels
    .map((row) => ({ name: row.Channel || row.Name || row.channel || row.name || "Unknown channel", value: toNumber(row.Tickets || row.Count || row.Volume || 0) }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return {
    ticketsCreated,
    ticketsClosed,
    backlog,
    ordersCount,
    ticketsPerOrder: ordersCount ? ticketsCreated / ordersCount : 0,
    csat,
    slaValue,
    slaUnit,
    firstResponseTime,
    resolutionTime,
    topAgents,
    topChannels,
    drivers: extractDriversFromTickets(tickets, settings).slice(0, 12),
    debug: {
      cxRows: cx.length,
      cxColumns: Array.from(new Set(cx.flatMap((row) => Object.keys(row || {})))),
      cxMetricLabels: cx.map(getLabel).filter(Boolean),
      cxCurrentValues: cx.map(getCurrent).filter(Boolean),
      workloadRows: workload.length,
      workloadColumns: Array.from(new Set(workload.flatMap((row) => Object.keys(row || {}))))
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
      ticketsClosed: acc.ticketsClosed + item.metrics.ticketsClosed,
      ordersCount: acc.ordersCount + item.metrics.ordersCount,
      backlog: item.metrics.backlog || acc.backlog
    }),
    { ticketsCreated: 0, ticketsClosed: 0, ordersCount: 0, backlog: 0 }
  );

  return {
    weekly,
    totals,
    averages: {
      csat: average(weekly.map((item) => item.metrics.csat)),
      slaValue: average(weekly.map((item) => item.metrics.slaValue)),
      firstResponseTime: average(weekly.map((item) => item.metrics.firstResponseTime)),
      resolutionTime: average(weekly.map((item) => item.metrics.resolutionTime)),
      ticketsPerOrder: totals.ordersCount ? totals.ticketsCreated / totals.ordersCount : 0
    }
  };
}

function average(values = []) {
  const valid = values.filter((value) => Number.isFinite(value) && value > 0);
  return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
}
