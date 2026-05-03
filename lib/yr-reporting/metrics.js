import { extractDriversFromTickets } from "./tags";

export function toNumber(value) {
  if (value === null || value === undefined || value === "") return 0;
  const parsed = Number(String(value).replace(/[,$%]/g, "").replace(",", ".").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeKey(key = "") {
  return String(key).toLowerCase().replace(/\ufeff/g, "").replace(/[_-]/g, " ").replace(/\s+/g, " ").trim();
}

function findKey(row = {}, matchers = []) {
  return Object.keys(row || {}).find((key) => {
    const nk = normalizeKey(key);
    return matchers.some((matcher) => typeof matcher === "string" ? nk === normalizeKey(matcher) : matcher.test(nk));
  });
}

function valuesBy(rows = [], matchers = []) {
  const values = [];
  rows.forEach((row) => {
    const key = findKey(row, matchers);
    if (key && row[key] !== undefined && row[key] !== "") {
      const number = toNumber(row[key]);
      if (Number.isFinite(number)) values.push(number);
    }
  });
  return values;
}

function sumBy(rows = [], matchers = []) {
  return valuesBy(rows, matchers).reduce((sum, value) => sum + value, 0);
}

function avgBy(rows = [], matchers = []) {
  const values = valuesBy(rows, matchers).filter((value) => value > 0);
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function firstValue(...values) {
  return values.find((value) => Number.isFinite(value) && value > 0) || 0;
}

function detectSla(cx = [], workload = []) {
  const sla = firstValue(
    avgBy(cx, ["SLA", "SLA %", "SLA Percent", "SLA Percentage", "Service Level", "Service Level Agreement", /(^|\s)sla($|\s|%)/, /service level/, /within sla/, /met sla/]),
    avgBy(workload, ["SLA", "SLA %", "Service Level", /(^|\s)sla($|\s|%)/, /service level/])
  );

  if (sla > 0 && sla <= 1) return { value: sla * 100, unit: "%" };
  if (sla > 1 && sla <= 100) return { value: sla, unit: "%" };
  return { value: 0, unit: "" };
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

  const ticketsCreated = sumBy(volume, ["Tickets Created", "Created", "New Tickets", /tickets.*created/, /created.*tickets/]) || tickets.length;
  const ticketsClosed = sumBy(volume, ["Tickets Closed", "Closed", "Solved", "Resolved", /tickets.*closed/, /closed.*tickets/, /solved.*tickets/]);
  const backlog = sumBy(volume, ["Open Backlog", "Backlog", "Open Tickets", "Open", /open.*backlog/, /open.*tickets/]) || Math.max(ticketsCreated - ticketsClosed, 0);
  const ordersCount = sumBy(orders, ["Orders", "Order Count", "Total Orders", /orders/, /order count/]) || orders.length;

  const csat = firstValue(
    avgBy(cx, ["CSAT", "Avg CSAT", "Average CSAT", "Satisfaction", "Customer Satisfaction", "Customer Satisfaction Score", /csat/, /satisfaction/]),
    avgBy(tickets, [/csat/, /satisfaction/])
  );

  const firstResponseTime = firstValue(
    avgBy(workload, ["First Response Time", "First response time", "FRT", "Avg First Response Time", /first.*response/, /^frt$/]),
    avgBy(cx, ["First Response Time", "First response time", "FRT", "Avg First Response Time", /first.*response/, /^frt$/])
  );

  const resolutionTime = firstValue(
    avgBy(workload, ["Resolution Time", "Average Resolution Time", "ART", /resolution.*time/, /^art$/]),
    avgBy(cx, ["Resolution Time", "Average Resolution Time", "ART", /resolution.*time/, /^art$/])
  );

  const detectedSla = detectSla(cx, workload);
  const slaValue = detectedSla.value || firstResponseTime;
  const slaUnit = detectedSla.value ? detectedSla.unit : "h";

  const topAgents = agents
    .map((row) => ({ name: row.Agent || row.Name || row.agent || row.name || "Unknown agent", value: toNumber(row.Tickets || row.Closed || row.Solved || row.Count || 0) }))
    .filter((item) => item.value > 0).sort((a, b) => b.value - a.value).slice(0, 10);

  const topChannels = channels
    .map((row) => ({ name: row.Channel || row.Name || row.channel || row.name || "Unknown channel", value: toNumber(row.Tickets || row.Count || row.Volume || 0) }))
    .filter((item) => item.value > 0).sort((a, b) => b.value - a.value).slice(0, 10);

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
      workloadRows: workload.length,
      cxColumns: Array.from(new Set(cx.flatMap((row) => Object.keys(row || {})))),
      workloadColumns: Array.from(new Set(workload.flatMap((row) => Object.keys(row || {}))))
    }
  };
}

export function aggregateMonthly(reports = [], settings) {
  const weekly = reports.map((report) => ({ week: report.week, metrics: calculateWeeklyMetrics(report, settings) }));
  const totals = weekly.reduce((acc, item) => ({
    ticketsCreated: acc.ticketsCreated + item.metrics.ticketsCreated,
    ticketsClosed: acc.ticketsClosed + item.metrics.ticketsClosed,
    ordersCount: acc.ordersCount + item.metrics.ordersCount,
    backlog: item.metrics.backlog || acc.backlog
  }), { ticketsCreated: 0, ticketsClosed: 0, ordersCount: 0, backlog: 0 });

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
