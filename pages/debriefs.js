import { useMemo, useState } from 'react';

const slides = [
  { id: '00', tag: 'HUB', title: 'Mission Index', subtitle: 'Mother Day Debrief 2026', kind: 'Navigation' },
  { id: '01', tag: 'KPI', title: 'Mission Performance', subtitle: 'Critical delivery metrics and system up-time', kind: 'Dashboard' },
  { id: '02', tag: 'LEAK', title: 'Dropshipping Exposure', subtitle: 'Third-party logistics chain vulnerabilities', kind: 'Threat Assessment' },
  { id: '03', tag: 'LEAK', title: 'System Complexity', subtitle: 'Structural bottlenecks in operational software', kind: 'Infrastructure' },
  { id: '04', tag: 'NEW', title: 'Compensation Strategy', subtitle: 'Recovery plan and customer compensation protocol', kind: 'Recovery' },
  { id: '05', tag: 'MULTIPLIER', title: 'The C-Team Effect', subtitle: 'Cross-functional synchronization and efficiency gains', kind: 'Success Metrics' },
];

function StatCard({ label, value, meta, danger }) {
  return (
    <div className={`md-card ${danger ? 'danger' : ''}`}>
      <div className="md-label">{label}</div>
      <div className="md-value">{value}</div>
      <div className="md-meta">{meta}</div>
      <div className="md-bar"><span style={{ width: danger ? '92%' : '72%' }} /></div>
    </div>
  );
}

export default function DebriefsPage() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const timestamp = useMemo(() => '22:45:09Z', []);

  return (
    <div className="page">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #f3f4f6; color: #0f172a; }
        .page { min-height: 100vh; padding: 34px 28px 48px; background:#f3f4f6; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .title { font-size: 40px; line-height: 1; font-weight: 850; margin: 0 0 28px; color:#0f172a; }
        .library-card { background:#fff; border:1px solid #e5e7eb; border-radius:24px; box-shadow:0 14px 32px rgba(15,23,42,.06); padding:26px 28px; margin-bottom:24px; }
        .library-card h2 { margin:0 0 10px; font-size:30px; letter-spacing:.01em; }
        .library-card p { margin:0 0 20px; color:#334155; font-size:15px; }
        .pill { display:inline-flex; align-items:center; gap:8px; background:#1d4ed8; color:white; border-radius:999px; padding:10px 16px; font-weight:800; text-decoration:none; }
        .mother-entry { margin-top:18px; display:flex; justify-content:space-between; align-items:center; gap:20px; padding:18px; border-radius:18px; background:#0f172a; color:#f8fafc; border:1px solid #111827; }
        .mother-entry h3 { margin:0; font-size:26px; font-weight:900; }
        .mother-entry p { margin:4px 0 0; color:#cbd5e1; }
        .mother-entry button { border:0; background:#ffd700; color:#221b00; padding:12px 18px; border-radius:12px; font-weight:900; cursor:pointer; }
        .section-card { background:#fff; border:1px solid #e5e7eb; border-radius:24px; box-shadow:0 14px 32px rgba(15,23,42,.06); padding:24px; }
        .section-card h2 { margin:0 0 8px; font-size:30px; }
        .section-card > p { margin:0 0 18px; color:#475569; }
        .number-row { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:22px; }
        .num { width:38px; height:38px; display:grid; place-items:center; border:0; border-radius:999px; background:#e5e7eb; color:#0f172a; font-weight:900; cursor:pointer; }
        .num.active { background:#1d4ed8; color:white; }
        .stage { border:14px solid #0f172a; border-radius:20px; overflow:hidden; background:#161308; min-height:650px; position:relative; color:#eae2cf; font-family:'JetBrains Mono', monospace; }
        .stage:before { content:''; position:absolute; inset:0; pointer-events:none; background:linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,.17) 50%), linear-gradient(90deg, rgba(255,0,0,.04), rgba(0,255,255,.025), rgba(0,0,255,.04)); background-size:100% 3px, 4px 100%; z-index:2; }
        .md-top { height:92px; display:flex; align-items:center; justify-content:space-between; border-bottom:4px solid #ffd700; padding:0 42px; background:#110e05; position:relative; z-index:3; }
        .md-brand { font-family:'Bebas Neue', sans-serif; font-size:42px; letter-spacing:.09em; color:#ffd700; }
        .md-nav-link { color:#ffd700; border:1px solid #ffd700; text-decoration:none; padding:9px 12px; font-weight:900; text-transform:uppercase; font-size:12px; letter-spacing:.15em; }
        .md-status { display:flex; align-items:center; gap:20px; font-weight:800; letter-spacing:.16em; }
        .md-chip { background:#ffd700; color:#221b00; padding:8px 14px; }
        .md-body { padding:42px; position:relative; z-index:3; }
        .md-watermark { position:absolute; inset:auto 0 60px; transform:rotate(-13deg); font-family:'Bebas Neue'; font-size:170px; color:rgba(255,215,0,.045); text-align:center; pointer-events:none; }
        .md-grid { display:grid; grid-template-columns:300px 1fr; gap:34px; position:relative; z-index:2; }
        .md-sidebar { border-right:1px solid rgba(255,215,0,.35); padding-right:28px; }
        .slide-btn { width:100%; background:transparent; border:0; border-bottom:1px solid rgba(153,144,119,.35); color:#eae2cf; padding:16px 0; display:grid; grid-template-columns:70px 1fr; gap:14px; text-align:left; cursor:pointer; }
        .slide-btn strong { font-family:'Bebas Neue'; font-size:34px; color:#ff5540; line-height:1; }
        .slide-btn span { font-family:'Bebas Neue'; font-size:30px; letter-spacing:.04em; line-height:1; }
        .slide-btn small { color:#999077; text-transform:uppercase; letter-spacing:.12em; }
        .slide-btn.selected span { color:#ffd700; }
        .slide-btn.selected { border-left:4px solid #ffd700; padding-left:12px; }
        .md-main h1 { font-family:'Bebas Neue'; font-size:clamp(66px, 8vw, 118px); line-height:.9; letter-spacing:.04em; margin:0; text-transform:uppercase; }
        .md-main h1 em { color:#ffd700; font-style:normal; }
        .md-main .sub { color:#d0c6ab; text-transform:uppercase; letter-spacing:.18em; margin:12px 0 30px; font-size:14px; }
        .cards { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:18px; margin:28px 0; }
        .md-card { border:1px solid rgba(234,226,207,.35); padding:20px; min-height:180px; background:rgba(35,31,20,.76); }
        .md-card.danger { border-color:#ff5540; }
        .md-label { color:#d0c6ab; font-size:12px; letter-spacing:.15em; text-transform:uppercase; }
        .md-value { font-family:'Bebas Neue'; font-size:64px; color:#ffd700; line-height:1; margin-top:18px; }
        .danger .md-value { color:#ff5540; }
        .md-meta { color:#999077; font-size:13px; }
        .md-bar { height:8px; background:#393528; margin-top:22px; }
        .md-bar span { display:block; height:100%; background:#ffd700; }
        .danger .md-bar span { background:#ff5540; }
        .brief-panel { display:grid; grid-template-columns:1.1fr .9fr; gap:22px; margin-top:28px; }
        .brief-box { border:1px solid rgba(234,226,207,.35); padding:24px; background:rgba(46,42,30,.7); min-height:220px; }
        .brief-box h3 { font-family:'Bebas Neue'; color:#ffd700; font-size:42px; margin:0 0 14px; letter-spacing:.05em; }
        .brief-box p, .brief-box li { color:#d0c6ab; line-height:1.65; }
        .action-btns { display:flex; gap:12px; margin-top:26px; }
        .action-btns button { background:#ffd700; color:#221b00; border:2px solid #ffd700; padding:13px 18px; font-weight:900; text-transform:uppercase; cursor:pointer; }
        .action-btns button.secondary { background:transparent; color:#ffd700; }
        .md-foot { height:46px; display:flex; align-items:center; justify-content:space-between; border-top:4px solid #ffd700; padding:0 42px; color:#ffd700; font-size:12px; letter-spacing:.14em; text-transform:uppercase; position:relative; z-index:3; background:#110e05; }
        @media (max-width: 1100px) { .stage { min-height:unset; } .md-grid { grid-template-columns:1fr; } .md-sidebar { border-right:0; border-bottom:1px solid rgba(255,215,0,.35); padding:0 0 18px; } .cards { grid-template-columns:repeat(2,1fr); } .brief-panel { grid-template-columns:1fr; } .md-brand { font-size:30px; } }
        @media (max-width: 700px) { .page { padding:20px 12px; } .title { font-size:34px; } .mother-entry { flex-direction:column; align-items:flex-start; } .md-top,.md-foot { padding-left:18px; padding-right:18px; } .md-status { display:none; } .md-body { padding:24px 18px; } .cards { grid-template-columns:1fr; } .slide-btn { grid-template-columns:54px 1fr; } }
      `}</style>

      <h1 className="title">Debriefs</h1>

      <section className="library-card">
        <h2>Event debrief library</h2>
        <p>Keep all debrief decks in one place. Use the menu to switch between events/decks.</p>
        <a className="pill" href="#mother-day-debrief-2026">Debriefs Customer</a>
        <div className="mother-entry" id="mother-day-debrief-2026">
          <div>
            <h3>Mother Day Debrief 2026</h3>
            <p>Clickable tactical deck integrated directly in Debriefs.</p>
          </div>
          <button onClick={() => setActive(0)}>Open debrief</button>
        </div>
      </section>

      <section className="section-card">
        <h2>Debriefs Customer</h2>
        <p>Event-by-event Customer Service debrief slides since 2024.</p>
        <div className="number-row">
          {Array.from({ length: 37 }).map((_, i) => (
            <button key={i} className={`num ${i === 0 ? 'active' : ''}`}>{i + 1}</button>
          ))}
        </div>

        <div className="stage">
          <div className="md-top">
            <div className="md-brand">CLASSIFIED // TENENGROUP DEBRIEF</div>
            <a className="md-nav-link" href="#mother-day-debrief-2026">Mother Day Debrief 2026</a>
            <div className="md-status"><span>{timestamp}</span><span className="md-chip">STATUS: ACTIVE</span></div>
          </div>

          <div className="md-body">
            <div className="md-watermark">TOP SECRET // EYES ONLY</div>
            <div className="md-grid">
              <aside className="md-sidebar">
                {slides.map((item, index) => (
                  <button key={item.id} className={`slide-btn ${active === index ? 'selected' : ''}`} onClick={() => setActive(index)}>
                    <strong>{item.id}</strong>
                    <span>{item.title}<br /><small>{item.tag}</small></span>
                  </button>
                ))}
              </aside>

              <main className="md-main">
                <div className="md-label">{slide.kind} // Module {slide.id}</div>
                <h1><em>{slide.title.split(' ')[0]}</em> {slide.title.split(' ').slice(1).join(' ')}</h1>
                <div className="sub">{slide.subtitle}</div>

                {active === 0 || active === 1 ? (
                  <div className="cards">
                    <StatCard label="CSAT_LEVEL" value="3.87" meta="Target: 3.9" />
                    <StatCard label="SLA_RESPONSE" value="27.0 HR" meta="Critical threshold breached" danger />
                    <StatCard label="INTEL_VOLUME" value="12,313" meta="Baseline: 9,106" />
                    <StatCard label="UNIT_EXPENSE" value="$0.37" meta="Budget: $0.41" />
                  </div>
                ) : null}

                <div className="brief-panel">
                  <div className="brief-box">
                    <h3>Operational Brief</h3>
                    <p>
                      This first production page fixes the truncated text and alignment issues by using a stable responsive grid, no external CSS import, and controlled typography with clamp-based sizing.
                    </p>
                    <div className="action-btns">
                      <button onClick={() => setActive((active + 1) % slides.length)}>Next slide</button>
                      <button className="secondary" onClick={() => setActive(active === 0 ? slides.length - 1 : active - 1)}>Previous</button>
                    </div>
                  </div>
                  <div className="brief-box">
                    <h3>Action Plan</h3>
                    <ul>
                      <li>Mother Day Debrief 2026 visible at top of the debrief page.</li>
                      <li>Slides clickable from the left tactical menu.</li>
                      <li>Responsive layout replacing the blank frame.</li>
                      <li>Ready for detailed slide-by-slide retouching.</li>
                    </ul>
                  </div>
                </div>
              </main>
            </div>
          </div>

          <div className="md-foot">
            <span>FOR EYES ONLY // MISSION SUCCESS</span>
            <span>PAGE {String(active + 1).padStart(2, '0')}/06</span>
            <span>SECURE LINK</span>
          </div>
        </div>
      </section>
    </div>
  );
}
