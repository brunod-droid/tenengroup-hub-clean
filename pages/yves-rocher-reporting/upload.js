import { useState } from "react";
import Papa from "papaparse";
import { getWeekRange } from "../../lib/yr-reporting/dates";
import { getReports, saveReports } from "../../lib/yr-reporting/storage";
import { detectFileType, normalizeRows, defaultReportData } from "../../lib/yr-reporting/parser";
import { ReportingNav, pageStyle, cardStyle } from "../../lib/yr-reporting/components";

function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: "greedy",
      dynamicTyping: false,
      worker: false,
      transformHeader: (header) => String(header || "").trim().replace(/^\ufeff/, ""),
      complete: (results) => {
        if (results.errors?.length) {
          const fatal = results.errors.find((error) => error.type === "Delimiter" || error.type === "Quotes");
          if (fatal) {
            reject(new Error(`${file.name}: ${fatal.message}`));
            return;
          }
        }

        resolve(normalizeRows(results.data || []));
      },
      error: (error) => reject(error)
    });
  });
}

function makeWeekKey(weekStart, weekEnd) {
  return `${weekStart}_${weekEnd}`;
}

export default function UploadPage() {
  const [weekStart, setWeekStart] = useState("");
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState([]);

  async function handleUpload(files) {
    const fileList = Array.from(files || []);
    if (!fileList.length) return;

    if (!weekStart) {
      setStatus("Please select a week start first.");
      return;
    }

    const { weekEnd } = getWeekRange(weekStart);
    const week = makeWeekKey(weekStart, weekEnd);

    setStatus("Uploading and parsing files...");
    setDetails([]);

    try {
      const reports = getReports();
      const existingIndex = reports.findIndex((report) => report.week === week);
      const existingReport =
        existingIndex >= 0
          ? reports[existingIndex]
          : { week, weekStart, weekEnd, data: defaultReportData(), uploadedAt: new Date().toISOString() };

      const nextReport = {
        ...existingReport,
        week,
        weekStart,
        weekEnd,
        data: { ...defaultReportData(), ...(existingReport.data || {}) },
        uploadedAt: new Date().toISOString()
      };

      const uploadDetails = [];

      for (const file of fileList) {
        const type = detectFileType(file.name);

        if (!type) {
          uploadDetails.push({
            file: file.name,
            status: "Rejected",
            message: "Unknown file type. Filename must include ticket-volume, workload, customer-experience, agents-metrics, channels-metrics, tickets, orders/order/shopify, finance/cost, or social."
          });
          continue;
        }

        const rows = await parseCsvFile(file);
        nextReport.data[type] = rows;

        uploadDetails.push({
          file: file.name,
          status: "Imported",
          message: `${rows.length} rows imported as ${type}`
        });
      }

      if (existingIndex >= 0) {
        reports[existingIndex] = nextReport;
      } else {
        reports.unshift(nextReport);
      }

      saveReports(reports);
      setDetails(uploadDetails);
      setStatus(`Done. Week ${week} saved.`);
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
        <input
          type="date"
          value={weekStart}
          onChange={(e) => setWeekStart(e.target.value)}
          style={{ padding: 12, borderRadius: 10, border: "1px solid #d1d5db" }}
        />
        <div style={{ marginTop: 10, color: "#64748b" }}>
          Week starts on Sunday. Upload files for the same reporting week.
        </div>
      </div>

      <div
        style={{
          ...cardStyle,
          marginTop: 20,
          border: "2px dashed #94a3b8",
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 900 }}>Drag & drop CSV files here</div>
        <div style={{ marginTop: 10, color: "#64748b" }}>
          Orders files can now be named orders_export.csv, order.csv or shopify_orders.csv.
        </div>

        <input
          type="file"
          accept=".csv,text/csv"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          style={{ marginTop: 18 }}
        />
      </div>

      {status && (
        <div style={{ ...cardStyle, marginTop: 20 }}>
          <strong>Status:</strong> {status}
        </div>
      )}

      {!!details.length && (
        <div style={{ ...cardStyle, marginTop: 20 }}>
          <h2>Upload details</h2>
          {details.map((item) => (
            <div
              key={item.file}
              style={{
                display: "grid",
                gridTemplateColumns: "240px 120px 1fr",
                gap: 12,
                padding: "10px 0",
                borderBottom: "1px solid #e5e7eb"
              }}
            >
              <strong>{item.file}</strong>
              <span>{item.status}</span>
              <span style={{ color: item.status === "Rejected" ? "#b91c1c" : "#166534" }}>
                {item.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
