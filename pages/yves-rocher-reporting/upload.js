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

function getWeekKey(weekStart) {
  const { weekEnd } = getWeekRange(weekStart);
  return { weekEnd, week: `${weekStart}_${weekEnd}` };
}

function upsertReport(weekStart, updater) {
  const { weekEnd, week } = getWeekKey(weekStart);
  const existingReports = getReports();
  const existingIndex = existingReports.findIndex((r) => r.week === week);
  const existingReport = existingIndex >= 0
    ? existingReports[existingIndex]
    : { week, weekStart, weekEnd, data: defaultReportData() };

  const nextReport = {
    ...existingReport,
    week,
    weekStart,
    weekEnd,
    data: { ...defaultReportData(), ...(existingReport.data || {}) },
    uploadedAt: new Date().toISOString()
  };

  updater(nextReport);

  // Keep only current week + compact data. This avoids localStorage quota problems.
  saveReports([nextReport]);
  return nextReport;
}

export default function UploadPage() {
  const [weekStart, setWeekStart] = useState("");
  const [manualOrders, setManualOrders] = useState("");
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  function clearReports() {
    localStorage.removeItem("yr_reports");
    setDetails([]);
    setStatus("Local reporting data cleared. Upload the current week again.");
  }

  function saveManualOrders() {
    if (!weekStart) {
      setStatus("Please select a week start first.");
      return;
    }

    const count = Number(manualOrders);
    if (!Number.isFinite(count) || count < 0) {
      setStatus("Please enter a valid orders number.");
      return;
    }

    try {
      upsertReport(weekStart, (report) => {
        report.data.orders = [{ Orders: Math.round(count) }];
      });
      setStatus(`Done. Manual paid orders saved: ${Math.round(count)}.`);
      setDetails([{ file: "Manual orders", status: "Saved", message: `${Math.round(count)} paid orders stored` }]);
    } catch (error) {
      setStatus(`Manual orders save failed: ${error.message}`);
    }
  }

  async function handleUpload(files) {
    const fileList = Array.from(files || []);
    if (!fileList.length) return;

    if (!weekStart) {
      setStatus("Please select a week start first.");
      return;
    }

    setStatus("Uploading and parsing files...");
    setDetails([]);

    try {
      const uploadDetails = [];

      const nextReport = upsertReport(weekStart, (report) => {
        // updater body is synchronous; files are handled below through temp result
      });

      const workingReport = {
        ...nextReport,
        data: { ...defaultReportData(), ...(nextReport.data || {}) },
        uploadedAt: new Date().toISOString()
      };

      for (const file of fileList) {
        const type = detectFileType(file.name);
        if (!type) {
          uploadDetails.push({ file: file.name, status: "Rejected", message: "Unknown file type. Use orders/order/shopify, tickets, finance/cost, etc." });
          continue;
        }

        const rawRows = await parseCsvFile(file);
        const rows = compactRows(type, rawRows);
        workingReport.data[type] = rows;

        uploadDetails.push({
          file: file.name,
          status: "Imported",
          message: type === "orders"
            ? `${rows[0]?.Orders || 0} paid orders counted from ${rawRows.length} Shopify rows`
            : `${rawRows.length} rows imported as ${type}. Stored compactly: ${sizeMb(rows)} MB`
        });
      }

      saveReports([workingReport]);
      setDetails(uploadDetails);
      setStatus(`Done. Week ${workingReport.week} saved. Storage size: ${sizeMb(getReports())} MB.`);
    } catch (error) {
      setStatus(`Upload failed: ${error.message}`);
    }
  }

  function onDrop(event) {
    event.preventDefault();
    setDragActive(false);
    handleUpload(event.dataTransfer.files);
  }

  return (
    <main style={pageStyle}>
      <ReportingNav />
      <h1 style={{ fontSize: 42, fontWeight: 900 }}>Upload CSV files</h1>

      <div style={cardStyle}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>Week start</div>
        <input
          type="date"
          value={weekStart}
          onChange={(e) => setWeekStart(e.target.value)}
          style={{ padding: 12, borderRadius: 10, border: "1px solid #d1d5db" }}
        />
        <div style={{ marginTop: 10, color: "#64748b" }}>Week starts on Sunday.</div>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        style={{
          ...cardStyle,
          marginTop: 20,
          border: dragActive ? "3px dashed #15803d" : "2px dashed #94a3b8",
          background: dragActive ? "#f0fdf4" : "#fff",
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 900 }}>Drag & drop CSV files here</div>
        <div style={{ marginTop: 10, color: "#64748b" }}>
          Or use Choose files. Orders are now stored as one number only.
        </div>
        <input type="file" accept=".csv,text/csv" multiple onChange={(e) => handleUpload(e.target.files)} style={{ marginTop: 18 }} />
      </div>

      <div style={{ ...cardStyle, marginTop: 20, background: "#f0fdf4" }}>
        <div style={{ fontSize: 24, fontWeight: 900 }}>Manual Orders Input</div>
        <div style={{ marginTop: 8, color: "#166534", lineHeight: 1.6 }}>
          Simplest option: enter the number of paid Shopify orders for the week instead of uploading the large Shopify export.
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 14, alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="number"
            value={manualOrders}
            onChange={(e) => setManualOrders(e.target.value)}
            placeholder="Paid orders count"
            style={{ padding: 12, borderRadius: 10, border: "1px solid #86efac", minWidth: 220 }}
          />
          <button
            onClick={saveManualOrders}
            style={{ background: "#15803d", color: "#fff", border: "none", borderRadius: 10, padding: "12px 16px", fontWeight: 900, cursor: "pointer" }}
          >
            Save orders number
          </button>
        </div>
      </div>

      <div style={{ ...cardStyle, marginTop: 20, background: "#fff7ed" }}>
        <div style={{ fontWeight: 900 }}>Storage troubleshooting</div>
        <div style={{ marginTop: 8, color: "#7c2d12", lineHeight: 1.6 }}>
          This tool stores reporting data in your browser. If storage is full, clear old uploaded data here.
        </div>
        <button
          onClick={clearReports}
          style={{ marginTop: 12, background: "#c2410c", color: "#fff", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 900, cursor: "pointer" }}
        >
          Clear uploaded reporting data
        </button>
      </div>

      {status && <div style={{ ...cardStyle, marginTop: 20 }}><strong>Status:</strong> {status}</div>}

      {!!details.length && (
        <div style={{ ...cardStyle, marginTop: 20 }}>
          <h2>Upload details</h2>
          {details.map((item) => (
            <div key={`${item.file}-${item.message}`} style={{ display: "grid", gridTemplateColumns: "240px 120px 1fr", gap: 12, padding: "10px 0", borderBottom: "1px solid #e5e7eb" }}>
              <strong>{item.file}</strong>
              <span>{item.status}</span>
              <span style={{ color: item.status === "Rejected" ? "#b91c1c" : "#166534" }}>{item.message}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
