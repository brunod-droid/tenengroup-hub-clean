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

  const metrics = useMemo(() => {
    if (!report || !settings) return null;
    return calculateWeeklyMetrics(report, settings);
  }, [report, settings]);

  return (
    <main style={pageStyle}>
      <ReportingNav />

      <h1 style={{ fontSize: 42, fontWeight: 900 }}>Weekly Report</h1>

      <div style={cardStyle}>
        <label style={{ fontWeight: 900, marginRight: 12 }}>Select week</label>
        <select
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          style={{ padding: 10, borderRadius: 10 }}
        >
          {reports.map((r) => (
            <option key={r.week} value={r.week}>
              {r.week}
            </option>
          ))}
        </select>
      </div>

      {!metrics && (
        <div style={cardStyle}>
          No data available. Upload CSV files first.
        </div>
      )}

      {metrics && (
        <>
          {/* 🔥 TOP KPI BLOCK */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
              marginTop: 20,
            }}
          >
            <MetricCard
              label="CSAT"
              value={formatNumber(metrics.csat, 2)}
              hint={
                metrics.csat >= 4.2
                  ? "✅ On target"
                  : "⚠️ Below target (Goal: 4.2)"
              }
            />

            <MetricCard
              label="SLA (First Response)"
              value={formatNumber(metrics.firstResponseTime, 1) + "h"}
              hint={
                metrics.firstResponseTime <= 10
                  ? "✅ On target"
                  : "⚠️ Too slow (Goal: 10h)"
              }
            />

            <MetricCard
              label="Tickets / Order"
              value={formatNumber(metrics.ticketsPerOrder, 2)}
            />

            <MetricCard
              label="Backlog"
              value={formatNumber(metrics.backlog)}
            />
          </div>

          {/* 📊 VOLUME */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginTop: 20,
            }}
          >
            <MetricCard
              label="Tickets Created"
              value={formatNumber(metrics.ticketsCreated)}
            />

            <MetricCard
              label="Tickets Closed"
              value={formatNumber(metrics.ticketsClosed)}
            />

            <MetricCard
              label="Orders"
              value={formatNumber(metrics.ordersCount)}
            />
          </div>

          {/* 🧠 DRIVERS */}
          <div style={{ ...cardStyle, marginTop: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900 }}>
              Top Drivers
            </h2>

            {metrics.drivers.length ? (
              metrics.drivers.map((item) => (
                <div
                  key={item.driver}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <span>{item.driver}</span>
                  <b>{item.count}</b>
                </div>
              ))
            ) : (
              <p style={{ color: "#64748b" }}>
                No drivers detected yet.
              </p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
