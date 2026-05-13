const STORAGE_KEY = "theograce_weekly_reports";
export function getReports(){ if(typeof window==="undefined") return []; try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");}catch{return [];} }
export function saveReports(reports){ if(typeof window==="undefined") return; localStorage.setItem(STORAGE_KEY, JSON.stringify(reports||[])); }
export function upsertReport(report){ const reports=getReports(); const i=reports.findIndex(x=>x.weekKey===report.weekKey); const next={...report,updatedAt:new Date().toISOString()}; if(i>=0) reports[i]=next; else reports.unshift(next); saveReports(reports.slice(0,104)); return next; }
export function deleteReport(weekKey){ const next=getReports().filter(x=>x.weekKey!==weekKey); saveReports(next); return next; }
