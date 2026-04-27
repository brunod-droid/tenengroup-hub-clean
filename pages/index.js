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

const MENU = ['Dashboard', 'Brands', 'Cases', 'Policies', 'Events', 'CRM', 'Logistics', 'Yves Rocher', 'Social Policy', 'AI Agents', 'Q&A'];

const QUICK_TOOLS = [
  { name: 'Kustomer', url: 'https://tenengroup.kustomerapp.com/' },
  { name: 'OM / OCS', url: 'https://bo.tenengroup.com/' },
  { name: 'Notch', url: 'https://tenengroup.app.getnotch.com/' },
  { name: 'AfterShip', url: 'https://www.aftership.com/' },
  { name: 'Matrix', url: 'http://matrix.tenengroup.com:100/Login.aspx' },
  { name: '17Track', url: 'https://www.17track.net/en' }
];

const SUGGESTED_QUESTIONS = [
  'My order is late by 2 days. What should I do?',
  'The item is damaged. What is the process?',
  'Customer is not satisfied with the item.',
  'How does DNR policy work?',
  "What is a Red Event during Mother's Day?",
  'Difference between category and disposition?',
  'How should I use tags?',
  'What does Notch do?',
  'Yves Rocher wrong address reship?',
  'Oak & Luna negative public comment?'
];

function assistantAnswer(input) {
  const q = input.toLowerCase().trim();
  if (!q) return { title: 'Ask the assistant', body: 'Type a customer care question such as: late order, damaged item, DNR, Red Event, social criticism, Yves Rocher, tags, dispositions or Notch.', tags: [] };
  if (q.includes('oak') && (q.includes('negative') || q.includes('criticism') || q.includes('comment'))) return { title: 'Oak & Luna social criticism', body: 'Use only approved neutral public wording, move immediately to DM, do not explain publicly, and hide the negative comment after the approved public response.', tags: ['Social', 'Oak & Luna'] };
  if (q.includes('social') || q.includes('facebook') || q.includes('instagram')) return { title: 'Social guidance', body: 'Sort by newest, reply directly under the comment, keep public comments short and professional, move concerns to DM, then document context in Kustomer/OM where needed.', tags: ['Social', 'Meta'] };
  if (q.includes('yves') || q.includes('shopify') || q.includes('gorgias')) return { title: 'Yves Rocher guidance', body: 'Yves Rocher uses Shopify for orders, Gorgias for tickets and Notch/Taylor for AI. Check Shopify tags, order status, BC number and Gorgias timeline before deciding.', tags: ['Yves Rocher', 'Shopify', 'Gorgias'] };
  if (q.includes('wrong address')) return { title: 'Wrong address guidance', body: 'For Tenengroup, check whether the order can still be changed. For Yves Rocher, wrong-address reship costs $19 and should be tagged Reship + Reship - Wrong address.', tags: ['WISMO', 'Wrong address'] };
  if (q.includes('late supplier')) return { title: 'Late Supplier guidance', body: 'Confirm whether the case is truly Late Supplier internally. If not, treat it as regular late. Check whether proactive communication was already sent.', tags: ['WISMO', 'Late Supplier'] };
  if (q.includes('late') || q.includes('delay')) return { title: 'Late order guidance', body: 'Check ETA first. Under 3 business days late: apologize and give ETA. Over 3 business days late: compensation may apply. Also verify Late Supplier.', tags: ['WISMO', 'Late'] };
  if (q.includes('damaged') || q.includes('broken') || q.includes('defect')) return { title: 'Damaged item guidance', body: 'Ask for picture, confirm issue, apply warranty logic, reorder first. Refund is not the first option. For Yves Rocher, damaged items do not need return and are reshipped free except marketing orders.', tags: ['Damaged', 'Warranty'] };
  if (q.includes('not satisfied') || q.includes('dont like') || q.includes("don't like")) return { title: 'Not Satisfied guidance', body: 'Confirm it is not damaged. Offer exchange first, then store credit. For Yves Rocher, first offer 100% coupon, then return/refund if refused.', tags: ['Not Satisfied'] };
  if (q.includes('dnr') || q.includes('delivered not received')) return { title: 'DNR guidance', body: 'Tenengroup: wait 3 business days after delivery scan. Yves Rocher: allow 7 business days and ask for Non-Receipt form before action.', tags: ['DNR', 'WISMO'] };
  if (q.includes('red event') || q.includes('mother') || q.includes('mbl') || q.includes('last chance')) return { title: 'Event guidance', body: 'Use Green Event, Red Event, On Hold, proactive communication, MBL and Last Chance logic. Check if proactive message was already sent before replying.', tags: ['Event', "Mother's Day"] };
  if (q.includes('tag')) return { title: 'Tags guidance', body: 'Z tags are archived. Tags may be manual, automatic, event-driven or AI-driven. They should map to actions, owners and Notch behavior.', tags: ['Tags', 'CRM'] };
  if (q.includes('disposition')) return { title: 'Dispositions guidance', body: 'Dispositions are selected manually by agents and define the real business case more precisely than categories.', tags: ['Dispositions', 'CRM'] };
  if (q.includes('category')) return { title: 'Categories guidance', body: 'Categories are auto-filled by the system from source or webform. They are not the same as dispositions.', tags: ['Categories', 'CRM'] };
  if (q.includes('notch')) return { title: 'Notch guidance', body: 'Notch is the AI automation layer. It handles standard flows but can be paused or redirected during Red Event, MBL or complex handling. For Yves Rocher, Notch appears as Taylor.', tags: ['Notch', 'AI'] };
  return { title: 'General guidance', body: 'Identify the case family first: Pre-sales, Change Order, WISMO, Item Received, Account Issues, Social or Other. Then apply the matching policy.', tags: ['General'] };
}

function Box({ children }) {
  return <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', marginBottom: 18 }}>{children}</div>;
}
function Bullets({ items }) {
  return <ul style={{ lineHeight: 1.8, color: '#4b5563', paddingLeft: 18 }}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
function TagChip({ text }) {
  return <span style={{ display: 'inline-block', marginRight: 8, marginBottom: 8, padding: '6px 10px', background: '#eef2ff', borderRadius: 999, fontSize: 12, color: '#3730a3' }}>{text}</span>;
}
function SmallCard({ title, text, onClick }) {
  return <div onClick={onClick} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 18, cursor: 'pointer' }}><div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div><div style={{ marginTop: 10, color: '#4b5563', lineHeight: 1.7 }}>{text}</div></div>;
}
function ExpandableCard({ title, shortText, bullets, extraTitle, extraItems, wording }) {
  const [open, setOpen] = useState(false);
  return <Box><div style={{ fontSize: 28, fontWeight: 800 }}>{title}</div><div style={{ marginTop: 10, color: '#4b5563', lineHeight: 1.7 }}>{shortText}</div><button onClick={() => setOpen(!open)} style={{ marginTop: 14, background: '#eef2ff', color: '#3730a3', border: 'none', borderRadius: 10, padding: '10px 14px', cursor: 'pointer', fontWeight: 700 }}>{open ? 'Hide details' : 'Show details'}</button>{open && <div style={{ marginTop: 18 }}>{bullets && <Bullets items={bullets} />}{extraItems && <><div style={{ fontWeight: 800, marginTop: 14 }}>{extraTitle}</div><Bullets items={extraItems} /></>}{wording && <><div style={{ fontWeight: 800, marginTop: 14 }}>Suggested wording</div><div style={{ marginTop: 8, fontStyle: 'italic', color: '#374151', lineHeight: 1.7 }}>{wording}</div></>}</div>}</Box>;
}

export default function Home() {
  const [page, setPage] = useState('Dashboard');
  const [question, setQuestion] = useState('');
  const [search, setSearch] = useState('');
  const [logoOk, setLogoOk] = useState(true);
  const answer = useMemo(() => assistantAnswer(question), [question]);

  const pageData = { Brands: BRANDS, Cases: CASES, Policies: POLICIES, CRM, Logistics: LOGISTICS, 'Yves Rocher': YVES_ROCHER, 'Social Policy': SOCIAL_POLICY, 'AI Agents': AI_AGENTS };

  const searchableItems = useMemo(() => {
    const eventItems = EVENTS.map((e) => ({ type: 'Event', title: e.name, text: [e.short, e.intro, e.wording].concat(e.sections.flatMap((s) => s.items)).join(' '), openPage: 'Events' }));
    const generic = Object.keys(pageData).flatMap((key) => pageData[key].map((x) => ({ type: key, title: x.name || x.title, text: [x.short || '', x.wording || ''].concat(x.full || []).concat(x.tone || []).join(' '), openPage: key })));
    return generic.concat(eventItems);
  }, []);

  const filteredResults = useMemo(() => {
    if (!search.trim()) return searchableItems.slice(0, 10);
    const q = search.toLowerCase();
    return searchableItems.filter((item) => item.title.toLowerCase().includes(q) || item.text.toLowerCase().includes(q) || item.type.toLowerCase().includes(q));
  }, [search, searchableItems]);

  return <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fb', fontFamily: 'Arial, sans-serif' }}>
    <aside style={{ width: 250, background: '#0f172a', color: '#fff', padding: 20, overflowY: 'auto' }}>
      <div style={{ width: 64, height: 64, borderRadius: 14, background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, marginBottom: 12 }}>TG</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>Tenengroup</div><div style={{ marginTop: 6, opacity: 0.75 }}>Customer Care Hub</div>
      <div style={{ marginTop: 28 }}>{MENU.map((m) => <div key={m} onClick={() => setPage(m)} style={{ padding: '12px 14px', borderRadius: 10, cursor: 'pointer', background: page === m ? '#1d4ed8' : 'transparent', marginBottom: 8, fontWeight: 600 }}>{m}</div>)}</div>
      <div style={{ marginTop: 26, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}><div style={{ fontSize: 12, opacity: 0.7, marginBottom: 10 }}>QUICK TOOLS</div>{QUICK_TOOLS.map((tool) => <div key={tool.name} style={{ marginBottom: 10 }}><a href={tool.url} target="_blank" rel="noreferrer" style={{ color: '#dbeafe', textDecoration: 'none' }}>{tool.name}</a></div>)}</div>
    </aside>
    <main style={{ flex: 1, padding: 24 }}>
      {page === 'Dashboard' && <>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 26, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.15fr 1fr', marginBottom: 22 }}><div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #111827 100%)', minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>{logoOk ? <img src="/logo-hub.png" alt="Tenengroup hub logo" onError={() => setLogoOk(false)} style={{ maxWidth: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 18 }} /> : <div style={{ color: '#fff', fontSize: 26, fontWeight: 800 }}>Tenengroup Customer Care Hub</div>}</div><div style={{ padding: 34, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18 }}>Welcome to</div><div style={{ fontSize: 54, fontWeight: 900, marginTop: 6 }}>TENENGROUP</div><div style={{ fontSize: 32, color: '#2563eb', marginTop: 6 }}>Customer Care Hub</div><div style={{ marginTop: 18, lineHeight: 1.7, fontSize: 18, color: '#374151' }}>Policies, event playbooks, CRM definitions, brand tone of voice, logistics, social handling, Yves Rocher training and AI agent structure.</div></div></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 22 }}><SmallCard title="Brands" text="Tone of voice" onClick={() => setPage('Brands')} /><SmallCard title="Policies" text="Rules and wording" onClick={() => setPage('Policies')} /><SmallCard title="Yves Rocher" text="Shopify and Gorgias" onClick={() => setPage('Yves Rocher')} /><SmallCard title="Social Policy" text="Facebook / Instagram" onClick={() => setPage('Social Policy')} /><SmallCard title="AI Agents" text="Future roles" onClick={() => setPage('AI Agents')} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18 }}><Box><div style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>Global search</div><input placeholder="Search everything..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #d1d5db', boxSizing: 'border-box' }} /><div style={{ marginTop: 18, display: 'grid', gap: 12 }}>{filteredResults.map((item) => <div key={item.type + item.title} onClick={() => setPage(item.openPage)} style={{ padding: 14, border: '1px solid #e5e7eb', borderRadius: 12, cursor: 'pointer', background: '#fafafa' }}><div style={{ fontSize: 12, color: '#4f46e5', fontWeight: 700 }}>{item.type}</div><div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{item.title}</div><div style={{ color: '#4b5563', lineHeight: 1.6, marginTop: 6 }}>{item.text.slice(0, 190)}...</div></div>)}</div></Box><Box><div style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>Assistant</div><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question..." style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #d1d5db', boxSizing: 'border-box' }} /><div style={{ marginTop: 16, fontSize: 22, fontWeight: 800 }}>{answer.title}</div><div style={{ marginTop: 10, lineHeight: 1.7, color: '#374151' }}>{answer.body}</div><div style={{ marginTop: 14 }}>{answer.tags.map((tag) => <TagChip key={tag} text={tag} />)}</div><div style={{ marginTop: 24, fontWeight: 800 }}>Suggested questions</div><div style={{ marginTop: 12 }}>{SUGGESTED_QUESTIONS.map((q) => <div key={q} onClick={() => setQuestion(q)} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 12, marginBottom: 10, cursor: 'pointer', background: '#fff' }}>{q}</div>)}</div></Box></div>
      </>}
      {Object.keys(pageData).includes(page) && <><h1 style={{ fontSize: 40 }}>{page}</h1>{pageData[page].map((x) => <ExpandableCard key={x.id} title={x.name || x.title} shortText={x.short} bullets={x.full} extraTitle={x.tone ? 'Tone of voice' : null} extraItems={x.tone || null} wording={x.wording || null} />)}</>}
      {page === 'Events' && <><h1 style={{ fontSize: 40 }}>Event prompts</h1>{EVENTS.map((e) => <Box key={e.id}><div style={{ fontSize: 28, fontWeight: 800 }}>{e.name}</div><div style={{ marginTop: 10, color: '#4b5563', lineHeight: 1.7 }}>{e.short}</div><div style={{ marginTop: 12, color: '#374151', lineHeight: 1.7 }}>{e.intro}</div>{e.sections.map((section) => <div key={section.title} style={{ marginTop: 20 }}><div style={{ fontWeight: 800, marginBottom: 8 }}>{section.title}</div><Bullets items={section.items} /></div>)}<div style={{ marginTop: 18, fontWeight: 800 }}>Suggested wording</div><div style={{ marginTop: 8, fontStyle: 'italic', color: '#374151', lineHeight: 1.7 }}>{e.wording}</div></Box>)}</>}
      {page === 'Q&A' && <><h1 style={{ fontSize: 40 }}>Q&A</h1><Box><div style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Ask the assistant</div><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Example: my order is late by 2 days" style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #ccc', boxSizing: 'border-box' }} /><div style={{ marginTop: 18 }}><div style={{ fontWeight: 800, fontSize: 24 }}>{answer.title}</div><div style={{ marginTop: 12, lineHeight: 1.7 }}>{answer.body}</div><div style={{ marginTop: 12 }}>{answer.tags.map((tag) => <TagChip key={tag} text={tag} />)}</div></div></Box></>}
    </main>
  </div>;
}
