import { useState } from "react";
import Papa from "papaparse";
import { ReportingNav, pageStyle, cardStyle } from "../../lib/yr-reporting/components";
import { detectFileType, mergeFileIntoData } from "../../lib/yr-reporting/parser";
import { getWeekFromStart } from "../../lib/yr-reporting/dates";
import { getReportByWeek, upsertReport, emptyReportData } from "../../lib/yr-reporting/storage";
import { validateRows } from "../../lib/yr-reporting/validation";

function parseFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data || []),
      error: reject
    });
  });
}

export default function UploadYvesRocherReports() {
  const [weekStart, setWeekStart] = useState("");
  const [status, setStatus] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFiles(fileList) {
    if (!weekStart) {
      alert("Please choose the week start date first. Week starts on Sunday.");
      return;
    }

    const files = Array.from(fileList || []);
    if (!files.length) return;

    setIsUploading(true);
    const week = getWeekFromStart(weekStart);
    const existing = getReportByWeek(week.week);
    let data = existing?.data || emptyReportData();
    const nextStatus = [];

    for (const file of files) {
      const type = detectFileType(file.name);

      if (!type) {
        nextStatus.push({ file: file.name, ok: false, message: "Unknown file type. Filename must include ticket-volume, workload, customer-experience, agents-metrics, channels-metrics, tickets, orders, finance, or social." });
        continue;
      }

      try {
        const rows = await parseFile(file);
        const validation = validateRows(type, rows);
        data = mergeFileIntoData(data, type, rows);

        nextStatus.push({
          file: file.name,
          ok: validation.ok,
          message: validation.ok ? `${rows.length} rows imported as ${type}` : `${rows.length} rows imported as ${type}, but missing: ${validation.missing.join(", ")}`
        });
      } catch (error) {
        nextStatus.push({ file: file.name, ok: false, message: error.message || "CSV parsing error" });
      }
    }

    upsertReport({ week: week.week, weekStart: week.weekStart, weekEnd: week.weekEnd, data });
    setStatus(nextStatus);
    setIsUploading(false);
  }

  return (
    <main style={pageStyle}>
      <ReportingNav />
      <h1 style={{ fontSize: 40 }}>Upload CSV files</h1>
      <p style={{ color: "#475569" }}>Upload multiple CSV exports. Files are parsed in your browser and stored in localStorage.</p>

      <div style={cardStyle}>
        <label style={{ display: "block", fontWeight: 900, marginBottom: 8 }}>Week start date</label>
        <input type="date" value={weekStart} onChange={(event) => setWeekStart(event.target.value)} style={{ padding: 12, borderRadius: 10, border: "1px solid #cbd5e1" }} />
        <div style={{ marginTop: 8, color: "#64748b" }}>Choose the Sunday of the reporting week.</div>

        <div onDrop={(event) => { event.preventDefault(); handleFiles(event.dataTransfer.files); }} onDragOver={(event) => event.preventDefault()} style={{ marginTop: 22, border: "2px dashed #94a3b8", borderRadius: 18, padding: 40, textAlign: "center", background: "#f8fafc" }}>
          <div style={{ fontSize: 24, fontWeight: 900 }}>Drag & drop CSV files here</div>
          <p style={{ color: "#64748b" }}>Or choose files manually.</p>
          <input type="file" accept=".csv" multiple onChange={(event) => handleFiles(event.target.files)} />
        </div>
      </div>

      {isUploading && <div style={{ ...cardStyle, marginTop: 18 }}>Uploading and parsing files...</div>}

      {!!status.length && (
        <div style={{ ...cardStyle, marginTop: 18 }}>
          <h2>Upload results</h2>
          {status.map((item) => (
            <div key={item.file} style={{ padding: "10px 0", borderBottom: "1px solid #e5e7eb", color: item.ok ? "#166534" : "#b91c1c" }}>
              <b>{item.file}</b> — {item.message}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
