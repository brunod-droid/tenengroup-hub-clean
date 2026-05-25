import { useEffect, useState } from "react";

const slides = [
  ["00-MENU", "Mission Menu"],
  ["01-KPI", "Mission Performance"],
  ["02-LEAK", "Dropshipping Exposure"],
  ["03-SYSTEM", "System Complexity"],
  ["04-RECOVERY", "Compensation Strategy"],
  ["05-C-TEAM", "The C-Team Effect"]
];

const trustpilot = [
  ["Lime & Lou", "limeandlou.com", "4.4", "3040", "/brand/lime-lou.jpg"],
  ["Theo Grace", "theograce.com", "4.6", "358", "/brand/theograce.jpg"],
  ["Oak & Luna", "oakandluna.com", "4.4", "10681", "/brand/oak-luna.jpg"],
  ["MYKA", "myka.com", "4.3", "73202", "/brand/myka.jpg"],
  ["Israel Blessing", "israelblessing.com", "4.7", "919", "/brand/israel-blessing.jpg"]
];

const brandKpis = [
  ["THEOGRACE", "28.5h", "3.8", "risk"],
  ["OAK & LUNA", "22h", "3.9", "warn"],
  ["MYKA DE", "17.5h", "3.9", "ok"],
  ["L&L", "10.5h", "4.2", "good"],
  ["IB", "24h", "4.3", "mixed"]
];

const costRows = [
  ["More than $800", 3, 4, 7, "r"],
  ["More than $600", 4, 2, 6, "r"],
  ["More than $500", 7, 1, 8, "r"],
  ["More than $243", 88, 30, 118, "g"],
  ["Less than $243", 144, 61, 205, "y"],
  ["Less than $150", 44, 136, 180, "p"],
  ["Grand Total", 290, 234, 524, "b"]
];

function useCountdown() {
  const [active, setActive] = useState(false);
  const [seconds, setSeconds] = useState(15 * 60);
  useEffect(() => {
    if (!active || seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [active, seconds]);
  const label = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const toggle = () => {
    if (seconds === 0) { setSeconds(15 * 60); setActive(true); return; }
    setActive((v) => !v);
  };
  const reset = () => { setActive(false); setSeconds(15 * 60); };
  return { active, seconds, label, toggle, reset };
}

function Header({ timer }) {
  return <header className="topbar">
    <div><div className="classified">CLASSIFIED // TENENGROUP DEBRIEF</div><div className="micro">COORD: 40.71°N / 74.01°W · SECURE LINK</div></div>
    <div className="statusCluster">
      <div className={timer.active ? "timer onlineTimer" : "timer"}>{timer.seconds === 0 ? "MISSION COMPLETE" : timer.label}</div>
      <button className={timer.active ? "status active" : "status"} onClick={timer.toggle}>STATUS: {timer.active ? "ACTIVE" : "INACTIVE"}</button>
      <button className="reset" onClick={timer.reset}>RESET</button>
    </div>
  </header>;
}

function SideNav({ current, setCurrent }) {
  return <aside className="side"><div className="sideTitle">MOTHER DAY<br/>DEBRIEF 2026</div>{slides.map((s, i) => <button key={s[0]} onClick={() => setCurrent(i)} className={current === i ? "nav navOn" : "nav"}><span>{s[0]}</span><b>{s[1]}</b></button>)}</aside>;
}

function TrustCard({ b }) {
  return <div className="tp"><img src={b[4]} alt={b[0]} /><div><b>{b[0]}</b><span>{b[1]}</span><em>★★★★★ {b[2]} ({b[3]})</em></div></div>;
}

function Slide0({ setCurrent }) {
  return <section className="slide menuSlide">
    <div className="hero"><div className="eyebrow">FOR EYES ONLY // MISSION MENU</div><h1>MOTHER DAY<br/><span>DEBRIEF 2026</span></h1><p>Operational post-mortem for peak event execution, partner leakage, compensation recovery and C-Team multiplier effect.</p><button className="primary" onClick={() => setCurrent(1)}>ENTER DEBRIEF</button></div>
    <div className="panel"><div className="panelHead">TRUSTPILOT SIGNALS // BRAND HEALTH</div>{trustpilot.map((b) => <TrustCard key={b[0]} b={b} />)}</div>
    <div className="quick">{slides.slice(1).map((s, i) => <button key={s[0]} onClick={() => setCurrent(i + 1)}><span>{s[0]}</span><b>{s[1]}</b></button>)}</div>
  </section>;
}

function Slide1() {
  return <section className="slide"><Title label="TARGETING CRITICAL DELIVERY METRICS" title="[MISSION PERFORMANCE]" />
    <div className="kpiGrid">
      <Metric tone="bad" label="SLA 2025" value="17.12h" note="baseline" />
      <Metric tone="bad pulse" label="SLA 2026" value="19.54h" note="YOY +14% · more short AI SLA" />
      <Metric tone="good" label="CSAT 2025" value="3.99" note="high satisfaction" />
      <Metric tone="bad" label="CSAT 2026" value="3.88" note="YOY -3%" />
      <Metric tone="good" label="NOTCH SHARE" value="18%" note="15,018 messages vs 6,003 in 2025" />
      <Metric tone="good" label="ORDER COST" value="$0.37" note="-10% vs $0.41" />
    </div>
    <div className="brandKpi"><div className="panelHead">KPI BY BRAND // CSAT + SLA 2026</div><div className="brandRows">{brandKpis.map((b) => <div key={b[0]} className={`brand ${b[3]}`}><b>{b[0]}</b><span>SLA <strong>{b[1]}</strong></span><span>CSAT <strong>{b[2]}</strong></span></div>)}</div></div>
    <div className="two"><div><b className="green">VERY GOOD</b><p>Notch increased message share significantly. Big decrease of order cost.</p></div><div><b className="red">LESS GOOD</b><p>Longer SLA due to less agents. Lower CSAT needs deeper expectation analysis.</p></div></div>
  </section>;
}

function Metric({ label, value, note, tone }) { return <div className={`metric ${tone}`}><small>{label}</small><strong>{value}</strong><span>{note}</span></div>; }
function Title({ label, title }) { return <div className="title"><div className="eyebrow">{label}</div><h2>{title}</h2></div>; }

function Slide2() {
  return <section className="slide"><Title label="THREAT ASSESSMENT // MODULE 02" title="DROPSHIPPING EXPOSURE" />
    <div className="partnerLogos"><div><img src="/debriefs/jondo.png" alt="Jondo" /></div><div><img src="/debriefs/shineon.png" alt="ShineOn" /></div></div>
    <div className="exposure"><div className="bigAlert"><h3>Currently 2 partners were leakages</h3><p>Jondo and ShineOn exposed fulfillment blindspots across system interaction, late supplier data and shipping visibility.</p></div><Issue title="01 · SYSTEM INTERACTION" items={["Orders not shipped in OM", "Integration delay", "Missing contact person 7/7"]} /><Issue title="02 · LATE SUPPLIER INFO" items={["A lot of late supplier cases", "No reliable information"]} red /><Issue title="03 · SHIPPING INFO" items={["Late delivery", "Shipping issues", "No monitoring / no proactive flow"]} /><Issue title="04 · MISSING POLICIES" items={["Compensation policy", "Change policy", "Not satisfied policy"]} yellow /></div>
    <div className="action"><b>ACTION 1:</b> Apply all flows and rules already defined for Tenengroup to all partners.<br/><b>ACTION 2:</b> For any new partner, clear all prerequisites before scale.</div>
  </section>;
}
function Issue({ title, items, red, yellow }) { return <div className={red ? "issue redBorder" : yellow ? "issue yellowBorder" : "issue"}><b>{title}</b><ul>{items.map((x) => <li key={x}>{x}</li>)}</ul></div>; }

function Slide3() {
  return <section className="slide"><Title label="SYSTEM OVERVIEW // INFRASTRUCTURE" title="SYSTEM COMPLEXITY" />
    <div className="complex"><div className="map">{["BRANDS","PARTNERS","SHOPIFY","OM","AI","CS","QA","OCY","CUSTOMERS"].map((n, i) => <div key={n} className={`node n${i}`}>{n}</div>)}<div className="callout"><b>STRATEGIC IMPERATIVE</b><p>Move faster to more automation, more AI, and every tool required to support Tenengroup growth across brands, partners and development strategy.</p></div></div>
    <div className="complexList"><div className="greenBox">Shipping Monitoring: unlimited actions and files generation</div><div>Product configuration: LMP with 2 flows, non personalized & personalized, binary pop-up</div><div>Drop Shipping configuration: design a complete workflow</div><div className="redBox">Last Minute communications and urgent actions for Customers</div><div>IT Assistance during Peak and week-end</div><div>Live Moderation on TrustPilot</div></div></div>
  </section>;
}

function Slide4() {
  return <section className="slide"><Title label="INTEL RECOVERY // 04" title="COMPENSATION STRATEGY" />
    <div className="comp"><div className="compText"><h3>New initiatives success<br/>Late compensation ShineOn</h3><p><b>704 emails</b> were sent to customers (US only).</p><p>Compensation earrings shipped to arrive <span className="green">in time for Mother’s Day</span>.</p><Box title="WHAT WORKED WELL" green items={["Proactive campaign / communication: 4,100 emails in 2026 vs 6,425 in 2025", "First time offering a physical replacement gift instead of coupon/gift option", "Gift compensation cost: $20 after event vs $15 on time"]} /><Box title="NEEDS IMPROVEMENT" red items={["Offer a more Mother’s Day-oriented compensation item", "Compensation based on order value instead of same gift for all", "First-time operation was complex and challenging — use AI"]} /></div>
    <div className="visual"><img src="/debriefs/earrings.png" alt="Earrings" /><img className="wide" src="/debriefs/options.png" alt="Options" /><div className="cost"><div className="costTitle">Count of Cost Without Shipping</div>{costRows.map((r) => <div key={r[0]} className={`row ${r[4]}`}><span>{r[0]}</span><b>OAK {r[1]}</b><b>TGR US {r[2]}</b><b>{r[3]}</b></div>)}</div></div></div>
  </section>;
}
function Box({ title, items, green, red }) { return <div className={green ? "box greenLine" : red ? "box redLine" : "box"}><b>{title}</b><ul>{items.map((x) => <li key={x}>{x}</li>)}</ul></div>; }

function Slide5() {
  return <section className="slide cteam"><div><div className="eyebrow">MISSION PARAMETERS: MULTIPLIER EFFECT</div><h2>THE C-TEAM<br/><span>EFFECT</span></h2><p className="tagline">“When everything seems lost…<br/>they are the last answer before escalation.”</p></div><a className="video" href="/debriefs/c-team-video.mp4" target="_blank" rel="noreferrer"><div className="play">▶</div><b>OPEN C-TEAM VIDEO</b><span>public/debriefs/c-team-video.mp4</span></a></section>;
}

function Current({ current, setCurrent }) { return current === 0 ? <Slide0 setCurrent={setCurrent} /> : current === 1 ? <Slide1 /> : current === 2 ? <Slide2 /> : current === 3 ? <Slide3 /> : current === 4 ? <Slide4 /> : <Slide5 />; }

export default function Debriefs() {
  const [current, setCurrent] = useState(0);
  const timer = useCountdown();
  return <div className={timer.active ? "app online" : "app"}><Header timer={timer}/><div className="shell"><SideNav current={current} setCurrent={setCurrent}/><main><Current current={current} setCurrent={setCurrent}/></main></div><footer><span>FOR EYES ONLY // MISSION SUCCESS</span><span>PAGE {String(current).padStart(2,"0")}/05</span></footer><style jsx global>{`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700;900&display=swap');*{box-sizing:border-box}body{margin:0;background:#070704}.app{min-height:100vh;background:#070704;color:#eae2cf;font-family:'JetBrains Mono',monospace}.app:before{content:"";position:fixed;inset:0;pointer-events:none;z-index:50;background:linear-gradient(rgba(255,255,255,.025) 50%,rgba(0,0,0,.12) 50%);background-size:100% 3px}.online{box-shadow:inset 0 0 130px rgba(255,215,0,.08)}.topbar{min-height:96px;display:flex;justify-content:space-between;gap:20px;align-items:center;padding:24px 30px;border-bottom:4px solid #ffd700;background:#090906;position:sticky;top:0;z-index:30}.classified{font-family:'Bebas Neue';color:#ffd700;font-size:40px;letter-spacing:.12em}.micro,.eyebrow{color:#999077;font-size:13px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.statusCluster{display:flex;align-items:center;gap:12px}.timer{border:1px solid #4d4732;padding:14px 18px;min-width:130px;text-align:center;font-size:24px;color:#999077;background:#15120a}.onlineTimer{color:#ffd700;border-color:#ffd700;animation:pulse 1.2s infinite}.status,.reset{border:0;cursor:pointer;font-weight:900;letter-spacing:.15em;padding:16px 20px;background:#3d392c;color:#eae2cf}.status.active{background:#ff5540;color:#221b00}.reset{background:#1f1b10;color:#999077;border:1px solid #4d4732}.shell{display:grid;grid-template-columns:260px 1fr;min-height:calc(100vh - 150px)}.side{border-right:1px solid #4d4732;padding:24px 18px;background:#0c0a05}.sideTitle{font-family:'Bebas Neue';color:#ffd700;font-size:34px;letter-spacing:.08em;line-height:1;margin-bottom:24px}.nav{width:100%;text-align:left;background:transparent;color:#999077;border:1px solid transparent;padding:12px;margin-bottom:10px;cursor:pointer}.nav span{display:block;color:#ff5540;font-weight:900;margin-bottom:5px}.nav b{color:#eae2cf;font-size:14px}.navOn{background:#1f1b10;border-color:#ffd700}main{padding:28px}.slide{min-height:calc(100vh - 190px);border:1px solid #4d4732;background:radial-gradient(circle at 70% 10%,rgba(255,215,0,.08),transparent 25%),#110e05;padding:28px;position:relative;overflow:hidden}.slide:after{content:"CONFIDENTIAL";position:absolute;right:-40px;bottom:40px;transform:rotate(-16deg);font-family:'Bebas Neue';font-size:150px;opacity:.035;color:#ffd700;pointer-events:none}h1,h2,h3{font-family:'Bebas Neue';margin:0;letter-spacing:.05em;line-height:.95}h1{font-size:92px;color:#ffd700}h1 span,h2 span{color:#fff6df}h2{font-size:78px;color:#ffd700}h3{font-size:46px;color:#fff6df}p,li{font-size:18px;line-height:1.55}.menuSlide{display:grid;grid-template-columns:1.15fr .85fr;grid-template-rows:auto 1fr;gap:24px}.hero{padding:26px;border-left:5px solid #ffd700}.hero p{max-width:760px;font-size:23px;color:#d0c6ab}.primary{background:#ffd700;color:#221b00;border:0;padding:18px 26px;font-weight:900;letter-spacing:.12em;cursor:pointer;margin-top:20px}.panel,.brandKpi,.two,.action,.issue,.bigAlert,.complexList,.compText,.visual{border:1px solid #4d4732;background:#1f1b10;padding:22px}.panelHead{color:#ffd700;font-size:14px;font-weight:900;letter-spacing:.15em;margin-bottom:16px}.tp{display:grid;grid-template-columns:72px 1fr;gap:14px;align-items:center;padding:12px;background:#fff6df;color:#111;margin-bottom:12px}.tp img{width:72px;height:72px;object-fit:contain;background:#fff;border:1px solid #ddd}.tp b,.tp span{display:block}.tp em{display:block;color:#00b67a;font-style:normal;font-weight:900;margin-top:6px}.quick{grid-column:1/3;display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.quick button{min-height:130px;background:#171308;color:#eae2cf;border:1px solid #4d4732;text-align:left;padding:18px;cursor:pointer}.quick span{color:#ff5540;font-weight:900}.quick b{display:block;color:#ffd700;font-size:20px;margin:12px 0 6px}.title{border-bottom:4px solid #ffd700;padding-bottom:18px;margin-bottom:24px}.kpiGrid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}.metric{min-height:150px;border:1px solid #4d4732;padding:18px;background:#1f1b10}.metric small{display:block;color:#999077;font-weight:900}.metric strong{display:block;font-family:'Bebas Neue';font-size:58px;color:#fff6df;margin-top:10px}.metric span{color:#d0c6ab;font-size:13px}.bad{border-color:#ff5540}.good{border-color:#00dbe8}.red{color:#ff5540!important}.green{color:#48d13a!important}.pulse{box-shadow:0 0 0 2px rgba(255,85,64,.25)}.brandKpi{margin-top:20px}.brandRows{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.brand{padding:16px;background:#110e05;border:1px solid #4d4732}.brand b{display:block;color:#ffd700;margin-bottom:12px}.brand span{display:block;color:#d0c6ab;margin-top:8px}.brand strong{color:#fff;font-size:24px}.brand.risk{border-color:#ff5540}.brand.good{border-color:#48d13a}.brand.ok{border-color:#00dbe8}.two{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:20px}.partnerLogos{position:absolute;top:122px;right:44px;display:flex;gap:16px;z-index:2}.partnerLogos div{background:#fff;padding:16px;width:170px;height:90px;display:flex;align-items:center;justify-content:center}.partnerLogos img{max-width:100%;max-height:100%;object-fit:contain}.exposure{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:18px;margin-top:120px}.bigAlert{grid-row:span 2;border-left:5px solid #ff5540}.bigAlert p{font-size:24px}.issue b{color:#ffd700;font-size:20px}.redBorder{border-color:#ff5540}.yellowBorder{border-color:#ffd700}.action{margin-top:18px;background:#15647c;color:#fff;font-size:23px}.complex{display:grid;grid-template-columns:1.2fr .8fr;gap:22px}.map{height:560px;position:relative;background:radial-gradient(circle,rgba(255,215,0,.08),transparent 55%);border:1px dashed #4d4732}.node{position:absolute;border:2px solid #ffd700;color:#ffd700;background:#110e05;padding:13px 18px;font-weight:900}.n0{left:5%;top:10%}.n1{left:38%;top:8%}.n2{right:8%;top:18%}.n3{left:17%;top:42%}.n4{left:45%;top:38%;border-color:#00dbe8;color:#00dbe8}.n5{right:14%;top:48%}.n6{left:8%;bottom:14%}.n7{left:43%;bottom:10%}.n8{right:7%;bottom:16%}.callout{position:absolute;left:20px;right:20px;bottom:20px;border-left:5px solid #48d13a;padding:16px;background:#172312}.callout p{font-size:22px}.complexList{display:grid;gap:14px;font-size:21px}.complexList div{padding:16px;background:#110e05;border-left:4px solid #4d4732}.greenBox{border-color:#48d13a!important;color:#c9ffc4}.redBox{border-color:#ff5540!important;color:#ffdad4}.comp{display:grid;grid-template-columns:1fr 1fr;gap:22px}.compText h3{color:#ffd700;font-size:56px}.box{margin-top:18px;padding:16px;background:#110e05;border-left:5px solid #4d4732}.greenLine{border-left-color:#48d13a}.redLine{border-left-color:#ff5540}.visual{display:grid;grid-template-columns:.8fr 1.2fr;gap:14px;align-content:start}.visual img{width:100%;background:#fff;object-fit:contain;border:1px solid #4d4732}.visual .wide{grid-column:span 2;max-height:260px}.cost{grid-column:span 2;background:#fff;color:#111;font-size:13px}.costTitle{background:#7dd3fc;font-weight:900;padding:7px}.row{display:grid;grid-template-columns:1.4fr .7fr .7fr .5fr;padding:6px 8px;gap:6px}.r{background:#f9d8c8}.g{background:#c8f7c5}.y{background:#fff1a8}.p{background:#efc1ef}.b{background:#8fd3f4;font-weight:900}.cteam{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center}.cteam h2{font-size:110px}.tagline{font-size:34px;color:#fff6df;border-left:5px solid #ffd700;padding-left:24px}.video{min-height:520px;border:4px solid #ffd700;background:repeating-linear-gradient(45deg,#111 0,#111 18px,#1f1b10 18px,#1f1b10 36px);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#ffd700;text-decoration:none}.play{width:110px;height:110px;border-radius:50%;border:4px solid #ffd700;display:flex;align-items:center;justify-content:center;font-size:46px;margin-bottom:24px;padding-left:8px}.video b{font-size:28px}.video span{color:#999077;margin-top:12px}footer{display:flex;justify-content:space-between;padding:12px 30px;border-top:4px solid #ffd700;color:#ffd700;font-size:13px;font-weight:900;letter-spacing:.15em}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.55}}@media(max-width:1100px){.shell{grid-template-columns:1fr}.side{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.sideTitle{grid-column:1/-1}.menuSlide,.complex,.comp,.cteam{grid-template-columns:1fr}.quick,.brandRows,.kpiGrid{grid-template-columns:1fr 1fr}.partnerLogos{position:static;margin-bottom:18px}h1,h2{font-size:58px}}
`}</style></div>;
}
