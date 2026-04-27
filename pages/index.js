import qaTeam from "../data/qaTeam";
import ocyTeam from "../data/ocyTeam";
import shineonProducts from "../data/shineonProducts";
import { useMemo, useState } from 'react';
import { BRANDS } from '../data/brands';
import { CASES } from '../data/cases';
import { POLICIES } from '../data/policies';
import { EVENTS } from '../data/events';
import { CRM } from '../data/crm';
import { LOGISTICS } from '../data/logistics';
import { AI_AGENTS } from '../data/aiAgents';
import { YVES_ROCHER } from '../data/yvesRocher';
import { SOCIAL_POLICY } from '../data/socialPolicy';

const MENU = ['Home', 'Brands', 'Cases', 'Policies', 'Events', 'CRM', 'Logistics', 'Yves Rocher', 'Social Policy', 'AI Agents', 'QA Team', 'OCy', 'Q&A'];

function assistantAnswer(input) {
const q = input.toLowerCase().trim();

if (q.includes("shineon") || q.includes("product"))
return { title: "ShineOn guidance", body: "Always check product-specific rules in OCy before confirming personalization.", tags: ["OCy"] };

if (q.includes("qa") || q.includes("escalate"))
return { title: "QA guidance", body: "Escalate unclear, repeated or complex product issues to QA.", tags: ["QA"] };

if (q.includes("late"))
return { title: "Late order", body: "Check ETA → under 3 days: apologize + ETA, over 3 days: compensation possible.", tags: ["WISMO"] };

return { title: "General guidance", body: "Identify case type first, then apply policy.", tags: [] };
}

function Box({ children }) {
return <div style={{ background: '#fff', padding: 20, marginBottom: 16 }}>{children}</div>;
}

function ExpandableCard({ title, text }) {
const [open, setOpen] = useState(false);
return ( <Box> <b>{title}</b> <div>{text}</div>
<button onClick={() => setOpen(!open)}>Details</button>
{open && <div>{text}</div>} </Box>
);
}

export default function Home() {
const [page, setPage] = useState('Home');
const [question, setQuestion] = useState('');

const answer = useMemo(() => assistantAnswer(question), [question]);

return (
<div style={{ display: 'flex' }}>
<aside style={{ width: 200 }}>
{MENU.map(m => (
<div key={m} onClick={() => setPage(m)}>{m}</div>
))} </aside>

```
  <main style={{ padding: 20 }}>

    {page === 'Home' && (
      <>
        <h1>Customer Care Hub</h1>
        <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask..." />
        <div>{answer.title}</div>
        <div>{answer.body}</div>
      </>
    )}

    {page === 'QA Team' && (
      <>
        <h1>QA Team</h1>
        {qaTeam.map(q => (
          <ExpandableCard key={q.id} title={q.name} text={q.short} />
        ))}
      </>
    )}

    {page === 'OCy' && (
      <>
        <h1>OCy / ShineOn</h1>

        {ocyTeam.map(o => (
          <ExpandableCard key={o.id} title={o.name} text={o.short} />
        ))}

        <h2>Products</h2>
        {shineonProducts.map((p, i) => (
          <ExpandableCard key={i} title={p.productName} text={p.notes} />
        ))}
      </>
    )}

  </main>
</div>
```

);
}
