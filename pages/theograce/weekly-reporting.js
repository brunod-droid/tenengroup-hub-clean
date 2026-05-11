import { useEffect, useMemo, useState } from "react";
import { getReports, upsertReport } from "../../lib/theograce/storage";
import { DEFAULT_REPORT, formatNumber, formatYoy, getStatus, toNumber, yoy } from "../../lib/theograce/metrics";

const pageStyle = { minHeight: "100vh", background: "#f5f7fb", padding: 24, fontFamily: "Arial, sans-serif", color: "#0f172a" };
const cardStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, padding: 20, boxShadow: "0 8px 24px rgba(15,23,42,0.06)" };
const inputStyle = { width: "100%", padding: 10, borderRadius: 10, border: "1px solid #cbd5e1", fontWeight: 700 };

function Badge({ metric, value }) {
  const s = getStatus(metric, value);
  return <span style={{ background: s.bg, color: s.color, padding: "5px 9px", borderRadius: 999, fontSize: 12, fontWeight: 900 }}>{s.label}</span>;
}

function MetricTable({ title, metric, unit, goal, data, onChange }) {
  const rows = [
    { label: "TGR US", current: "us2026", previous: "us2025" },
    { label: "TGR UK", current: "uk2026", previous: "uk2025" }
  ];

  return (
    <div style={cardStyle}>
      <h2 style={{ margin: 0, fontSize: 24 }}>{title}</h2>
      <div style={{ marginTop: 6, color: "#64748b", fontWeight: 700 }}>{goal}</div>
      <div style={{ overflowX: "auto", marginTop: 18 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#64748b", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: 10 }}>Brand</th>
              <th style={{ padding: 10 }}>2026</th>
              <th style={{ padding: 10 }}>2025</th>
              <th style={{ padding: 10 }}>YOY</th>
              <th style={{ padding: 10 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const current = toNumber(data[row.current]);
              const previous = toNumber(data[row.previous]);
              const y = yoy(current, previous);
              return (
                <tr key={row.label} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: 10, fontWeight: 900 }}>{row.label}</td>
                  <td style={{ padding: 10 }}><input type="number" step="0.01" value={data[row.current]} onChange={(e) => onChange(row.current, e.target.value)} style={inputStyle} /></td>
                  <td style={{ padding: 10 }}><input type="number" step="0.01" value={data[row.previous]} onChange={(e) => onChange(row.previous, e.target.value)} style={inputStyle} /></td>
                  <td style={{ padding: 10, fontWeight: 900, color: y >= 0 ? "#15803d" : "#b91c1c" }}>{formatYoy(y)}</td>
                  <td style={{ padding: 10 }}>{metric !== "conversations" ? <Badge metric={metric} value={current} /> : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12, color: "#64748b", fontSize: 13 }}>Source: Kustomer · Weekly 7 days view {unit ? `· Unit: ${unit}` : ""}</div>
    </div>
  );
}

function SummaryCard({ label, value, hint, color }) {
  return (
    <div style={{ ...cardStyle, borderTop: `6px solid ${color}` }}>
      <div style={{ color: "#64748b", fontWeight: 800, fontSize: 13 }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 950, marginTop: 8 }}>{value}</div>
      <div style={{ marginTop: 8, color: "#64748b", fontWeight: 700 }}>{hint}</div>
    </div>
  );
}

export default function TheograceWeeklyReporting() {
  const [report, setReport] = useState(DEFAULT_REPORT);
  const [savedReports, setSavedReports] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const reports = getReports();
    setSavedReports(reports);
    if (reports[0]) setReport(reports[0]);
  }, []);

  const c = useMemo(() => ({
    csatUsYoy: yoy(report.csat.us2026, report.csat.us2025),
    csatUkYoy: yoy(report.csat.uk2026, report.csat.uk2025),
    slaUsYoy: yoy(report.sla.us2026, report.sla.us2025),
    slaUkYoy: yoy(report.sla.uk2026, report.sla.uk2025),
    convUsYoy: yoy(report.conversations.us2026, report.conversations.us2025),
    convUkYoy: yoy(report.conversations.uk2026, report.conversations.uk2025)
  }), [report]);

  function updateMetric(section, key, value) {
    setReport((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  }

  function save() {
    if (!report.week) {
      setStatus("Please enter a week label first.");
      return;
    }
    const saved = upsertReport(report);
    setReport(saved);
    setSavedReports(getReports());
    setStatus(`Saved ${saved.week}.`);
  }

  function loadWeek(week) {
    const found = savedReports.find((item) => item.week === week);
    if (found) {
      setReport(found);
      setStatus(`Loaded ${week}.`);
    }
  }

  return (
    <main style={pageStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <div style={{ color: "#7c3aed", fontWeight: 950 }}>Theograce</div>
          <h1 style={{ fontSize: 42, margin: "4px 0" }}>Weekly Reporting</h1>
          <p style={{ color: "#64748b", lineHeight: 1.6, maxWidth: 900 }}>Manual weekly input from Kustomer. Enter 2025 and 2026 values; YOY is calculated automatically. Add explanations at the end.</p>
        </div>
        <a href="/" style={{ background: "#0f172a", color: "#fff", borderRadius: 12, padding: "12px 16px", textDecoration: "none", fontWeight: 900, height: "fit-content" }}>Back to Hub</a>
      </div>

      <div style={{ ...cardStyle, marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 220px 160px", gap: 12, alignItems: "end" }}>
          <div>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>Week label</div>
            <input value={report.week} onChange={(e) => setReport({ ...report, week: e.target.value })} placeholder="Example: 2026-W18 / Apr 26 - May 02" style={inputStyle} />
          </div>
          <div>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>Load previous week</div>
            <select onChange={(e) => loadWeek(e.target.value)} value="" style={inputStyle}>
              <option value="">Select...</option>
              {savedReports.map((item) => <option key={item.week} value={item.week}>{item.week}</option>)}
            </select>
          </div>
          <button onClick={save} style={{ background: "#15803d", color: "#fff", border: "none", borderRadius: 12, padding: "12px 16px", fontWeight: 950, cursor: "pointer" }}>Save report</button>
        </div>
        {status && <div style={{ marginTop: 12, color: "#15803d", fontWeight: 900 }}>{status}</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
        <SummaryCard label="CSAT 7 days" value={`${formatNumber(report.csat.us2026, 2)} / ${formatNumber(report.csat.uk2026, 2)}`} hint={`US ${formatYoy(c.csatUsYoy)} · UK ${formatYoy(c.csatUkYoy)}`} color="#16a34a" />
        <SummaryCard label="SLA Agents 7 days" value={`${formatNumber(report.sla.us2026, 1)}h / ${formatNumber(report.sla.uk2026, 1)}h`} hint={`US ${formatYoy(c.slaUsYoy)} · UK ${formatYoy(c.slaUkYoy)}`} color="#f59e0b" />
        <SummaryCard label="Conversations 7 days" value={`${formatNumber(report.conversations.us2026, 0)} / ${formatNumber(report.conversations.uk2026, 0)}`} hint={`US ${formatYoy(c.convUsYoy)} · UK ${formatYoy(c.convUkYoy)}`} color="#2563eb" />
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        <MetricTable title="1. CSAT 7 days" metric="csat" unit="score" goal="Goal 4.2 · must be above 4.00" data={report.csat} onChange={(key, value) => updateMetric("csat", key, value)} />
        <MetricTable title="2. SLA Agents 7 days" metric="sla" unit="hours" goal="Goal 10h with Notch AI · 20h only Agents" data={report.sla} onChange={(key, value) => updateMetric("sla", key, value)} />
        <MetricTable title="3. Conversations 7 days" metric="conversations" unit="conversations" goal="Total conversations from Kustomer" data={report.conversations} onChange={(key, value) => updateMetric("conversations", key, value)} />
      </div>

      <div style={{ ...cardStyle, marginTop: 20 }}>
        <h2 style={{ marginTop: 0 }}>Free text explanation</h2>
        <textarea value={report.notes} onChange={(e) => setReport({ ...report, notes: e.target.value })} placeholder="Add context, explanation, action plan, root cause, staffing impact, promo impact, system issue, etc." style={{ width: "100%", minHeight: 160, padding: 14, borderRadius: 12, border: "1px solid #cbd5e1", lineHeight: 1.6 }} />
      </div>
    </main>
  );
}
