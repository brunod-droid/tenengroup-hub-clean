import { extractDriversFromTickets } from "./tags";

export function toNumber(value) {
  if (value === null || value === undefined || value === "") return 0;
  const parsed = Number(String(value).replace(/[,$%]/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function sumByKeys(rows = [], keys = []) {
  return rows.reduce((sum, row) => {
    const key = keys.find((candidate) => row[candidate] !== undefined && row[candidate] !== "");
    return sum + toNumber(key ? row[key] : 0);
  }, 0);
}

function avgByKeys(rows = [], keys = []) {
  const values = [];
  rows.forEach((row) => {
    const key = keys.find((candidate) => row[candidate] !== undefined && row[candidate] !== "");
    if (key) values.push(toNumber(row[key]));
  });
  return values.length ? values.reduce((a,b) => a + b, 0) / values.length : 0;
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
  const ticketsCreated = sumByKeys(volume, ["Tickets Created", "Created", "New Tickets"]) || tickets.length;
  const ticketsClosed = sumByKeys(volume, ["Tickets Closed", "Closed", "Solved", "Resolved"]);
  const backlog = sumByKeys(volume, ["Open Backlog", "Backlog", "Open Tickets", "Open"]) || Math.max(ticketsCreated - ticketsClosed, 0);
  const ordersCount = sumByKeys(orders, ["Orders", "Order Count", "Total Orders"]) || orders.length;
  return {
    ticketsCreated,
    ticketsClosed,
    backlog,
    ordersCount,
    ticketsPerOrder: ordersCount ? ticketsCreated / ordersCount : 0,
    csat: avgByKeys(cx, ["CSAT", "Satisfaction", "Customer Satisfaction", "Avg CSAT"]),
    firstResponseTime: avgByKeys(workload, ["First Response Time", "FRT", "Avg First Response Time"]),
    resolutionTime: avgByKeys(workload, ["Resolution Time", "Average Resolution Time", "ART"]),
    topAgents: agents.map((row) => ({ name: row.Agent || row.Name || "Unknown agent", value: toNumber(row.Tickets || row.Closed || row.Solved || row.Count || 0) })).filter((x) => x.value > 0).sort((a,b) => b.value - a.value).slice(0,10),
    topChannels: channels.map((row) => ({ name: row.Channel || row.Name || "Unknown channel", value: toNumber(row.Tickets || row.Count || row.Volume || 0) })).filter((x) => x.value > 0).sort((a,b) => b.value - a.value).slice(0,10),
    drivers: extractDriversFromTickets(tickets, settings).slice(0, 12)
  };
}

export function aggregateMonthly(reports = [], settings) {
  const weekly = reports.map((report) => ({ week: report.week, metrics: calculateWeeklyMetrics(report, settings) }));
  const totals = weekly.reduce((acc, item) => ({ ticketsCreated: acc.ticketsCreated + item.metrics.ticketsCreated, ticketsClosed: acc.ticketsClosed + item.metrics.ticketsClosed, ordersCount: acc.ordersCount + item.metrics.ordersCount, backlog: item.metrics.backlog || acc.backlog }), { ticketsCreated:0, ticketsClosed:0, ordersCount:0, backlog:0 });
  return { weekly, totals, averages: { csat: average(weekly.map((x) => x.metrics.csat)), firstResponseTime: average(weekly.map((x) => x.metrics.firstResponseTime)), resolutionTime: average(weekly.map((x) => x.metrics.resolutionTime)), ticketsPerOrder: totals.ordersCount ? totals.ticketsCreated / totals.ordersCount : 0 } };
}

function average(values = []) {
  const valid = values.filter((value) => Number.isFinite(value) && value > 0);
  return valid.length ? valid.reduce((a,b) => a + b, 0) / valid.length : 0;
}
