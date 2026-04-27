import qaTeam from "../data/qaTeam";
import ocyTeam from "../data/ocyTeam";
import shineonProducts from "../data/shineonProducts";
import { useMemo, useState } from 'react';

const MENU = ['Home', 'QA Team', 'OCy'];

function assistantAnswer(input) {
  const q = input.toLowerCase().trim();

  if (q.includes("shineon") || q.includes("product"))
    return { title: "ShineOn guidance", body: "Check product-specific rules in OCy.", tags: ["OCy"] };

  if (q.includes("qa") || q.includes("escalate"))
    return { title: "QA guidance", body: "Escalate complex cases to QA.", tags: ["QA"] };

  return { title: "General", body: "Use the correct process.", tags: [] };
}

function Box({ children }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16
    }}>
      {children}
    </div>
  );
}

function ExpandableCard({ title, text }) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 6 }}>{text}</div>
      <button onClick={() => setOpen(!open)} style={{ marginTop: 10 }}>
        {open ? "Hide" : "Details"}
      </button>
      {open && <div style={{ marginTop: 10 }}>{text}</div>}
    </Box>
  );
}

export default function Home() {
  const [page, setPage] = useState('Home');
  const [question, setQuestion] = useState('');

  const answer = useMemo(() => assistantAnswer(question), [question]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fb' }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: 220,
        background: '#0f172a',
        color: '#fff',
        padding: 20
      }}>
        <div style={{ fontWeight: 800, marginBottom: 20 }}>Tenengroup Hub</div>

        {MENU.map(m => (
          <div
            key={m}
            onClick={() => setPage(m)}
            style={{
              padding: 10,
              cursor: 'pointer',
              background: page === m ? '#1d4ed8' : 'transparent',
              borderRadius: 8,
              marginBottom: 6
            }}
          >
            {m}
          </div>
        ))}
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: 20 }}>

        {/* HOME */}
        {page === 'Home' && (
          <>
            <h1>Customer Care Hub</h1>

            <Box>
              <input
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Ask a question..."
                style={{ width: '100%', padding: 10 }}
              />

              <div style={{ marginTop: 10, fontWeight: 700 }}>
                {answer.title}
              </div>

              <div>{answer.body}</div>
            </Box>
          </>
        )}

        {/* QA */}
        {page === 'QA Team' && (
          <>
            <h1>QA Team</h1>

            {qaTeam.map(q => (
              <ExpandableCard
                key={q.id}
                title={q.name}
                text={q.short}
              />
            ))}
          </>
        )}

        {/* OCY */}
        {page === 'OCy' && (
          <>
            <h1>OCy / ShineOn</h1>

            {ocyTeam.map(o => (
              <ExpandableCard
                key={o.id}
                title={o.name}
                text={o.short}
              />
            ))}

            <h2>Products</h2>

            {shineonProducts.map((p, i) => (
              <ExpandableCard
                key={i}
                title={p.productName}
                text={p.notes}
              />
            ))}
          </>
        )}

      </main>
    </div>
  );
}
