const STORAGE_KEY = "theograce_weekly_reports";

export function getReports() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

export function saveReports(reports) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports || []));
}

export function upsertReport(report) {
  const reports = getReports();
  const index = reports.findIndex((item) => item.week === report.week);
  const next = { ...report, updatedAt: new Date().toISOString() };
  if (index >= 0) reports[index] = next;
  else reports.unshift(next);
  saveReports(reports.slice(0, 52));
  return next;
}
