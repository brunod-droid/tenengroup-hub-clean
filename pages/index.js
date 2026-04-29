import { useState } from "react";

/* ================= UI ================= */

function Box({ children }) {
  return <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:20, padding:20, marginBottom:20 }}>{children}</div>;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async ()=>{
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(()=>setCopied(false),1500);
    }}
    style={{ marginTop:10, padding:"8px 12px", background:"#2563eb", color:"#fff", border:"none", borderRadius:10 }}>
      {copied ? "Copied ✓" : "📋 Copy"}
    </button>
  );
}

/* ================= WISMO TOOL ================= */

function WismoTool() {
  const [late, setLate] = useState(null);
  const [type, setType] = useState(null);

  let result = null;

  if (late === false) {
    result = {
      title: "Not late",
      action: "Reassure + ETA",
      wording: "Your order is still within the expected delivery timeframe."
    };
  }

  if (late === true && type === "under3") {
    result = {
      title: "<3 days late",
      action: "Apology + monitor",
      wording: "I’m really sorry for the delay. We are monitoring your order closely."
    };
  }

  if (late === true && type === "over3") {
    result = {
      title: ">3 days late",
      action: "Review gesture",
      wording: "I’m very sorry for the delay. We can review a compensation."
    };
  }

  if (late === true && type === "noeta") {
    result = {
      title: "No ETA",
      action: "Escalate",
      wording: "We are escalating this case and will provide a solution quickly."
    };
  }

  return (
    <Box>
      <h2>⚡ WISMO Tool</h2>

      <button onClick={()=>setLate(true)}>Late</button>
      <button onClick={()=>setLate(false)}>Not late</button>

      {late === true && (
        <div>
          <button onClick={()=>setType("under3")}>{"<3 days"}</button>
          <button onClick={()=>setType("over3")}>{">3 days"}</button>
          <button onClick={()=>setType("noeta")}>No ETA</button>
        </div>
      )}

      {result && (
        <Box>
          <h3>{result.title}</h3>
          <p>{result.action}</p>
          <p>{result.wording}</p>
          <CopyButton text={result.wording} />
        </Box>
      )}
    </Box>
  );
}

/* ================= TRAINING ================= */

function Training() {
  const [reveal, setReveal] = useState(false);

  return (
    <div>

      {/* BRUNO */}
      <Box>
        <h1>Bruno DREYFUS</h1>
        <img src="/team/bruno.jpg" style={{ width:220 }} />

        <h3>Hobbies & Goal</h3>
        <ul>
          <li>Have fun</li>
          <li>Efficiency matters</li>
          <li>Innovate</li>
          <li>Do your best</li>
        </ul>
      </Box>

      {/* ORG */}
      <Box>
        <h2>Organization</h2>

        <pre>
Shani (VP)
   ↓
Bruno
   ↓
Customer Service
   - Adi
   - Neva
   - Thijs
   - Agents

Order Cycle (OCy)
   - Orly
   - OCy Agents

QA
   - Laurence
   - QA Agents
        </pre>

      </Box>

      {/* FLAGS */}
      <Box>
        <h2>Team Locations</h2>
        <p>🇮🇱 Israel | 🇮🇹 Italy | 🇭🇺 Hungary | 🇺🇦 Ukraine | 🇵🇭 Philippines | 🇲🇽 Mexico</p>
      </Box>

      {/* FINAL TEAM */}
      <Box>
        <h2>Team</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
          <img src="/team/team1.jpg" />
          <img src="/team/team2.jpg" />
          <img src="/team/team3.jpg" />
          <img src="/team/team4.jpg" />
          <img src="/team/team5.jpg" />
        </div>
      </Box>

      {/* QUIZ FINAL */}
      <Box>
        <h2>Final Case</h2>

        <p>
<b>Subject:</b> Extremely disappointed with my order<br/><br/>

Hi,<br/><br/>

My order was already late, and now I finally receive it… and the item is completely damaged.<br/><br/>

This was supposed to be a gift.<br/>
This is not acceptable.<br/><br/>

If I don’t get a proper solution quickly, I will leave reviews everywhere.<br/><br/>

I expect a serious answer.
        </p>

        <button onClick={()=>setReveal(true)}>👉 Show answer</button>

        {reveal && (
          <ul>
            <li>Empathy</li>
            <li>Acknowledge late + damaged</li>
            <li>Escalate</li>
            <li>Offer replacement or refund</li>
            <li>Move to DM</li>
          </ul>
        )}
      </Box>

    </div>
  );
}

/* ================= MAIN ================= */

export default function Home() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ padding:20 }}>

      <button onClick={()=>setPage("home")}>Home</button>
      <button onClick={()=>setPage("wismo")}>WISMO</button>
      <button onClick={()=>setPage("training")}>Training</button>

      {page === "home" && <h1>Tenengroup Hub</h1>}
      {page === "wismo" && <WismoTool />}
      {page === "training" && <Training />}

    </div>
  );
}
