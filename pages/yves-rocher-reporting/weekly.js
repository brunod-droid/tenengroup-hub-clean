import { useEffect, useMemo, useState } from "react";
import { getReports, getSettings } from "../../lib/yr-reporting/storage";
import { calculateWeeklyMetrics, parseDurationToHours, toNumber } from "../../lib/yr-reporting/metrics";
import { ReportingNav, MetricCard, pageStyle, cardStyle, formatNumber } from "../../lib/yr-reporting/components";

function normalize(value = "") {
  return String(value).toLowerCase().replace(/\s+/g, " ").trim();
}

function getLabel(row = {}) {
  if (row[" "] !== undefined) return row[" "];
  if (row[""] !== undefined) return row[""];
  const keys = Object.keys(row || {});
  return keys.length ? row[keys[0]] : "";
}

function getCurrent(row = {}) {
  if (row["current period"] !== undefined) return row["current period"];
  if (row["Current period"] !== undefined) return row["Current period"];
  if (row["Current Period"] !== undefined) return row["Current Period"];
  const keys = Object.keys(row || {});
  return keys.length > 1 ? row[keys[1]] : "";
}

function directCustomerExperienceMetrics(report) {
  const cx = report?.data?.cx || [];
  let csat = 0;
  let frt = 0;
  let resolution = 0;

  cx.forEach((row) => {
    const label = normalize(getLabel(row));
    const value = getCurrent(row);

    if (label.includes("average csat") || label === "csat") csat = toNumber(value);
    if (label.includes("first response time")) frt = parseDurationToHours(value);
    if (label.includes("resolution time")) resolution = parseDurationToHours(value);
  });

  return { csat, frt, resolution };
}

function statusHint(type, value, unit) {
  if (!value) return "⚠️ Not found in uploaded files";
  if (type === "csat") return value >= 4.2 ? "✅ On target" : "⚠️ Below target (Goal: 4.2)";
  if (type === "sla") {
    if (unit === "%") return value >= 90 ? "✅ On target" : "⚠️ Below target";
    return value <= 10 ? "✅ On target" : "⚠️ Too slow (Goal: 10h)";
  }
  return "";
}

function HighlightKpi({ label, value, hint, color }) {
  return (
    <div style={{ ...cardStyle, borderTop: `6px solid ${color}`, minHeight: 138 }}>
      <div style={{ color: "#64748b", fontWeight: 800, fontSize: 13 }}>{label}</div>
      <div style={{ fontSize: 40, fontWeight: 950, marginTop: 8, color: "#0f172a" }}>{value}</div>
      <div style={{ color: "#475569", marginTop: 8, fontWeight: 700 }}>{hint}</div>
    </div>
  );
}

export default function WeeklyReport() {
  const [reports, setReports] = useState([]);
  const [week, setWeek] = useState("");
  const [settings, setSettings] = useState(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const stored = getReports();
    setReports(stored);
    setWeek(stored[0]?.week || "");
    setSettings(getSettings());
  }, []);

  const report = reports.find((item) => item.week === week);

  const metrics = useMemo(() => {
    if (!report || !settings) return null;

    const base = calculateWeeklyMetrics(report, settings);
    const direct = directCustomerExperienceMetrics(report);

    const csat = base.csat || direct.csat;
    const firstResponseTime = base.firstResponseTime || direct.frt;
    const resolutionTime = base.resolutionTime || direct.resolution;
    const slaValue = base.slaValue || firstResponseTime;
    const slaUnit = base.slaUnit || (firstResponseTime ? "h" : "");

    return {
      ...base,
      csat,
      firstResponseTime,
      resolutionTime,
      slaValue,
      slaUnit
    };
  }, [report, settings]);

  const slaDisplay = metrics?.slaValue ? `${formatNumber(metrics.slaValue, 1)}${metrics.slaUnit}` : "Not found";

  return (
    <main style={pageStyle}>
      <ReportingNav />
      <h1 style={{ fontSize: 42, fontWeight: 900 }}>Weekly Report</h1>

      <div style={cardStyle}>
        <label style={{ fontWeight: 900, marginRight: 12 }}>Select week</label>
        <select value={week} onChange={(e) => setWeek(e.target.value)} style={{ padding: 10, borderRadius: 10 }}>
          {reports.map((r) => <option key={r.week} value={r.week}>{r.week}</option>)}
        </select>
      </div>

      {!metrics && <div style={cardStyle}>No data available. Upload CSV files first.</div>}

      {metrics && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 20 }}>
            <HighlightKpi
              label="CSAT"
              value={metrics.csat ? formatNumber(metrics.csat, 2) : "Not found"}
              hint={statusHint("csat", metrics.csat)}
              color={metrics.csat >= 4.2 ? "#16a34a" : "#f59e0b"}
            />

            <HighlightKpi
              label={metrics.slaUnit === "%" ? "SLA" : "SLA / First Response"}
              value={slaDisplay}
              hint={statusHint("sla", metrics.slaValue, metrics.slaUnit)}
              color={metrics.slaValue ? "#16a34a" : "#f59e0b"}
            />

            <HighlightKpi label="Tickets / Order" value={formatNumber(metrics.ticketsPerOrder, 2)} hint={metrics.ordersCount ? "Based on Shopify orders" : "Upload orders file"} color="#2563eb" />
            <HighlightKpi label="Backlog" value={formatNumber(metrics.backlog)} hint="Open tickets" color="#7c3aed" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 20 }}>
            <MetricCard label="Tickets Created" value={formatNumber(metrics.ticketsCreated)} />
            <MetricCard label="Tickets Closed" value={formatNumber(metrics.ticketsClosed)} />
            <MetricCard label="Orders" value={formatNumber(metrics.ordersCount)} />
            <MetricCard label="Resolution Time" value={metrics.resolutionTime ? `${formatNumber(metrics.resolutionTime, 1)}h` : "Not found"} />
          </div>

          <div style={{ ...cardStyle, marginTop: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900 }}>Top Drivers</h2>
            {metrics.drivers.length ? metrics.drivers.map((item) => (
              <div key={item.driver} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
                <span>{item.driver}</span><b>{item.count}</b>
              </div>
            )) : <p style={{ color: "#64748b" }}>No drivers detected yet. Make sure your tickets file has a Tags column with values like reason::wismo.</p>}
          </div>

          <div style={{ ...cardStyle, marginTop: 20 }}>
            <button onClick={() => setShowDebug(!showDebug)} style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 800, cursor: "pointer" }}>
              {showDebug ? "Hide file diagnostics" : "Show file diagnostics"}
            </button>

            {showDebug && (
              <div style={{ marginTop: 16, color: "#475569", lineHeight: 1.7 }}>
                <div><b>Customer Experience raw rows:</b></div>
                <pre style={{ whiteSpace: "pre-wrap", background: "#f8fafc", padding: 12, borderRadius: 12 }}>
                  {JSON.stringify(report?.data?.cx || [], null, 2)}
                </pre>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
