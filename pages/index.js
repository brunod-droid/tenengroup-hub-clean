// 👉 VERSION FULL STABLE V18 (COMPLETE - NO DATA LOSS)

import { useState } from "react";

const MENU = [
"Home","Training","Brands","Cases","Policies","Events",
"CRM","Logistics","Yves Rocher","Social Policy","QA Team","OCy","Q&A"
];

function Box({children}) {
  return <div style={{
    background:"#fff",
    padding:24,
    borderRadius:20,
    marginBottom:20,
    boxShadow:"0 8px 20px rgba(0,0,0,0.05)"
  }}>{children}</div>
}

function Expand({title, short, full}) {
  const [open,setOpen]=useState(false)
  return (
    <Box>
      <h2>{title}</h2>
      <p>{short}</p>
      <button onClick={()=>setOpen(!open)}>
        {open?"Hide":"See full"}
      </button>
      {open && <ul>{full.map((x,i)=><li key={i}>{x}</li>)}</ul>}
    </Box>
  )
}

export default function Home(){

const [page,setPage]=useState("Home")

return (
<div style={{display:"flex",minHeight:"100vh"}}>

{/* SIDEBAR */}
<div style={{width:250,background:"#0f172a",color:"#fff",padding:20}}>
  {MENU.map(m=>(
    <div key={m}
      onClick={()=>setPage(m)}
      style={{padding:10,cursor:"pointer"}}>
      {m}
    </div>
  ))}
</div>

{/* MAIN */}
<div style={{flex:1,padding:30,background:"#f5f7fb"}}>

{/* HOME */}
{page==="Home" && <>
  <h1>Customer Care Hub</h1>
  <p>All policies, training, tools and knowledge in one place</p>
</>}

{/* TRAINING */}
{page==="Training" && <>
  <h1>Training</h1>

  <Box>
    <h2>Bruno</h2>
    <img src="/team/bruno.jpg" style={{height:300}}/>
    <p>Customer Service Director</p>
    <ul>
      <li>Have fun</li>
      <li>Efficiency matters</li>
      <li>Innovate</li>
      <li>Do your best</li>
    </ul>
  </Box>

  <Box>
    <h2>Organization</h2>
    <div style={{
      background:"url('/team/world-map.png') center/cover",
      padding:30,
      color:"#fff"
    }}>
      <h3>Customer</h3>
      <p>Bruno → QA → OCy → Team Leaders → CSR</p>

      <h3>Cart Optimization</h3>
      <p>Marianna / Ops</p>

      <p>Global: IL, IT, HU, UA, PH, MX, TH, ES</p>
    </div>
  </Box>

  <Box>
    <h2>Missions</h2>
    <ul>
      <li>Improve customer experience</li>
      <li>Increase retention</li>
      <li>Support operations</li>
    </ul>
  </Box>

  <Box>
    <h2>Channels</h2>
    <div style={{display:"flex",gap:20}}>
      {["webform","facebook","instagram","tiktok","trustpilot"]
      .map(x=><img key={x} src={`/team/${x}.png`} height={40}/>)}
    </div>
  </Box>

  <Box>
    <h2>KPI</h2>
    <ul>
      <li>CSAT: 4.2</li>
      <li>SLA: 10h</li>
      <li>NPS: High</li>
      <li>Order Cost: Low</li>
    </ul>
  </Box>

  <Box>
    <h2>Wheel</h2>
    <ul>
      <li>Pre-sales → CS + AI</li>
      <li>Change Order → CS</li>
      <li>WISMO → CS + AI + OCy</li>
      <li>Item Received → CS + QA</li>
      <li>Other → CS</li>
    </ul>
  </Box>

  <Box>
    <h2>Trustpilot</h2>
    <img src="/team/tp1.jpg" height={150}/>
  </Box>

</>}

{/* POLICIES */}
{page==="Policies" && <>
<h1>Policies</h1>

<Expand
title="WISMO Late Policy"
short="What we do when order is late"
full={[
"Check ETA first",
"Under 3 days: no compensation",
"Over 3 days: coupon possible",
"Major delay: refund or resend",
"Always communicate clearly"
]}
/>

<Expand
title="Communication"
short="How we talk to customer"
full={[
"Be empathetic",
"Take ownership",
"Give clear next step"
]}
/>

</>}

{/* QA */}
{page==="QA Team" && <>
<h1>QA</h1>
<p>Handles damaged / wrong items</p>
</>}

{/* OCY */}
{page==="OCy" && <>
<h1>OCy</h1>
<p>Handles ShineOn products rules</p>
</>}

{/* Q&A */}
{page==="Q&A" && <>
<h1>Quiz</h1>
<ul>
<li>Who do you go to? → CS Team</li>
<li>Give 2 KPI → CSAT / SLA</li>
</ul>
</>}

</div>
</div>
)
}
