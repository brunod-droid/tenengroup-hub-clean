export const FILE_TYPES = {
  "ticket-volume": "volume",
  "workload": "workload",
  "customer-experience": "cx",
  "agents-metrics": "agents",
  "channels-metrics": "channels",
  "tickets": "tickets",
  "orders": "orders",
  "finance": "finance",
  "social": "social"
};

export function detectFileType(filename = "") {
  const normalized = filename.toLowerCase();
  const match = Object.entries(FILE_TYPES).find(([keyword]) => normalized.includes(keyword));
  return match ? match[1] : null;
}

export function normalizeHeader(header = "") {
  return String(header).trim().replace(/\s+/g, " ").replace(/^\ufeff/, "");
}

export function normalizeRow(row = {}) {
  const normalized = {};
  Object.entries(row).forEach(([key, value]) => {
    normalized[normalizeHeader(key)] = typeof value === "string" ? value.trim() : value;
  });
  return normalized;
}

export function normalizeRows(rows = []) {
  return rows.map(normalizeRow).filter((row) => Object.values(row).some((value) => value !== "" && value !== null && value !== undefined));
}

export function mergeFileIntoData(currentData, type, rows) {
  return { tickets: [], workload: [], volume: [], cx: [], agents: [], channels: [], orders: [], finance: [], social: [], ...(currentData || {}), [type]: normalizeRows(rows) };
}
