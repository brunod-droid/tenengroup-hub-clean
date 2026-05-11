export function toNumber(value) {
  if (value === null || value === undefined || value === "") return 0;
  const parsed = Number(String(value).replace(/[,%$h]/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

export function yoy(current, previous) {
  const c = toNumber(current);
  const p = toNumber(previous);
  if (!p) return 0;
  return ((c - p) / p) * 100;
}

export function formatNumber(value, digits = 1) {
  const n = Number(value || 0);
  return n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export function formatYoy(value) {
  const n = Number(value || 0);
  return `${n > 0 ? "+" : ""}${formatNumber(n, 1)}%`;
}

export function getStatus(metric, value) {
  const v = toNumber(value);
  if (metric === "csat") {
    if (v >= 4.2) return { label: "On goal", color: "#166534", bg: "#dcfce7" };
    if (v >= 4.0) return { label: "Above minimum", color: "#854d0e", bg: "#fef9c3" };
    return { label: "Below minimum", color: "#991b1b", bg: "#fee2e2" };
  }
  if (metric === "sla") {
    if (v <= 10) return { label: "Goal", color: "#166534", bg: "#dcfce7" };
    if (v <= 20) return { label: "Agent target", color: "#854d0e", bg: "#fef9c3" };
    return { label: "Above target", color: "#991b1b", bg: "#fee2e2" };
  }
  return { label: "Info", color: "#1d4ed8", bg: "#dbeafe" };
}

export const DEFAULT_REPORT = {
  week: "",
  notes: "",
  csat: { us2026: 4.09, uk2026: 4.31, us2025: 3.95, uk2025: 4.00 },
  sla: { us2026: 20.5, uk2026: 16, us2025: 18.5, uk2025: 28 },
  conversations: { us2026: 2983, uk2026: 112, us2025: 1755, uk2025: 145 }
};
