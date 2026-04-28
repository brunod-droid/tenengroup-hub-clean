// V19 — REAL INTERNAL TOOL + PREMIUM DESIGN

import { useState, useMemo } from "react";

const MENU = [
"Home","Training","Policies","WISMO Deep Dive","QA","OCy","Search","Assistant"
];

function Section({title, children}) {
  return (
    <div style={{
      marginBottom:40,
      padding:40,
      background:"#ffffff",
      borderRadius:24,
      boxShadow:"0 20px 40px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{fontSize:36, marginBottom:20}}>{title}</h2>
      {children}
    </div>
  )
}

function Card({title, text}) {
  return (
    <div style={{
      background:"#f9fafb",
      padding:20,
      borderRadius:20,
      flex:1
    }}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

export default function Home(){

const [page,setPage]=useState("Home")
const [query,setQuery]=useState("")

// 🔎 SEARCH DATA
const DATA = [
"Late policy","WISMO","Refund","Coupon","QA","Damaged","DNR",
"ShineOn","OCy","Trustpilot","Social","Yves Rocher"
]

const results = useMemo(()=>{
  if(!query) return []
  return DATA.filter(x=>x.toLowerCase().includes(query.toLowerCase()))
},[query])

// 🤖 SIMPLE ASSISTANT
function answer(q){
  q=q.toLowerCase()

  if(q.includes("late"))
    return "Check ETA. <3 days: no compensation. >3 days: coupon. Major delay: refund or resend."

  if(q.includes("damaged"))
    return "Ask picture → validate → reorder first."

  if(q.includes("dnr"))
    return "Wait 3 days after delivery scan before action."

  return "Search in Policies or ask QA/OCy."
}

return (
<div style={{display:"flex",minHeight:"100vh",fontFamily:"Inter, sans-serif"}}>

{/* SIDEBAR */}
<div style={{
  width:260,
  background:"#020617",
  color:"#fff",
  padding:30
}}>
  <h2 style={{marginBottom:30}}>Tenengroup</h2>

  {MENU.map(m=>(
    <div key={m}
      onClick={()=>setPage(m)}
      style={{
        padding:12,
        cursor:"pointer",
        borderRadius:10,
        background:page===m?"#2563eb":"transparent",
        marginBottom:8
      }}>
      {m}
    </div>
  ))}
</div>

{/* MAIN */}
<div style={{flex:1, padding:40, background:"#f1f5f9"}}>

{/* HOME */}
{page==="Home" && <>
  <h1 style={{fontSize:48}}>Customer Care Hub</h1>
  <p style={{fontSize:20}}>Internal knowledge tool</p>

  <div style={{display:"flex", gap:20, marginTop:30}}>
    <Card title="Policies" text="All operational rules"/>
    <Card title="Training" text="20 min onboarding"/>
    <Card title="Assistant" text="Ask anything"/>
  </div>
</>}

{/* TRAINING */}
{page==="Training" && <>
  <Section title="Bruno">
    <img src="/team/bruno.jpg" style={{height:300}}/>
    <ul>
      <li>Have fun</li>
      <li>Efficiency matters</li>
      <li>Innovate</li>
      <li>Do your best</li>
    </ul>
  </Section>

  <Section title="Organization">
    <div style={{
      background:"url('/team/world-map.png') center/cover",
      padding:40,
      color:"#fff"
    }}>
      Customer + Cart Optimization
    </div>
  </Section>

  <Section title="KPIs">
    <div style={{display:"flex",gap:20}}>
      <Card title="CSAT" text="4.2"/>
      <Card title="SLA" text="10h"/>
      <Card title="NPS" text="High"/>
      <Card title="Cost" text="Low"/>
    </div>
  </Section>
</>}

{/* POLICIES */}
{page==="Policies" && <>
  <Section title="Core Rules">
    <ul>
      <li>Check ETA before answering</li>
      <li>Never promise blindly</li>
      <li>Always give next step</li>
    </ul>
  </Section>
</>}

{/* WISMO */}
{page==="WISMO Deep Dive" && <>
  <Section title="Late Policy (TheoGrace)">
    <h3>Under 3 days</h3>
    <ul>
      <li>Apology</li>
      <li>Give ETA</li>
      <li>No compensation</li>
    </ul>

    <h3>Over 3 days</h3>
    <ul>
      <li>Apology + ownership</li>
      <li>Coupon possible</li>
      <li>Monitor order</li>
    </ul>

    <h3>Major delay</h3>
    <ul>
      <li>Refund or resend</li>
      <li>Escalate</li>
    </ul>

    <h3>Communication</h3>
    <ul>
      <li>Empathy</li>
      <li>Ownership</li>
      <li>Clarity</li>
    </ul>
  </Section>
</>}

{/* QA */}
{page==="QA" && <>
  <Section title="QA Role">
    Handles damaged / wrong item / escalation
  </Section>
</>}

{/* OCY */}
{page==="OCy" && <>
  <Section title="OCy">
    ShineOn product rules
  </Section>
</>}

{/* SEARCH */}
{page==="Search" && <>
  <Section title="Search">
    <input
      value={query}
      onChange={e=>setQuery(e.target.value)}
      placeholder="Search..."
      style={{padding:10,width:"100%"}}
    />

    {results.map(r=>(
      <div key={r}>{r}</div>
    ))}
  </Section>
</>}

{/* ASSISTANT */}
{page==="Assistant" && <>
  <Section title="Assistant">
    <input
      value={query}
      onChange={e=>setQuery(e.target.value)}
      placeholder="Ask a question..."
      style={{padding:10,width:"100%"}}
    />

    <div style={{marginTop:20}}>
      {answer(query)}
    </div>
  </Section>
</>}

</div>
</div>
)
}
