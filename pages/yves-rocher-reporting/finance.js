import { useEffect, useMemo, useState } from "react";
import { getReports } from "../../lib/yr-reporting/storage";
import { ReportingNav, pageStyle, cardStyle, MetricCard, formatNumber } from "../../lib/yr-reporting/components";

function toNumber(value) {
  if (value === null || value === undefined || value === "") return 0;
  const parsed = Number(String(value).replace(/[,$%]/g, "").replace(",", ".").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function sumFinance(rows, regex) {
  return rows.reduce((sum, row) => {
    const key = Object.keys(row || {}).find((column) => regex.test(String(column).toLowerCase()));
    return sum + toNumber(key ? row[key] : 0);
  }, 0);
}

export default function FinancePage() {
  const [reports, setReports] = useState([]);
  const [week, setWeek] = useState("");

  useEffect(() => {
    const stored = getReports();
    setReports(stored);
    setWeek(stored[0]?.week || "");
  }, []);

  const report = reports.find((item) => item.week === week);
  const finance = report?.data?.finance || [];

  const metrics = useMemo(() => ({
    refunds: sumFinance(finance, /refund/),
    credits: sumFinance(finance, /credit|coupon|gesture/),
    revenue: sumFinance(finance, /revenue|sales|gmv/)
  }), [finance]);

  return (
    <main style={pageStyle}>
      <ReportingNav />
      <h1 style={{ fontSize: 42, fontWeight: 900 }}>Finance</h1>
      <p style={{ color: "#64748b" }}>This page can be protected separately with Basic Auth.</p>

      <div style={cardStyle}>
        <label style={{ fontWeight: 900, marginRight: 12 }}>Select week</label>
        <select value={week} onChange={(e) => setWeek(e.target.value)} style={{ padding: 10, borderRadius: 10 }}>
          {reports.map((r) => <option key={r.week} value={r.week}>{r.week}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 20 }}>
        <MetricCard label="Revenue" value={formatNumber(metrics.revenue, 2)} />
        <MetricCard label="Refunds" value={formatNumber(metrics.refunds, 2)} />
        <MetricCard label="Credits / gestures" value={formatNumber(metrics.credits, 2)} />
      </div>

      <div style={{ ...cardStyle, marginTop: 20 }}>
        <h2>Raw finance rows</h2>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f8fafc", padding: 12, borderRadius: 12 }}>{JSON.stringify(finance, null, 2)}</pre>
      </div>
    </main>
  );
}
