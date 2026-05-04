
export function detectFileType(filename = "") {
  const n = filename.toLowerCase();
  if (n.includes("ticket-volume")) return "volume";
  if (n.includes("customer-experience")) return "cx";
  if (n.includes("agents-metrics")) return "agents";
  if (n.includes("channels-metrics")) return "channels";
  if (n.includes("workload")) return "workload";
  if (n.includes("tickets")) return "tickets";
  if (n.includes("orders") || n.includes("order") || n.includes("shopify")) return "orders";
  if (n.includes("finance") || n.includes("cost")) return "finance";
  if (n.includes("social")) return "social";
  return null;
}

export function normalizeHeader(header = "") {
  return String(header || "").trim().replace(/\s+/g, " ").replace(/^\ufeff/, "");
}

export function normalizeRows(rows = []) {
  return rows.map((row) => {
    const out = {};
    Object.entries(row || {}).forEach(([k, v]) => {
      out[normalizeHeader(k)] = typeof v === "string" ? v.trim() : v;
    });
    return out;
  }).filter((row) => Object.values(row).some((v) => v !== "" && v !== null && v !== undefined));
}

export function compactRows(type, rows = []) {
  if (type === "orders") {
    return rows.map((r) => ({
      Name: r.Name || "",
      Id: r.Id || r.ID || r.id || "",
      "Financial Status": r["Financial Status"] || "",
      "Paid at": r["Paid at"] || "",
      "Cancelled at": r["Cancelled at"] || "",
      Total: r.Total || "",
      "Created at": r["Created at"] || ""
    }));
  }
  if (type === "tickets") {
    return rows.map((r) => ({
      id: r.id || r.ID || r["Ticket id"] || r["Ticket ID"] || r.Id || "",
      "Created at": r["Created at"] || r["Creation date"] || "",
      "Closed at": r["Closed at"] || r["Closed date"] || "",
      Tags: r.Tags || r.tags || "",
      "Initial channel": r["Initial channel"] || r.Channel || "",
      "Assignee name": r["Assignee name"] || r.Assignee || "",
      "Survey score": r["Survey score"] || r.CSAT || "",
      "Number of agent messages": r["Number of agent messages"] || r["Messages sent"] || r.Messages || "",
      "First response time (s)": r["First response time (s)"] || ""
    }));
  }
  return rows;
}

export function defaultReportData() {
  return { tickets: [], workload: [], volume: [], cx: [], agents: [], channels: [], orders: [], finance: [], social: [] };
}
