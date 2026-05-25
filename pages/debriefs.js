
import { useEffect, useState } from "react";

const slides = [
  { id: 0, code: "00-MENU", title: "Mission Menu" },
  { id: 1, code: "01-KPI", title: "Mission Performance" },
  { id: 2, code: "02-LEAK", title: "Dropshipping Exposure" },
  { id: 3, code: "03-SYSTEM", title: "System Complexity" },
  { id: 4, code: "04-RECOVERY", title: "Compensation Strategy" },
  { id: 5, code: "05-C-TEAM", title: "The C-Team Effect" }
];

const trustBrands = [
  { name: "Lime & Lou", domain: "limeandlou.com", rating: "4.4", reviews: "3040", logo: "/brand/lime-lou.jpg" },
  { name: "Theo Grace", domain: "theograce.com", rating: "4.6", reviews: "358", logo: "/brand/theograce.jpg" },
  { name: "Oak & Luna", domain: "oakandluna.com", rating: "4.4", reviews: "10681", logo: "/brand/oak-luna.jpg" },
  { name: "MYKA", domain: "myka.com", rating: "4.3", reviews: "73202", logo: "/brand/myka.jpg" },
  { name: "Israel Blessing", domain: "israelblessing.com", rating: "4.7", reviews: "919", logo: "/brand/israel-blessing.jpg" }
];

const brandKpis = [
  { brand: "THEOGRACE", sla: "28.5h", csat: "3.8", logo: "/brand/theograce.jpg", tone: "danger" },
  { brand: "OAK & LUNA", sla: "22h", csat: "3.9", logo: "/brand/oak-luna.jpg", tone: "warn" },
  { brand: "MYKA DE", sla: "17.5h", csat: "3.9", logo: "/brand/myka.jpg", tone: "ok" },
  { brand: "L&L", sla: "10.5h", csat: "4.2", logo: "/brand/lime-lou.jpg", tone: "good" },
  { brand: "IB", sla: "24h", csat: "4.3", logo: "/brand/israel-blessing.jpg", tone: "good" }
];

const leakItems = [
  {
    code: "01",
    title: "SYSTEM INTERACTION",
    bullets: ["Orders not shipped in OM", "Integration delay", "Missing contact person 7/7"]
  },
  {
    code: "02",
    title: "MISSING LATE SUPPLIER INFO",
    bullets: ["A lot of Late Supplier cases", "No reliable information", "No structured owner follow-up"]
  },
  {
    code: "03",
    title: "MISSING SHIPPING INFO",
    bullets: ["Late delivery", "Shipping issues", "No monitoring / no proactive alerts"]
  },
  {
    code: "04",
    title: "MISSING POLICIES",
    bullets: ["Compensation policy", "Change policy", "Not satisfied policy"]
  }
];

const systemExamples = [
  { title: "Shipping Monitoring", text: "Unlimited actions and files generation." },
  { title: "Product Configuration", text: "LMP with two flows: personalized and non-personalized." },
  { title: "Drop Shipping Workflow", text: "A complete workflow must exist before scaling a partner." },
  { title: "New Material Strategy", text: "Customer impact: reorder, future engraving and expectation management." },
  { title: "Last Minute Comms", text: "Urgent communication and action flows during peak event pressure." },
  { title: "Peak Support Layer", text: "IT assistance during peak, week-end and live Trustpilot moderation." }
];

const costRows = [
  { label: "More than $800", oak: 3, tgr: 4, total: 7, cls: "r1" },
  { label: "More than $600", oak: 4, tgr: 2, total: 6, cls: "r1" },
  { label: "More than $500", oak: 7, tgr: 1, total: 8, cls: "r1" },
  { label: "More than $243", oak: 88, tgr: 30, total: 118, cls: "r2" },
  { label: "Less than $243", oak: 144, tgr: 61, total: 205, cls: "r3" },
  { label: "Less than $150", oak: 44, tgr: 136, total: 180, cls: "r4" },
  { label: "Grand Total", oak: 290, tgr: 234, total: 524, cls: "r5" }
];

function useCountdown() {
  const [active, setActive] = useState(false);
  const [seconds, setSeconds] = useState(15 * 60);
  useEffect(() => {
    if (!active || seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [active, seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return {
    active,
    seconds,
    label: seconds === 0 ? "MISSION COMPLETE" : `${mm}:${ss}`,
    toggle: () => {
      if (seconds === 0) {
        setSeconds(15 * 60);
        setActive(true);
      } else {
        setActive((x) => !x);
      }
    },
    reset: () => {
      setActive(false);
      setSeconds(15 * 60);
    }
  };
}

function Header({ timer }) {
  return (
    <header className="topbar">
      <div>
        <div className="classified">CLASSIFIED // TENENGROUP DEBRIEF</div>
        <div className="meta">FOR EYES ONLY // MISSION SUCCESS // MOTHER DAY 2026</div>
      </div>
      <div className="statusWrap">
        <div className={timer.active ? "countdown activeCountdown" : "countdown"}>{timer.label}</div>
        <button onClick={timer.toggle} className={timer.active ? "status active" : "status"}>STATUS: {timer.active ? "ACTIVE" : "INACTIVE"}</button>
        <button onClick={timer.reset} className="reset">RESET</button>
      </div>
    </header>
  );
}

function goToSlide(id, setCurrent) {
  setCurrent(id);
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function SideNav({ current, setCurrent }) {
  return (
    <aside className="side">
      <div className="sideTitle">MOTHER DAY<br />DEBRIEF 2026</div>
      {slides.map((s) => (
        <button key={s.id} onClick={() => goToSlide(s.id, setCurrent)} className={current === s.id ? "nav activeNav" : "nav"}>
          <span>{s.code}</span>
          <b>{s.title}</b>
        </button>
      ))}
    </aside>
  );
}

function TrustCard({ b }) {
  return (
    <div className="trustCard">
      <img src={b.logo} alt={b.name} />
      <div>
        <b>{b.name}</b>
        <span>{b.domain}</span>
        <em>★★★★★ {b.rating} ({b.reviews})</em>
      </div>
    </div>
  );
}

function Slide0({ setCurrent }) {
  return (
    <section className="slide menuSlide">
      <div className="menuHero">
        <div className="eyebrow">SLIDE 00 // MISSION ACCESS</div>
        <h1>MOTHER DAY<br /><span>DEBRIEF 2026</span></h1>
        <p>Peak-event operational review: KPI, dropshipping exposure, system complexity, compensation recovery and C-Team multiplier effect.</p>
        <button className="primaryBtn" onClick={() => goToSlide(1, setCurrent)}>ENTER DEBRIEF</button>
      </div>

      <div className="trustPanel">
        <div className="panelHead">TRUSTPILOT SIGNALS // BRAND HEALTH</div>
        {trustBrands.map((b) => <TrustCard key={b.name} b={b} />)}
      </div>

      <div className="slideCards">
        {slides.slice(1).map((s) => (
          <button key={s.id} className="slideCard" onClick={() => goToSlide(s.id, setCurrent)}>
            <span>{s.code}</span>
            <b>{s.title}</b>
          </button>
        ))}
      </div>
    </section>
  );
}

function Slide1() {
  return (
    <section className="slide longSlide">
      <div className="headline">
        <span className="eyebrow">TARGETING CRITICAL DELIVERY METRICS</span>
        <h2>[MISSION PERFORMANCE]</h2>
      </div>

      <div className="yearGrid">
        <div className="yearRow headerRow"><b>KPI</b><b>2025</b><b>2026</b><b>STATUS</b></div>
        <div className="yearRow redLine"><b>SLA</b><strong>17.12 hours</strong><strong>19.54 hours</strong><span>YOY +14% · more short AI SLA</span></div>
        <div className="yearRow redLine"><b>CSAT</b><strong>3.99</strong><strong>3.88</strong><span>YOY -3%</span></div>
        <div className="yearRow greenLine"><b>NOTCH</b><strong>6,003 messages · 7%</strong><strong>15,018 messages · 18%</strong><span>Automation share increased</span></div>
        <div className="yearRow neutralLine"><b>TOTAL MESSAGES</b><strong>81,673</strong><strong>82,400</strong><span>YOY +0%</span></div>
        <div className="yearRow greenLine"><b>ORDER COST</b><strong>$0.41</strong><strong>$0.37</strong><span>-10%</span></div>
      </div>

      <div className="brandKpiPanel">
        <div className="panelHead">KPI BY BRAND // CSAT + SLA 2026</div>
        <div className="brandKpiGrid">
          {brandKpis.map((b) => (
            <div key={b.brand} className={`brandKpi ${b.tone}`}>
              <img src={b.logo} alt={b.brand} />
              <div>
                <b>{b.brand}</b>
                <p>SLA <strong>{b.sla}</strong></p>
                <p>CSAT <strong>{b.csat}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="conclusionGrid">
        <div className="goodBlock">
          <b>VERY GOOD</b>
          <ul>
            <li>Notch really increased share of messages.</li>
            <li>Big decrease of order cost.</li>
          </ul>
        </div>
        <div className="badBlock">
          <b>LESS GOOD</b>
          <ul>
            <li>Longer SLA due to less agents.</li>
            <li>Lower CSAT: expectations and root cause must be debriefed deeper.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function RevealBox({ code, title, bullets, className = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <button className={`revealBox ${className} ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div><span>{code}</span><b>{title}</b></div>
      {open ? (
        <ul>
          {bullets.map((item) => <li key={item}>{item}</li>)}
        </ul>
      ) : <em>CLICK TO REVEAL</em>}
    </button>
  );
}

function Slide2() {
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(false);

  return (
    <section className="slide longSlide">
      <div className="headline">
        <span className="eyebrow redText">THREAT ASSESSMENT // MODULE 02</span>
        <h2>DROPSHIPPING <span>EXPOSURE</span></h2>
        <h3 className="subtitle">A new era to imagine</h3>
      </div>

      <div className="partnerHeader">
        <div className="partnerCopy">
          <b>Currently 2 partners were leakages</b>
          <p>Jondo and ShineOn exposed blindspots across system interaction, late supplier visibility, shipping info and policies.</p>
        </div>
        <div className="logoPair">
          <img src="/debriefs/jondo.png" alt="Jondo" />
          <img src="/debriefs/shineon.png" alt="ShineOn" />
        </div>
      </div>

      <div className="revealGrid">
        {leakItems.map((x) => <RevealBox key={x.code} code={x.code} title={x.title} bullets={x.bullets} />)}
      </div>

      <div className="actionGrid">
        <button onClick={() => setA1(!a1)} className={a1 ? "actionReveal open" : "actionReveal"}>
          <b>ACTION 1</b>
          {a1 ? <p>Apply all flows and rules already defined for Tenengroup to all partners.</p> : <em>CLICK TO REVEAL</em>}
        </button>
        <button onClick={() => setA2(!a2)} className={a2 ? "actionReveal open" : "actionReveal"}>
          <b>ACTION 2</b>
          {a2 ? <p>For any new partner, clear all prerequisites before scale.</p> : <em>CLICK TO REVEAL</em>}
        </button>
      </div>
    </section>
  );
}

function Slide3() {
  const [showStrategy, setShowStrategy] = useState(false);
  return (
    <section className="slide longSlide">
      <div className="headline">
        <span className="eyebrow">SYSTEM OVERVIEW // INFRASTRUCTURE</span>
        <h2>SYSTEM <span>COMPLEXITY</span></h2>
      </div>

      <div className="systemIntro">
        <p>Our system is powerful, but every new brand, partner, product flow and peak-event rule adds one more operational layer.</p>
      </div>

      <div className="systemClearGrid">
        {systemExamples.map((item, index) => (
          <div key={item.title} className={`systemCard sc${index}`}>
            <span>0{index + 1}</span>
            <b>{item.title}</b>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <button className={showStrategy ? "strategyReveal open" : "strategyReveal"} onClick={() => setShowStrategy(!showStrategy)}>
        <b>STRATEGIC IMPERATIVE</b>
        {showStrategy ? (
          <div className="strategyPoints">
            <p>Move faster to more automation, more AI and the right tools to support Tenengroup growth across brands, partners and development strategy.</p>
            <ul>
              <li>Less human errors</li>
              <li>More speed</li>
              <li>Lower cost</li>
              <li>More revenue</li>
            </ul>
          </div>
        ) : (
          <em>CLICK TO REVEAL THE NEXT OPERATING MODEL</em>
        )}
      </button>
    </section>
  );
}


function Slide4() {
  const [work, setWork] = useState(false);
  const [improve, setImprove] = useState(false);

  return (
    <section className="slide longSlide">
      <div className="headline">
        <span className="eyebrow">INTEL RECOVERY // 04</span>
        <h2>COMPENSATION <span>STRATEGY</span></h2>
      </div>

      <div className="compTop">
        <div>
          <h3>New initiatives success<br />Late compensation ShineOn</h3>
          <p><b>704 emails</b> were sent to customers (US only).</p>
          <p>Compensation earrings shipped to arrive <span className="greenText">in time for Mother’s Day</span>.</p>
        </div>
        <img className="earrings" src="/debriefs/earrings.png" alt="Earrings" />
      </div>

      <div className="compRevealGrid">
        <button className={work ? "compReveal open" : "compReveal"} onClick={() => setWork(!work)}>
          <b>WHAT WORKED WELL</b>
          {work ? (
            <div className="bigBulletList">
              <div><span>01</span><p>Proactive campaign / communication: <b>4,100 emails</b> in 2026 vs 6,425 in 2025.</p></div>
              <div><span>02</span><p>First time offering a <b>physical replacement gift</b> instead of coupon/gift option.</p></div>
              <div><span>03</span><p>Gift compensation cost: <b className="greenText">$20 after event vs $15 on time.</b></p></div>
            </div>
          ) : <em>CLICK TO REVEAL</em>}
        </button>

        <button className={improve ? "compReveal bad open" : "compReveal bad"} onClick={() => setImprove(!improve)}>
          <b>NEEDS IMPROVEMENT</b>
          {improve ? (
            <div className="bigBulletList badList">
              <div><span>01</span><p>Offer a more <b>Mother’s Day-oriented</b> compensation item.</p></div>
              <div><span>02</span><p>Find a more appealing product.</p></div>
              <div><span>03</span><p>Compensation based on <b>order value</b> vs same gift for all.</p></div>
              <div><span>04</span><p>First-time operation was complex and challenging — <b>use AI.</b></p></div>
            </div>
          ) : <em>CLICK TO REVEAL OPTIONS + COST MATRIX</em>}
        </button>
      </div>

      {improve && (
        <div className="improveVisuals">
          <img src="/debriefs/options.png" alt="Options" />
          <div className="costTable">
            <div className="tableTitle">Count of Cost Without Shipping</div>
            {costRows.map((r) => (
              <div key={r.label} className={`costRow ${r.cls}`}>
                <span>{r.label}</span><b>OAK {r.oak}</b><b>TGR US {r.tgr}</b><b>{r.total}</b>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Slide5() {
  return (
    <section className="slide cteam">
      <div>
        <span className="eyebrow">MISSION PARAMETERS: MULTIPLIER EFFECT</span>
        <h2>THE C-TEAM<br /><span>EFFECT</span></h2>
        <p>“When everything seems lost…<br />they are the last answer before escalation.”</p>
      </div>
      <a className="videoBox" href="/debriefs/c-team-video.mp4" target="_blank" rel="noreferrer">
        <div className="play">▶</div>
        <b>OPEN C-TEAM VIDEO</b>
        <span>public/debriefs/c-team-video.mp4</span>
      </a>
    </section>
  );
}

function CurrentSlide({ current, setCurrent }) {
  if (current === 0) return <Slide0 setCurrent={setCurrent} />;
  if (current === 1) return <Slide1 />;
  if (current === 2) return <Slide2 />;
  if (current === 3) return <Slide3 />;
  if (current === 4) return <Slide4 />;
  return <Slide5 />;
}

export default function Debriefs() {
  const [current, setCurrent] = useState(0);
  const timer = useCountdown();

  return (
    <div className={timer.active ? "app online" : "app"}>
      <Header timer={timer} />
      <div className="shell">
        <SideNav current={current} setCurrent={setCurrent} />
        <main className="main"><CurrentSlide current={current} setCurrent={setCurrent} /></main>
      </div>
      <footer><span>FOR EYES ONLY // MISSION SUCCESS</span><span>PAGE {String(current).padStart(2, "0")}/05</span></footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700;900&display=swap');
        *{box-sizing:border-box} body{margin:0;background:#070704}
        .app{min-height:100vh;background:#070704;color:#eae2cf;font-family:'JetBrains Mono',monospace;overflow-x:hidden}
        .app:before{content:"";position:fixed;inset:0;pointer-events:none;z-index:60;background:linear-gradient(rgba(255,255,255,.025) 50%,rgba(0,0,0,.13) 50%);background-size:100% 3px}
        .online{box-shadow:inset 0 0 140px rgba(255,215,0,.09)}
        .topbar{min-height:104px;display:flex;justify-content:space-between;align-items:center;gap:24px;padding:24px 32px;border-bottom:4px solid #ffd700;background:#090906;position:sticky;top:0;z-index:40}
        .classified{font-family:'Bebas Neue';font-size:46px;letter-spacing:.13em;color:#ffd700}
        .meta,.eyebrow{font-size:16px;color:#999077;font-weight:900;letter-spacing:.18em;text-transform:uppercase}
        .statusWrap{display:flex;gap:12px;align-items:center}
        .countdown{min-width:190px;text-align:center;border:1px solid #4d4732;background:#15120a;color:#999077;padding:16px;font-size:34px;font-weight:900}
        .activeCountdown{color:#ffd700;border-color:#ffd700;animation:pulse 1s infinite}
        .status,.reset{border:0;padding:18px 24px;cursor:pointer;font-size:18px;font-weight:900;letter-spacing:.13em;background:#3d392c;color:#fff}
        .status.active{background:#ff5540;color:#221b00}.reset{background:#141006;color:#999077;border:1px solid #4d4732}
        .shell{display:grid;grid-template-columns:310px 1fr;align-items:start}
        .side{position:sticky;top:104px;min-height:calc(100vh - 104px);border-right:1px solid #4d4732;background:#0c0a05;padding:28px 22px}
        .sideTitle{font-family:'Bebas Neue';font-size:46px;line-height:.95;color:#ffd700;letter-spacing:.08em;margin-bottom:32px}
        .nav{width:100%;text-align:left;background:transparent;border:1px solid transparent;color:#eae2cf;padding:18px 16px;margin-bottom:13px;cursor:pointer}
        .nav span{display:block;color:#ff5540;font-size:20px;font-weight:900;margin-bottom:8px}.nav b{font-size:18px}
        .activeNav{background:#1f1b10;border-color:#ffd700}
        .main{padding:32px}
        .slide{min-height:calc(100vh - 190px);border:1px solid #4d4732;background:radial-gradient(circle at 75% 10%,rgba(255,215,0,.09),transparent 25%),#110e05;padding:34px;position:relative;overflow:hidden}
        .longSlide{min-height:120vh;overflow:visible}
        .slide:after{content:"CONFIDENTIAL";position:absolute;right:-70px;bottom:20px;font-family:'Bebas Neue';font-size:180px;color:#ffd700;opacity:.035;transform:rotate(-15deg);pointer-events:none}
        h1,h2,h3{font-family:'Bebas Neue';margin:0;line-height:.95;letter-spacing:.05em} h1{font-size:112px;color:#ffd700} h1 span,h2 span{color:#fff6df}
        h2{font-size:98px;color:#ffd700} h3{font-size:58px;color:#fff6df}.subtitle{font-size:42px;color:#00dbe8;margin-top:12px}
        p,li{font-size:27px;line-height:1.45}.headline{border-bottom:4px solid #ffd700;padding-bottom:22px;margin-bottom:30px}
        .menuSlide{display:grid;grid-template-columns:1.08fr .92fr;gap:28px}.menuHero{border-left:6px solid #ffd700;padding:32px}.menuHero p{font-size:32px;color:#d0c6ab;max-width:900px}
        .primaryBtn{background:#ffd700;color:#221b00;border:0;padding:22px 32px;font-size:22px;font-weight:900;letter-spacing:.13em;cursor:pointer}
        .trustPanel,.brandKpiPanel,.conclusionGrid>div,.partnerCopy,.revealBox,.actionReveal,.systemIntro,.strategyReveal,.compReveal,.compTop,.improveVisuals{border:1px solid #4d4732;background:#1f1b10;padding:24px}
        .panelHead{color:#ffd700;font-size:19px;font-weight:900;letter-spacing:.16em;margin-bottom:18px}
        .trustCard{display:grid;grid-template-columns:86px 1fr;gap:16px;background:#fff6df;color:#111;padding:14px;margin-bottom:14px}.trustCard img{width:86px;height:86px;object-fit:contain;background:#fff;border:1px solid #ddd}
        .trustCard b{font-size:21px;display:block}.trustCard span{font-size:17px;color:#333;display:block}.trustCard em{font-size:18px;color:#00b67a;font-style:normal;font-weight:900}
        .slideCards{grid-column:1/3;display:grid;grid-template-columns:repeat(5,1fr);gap:18px}.slideCard{min-height:150px;background:#15120a;border:1px solid #4d4732;color:#eae2cf;text-align:left;padding:22px;cursor:pointer}
        .slideCard span{color:#ff5540;font-size:22px;font-weight:900}.slideCard b{display:block;color:#ffd700;font-size:25px;margin-top:16px}
        .yearGrid{display:grid;gap:14px}.yearRow{display:grid;grid-template-columns:.8fr 1.4fr 1.4fr 2fr;gap:16px;align-items:center;padding:20px 22px;background:#1f1b10;border-left:8px solid #4d4732}
        .yearRow b{font-size:28px;color:#ffd700}.yearRow strong{font-size:34px;color:#fff6df}.yearRow span{font-size:25px;font-weight:900}.headerRow{background:#393528;border-left-color:#ffd700}.redLine{border-left-color:#ff5540}.redLine span{color:#ff5540}.greenLine{border-left-color:#48d13a}.greenLine span{color:#48d13a}.neutralLine{border-left-color:#00dbe8}
        .brandKpiPanel{margin-top:28px}.brandKpiGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:18px}.brandKpi{background:#110e05;border:2px solid #4d4732;padding:18px;display:grid;gap:12px;min-height:240px}
        .brandKpi img{height:80px;width:100%;object-fit:contain;background:#fff;padding:8px}.brandKpi b{font-size:23px;color:#ffd700}.brandKpi p{font-size:24px;margin:6px 0}.brandKpi strong{font-size:34px;color:#fff}.brandKpi.danger{border-color:#ff5540}.brandKpi.good{border-color:#48d13a}.brandKpi.ok{border-color:#00dbe8}.brandKpi.warn{border-color:#ffd700}
        .conclusionGrid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:28px}.goodBlock{border-left:8px solid #48d13a!important}.badBlock{border-left:8px solid #ff5540!important}.goodBlock b{color:#48d13a;font-size:34px}.badBlock b{color:#ff5540;font-size:34px}.conclusionGrid ul{margin:16px 0 0;padding-left:30px}.conclusionGrid li{font-size:30px;margin-bottom:12px}
        .partnerHeader{display:grid;grid-template-columns:1fr 420px;gap:28px;align-items:center}.partnerCopy b{font-size:38px;color:#ffd700}.partnerCopy p{font-size:32px}.logoPair{display:grid;grid-template-columns:1fr 1fr;gap:16px}.logoPair img{background:#fff;width:100%;height:140px;object-fit:contain;padding:20px}
        .revealGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:28px}.revealBox,.actionReveal,.strategyReveal,.compReveal{text-align:left;color:#eae2cf;cursor:pointer;min-height:250px;display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch}.revealBox span{display:block;color:#ff5540;font-size:56px;font-weight:900}.revealBox b,.actionReveal b,.strategyReveal b,.compReveal b{display:block;color:#ffd700;font-size:30px;margin-bottom:18px}.revealBox em,.actionReveal em,.strategyReveal em,.compReveal em{font-style:normal;color:#999077;font-size:20px;font-weight:900;margin-top:18px}.revealBox ul{margin:10px 0 0;padding-left:26px}.revealBox li{font-size:28px;margin-bottom:12px;line-height:1.25}.revealBox.open,.actionReveal.open,.strategyReveal.open,.compReveal.open{border-color:#ffd700;box-shadow:inset 0 0 0 2px rgba(255,215,0,.25)}
        .actionGrid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px}.actionReveal{min-height:190px;background:#15647c}.actionReveal p{font-size:33px}
        .systemIntro p{font-size:42px;color:#fff6df}.systemClearGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:28px}
        .systemCard{background:#1f1b10;border:2px solid #4d4732;border-left:10px solid #ffd700;padding:24px;min-height:250px}
        .systemCard span{color:#ff5540;font-size:34px;font-weight:900}
        .systemCard b{display:block;color:#ffd700;font-size:34px;margin:12px 0}
        .systemCard p{font-size:29px;margin:0;color:#eae2cf;line-height:1.3}
        .sc0,.sc2{border-left-color:#48d13a}.sc3,.sc4{border-left-color:#ff5540}.sc5{border-left-color:#00dbe8}
        .strategyReveal{margin-top:32px;min-height:230px;border-left:12px solid #48d13a}
        .strategyReveal p{font-size:38px;color:#c9ffc4}
        .strategyPoints ul{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:22px 0 0;padding:0;list-style:none}
        .strategyPoints li{background:#10230e;border:2px solid #48d13a;color:#c9ffc4;font-size:32px;font-weight:900;text-align:center;padding:18px}
        .compTop{display:grid;grid-template-columns:1fr 320px;gap:24px;align-items:center}.compTop h3{color:#ffd700;font-size:66px}.earrings{width:100%;background:#fff;object-fit:contain}.greenText{color:#48d13a}.redText{color:#ff5540!important}
        .compRevealGrid{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:24px}.compReveal{min-height:260px;border-left:8px solid #48d13a}.compReveal.bad{border-left-color:#ff5540}.compReveal li{font-size:29px}
        .bigBulletList{display:grid;gap:14px}.bigBulletList div{display:grid;grid-template-columns:70px 1fr;gap:14px;align-items:start;background:#110e05;border-left:6px solid #48d13a;padding:14px}.badList div{border-left-color:#ff5540}.bigBulletList span{color:#ffd700;font-size:32px;font-weight:900}.bigBulletList p{font-size:29px;margin:0;line-height:1.28}
        .improveVisuals{margin-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:24px}.improveVisuals img{width:100%;background:#fff;object-fit:contain}.costTable{background:#fff;color:#111;font-size:19px}.tableTitle{background:#7dd3fc;font-weight:900;padding:10px}.costRow{display:grid;grid-template-columns:1.4fr .8fr .8fr .5fr;gap:8px;padding:9px 10px}.r1{background:#f9d8c8}.r2{background:#c8f7c5}.r3{background:#fff1a8}.r4{background:#efc1ef}.r5{background:#8fd3f4;font-weight:900}
        .cteam{display:grid;grid-template-columns:1fr 1fr;gap:34px;align-items:center}.cteam h2{font-size:128px}.cteam p{font-size:42px;border-left:7px solid #ffd700;padding-left:28px}.videoBox{min-height:620px;border:5px solid #ffd700;background:repeating-linear-gradient(45deg,#111 0,#111 22px,#1f1b10 22px,#1f1b10 44px);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#ffd700;text-decoration:none}.play{width:130px;height:130px;border:5px solid #ffd700;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:58px;padding-left:10px;margin-bottom:28px}.videoBox b{font-size:36px}.videoBox span{margin-top:14px;color:#999077;font-size:18px}
        footer{display:flex;justify-content:space-between;padding:16px 32px;border-top:4px solid #ffd700;color:#ffd700;font-weight:900;letter-spacing:.16em;font-size:16px}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
        @media(max-width:1200px){.shell{grid-template-columns:1fr}.side{position:relative;top:0;min-height:0}.menuSlide,.partnerHeader,.compTop,.cteam,.improveVisuals{grid-template-columns:1fr}.slideCards,.brandKpiGrid,.revealGrid,.systemClearGrid{grid-template-columns:1fr 1fr}.yearRow{grid-template-columns:1fr}.topbar{flex-direction:column;align-items:flex-start}.sideTitle{font-size:42px}.strategyPoints ul{grid-template-columns:1fr 1fr}}
      `}</style>
    </div>
  );
}
