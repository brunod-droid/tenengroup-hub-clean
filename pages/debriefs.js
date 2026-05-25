import { useMemo, useState } from 'react';

const slides = [
  {
    id: '00',
    tag: 'COMMAND CENTER',
    title: 'Mother Day Debrief 2026',
    subtitle: 'Executive navigation hub / Customer Service mission debrief',
    kind: 'Landing',
    accent: 'primary'
  },
  {
    id: '01',
    tag: 'KPI DASHBOARD',
    title: 'Mission Performance',
    subtitle: 'CSAT, SLA, conversation volume and unit cost',
    kind: 'Dashboard',
    accent: 'primary'
  },
  {
    id: '02',
    tag: 'THREAT ASSESSMENT',
    title: 'Dropshipping Exposure',
    subtitle: 'Third-party logistics and fulfillment vulnerabilities',
    kind: 'Risk',
    accent: 'danger'
  },
  {
    id: '03',
    tag: 'SYSTEM MAP',
    title: 'System Complexity',
    subtitle: 'Operational stack, monitoring flows and bottlenecks',
    kind: 'Infrastructure',
    accent: 'tertiary'
  },
  {
    id: '04',
    tag: 'RECOVERY PLAN',
    title: 'Compensation Strategy',
    subtitle: 'Customer recovery, proactive communication and cost control',
    kind: 'Recovery',
    accent: 'danger'
  },
  {
    id: '05',
    tag: 'SUCCESS METRICS',
    title: 'The C-Team Effect',
    subtitle: 'Cross-functional synchronization and efficiency impact',
    kind: 'Success',
    accent: 'primary'
  }
];

const kpis = [
  ['CSAT_LEVEL', '3.87', 'Target: 3.90', '99%'],
  ['SLA_RESPONSE', '27.0 HR', 'Target: 18.5', '145%', 'danger'],
  ['INTEL_VOLUME', '12,313', 'Baseline: 9,106', '82%', 'tertiary'],
  ['UNIT_EXPENSE', '$0.37', 'Budget: $0.41', '90%']
];

function MetricCard({ item }) {
  const [label, value, meta, width, tone] = item;
  return (
    <div className={`metricCard ${tone || ''}`}>
      <div className="labelLine">METRIC: {label}</div>
      <div className="metricValue">{value}</div>
      <div className="metricMeta">{meta}</div>
      <div className="progress"><span style={{ width }} /></div>
    </div>
  );
}

function SlideButton({ slide, active, onClick }) {
  return (
    <button className={`slideButton ${active ? 'active' : ''} ${slide.accent}`} onClick={onClick}>
      <strong>{slide.id}</strong>
      <span>
        {slide.title}
        <small>{slide.tag}</small>
      </span>
    </button>
  );
}

function Landing({ setActive }) {
  return (
    <div className="landingGrid">
      <section className="heroBlock tacticalBorder">
        <div className="labelLine red">MISSION FILE // EVENT DEBRIEF</div>
        <h1><span>Mother Day</span><br />Debrief 2026</h1>
        <p>
          Customer Service command center for the 2026 Mother's Day event: performance, logistics exposure,
          operational complexity, compensation strategy and C-Team impact.
        </p>
        <div className="heroActions">
          <button onClick={() => setActive(1)}>Enter debrief</button>
          <button className="ghost" onClick={() => setActive(2)}>Open risk assessment</button>
        </div>
      </section>

      <section className="missionIndex tacticalBorder">
        <div className="panelHeader">
          <span>SLIDE MENU</span>
          <span>CLICKABLE</span>
        </div>
        <div className="indexList">
          {slides.slice(1).map((slide, index) => (
            <button key={slide.id} onClick={() => setActive(index + 1)}>
              <strong>{slide.id}</strong>
              <span>{slide.title}</span>
              <small>{slide.kind}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="widePanel tacticalBorder">
        <div className="panelHeader">
          <span>MISSION SNAPSHOT</span>
          <span>STATUS: ACTIVE</span>
        </div>
        <div className="snapshotGrid">
          <div>
            <b>Primary objective</b>
            <p>Retouch the Stitch design into a clean production-grade debrief experience.</p>
          </div>
          <div>
            <b>Current fix</b>
            <p>Slide 0 is now the real first screen with a clickable menu, not the KPI dashboard.</p>
          </div>
          <div>
            <b>Next phase</b>
            <p>Replace each placeholder content block with the exact six slides you sent, one by one.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function KpiSlide() {
  return (
    <div className="contentStack">
      <div className="metricGrid">{kpis.map((item) => <MetricCard key={item[0]} item={item} />)}</div>
      <div className="twoCol">
        <div className="intelBox tacticalBorder">
          <div className="panelHeader"><span>HISTORICAL PERFORMANCE</span><span>SECTOR 7</span></div>
          <div className="barChart">
            {[40, 55, 45, 70, 65, 90, 60, 50].map((h, i) => <span key={i} style={{ height: `${h}%` }} className={i === 5 ? 'current' : ''} />)}
          </div>
        </div>
        <div className="intelBox tacticalBorder">
          <div className="panelHeader danger"><span>ANOMALIES DETECTED</span><span>LIVE</span></div>
          <ul className="feedList">
            <li>SLA threshold breach detected during peak volume.</li>
            <li>Conversation volume above baseline.</li>
            <li>Unit cost remains controlled despite operational pressure.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function GenericSlide({ slide }) {
  const items = {
    '02': ['Logistics partners require tighter handshakes.', 'Missing real-time stock parity creates blindspots.', 'Policy gap around external-node failures.'],
    '03': ['Shipping monitoring requires unlimited file/action handling.', 'Trustpilot and last-minute communications need live moderation.', 'Product configuration and drop-shipping workflows must stay visible.'],
    '04': ['704 customer emails identified for recovery.', 'Physical gift and proactive campaign strategy ready.', 'Cost distribution matrix requires final business validation.'],
    '05': ['SLA improves from baseline.', 'CSAT stabilizes near target.', 'Cross-functional ownership reduces cost and friction.']
  }[slide.id] || [];

  return (
    <div className="genericGrid">
      <section className="statementBlock tacticalBorder">
        <div className={`labelLine ${slide.accent === 'danger' ? 'red' : ''}`}>{slide.tag} // MODULE {slide.id}</div>
        <h2>{slide.title}</h2>
        <p>{slide.subtitle}</p>
      </section>
      <section className="intelBox tacticalBorder">
        <div className="panelHeader"><span>KEY FINDINGS</span><span>{slide.kind}</span></div>
        <ul className="feedList big">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section className="intelBox tacticalBorder span2">
        <div className="panelHeader"><span>DESIGN STATUS</span><span>TO RETOUCH</span></div>
        <p className="bodyCopy">
          This section keeps the tactical design language while avoiding truncated text. We can now replace this placeholder with the exact layout/content from the corresponding Stitch slide.
        </p>
      </section>
    </div>
  );
}

export default function DebriefsPage() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const timestamp = useMemo(() => new Date().toISOString().split('T')[1].split('.')[0] + 'Z', []);

  return (
    <div className="debriefPage">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; }
        html, body, #__next { margin:0; min-height:100%; background:#161308; }
        body { overflow-x:hidden; }
        .debriefPage { min-height:100vh; background:#161308; color:#eae2cf; font-family:'JetBrains Mono', monospace; position:relative; overflow:hidden; }
        .debriefPage:before { content:''; position:fixed; inset:0; pointer-events:none; z-index:50; background:linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,.13) 50%), linear-gradient(90deg, rgba(255,0,0,.035), rgba(0,255,255,.018), rgba(0,0,255,.035)); background-size:100% 3px, 4px 100%; }
        .debriefPage:after { content:'CONFIDENTIAL'; position:fixed; left:50%; top:50%; transform:translate(-50%,-50%) rotate(-14deg); font-family:'Bebas Neue'; font-size:clamp(110px, 18vw, 310px); color:rgba(255,215,0,.035); pointer-events:none; }
        .topBar, .footerBar { position:relative; z-index:5; background:#110e05; border-color:#ffd700; display:flex; align-items:center; justify-content:space-between; gap:22px; padding:18px 48px; }
        .topBar { border-bottom:4px solid #ffd700; }
        .footerBar { border-top:4px solid #ffd700; font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:#ffd700; }
        .brand { font-family:'Bebas Neue'; font-size:clamp(28px, 3vw, 48px); letter-spacing:.08em; color:#ffd700; white-space:nowrap; }
        .motherLink { color:#ffd700; border:1px solid #ffd700; text-decoration:none; padding:10px 12px; text-transform:uppercase; font-weight:900; font-size:12px; letter-spacing:.14em; }
        .status { display:flex; align-items:center; gap:16px; color:#999077; font-weight:800; font-size:13px; }
        .chip { background:#ffd700; color:#221b00; padding:8px 12px; }
        .mainShell { position:relative; z-index:4; display:grid; grid-template-columns:320px 1fr; gap:30px; padding:32px 48px; min-height:calc(100vh - 140px); }
        .sideNav { border:1px solid #4d4732; background:rgba(17,14,5,.82); padding:18px; align-self:start; }
        .sideTitle { color:#999077; font-size:12px; letter-spacing:.16em; font-weight:900; margin-bottom:12px; text-transform:uppercase; }
        .slideButton { width:100%; background:transparent; border:0; border-bottom:1px solid rgba(153,144,119,.35); color:#eae2cf; padding:15px 8px; display:grid; grid-template-columns:60px 1fr; gap:14px; text-align:left; cursor:pointer; }
        .slideButton strong { font-family:'Bebas Neue'; font-size:34px; line-height:1; color:#ff5540; }
        .slideButton span { font-family:'Bebas Neue'; font-size:28px; line-height:1; letter-spacing:.04em; text-transform:uppercase; }
        .slideButton small { display:block; margin-top:4px; color:#999077; font-family:'JetBrains Mono'; font-size:10px; letter-spacing:.12em; }
        .slideButton.active { border-left:4px solid #ffd700; padding-left:14px; background:rgba(255,215,0,.06); }
        .slideButton.active span, .slideButton.active strong { color:#ffd700; }
        .slideButton.tertiary strong { color:#00f1ff; }
        .slideButton.danger strong { color:#ff5540; }
        .contentArea { min-width:0; }
        .slideMeta { display:flex; justify-content:space-between; align-items:center; gap:18px; color:#999077; letter-spacing:.16em; font-size:12px; font-weight:900; text-transform:uppercase; margin-bottom:20px; }
        .pageTitle { font-family:'Bebas Neue'; font-size:clamp(62px, 8.5vw, 142px); line-height:.88; letter-spacing:.035em; text-transform:uppercase; margin:0 0 22px; color:#fff6df; }
        .pageTitle span { color:#ffd700; }
        .landingGrid { display:grid; grid-template-columns:1.2fr .8fr; gap:24px; }
        .heroBlock { min-height:470px; padding:36px; background:rgba(35,31,20,.72); display:flex; flex-direction:column; justify-content:center; }
        .heroBlock h1 { font-family:'Bebas Neue'; font-size:clamp(72px, 10vw, 150px); line-height:.86; margin:16px 0 22px; color:#fff6df; letter-spacing:.035em; text-transform:uppercase; }
        .heroBlock h1 span { color:#ffd700; }
        .heroBlock p, .bodyCopy { color:#d0c6ab; font-size:16px; line-height:1.75; max-width:900px; }
        .heroActions { display:flex; gap:14px; flex-wrap:wrap; margin-top:28px; }
        button { font-family:'JetBrains Mono', monospace; }
        .heroActions button, .missionIndex button, .panelButton { background:#ffd700; color:#221b00; border:2px solid #ffd700; padding:13px 18px; font-weight:900; text-transform:uppercase; cursor:pointer; }
        .heroActions .ghost { background:transparent; color:#ffd700; }
        .tacticalBorder { border:1px solid #4d4732; position:relative; }
        .tacticalBorder:before { content:''; position:absolute; left:-2px; top:-2px; width:14px; height:14px; border-left:2px solid #ffd700; border-top:2px solid #ffd700; }
        .tacticalBorder:after { content:''; position:absolute; right:-2px; bottom:-2px; width:14px; height:14px; border-right:2px solid #ffd700; border-bottom:2px solid #ffd700; }
        .labelLine { color:#ffd700; font-size:12px; letter-spacing:.18em; font-weight:900; text-transform:uppercase; }
        .labelLine.red { color:#ff5540; }
        .missionIndex, .widePanel, .intelBox, .statementBlock { background:rgba(35,31,20,.72); }
        .panelHeader { display:flex; justify-content:space-between; gap:12px; background:#2e2a1e; border-bottom:1px solid #4d4732; color:#ffd700; padding:12px 16px; font-size:11px; font-weight:900; letter-spacing:.14em; text-transform:uppercase; }
        .panelHeader.danger { color:#ff5540; }
        .indexList { padding:16px; display:grid; gap:10px; }
        .indexList button { background:#161308; color:#eae2cf; border:1px solid #4d4732; display:grid; grid-template-columns:52px 1fr auto; gap:12px; align-items:center; text-align:left; }
        .indexList strong { color:#ffd700; font-family:'Bebas Neue'; font-size:30px; }
        .indexList small { color:#999077; }
        .widePanel { grid-column:1 / -1; }
        .snapshotGrid { display:grid; grid-template-columns:repeat(3, 1fr); gap:18px; padding:22px; }
        .snapshotGrid b { color:#ffd700; text-transform:uppercase; }
        .snapshotGrid p { color:#d0c6ab; line-height:1.65; }
        .contentStack { display:grid; gap:24px; }
        .metricGrid { display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:18px; }
        .metricCard { border:1px solid rgba(234,226,207,.35); padding:20px; min-height:180px; background:rgba(35,31,20,.76); }
        .metricCard.danger { border-color:#ff5540; }
        .metricCard.tertiary { border-color:#00f1ff; }
        .metricValue { font-family:'Bebas Neue'; font-size:clamp(52px, 5vw, 92px); color:#ffd700; line-height:.95; margin-top:18px; text-transform:uppercase; }
        .metricCard.danger .metricValue { color:#ff5540; }
        .metricCard.tertiary .metricValue { color:#00f1ff; }
        .metricMeta { color:#999077; margin-top:6px; font-size:13px; }
        .progress { height:8px; background:#393528; margin-top:20px; overflow:hidden; }
        .progress span { display:block; height:100%; background:#ffd700; }
        .danger .progress span { background:#ff5540; }
        .tertiary .progress span { background:#00f1ff; }
        .twoCol { display:grid; grid-template-columns:1.4fr .8fr; gap:22px; }
        .intelBox { min-height:250px; }
        .barChart { height:300px; display:flex; align-items:flex-end; gap:14px; padding:24px; }
        .barChart span { flex:1; background:#393528; min-height:20px; }
        .barChart .current { background:#ffd700; }
        .feedList { color:#d0c6ab; line-height:1.7; padding:24px 24px 24px 42px; margin:0; }
        .feedList li { margin-bottom:16px; }
        .feedList.big { font-size:18px; }
        .genericGrid { display:grid; grid-template-columns:1fr 1fr; gap:22px; }
        .statementBlock { padding:32px; min-height:320px; }
        .statementBlock h2 { font-family:'Bebas Neue'; font-size:clamp(60px, 7vw, 118px); line-height:.9; letter-spacing:.04em; margin:16px 0; text-transform:uppercase; color:#fff6df; }
        .statementBlock p { color:#d0c6ab; line-height:1.7; font-size:18px; }
        .span2 { grid-column:1 / -1; padding-bottom:22px; }
        .span2 .bodyCopy { padding:24px; margin:0; }
        @media (max-width: 1180px) { .mainShell { grid-template-columns:1fr; } .sideNav { display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; } .sideTitle { grid-column:1/-1; } .slideButton { border:1px solid rgba(153,144,119,.35); } .landingGrid, .twoCol, .genericGrid { grid-template-columns:1fr; } .metricGrid, .snapshotGrid { grid-template-columns:repeat(2, 1fr); } }
        @media (max-width: 720px) { .topBar, .footerBar { padding:14px 18px; } .status { display:none; } .motherLink { display:none; } .mainShell { padding:22px 16px; } .sideNav { grid-template-columns:1fr; } .metricGrid, .snapshotGrid { grid-template-columns:1fr; } .heroBlock { min-height:auto; padding:26px 20px; } .indexList button { grid-template-columns:44px 1fr; } .indexList small { display:none; } }
      `}</style>

      <header className="topBar">
        <div className="brand">CLASSIFIED // TENENGROUP DEBRIEF</div>
        <a className="motherLink" href="#" onClick={(e) => { e.preventDefault(); setActive(0); }}>Mother Day Debrief 2026</a>
        <div className="status"><span>{timestamp}</span><span className="chip">STATUS: ACTIVE</span></div>
      </header>

      <main className="mainShell">
        <aside className="sideNav">
          <div className="sideTitle">Debrief navigation</div>
          {slides.map((item, index) => (
            <SlideButton key={item.id} slide={item} active={active === index} onClick={() => setActive(index)} />
          ))}
        </aside>

        <section className="contentArea">
          <div className="slideMeta"><span>{slide.kind} // MODULE {slide.id}</span><span>{slide.tag}</span></div>
          {active === 0 ? (
            <Landing setActive={setActive} />
          ) : (
            <>
              <h1 className="pageTitle"><span>{slide.title.split(' ')[0]}</span> {slide.title.split(' ').slice(1).join(' ')}</h1>
              {active === 1 ? <KpiSlide /> : <GenericSlide slide={slide} />}
            </>
          )}
        </section>
      </main>

      <footer className="footerBar">
        <span>FOR EYES ONLY // MISSION SUCCESS</span>
        <span>PAGE {slide.id}/05</span>
        <span>SECURE LINK</span>
      </footer>
    </div>
  );
}
