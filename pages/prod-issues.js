import { useEffect, useMemo, useState } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const ADMIN_PASSWORD = "YRFinance";

const pageStyle = { minHeight:"100vh", background:"#f5f7fb", padding:24, fontFamily:"Arial, sans-serif", color:"#0f172a" };
const cardStyle = { background:"#fff", border:"1px solid #e5e7eb", borderRadius:18, padding:20, boxShadow:"0 8px 24px rgba(15,23,42,0.06)" };
const inputStyle = { width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1", boxSizing:"border-box" };

async function api(path, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {})
    }
  });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return null;
  return res.json();
}

async function uploadAttachment(file) {
  if (!file) return {};
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${Date.now()}-${safe}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/prod-issues/${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false"
    },
    body: file
  });
  if (!res.ok) throw new Error(await res.text());
  return { attachment_name:file.name, attachment_path:path, attachment_type:file.type || "", attachment_size:file.size || 0 };
}

function attachmentUrl(path) {
  return path ? `${SUPABASE_URL}/storage/v1/object/public/prod-issues/${path}` : "";
}

export default function ProdIssuesPage() {
  const [issues, setIssues] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [form, setForm] = useState({
    issue_date: new Date().toISOString().slice(0,10),
    author: "",
    title: "",
    description: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") setForm(f => ({...f, author: localStorage.getItem("prod_issues_author") || ""}));
    loadIssues();
  }, []);

  async function loadIssues() {
    try {
      setStatus("Loading...");
      const data = await api("prod_issues?select=*&order=issue_date.desc,created_at.desc");
      setIssues(Array.isArray(data) ? data : []);
      setStatus("");
    } catch (e) { setStatus(`Load failed: ${e.message}`); }
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return issues;
    return issues.filter(i => [i.issue_date, i.author, i.title, i.description, i.attachment_name].some(v => String(v || "").toLowerCase().includes(q)));
  }, [issues, query]);

  function loginAdmin() {
    if (adminInput === ADMIN_PASSWORD) { setIsAdmin(true); setAdminInput(""); setStatus("Admin mode enabled."); }
    else setStatus("Wrong admin password.");
  }

  async function submitIssue(e) {
    e.preventDefault();
    if (!form.issue_date || !form.description.trim()) { setStatus("Date and description are required."); return; }
    try {
      setStatus("Saving...");
      if (typeof window !== "undefined") localStorage.setItem("prod_issues_author", form.author || "");
      const fileData = await uploadAttachment(attachment);
      await api("prod_issues", { method:"POST", body: JSON.stringify({
        issue_date: form.issue_date,
        author: form.author || "Unknown",
        title: form.title || "",
        description: form.description,
        ...fileData
      })});
      setForm({ issue_date:new Date().toISOString().slice(0,10), author:form.author, title:"", description:"" });
      setAttachment(null);
      setStatus("Issue saved and shared.");
      await loadIssues();
    } catch(e) { setStatus(`Save failed: ${e.message}`); }
  }

  async function deleteIssue(id) {
    if (!isAdmin) return;
    if (!window.confirm("Delete this issue?")) return;
    try {
      await api(`prod_issues?id=eq.${id}`, { method:"DELETE" });
      setIssues(prev => prev.filter(i => i.id !== id));
      setStatus("Issue deleted.");
    } catch(e) { setStatus(`Delete failed: ${e.message}`); }
  }

  return <main style={pageStyle}>
    <div style={{display:"flex",justifyContent:"space-between",gap:16,flexWrap:"wrap",marginBottom:20}}>
      <div>
        <div style={{color:"#dc2626",fontWeight:950}}>Production Memory</div>
        <h1 style={{fontSize:42,margin:"4px 0"}}>Prod Issues</h1>
        <p style={{color:"#64748b",lineHeight:1.6,maxWidth:900}}>Shared production issue log. Everyone can add an issue; only admin can delete.</p>
      </div>
      <a href="/" style={{background:"#0f172a",color:"#fff",borderRadius:12,padding:"12px 16px",textDecoration:"none",fontWeight:900,height:"fit-content"}}>Back to Hub</a>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1.2fr .8fr",gap:20,alignItems:"start"}}>
      <form onSubmit={submitIssue} style={cardStyle}>
        <h2 style={{marginTop:0}}>Add production issue</h2>
        <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:12}}>
          <div><label style={{fontWeight:900}}>Date</label><input type="date" value={form.issue_date} onChange={e=>setForm({...form,issue_date:e.target.value})} style={inputStyle}/></div>
          <div><label style={{fontWeight:900}}>Your name</label><input value={form.author} onChange={e=>setForm({...form,author:e.target.value})} placeholder="Example: Bruno" style={inputStyle}/></div>
        </div>
        <div style={{marginTop:14}}><label style={{fontWeight:900}}>Short title</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Example: wrong ETA on PDP" style={inputStyle}/></div>
        <div style={{marginTop:14}}><label style={{fontWeight:900}}>Issue details</label><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe what happened, impact, affected brand/site/orders, what was done, and what we should remember." style={{...inputStyle,minHeight:220,lineHeight:1.6}}/></div>
        <div style={{marginTop:14}}><label style={{fontWeight:900}}>Attachment</label><input type="file" onChange={e=>setAttachment(e.target.files?.[0] || null)} style={{...inputStyle,background:"#f8fafc"}}/></div>
        <button type="submit" style={{marginTop:16,background:"#dc2626",color:"#fff",border:"none",borderRadius:12,padding:"12px 16px",fontWeight:950,cursor:"pointer"}}>Submit issue</button>
      </form>

      <div style={cardStyle}>
        <h2 style={{marginTop:0}}>Search</h2>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by keyword, date, author..." style={inputStyle}/>
        <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid #e5e7eb"}}>
          <h3>Admin</h3>
          {isAdmin ? <div style={{color:"#15803d",fontWeight:900}}>Admin mode enabled. Delete buttons are visible.</div> :
          <div style={{display:"flex",gap:8}}><input type="password" value={adminInput} onChange={e=>setAdminInput(e.target.value)} placeholder="Admin password" style={inputStyle}/><button onClick={loginAdmin} style={{background:"#0f172a",color:"#fff",border:"none",borderRadius:10,padding:"10px 12px",fontWeight:900,cursor:"pointer"}}>Login</button></div>}
        </div>
        {status && <div style={{marginTop:16,color:status.includes("failed")||status.includes("Wrong")?"#b91c1c":"#15803d",fontWeight:800}}>{status}</div>}
      </div>
    </div>

    <section style={{...cardStyle,marginTop:20}}>
      <h2 style={{marginTop:0}}>Issue history</h2>
      <div style={{color:"#64748b",marginBottom:12}}>{filtered.length} issue(s)</div>
      {filtered.length ? filtered.map(issue => <article key={issue.id} style={{padding:"16px 0",borderTop:"1px solid #e5e7eb"}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div><div style={{color:"#64748b",fontWeight:800}}>{issue.issue_date} · {issue.author || "Unknown"}</div><h3 style={{margin:"6px 0",fontSize:22}}>{issue.title || "Untitled issue"}</h3></div>
          {isAdmin && <button onClick={()=>deleteIssue(issue.id)} style={{background:"#fee2e2",color:"#991b1b",border:"none",borderRadius:10,padding:"8px 12px",fontWeight:900,cursor:"pointer",height:"fit-content"}}>Delete</button>}
        </div>
        <p style={{whiteSpace:"pre-wrap",lineHeight:1.7}}>{issue.description}</p>
        {issue.attachment_path && <a href={attachmentUrl(issue.attachment_path)} target="_blank" rel="noreferrer" style={{color:"#2563eb",fontWeight:900}}>Open attachment: {issue.attachment_name || "file"}</a>}
      </article>) : <div style={{color:"#64748b"}}>No issue found.</div>}
    </section>
  </main>;
}

