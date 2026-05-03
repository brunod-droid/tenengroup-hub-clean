import { useEffect, useMemo, useState } from "react";
import { getReports } from "../../lib/yr-reporting/storage";
import { ReportingNav, pageStyle, cardStyle, MetricCard, formatNumber } from "../../lib/yr-reporting/components";

function toNumber(value) {
  if (value === null || value === undefined || value === "") return 0;
  const parsed = Number(String(value).replace(/[,$%]/g, "").replace(",", ".").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}
function getValue(row, names) {
  const keys = Object.keys(row || {});
  const key = keys.find((k) => names.some((name) => String(k).toLowerCase().trim() === name));
  return key ? row[key] : "";
}
function normalizeFinanceRows(rows = []) {
  return rows.map((row) => {
    const agent = getValue(row, ["agent", "agents", "name", "csr", "csr name"]) || row.Agent || row.Name || row.CSR || "";
    const hours = getValue(row, ["hours", "csr hours", "heures", "heures csr"]) || row.Hours || row["CSR Hours"] || "";
    const costPerHour = getValue(row, ["cost per hour", "hourly cost", "cost/hour", "cout horaire", "coût horaire", "cost per hour w"]) || row["Cost per hour"] || row["Hourly cost"] || "";
    return { agent: String(agent || "").trim(), hours: toNumber(hours), costPerHour: toNumber(costPerHour) };
  }).filter((row) => row.agent || row.hours || row.costPerHour);
}
function buildFinanceMetrics(report) {
  const financeRows = normalizeFinanceRows(report?.data?.finance || []);
  const ordersRows = report?.data?.orders || [];
  const ordersCount = ordersRows.reduce((sum, row) => {
    const paidAt = row["Paid at"] || row["Paid At"] || row["paid at"];
    if (paidAt !== undefined) return paidAt ? sum + 1 : sum;
    return sum + toNumber(row.Orders || row.orders || row["Order Count"] || row["Total Orders"]);
  }, 0) || ordersRows.length;
  const messagesSent = report?.data?.agents?.reduce((sum, row) => sum + toNumber(row["Messages sent"] || row["Messages Sent"] || row["Messages sent during the period"] || row.Messages || row.messages || 0), 0)
    || report?.data?.tickets?.reduce((sum, row) => sum + toNumber(row["Number of agent messages"] || row["Messages sent"] || row["Messages Sent"] || row["Messages sent during the period"] || row.Messages || row.messages || 0), 0) || 0;
  const totalHours = financeRows.reduce((sum, row) => sum + row.hours, 0);
  const totalCost = financeRows.reduce((sum, row) => sum + row.hours * row.costPerHour, 0);
  return { financeRows: financeRows.map((row) => ({ ...row, totalCost: row.hours * row.costPerHour })), totalHours, totalCost, ordersCount, messagesSent, orderCost: ordersCount ? totalCost / ordersCount : 0, productivity: totalHours ? messagesSent / totalHours : 0 };
}
function money(value, digits = 0) { return `$${formatNumber(value, digits)}`; }

export default function FinancePage() {
  const [reports, setReports] = useState([]);
  const [week, setWeek] = useState("");
  useEffect(() => { const stored = getReports(); setReports(stored); setWeek(stored[0]?.week || ""); }, []);
  const report = reports.find((item) => item.week === week);
  const metrics = useMemo(() => buildFinanceMetrics(report), [report]);

  return (
    <main style={pageStyle}>
      <ReportingNav />
      <div style={{ marginBottom: 22 }}><div style={{ color: "#991b1b", fontWeight: 900 }}>Protected Finance Area</div><h1 style={{ fontSize: 42, margin: "6px 0" }}>Finance KPIs</h1><p style={{ color: "#475569", lineHeight: 1.7 }}>Input expected: one finance CSV with agent name, CSR hours and cost per hour.</p></div>
      <div style={cardStyle}><label style={{ fontWeight: 900, marginRight: 12 }}>Select week</label><select value={week} onChange={(e) => setWeek(e.target.value)} style={{ padding: 10, borderRadius: 10 }}>{reports.map((r) => <option key={r.week} value={r.week}>{r.week}</option>)}</select></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 20 }}>
        <MetricCard label="CSR Hours" value={formatNumber(metrics.totalHours, 0)} hint="Sum of all CSR hours" />
        <MetricCard label="CSR Cost" value={money(metrics.totalCost, 0)} hint="Hours × cost/hour" />
        <MetricCard label="Order Cost" value={money(metrics.orderCost, 2)} hint="CSR cost / orders" />
        <MetricCard label="Productivity" value={formatNumber(metrics.productivity, 0)} hint="Messages sent / CSR hour" />
      </div>
      <div style={{ ...cardStyle, marginTop: 20 }}><h2>Finance input by agent</h2><div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}><thead><tr style={{ textAlign: "left", color: "#64748b", borderBottom: "1px solid #e5e7eb" }}><th style={{ padding: 10 }}>Agent</th><th style={{ padding: 10 }}>Hours</th><th style={{ padding: 10 }}>Cost / hour</th><th style={{ padding: 10 }}>Total cost</th></tr></thead><tbody>{metrics.financeRows.length ? metrics.financeRows.map((row, index) => <tr key={`${row.agent}-${index}`} style={{ borderBottom: "1px solid #f1f5f9" }}><td style={{ padding: 10, fontWeight: 900 }}>{row.agent || "Unknown"}</td><td style={{ padding: 10 }}>{formatNumber(row.hours, 0)}</td><td style={{ padding: 10 }}>{money(row.costPerHour, 0)}</td><td style={{ padding: 10 }}>{money(row.totalCost, 0)}</td></tr>) : <tr><td style={{ padding: 10, color: "#64748b" }} colSpan={4}>No finance data uploaded yet. Upload a CSV filename containing "finance".</td></tr>}</tbody></table></div></div>
    </main>
  );
}
