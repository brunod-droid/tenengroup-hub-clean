import { useEffect, useMemo, useState } from 'react';

const trustpilotBrands = [
  { name: 'Lime & Lou', domain: 'limeandlou.com', score: '4.4', reviews: '3,040', logo: 'LIME&LOU' },
  { name: 'Theo Grace', domain: 'theograce.com', score: '4.6', reviews: '358', logo: 'theo\ngrace' },
  { name: 'Oak & Luna', domain: 'oakandluna.com', score: '4.4', reviews: '10,681', logo: 'OAK&LUNA' },
  { name: 'MYKA', domain: 'myka.com', score: '4.3', reviews: '73,202', logo: 'MYKA' },
  { name: 'Israel Blessing', domain: 'www.israelblessing.com', score: '4.7', reviews: '919', logo: 'ib' }
];

const kpiBrands = [
  { brand: 'Theo Grace', csat: '3.88', sla: '19.54h', volume: '82,400', notch: '15,018', cost: '$0.37' },
  { brand: 'Lime & Lou', csat: '4.4', sla: '—', volume: '—', notch: '—', cost: '—' },
  { brand: 'Oak & Luna', csat: '4.4', sla: '—', volume: '—', notch: '—', cost: '—' },
  { brand: 'MYKA', csat: '4.3', sla: '—', volume: '—', notch: '—', cost: '—' },
  { brand: 'Israel Blessing', csat: '4.7', sla: '—', volume: '—', notch: '—', cost: '—' }
];

const slides = [
  { key: 'menu', code: '00', nav: 'MENU', title: 'MOTHER DAY DEBRIEF 2026', subtitle: 'Executive debrief / customer care operations' },
  { key: 'kpi', code: '01', nav: 'KPI', title: 'MISSION PERFORMANCE', subtitle: '1st April / 17th May 2026 vs 2nd April / 18th May 2025' },
  { key: 'dropshipping', code: '02', nav: 'LEAK', title: 'DROPSHIPPING EXPOSURE', subtitle: 'Leakages with dropshipping partners' },
  { key: 'complexity', code: '03', nav: 'SYSTEM', title: 'SYSTEM COMPLEXITY', subtitle: 'AI and automation vs human touch' },
  { key: 'compensation', code: '04', nav: 'NEW', title: 'COMPENSATION STRATEGY', subtitle: 'New initiatives success / Late compensation ShineOn' },
  { key: 'cteam', code: '05', nav: 'C-TEAM', title: 'THE C-TEAM EFFECT', subtitle: 'Last answer before escalation' }
];

const videoUrl = 'https://tenengroup-my.sharepoint.com/:v:/p/bruno_d/IQCWqg62BpAsRrfrBR2TQTh2ARHcedSuRbIp2QQfTKytgDU?e=VCC2gk';

export default function Debriefs() {
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState('22:45:09Z');
  const slide = slides[current];

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setTime(now.toISOString().split('T')[1].split('.')[0] + 'Z');
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const go = (index) => setCurrent(Math.max(0, Math.min(slides.length - 1, index)));

  return (
    <div className="debriefRoot">
      <style jsx global>{css}</style>
      <div className="crt" />
      <header className="topbar">
        <div className="brand">CLASSIFIED // TENENGROUP DEBRIEF</div>
        <div className="topMeta"><span>{time}</span><span className="status">STATUS: ACTIVE</span></div>
      </header>

      <aside className="rail">
        {slides.map((s, index) => (
          <button key={s.key} onClick={() => go(index)} className={index === current ? 'nav active' : 'nav'}>
            <span>{s.code}</span><b>{s.nav}</b>
          </button>
        ))}
      </aside>

      <main className="stage">
        {slide.key === 'menu' && <MenuSlide go={go} />}
        {slide.key === 'kpi' && <KpiSlide />}
        {slide.key === 'dropshipping' && <DropshippingSlide />}
        {slide.key === 'complexity' && <ComplexitySlide />}
        {slide.key === 'compensation' && <CompensationSlide />}
        {slide.key === 'cteam' && <CTeamSlide />}
      </main>

      <footer className="footer">
        <span>FOR EYES ONLY // MISSION SUCCESS</span>
        <span>PAGE {slide.code}/05</span>
        <button onClick={() => go(current - 1)} disabled={current === 0}>PREV</button>
        <button onClick={() => go(current + 1)} disabled={current === slides.length - 1}>NEXT</button>
      </footer>
    </div>
  );
}

function MenuSlide({ go }) {
  return <section className="slide menuGrid">
    <div className="heroBlock">
      <div className="eyebrow">MISSION ACCESS // MOTHER'S DAY</div>
      <h1>MOTHER DAY<br/><span>DEBRIEF 2026</span></h1>
      <p>Operational debrief covering KPIs, supplier leakages, system complexity, compensation strategy and C-Team impact.</p>
      <button className="primaryBtn" onClick={() => go(1)}>ENTER DEBRIEF</button>
    </div>
    <div className="trustPanel">
      <div className="panelTitle">TRUSTPILOT BRAND NOTES</div>
      <div className="tpGrid">
        {trustpilotBrands.map((b) => <TrustCard key={b.name} brand={b} />)}
      </div>
    </div>
    <div className="missionCards">
      {slides.slice(1).map((s, i) => (
        <button key={s.key} onClick={() => go(i + 1)} className="missionCard">
          <span>{s.code}</span>
          <b>{s.title}</b>
          <small>{s.subtitle}</small>
        </button>
      ))}
    </div>
  </section>;
}

function TrustCard({ brand }) {
  return <div className="trustCard">
    <div className="fakeLogo">{brand.logo}</div>
    <div><b>{brand.name}</b><small>{brand.domain}</small></div>
    <div className="stars">★★★★★ <span>{brand.score} ({brand.reviews})</span></div>
  </div>;
}

function KpiSlide() {
  return <section className="slide">
    <SlideHeader n="01" title="KPI" subtitle="1st April / 17th May 2026 vs 2nd April / 18th May 2025" />
    <div className="kpiLayout">
      <div className="intelBox wide">
        <div className="panelTitle">CORE KPI READOUT</div>
        <div className="metricRows">
          <Metric label="SLA 2025" value="17.12 hours" tone="good" />
          <Metric label="SLA 2026" value="19.54 hours" delta="YOY +14% but much more with short AI SLA" tone="bad" />
          <Metric label="CSAT 2025" value="3.99" tone="good" />
          <Metric label="CSAT 2026" value="3.88" delta="YOY -3%" tone="bad" />
          <Metric label="Notch 2025" value="6,003 messages" delta="7% of messages" />
          <Metric label="Notch 2026" value="15,018 messages" delta="18% of messages" tone="green" />
          <Metric label="Total Messages 2025" value="81,673 messages" />
          <Metric label="Total Messages 2026" value="82,400 messages" delta="YOY +0%" />
          <Metric label="Order Cost April 2025" value="$0.41" delta="34,338.80 / 82,590" />
          <Metric label="Order Cost April 2026" value="$0.37" delta="29,291.18 / 79,999 — -10%" tone="green" />
        </div>
      </div>
      <div className="intelBox">
        <div className="panelTitle">CONCLUSION</div>
        <div className="conclusion">
          <b>Very Good:</b>
          <ol><li>Notch really increased share of messages</li><li>Big decrease of order cost</li></ol>
          <b className="warn">Less Good:</b>
          <ol><li>Longer SLA, linked to less agents</li><li>Lower CSAT: more expectations / to debrief deeper</li></ol>
        </div>
      </div>
      <div className="intelBox brandBox">
        <div className="panelTitle">KPI BY BRAND</div>
        <table>
          <thead><tr><th>Brand</th><th>CSAT</th><th>SLA</th><th>Volume</th><th>Notch</th><th>Cost</th></tr></thead>
          <tbody>{kpiBrands.map((b) => <tr key={b.brand}><td>{b.brand}</td><td>{b.csat}</td><td>{b.sla}</td><td>{b.volume}</td><td>{b.notch}</td><td>{b.cost}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  </section>;
}

function DropshippingSlide() {
  return <section className="slide">
    <SlideHeader n="02" title="DROPSHIPPING EXPOSURE" subtitle="Leakages Dropshipping Partners" />
    <div className="partnerLogos"><Logo label="JONDO" /><Logo label="ShineOn" script /></div>
    <div className="twoCol">
      <div className="intelBox danger">
        <div className="panelTitle">CURRENTLY 2 PARTNERS: JONDO + SHINEON</div>
        <ol className="bigList">
          <li><b>System interaction</b><span>Orders not shipped in OM, integration delay, missing contact person 7/7.</span></li>
          <li><b>Missing info regarding Late Supplier</b><span>A lot of late supplier / no information.</span></li>
          <li><b>Missing info about shipping</b><span>Late delivery, shipping issues, no monitoring / no proactive.</span></li>
          <li><b>Missing policies</b><span>Compensation policy, change policy, not satisfied policy.</span></li>
        </ol>
      </div>
      <div className="intelBox action">
        <div className="panelTitle">OPERATIONAL ACTIONS</div>
        <div className="actionLine"><b>Action 1:</b> Apply all the flows and rules already defined for Tenengroup to all of them.</div>
        <div className="actionLine"><b>Action 2:</b> For any new partner, clear all prerequisites before launch.</div>
        <div className="voidMap"><span>SYNC</span><span>POLICY</span><span>SHIPPING</span><span>DATA</span></div>
      </div>
    </div>
  </section>;
}

function ComplexitySlide() {
  return <section className="slide">
    <SlideHeader n="03" title="SYSTEM COMPLEXITY" subtitle="AI and automation vs Human touch" />
    <div className="complexGrid">
      {[
        ['Shipping Monitoring', 'Unlimited actions and files generation', 'local_shipping'],
        ['Product Configuration', 'LMP with 2 flows: non personalized & personalized, binary pop up', 'settings_input_component'],
        ['Drop Shipping Configuration', 'Design a complete workflow', 'account_tree'],
        ['New Material Strategy', 'Effects on customers: reorder & future engraving', 'diamond'],
        ['Last Minute Communications', 'Urgent actions for customers', 'campaign'],
        ['IT Assistance', 'During peak and week-end', 'support_agent'],
        ['Live Moderation', 'TrustPilot real-time monitoring', 'star']
      ].map(([t,d,icon], i) => <div className="complexCard" key={t}><span className="material-symbols-outlined">{icon}</span><b>{t}</b><small>{d}</small><em>NODE_0{i + 1}</em></div>)}
      <div className="systemWeb">
        <div className="node center">LMP CORE</div><div className="node n1">AI</div><div className="node n2">CS</div><div className="node n3">VENDOR</div><div className="node n4">TRUSTPILOT</div><div className="node n5">IT</div>
      </div>
    </div>
  </section>;
}

function CompensationSlide() {
  return <section className="slide">
    <SlideHeader n="04" title="NEW INITIATIVES SUCCESS" subtitle="Late compensation ShineOn" />
    <div className="compGrid">
      <div className="intelBox">
        <div className="giantNumber">704<span> emails</span></div>
        <div className="panelTitle">NEW</div>
        <p>Emails were sent to 704 customers (US only). Compensation earrings shipped to arrive <span className="green">in time for Mother’s Day</span>.</p>
      </div>
      <div className="intelBox">
        <div className="panelTitle">WHAT WORKED WELL</div>
        <ul><li>Proactive campaign / communication: 4,100 emails (2026) vs 6,425 (2025)</li><li>First time offering a physical replacement gift instead of option coupon/gift.</li><li>Cost of gift compensation: <span className="green">$20 after event vs $15 on time</span>.</li></ul>
      </div>
      <div className="intelBox danger">
        <div className="panelTitle">NEEDS IMPROVEMENT</div>
        <ul><li>Offer a more Mother’s Day-oriented compensation item.</li><li>Find a more appealing product.</li><li>Compensation based on order value vs same gift for all.</li><li>First-time operation: complex and challenging — use AI.</li></ul>
      </div>
      <div className="intelBox tableMock">
        <div className="giftMock">COMPENSATION<br/>GIFT VISUAL</div>
        <table><tbody><tr><td>More than $800</td><td>7</td></tr><tr><td>More than $243</td><td>118</td></tr><tr><td>Less than $243</td><td>205</td></tr><tr><td>Less than $150</td><td>180</td></tr><tr><th>Grand Total</th><th>524</th></tr></tbody></table>
      </div>
    </div>
  </section>;
}

function CTeamSlide() {
  return <section className="slide cteamSlide">
    <div className="cteamContent">
      <div className="eyebrow">MISSION PARAMETERS: MULTIPLIER EFFECT</div>
      <h1>THE C-TEAM<br/><span>EFFECT</span></h1>
      <p className="tagline">“When everything seems lost…<br/>they are the last answer before escalation.”</p>
      <a href={videoUrl} target="_blank" rel="noreferrer" className="videoPlaceholder">
        <span className="play">▶</span>
        <b>OPEN FULL SCREEN VIDEO</b>
        <small>SharePoint secure link</small>
      </a>
    </div>
  </section>;
}

function SlideHeader({ n, title, subtitle }) {
  return <div className="slideHeader"><span>MODULE {n}</span><h2>{title}</h2><p>{subtitle}</p></div>;
}
function Metric({ label, value, delta, tone }) { return <div className={'metric ' + (tone || '')}><span>{label}</span><b>{value}</b>{delta && <em>{delta}</em>}</div>; }
function Logo({ label, script }) { return <div className={script ? 'logo script' : 'logo'}>{label}</div>; }

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700;900&family=Material+Symbols+Outlined&display=swap');
html,body,#__next{margin:0;min-height:100%;background:#161308}.debriefRoot{min-height:100vh;background:#161308;color:#eae2cf;font-family:'JetBrains Mono',monospace;overflow:hidden}.crt{position:fixed;inset:0;pointer-events:none;z-index:20;background:linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,.14) 50%),linear-gradient(90deg,rgba(255,0,0,.03),rgba(0,255,255,.02),rgba(0,0,255,.03));background-size:100% 3px,3px 100%}.topbar,.footer{position:fixed;left:0;right:0;z-index:30;background:#110e05;border-color:#ffd700;color:#ffd700;display:flex;align-items:center;justify-content:space-between}.topbar{top:0;height:78px;border-bottom:4px solid #ffd700;padding:0 48px}.brand{font-family:'Bebas Neue';font-size:42px;letter-spacing:.08em}.topMeta{display:flex;gap:24px;align-items:center}.status{background:#ffd700;color:#221b00;padding:8px 14px;font-weight:900}.footer{bottom:0;height:42px;border-top:4px solid #ffd700;padding:0 48px;font-size:13px;font-weight:900;letter-spacing:.12em}.footer button{background:transparent;color:#ffd700;border:1px solid #ffd700;padding:5px 10px;font-weight:900}.footer button:disabled{opacity:.25}.rail{position:fixed;top:82px;bottom:46px;left:0;width:245px;background:#0d0b05;border-right:1px solid #4d4732;z-index:25;padding:28px 20px;box-sizing:border-box}.nav{width:100%;display:grid;grid-template-columns:52px 1fr;gap:12px;align-items:center;background:transparent;border:0;color:#ff5540;text-align:left;margin-bottom:22px;cursor:pointer;font-family:'Bebas Neue';letter-spacing:.04em}.nav span{font-size:42px}.nav b{font-size:34px}.nav.active{color:#ffd700}.stage{margin-left:245px;padding:110px 48px 70px;min-height:calc(100vh - 180px);box-sizing:border-box}.slide{min-height:calc(100vh - 180px);position:relative}.slide:before{content:'TOP SECRET // EYES ONLY';position:absolute;inset:auto 4% 15% auto;font-family:'Bebas Neue';font-size:110px;color:#fff;opacity:.035;transform:rotate(-15deg);pointer-events:none}.slideHeader{border-bottom:4px solid #ffd700;padding-bottom:18px;margin-bottom:28px}.slideHeader span,.eyebrow,.panelTitle{color:#ffd700;font-size:14px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.slideHeader h2{font-family:'Bebas Neue';font-size:88px;line-height:.9;margin:12px 0;color:#fff6df;letter-spacing:.04em}.slideHeader p{margin:0;color:#d0c6ab;font-size:18px}.menuGrid{display:grid;grid-template-columns:1fr 520px;grid-template-rows:auto 1fr;gap:24px}.heroBlock{background:#1f1b10;border:1px solid #4d4732;padding:42px}.heroBlock h1,.cteamContent h1{font-family:'Bebas Neue';font-size:104px;line-height:.92;margin:20px 0;color:#fff6df}.heroBlock h1 span,.cteamContent h1 span{color:#ffd700}.heroBlock p{font-size:20px;line-height:1.6;color:#d0c6ab;max-width:760px}.primaryBtn{background:#ffd700;color:#221b00;border:0;font-family:'Bebas Neue';font-size:36px;letter-spacing:.08em;padding:16px 24px;margin-top:22px;cursor:pointer}.trustPanel{grid-row:span 2;background:#231f14;border:1px solid #4d4732;padding:24px}.tpGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:18px}.trustCard{background:#161308;border:1px solid #4d4732;padding:14px;display:grid;grid-template-columns:72px 1fr;gap:14px;align-items:center}.fakeLogo{width:72px;height:56px;border:1px solid #999077;display:flex;align-items:center;justify-content:center;text-align:center;white-space:pre-line;font-weight:900;background:#fff;color:#111;font-size:14px}.trustCard b{display:block;color:#fff}.trustCard small{display:block;color:#d0c6ab;margin-top:4px}.stars{grid-column:1 / -1;color:#00b67a;font-weight:900}.stars span{color:#eae2cf}.missionCards{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.missionCard{background:#110e05;border:1px solid #4d4732;color:#eae2cf;text-align:left;padding:18px;cursor:pointer}.missionCard:hover{border-color:#ffd700}.missionCard span{color:#ff5540;font-family:'Bebas Neue';font-size:42px}.missionCard b{display:block;font-family:'Bebas Neue';font-size:34px;line-height:1;color:#fff6df}.missionCard small{display:block;margin-top:10px;color:#999077;line-height:1.4}.kpiLayout{display:grid;grid-template-columns:1.45fr .85fr;gap:24px}.intelBox{background:#231f14;border:1px solid #4d4732;padding:24px;position:relative}.wide{min-height:420px}.brandBox{grid-column:1/-1}.metricRows{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:18px}.metric{background:#161308;border-left:4px solid #999077;padding:13px}.metric span{display:block;color:#d0c6ab}.metric b{font-size:26px;color:#fff6df}.metric em{display:block;color:#999077;font-style:normal;margin-top:4px}.metric.bad{border-color:#ff5540}.metric.bad em{color:#ff5540;font-weight:900}.metric.green{border-color:#34a853}.metric.green em{color:#34a853;font-weight:900}.conclusion{font-size:20px;line-height:1.45}.conclusion .warn{color:#ffb4a8}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{padding:12px;border-bottom:1px solid #4d4732;text-align:left}th{color:#ffd700}.partnerLogos{position:absolute;top:20px;right:0;display:flex;gap:18px}.logo{background:#fff;color:#111;padding:16px 26px;font-size:40px;font-weight:900;border-radius:4px}.logo.script{font-family:cursive}.twoCol{display:grid;grid-template-columns:1.2fr .8fr;gap:24px}.danger{border-color:#93000a;background:#220906}.bigList{font-size:22px;line-height:1.55}.bigList li{margin:18px 0}.bigList span{display:block;color:#d0c6ab;font-size:18px}.action{border-color:#ffd700}.actionLine{background:#0d3442;border-left:4px solid #00f1ff;margin:18px 0;padding:18px;font-size:20px;line-height:1.45}.voidMap{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:30px}.voidMap span{border:1px solid #ffd700;padding:24px;text-align:center;color:#ffd700;font-weight:900}.complexGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.complexCard{background:#231f14;border:1px solid #4d4732;min-height:170px;padding:20px;position:relative}.complexCard .material-symbols-outlined{font-size:42px;color:#00f1ff}.complexCard b{display:block;color:#fff6df;font-size:22px;margin-top:10px}.complexCard small{display:block;color:#d0c6ab;line-height:1.5;margin-top:8px}.complexCard em{position:absolute;right:12px;bottom:10px;color:#999077;font-style:normal;font-size:12px}.systemWeb{grid-column:span 4;height:270px;border:1px solid #ffd700;position:relative;background:radial-gradient(circle,#2e2a1e,#110e05)}.node{position:absolute;border:2px solid #ffd700;background:#161308;color:#ffd700;padding:14px 20px;font-weight:900}.center{left:50%;top:50%;transform:translate(-50%,-50%);font-size:28px}.n1{left:18%;top:18%}.n2{right:18%;top:18%}.n3{left:10%;bottom:20%}.n4{right:10%;bottom:20%}.n5{left:50%;bottom:10%;transform:translateX(-50%)}.compGrid{display:grid;grid-template-columns:.85fr 1fr;gap:24px}.giantNumber{font-family:'Bebas Neue';font-size:120px;color:#ffd700;line-height:.8}.giantNumber span{font-size:42px;color:#999077}.green{color:#34a853;font-weight:900}.tableMock{grid-row:span 2}.giftMock{height:220px;background:#fff;color:#111;display:flex;align-items:center;justify-content:center;text-align:center;font-family:'Bebas Neue';font-size:44px;margin-bottom:18px}.cteamSlide{display:flex;align-items:center;justify-content:center;text-align:left}.cteamContent{width:min(1100px,100%)}.tagline{font-size:34px;line-height:1.45;color:#eae2cf;border-left:6px solid #ffd700;padding-left:24px}.videoPlaceholder{margin-top:36px;height:260px;border:4px solid #ffd700;background:#050505;color:#ffd700;text-decoration:none;display:flex;flex-direction:column;align-items:center;justify-content:center}.play{font-size:82px}.videoPlaceholder b{font-family:'Bebas Neue';font-size:44px;letter-spacing:.08em}.videoPlaceholder small{color:#d0c6ab}@media(max-width:1100px){.rail{width:96px}.nav{grid-template-columns:1fr}.nav b{display:none}.stage{margin-left:96px}.menuGrid,.kpiLayout,.twoCol,.compGrid{grid-template-columns:1fr}.trustPanel{grid-row:auto}.missionCards,.complexGrid{grid-template-columns:1fr 1fr}.systemWeb{grid-column:span 2}.slideHeader h2,.heroBlock h1,.cteamContent h1{font-size:64px}.topbar{padding:0 20px}.brand{font-size:30px}}`;
