import { useEffect, useMemo, useState } from "react";
import { getReports, getSettings } from "../../lib/yr-reporting/storage";
import { calculateWeeklyMetrics } from "../../lib/yr-reporting/metrics";
import { ReportingNav, MetricCard, pageStyle, cardStyle, formatNumber } from "../../lib/yr-reporting/components";

export default function WeeklyReport() {
  const [reports, setReports] = useState([]);
  const [week, setWeek] = useState("");
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const stored = getReports();
    setReports(stored);
    setWeek(stored[0]?.week || "");
    setSettings(getSettings());
  }, []);

  const report = reports.find((item) => item.week === week);
  const metrics = useMemo(() => report && settings ? calculateWeeklyMetrics(report, settings) : null, [report, settings]);

  return (
    <main style={pageStyle}>
      <ReportingNav />
      <h1 style={{ fontSize: 40 }}>Weekly report</h1>
      <div style={cardStyle}>
        <label style={{ fontWeight: 900, marginRight: 12 }}>Choose week</label>
        <select value={week} onChange={(e) => setWeek(e.target.value)} style={{ padding: 10, borderRadius: 10 }}>
          {reports.map((report) => <option key={report.week} value={report.week}>{report.week}</option>)}
        </select>
      </div>
      {!metrics && <div style={cardStyle}>No weekly report available.</div>}
      {metrics && <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <MetricCard label="Tickets created" value={formatNumber(metrics.ticketsCreated)} />
          <MetricCard label="Tickets closed" value={formatNumber(metrics.ticketsClosed)} />
          <MetricCard label="Open backlog" value={formatNumber(metrics.backlog)} />
          <MetricCard label="Orders" value={formatNumber(metrics.ordersCount)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 16 }}>
          <MetricCard label="Tickets / Order" value={formatNumber(metrics.ticketsPerOrder, 2)} />
          <MetricCard label="CSAT" value={formatNumber(metrics.csat, 2)} />
          <MetricCard label="First response time" value={formatNumber(metrics.firstResponseTime, 1)} />
          <MetricCard label="Resolution time" value={formatNumber(metrics.resolutionTime, 1)} />
        </div>
        <div style={{ ...cardStyle, marginTop: 16 }}>
          <h2>Drivers</h2>
          {metrics.drivers.length ? metrics.drivers.map((item) => <div key={item.driver} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #e5e7eb" }}><span>{item.driver}</span><b>{item.count}</b></div>) : <p>No drivers found.</p>}
        </div>
      </>}
    </main>
  );
}
