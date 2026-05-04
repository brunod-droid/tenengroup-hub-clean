
import { useState } from "react";
import Papa from "papaparse";
import { getWeekRange } from "../../lib/yr-reporting/dates";
import { getReports, saveReports } from "../../lib/yr-reporting/storage";
import { detectFileType, normalizeRows, compactRows, defaultReportData } from "../../lib/yr-reporting/parser";
import { ReportingNav, pageStyle, cardStyle } from "../../lib/yr-reporting/components";

function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: "greedy",
      dynamicTyping: false,
      worker: false,
      transformHeader: (h) => String(h || "").trim().replace(/^\ufeff/, ""),
      complete: (results) => resolve(normalizeRows(results.data || [])),
      error: (error) => reject(error)
    });
  });
}

function sizeMb(value) {
  return (new Blob([JSON.stringify(value)]).size / 1024 / 1024).toFixed(2);
}

export default function UploadPage() {
  const [weekStart, setWeekStart] = useState("");
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState([]);

  function clearReports() {
    localStorage.removeItem("yr_reports");
    setDetails([]);
    setStatus("Local reporting data cleared. Upload the current week again.");
  }

  async function handleUpload(files) {
    const fileList = Array.from(files || []);
    if (!fileList.length) return;
    if (!weekStart) {
      setStatus("Please select a week start first.");
      return;
    }

    const { weekEnd } = getWeekRange(weekStart);
    const week = `${weekStart}_${weekEnd}`;
    setStatus("Uploading and parsing files...");
    setDetails([]);

    try {
      const reports = getReports();
      const existingIndex = reports.findIndex((r) => r.week === week);
      const existingReport = existingIndex >= 0 ? reports[existingIndex] : { week, weekStart, weekEnd, data: defaultReportData() };
      const nextReport = { ...existingReport, week, weekStart, weekEnd, data: { ...defaultReportData(), ...(existingReport.data || {}) }, uploadedAt: new Date().toISOString() };
      const uploadDetails = [];

      for (const file of fileList) {
        const type = detectFileType(file.name);
        if (!type) {
          uploadDetails.push({ file: file.name, status: "Rejected", message: "Unknown file type. Use orders/order/shopify, tickets, finance/cost, etc." });
          continue;
        }
        const raw = await parseCsvFile(file);
        const rows = compactRows(type, raw);
        nextReport.data[type] = rows;
        uploadDetails.push({ file: file.name, status: "Imported", message: `${raw.length} rows imported as ${type}. Stored compactly: ${sizeMb(rows)} MB` });
      }

      const nextReports = [...reports];
      if (existingIndex >= 0) nextReports[existingIndex] = nextReport;
      else nextReports.unshift(nextReport);

      try {
        saveReports(nextReports.slice(0, 12));
      } catch (e) {
        saveReports([nextReport]);
        uploadDetails.push({ file: "localStorage", status: "Compacted", message: "Storage was full. Older weeks removed; only this week was saved." });
      }

      setDetails(uploadDetails);
      setStatus(`Done. Week ${week} saved. Storage size: ${sizeMb(getReports())} MB.`);
    } catch (error) {
      setStatus(`Upload failed: ${error.message}`);
    }
  }

  return (
    <main style={pageStyle}>
      <ReportingNav />
      <h1 style={{ fontSize: 42, fontWeight: 900 }}>Upload CSV files</h1>

      <div style={cardStyle}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>Week start</div>
        <input type="date" value={weekStart} onChange={(e) => setWeekStart(e.target.value)} style={{ padding: 12, borderRadius: 10, border: "1px solid #d1d5db" }} />
        <div style={{ marginTop: 10, color: "#64748b" }}>Week starts on Sunday.</div>
      </div>

      <div style={{ ...cardStyle, marginTop: 20, border: "2px dashed #94a3b8", textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 900 }}>Upload CSV files</div>
        <div style={{ marginTop: 10, color: "#64748b" }}>Large orders/tickets files are stored in compact mode to avoid browser quota errors.</div>
        <input type="file" accept=".csv,text/csv" multiple onChange={(e) => handleUpload(e.target.files)} style={{ marginTop: 18 }} />
      </div>

      <div style={{ ...cardStyle, marginTop: 20, background: "#fff7ed" }}>
        <div style={{ fontWeight: 900 }}>Storage troubleshooting</div>
        <div style={{ marginTop: 8, color: "#7c2d12", lineHeight: 1.6 }}>If your browser storage is full, clear previous uploaded reports and upload the current week again.</div>
        <button onClick={clearReports} style={{ marginTop: 12, background: "#c2410c", color: "#fff", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 900, cursor: "pointer" }}>Clear uploaded reporting data</button>
      </div>

      {status && <div style={{ ...cardStyle, marginTop: 20 }}><strong>Status:</strong> {status}</div>}

      {!!details.length && (
        <div style={{ ...cardStyle, marginTop: 20 }}>
          <h2>Upload details</h2>
          {details.map((item) => (
            <div key={`${item.file}-${item.message}`} style={{ display: "grid", gridTemplateColumns: "240px 120px 1fr", gap: 12, padding: "10px 0", borderBottom: "1px solid #e5e7eb" }}>
              <strong>{item.file}</strong><span>{item.status}</span><span style={{ color: item.status === "Rejected" ? "#b91c1c" : "#166534" }}>{item.message}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
