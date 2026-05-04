export function detectFileType(filename = "") {
  const normalized = filename.toLowerCase();

  if (normalized.includes("ticket-volume")) return "volume";
  if (normalized.includes("customer-experience")) return "cx";
  if (normalized.includes("agents-metrics")) return "agents";
  if (normalized.includes("channels-metrics")) return "channels";

  if (normalized.includes("workload")) return "workload";
  if (normalized.includes("tickets")) return "tickets";
  if (normalized.includes("orders") || normalized.includes("order") || normalized.includes("shopify")) return "orders";
  if (normalized.includes("finance") || normalized.includes("cost")) return "finance";
  if (normalized.includes("social")) return "social";

  return null;
}

export function normalizeHeader(header = "") {
  return String(header || "").trim().replace(/\s+/g, " ").replace(/^\ufeff/, "");
}

export function normalizeRow(row = {}) {
  const normalized = {};
  Object.entries(row || {}).forEach(([key, value]) => {
    normalized[normalizeHeader(key)] = typeof value === "string" ? value.trim() : value;
  });
  return normalized;
}

export function normalizeRows(rows = []) {
  return rows
    .map(normalizeRow)
    .filter((row) =>
      Object.values(row).some((value) => value !== "" && value !== null && value !== undefined)
    );
}

export function defaultReportData() {
  return {
    tickets: [],
    workload: [],
    volume: [],
    cx: [],
    agents: [],
    channels: [],
    orders: [],
    finance: [],
    social: []
  };
}
