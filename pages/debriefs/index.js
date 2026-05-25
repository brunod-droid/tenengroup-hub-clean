import { useMemo, useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/MotherDayDebrief.module.css';

const slides = [
  {
    id: 'hub',
    nav: 'Mother Day 2026',
    eyebrow: 'FOR EYES ONLY // MISSION SUCCESS',
    title: 'MOTHER DAY\nDEBRIEF 2026',
    type: 'hub',
  },
  {
    id: 'kpi',
    nav: '01 KPI',
    eyebrow: 'MISSION PERFORMANCE',
    title: 'KPI DASHBOARD',
    type: 'kpi',
  },
  {
    id: 'dropshipping',
    nav: '02 Leak',
    eyebrow: 'THREAT ASSESSMENT // MODULE 02',
    title: 'DROPSHIPPING\nEXPOSURE',
    type: 'dropshipping',
  },
  {
    id: 'complexity',
    nav: '03 Complexity',
    eyebrow: 'SYSTEM OVERVIEW',
    title: 'SYSTEM\nCOMPLEXITY',
    type: 'complexity',
  },
  {
    id: 'compensation',
    nav: '04 Compensation',
    eyebrow: 'INTEL RECOVERY // 04',
    title: 'COMPENSATION\nSTRATEGY',
    type: 'compensation',
  },
  {
    id: 'cteam',
    nav: '05 C-Team',
    eyebrow: 'MISSION PARAMETERS: MULTIPLIER EFFECT',
    title: 'THE C-TEAM\nEFFECT',
    type: 'cteam',
  },
];

function StatCard({ label, value, delta, tone = 'yellow', footer }) {
  return (
    <div className={`${styles.card} ${styles[`tone_${tone}`]}`}>
      <div className={styles.cardLabel}>{label}</div>
      <div className={styles.cardValue}>{value}</div>
      <div className={styles.delta}>{delta}</div>
      <div className={styles.bar}><span /></div>
      <div className={styles.cardFooter}>{footer}</div>
    </div>
  );
}

function Hub({ setActive }) {
  const items = slides.slice(1);
  return (
    <div className={styles.hubGrid}>
      <section className={styles.hubHero}>
        <div className={styles.eyebrow}>CLASSIFIED // TENENGROUP</div>
        <h2>Mother Day<br />Debrief 2026</h2>
        <p>Event debrief library redesigned as a tactical briefing deck. Use the slide index to navigate, review KPIs, identify operational risks and validate the recovery plan.</p>
        <button onClick={() => setActive(1)}>Open briefing</button>
      </section>
      <section className={styles.hubList}>
        {items.map((slide, index) => (
          <button key={slide.id} onClick={() => setActive(index + 1)} className={styles.hubItem}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{slide.nav.replace(/^\d+\s*/, '')}</strong>
            <em>{slide.eyebrow}</em>
          </button>
        ))}
      </section>
    </div>
  );
}

function Kpi() {
  return (
    <div className={styles.kpiGrid}>
      <StatCard label="Metric: CSAT_LEVEL" value="3.87" delta="▼ 0.03 Target: 3.9" footer="Lower bound: 3.0 / Upper bound: 4.0" />
      <StatCard label="Metric: SLA_RESPONSE" value="27.0 HR" delta="▲ 8.5 Target: 18.5" tone="red" footer="Critical threshold breached" />
      <StatCard label="Metric: INTEL_VOLUME" value="12,313" delta="▲ 3,207 Baseline: 9,106" tone="cyan" footer="Operational capacity: 82%" />
      <StatCard label="Metric: UNIT_EXPENSE" value="$0.37" delta="▼ $0.04 Budget: $0.41" footer="Efficiency optimized" />
      <div className={styles.chartPanel}>
        <div className={styles.panelTitle}>Historical performance tracking [sector_7]</div>
        <div className={styles.bars}>{[38, 52, 44, 68, 62, 90, 57, 48].map((h, i) => <span key={i} style={{ height: `${h}%` }} className={i === 5 ? styles.hotBar : ''} />)}</div>
      </div>
      <div className={styles.anomalyPanel}>
        <h3>Anomalies detected</h3>
        <p><b>22:41:00Z</b> SLA threshold breach detected.</p>
        <p><b>21:15:30Z</b> Unit cost reduction successful after AI-agent deployment.</p>
        <p><b>19:04:12Z</b> CSAT stabilizing after localized dip.</p>
      </div>
    </div>
  );
}

function Dropshipping() {
  return (
    <div className={styles.twoCol}>
      <div>
        <div className={styles.alert}>Threat assessment // module 02</div>
        <h2>Dropshipping <span>Exposure</span></h2>
        <div className={styles.infoBox}><b>Logistics partners</b><p>NODE_A: JONDO<br />NODE_B: SHINEON</p></div>
        <div className={styles.redBox}>Automated sync failure detected between front-end UI and fulfillment back-end. Real-time parity compromised.</div>
      </div>
      <div className={styles.actionPlan}>
        <h3>Operational action plan</h3>
        <ol>
          <li><b>Re-establish handshake</b><span>Deploy immediate API bridge between vendor and local fulfillment clusters.</span></li>
          <li><b>Void neutralization</b><span>Reroute pending shipments through secondary hubs.</span></li>
          <li><b>Policy reconstruction</b><span>Formalize tier-2 vendor liability clauses.</span></li>
        </ol>
      </div>
    </div>
  );
}

function Complexity() {
  return (
    <div className={styles.complexityGrid}>
      <div className={styles.bigBlock}><h2>System<br />Complexity</h2><p>Phase 03: mission critical infrastructure debrief.</p></div>
      <div className={styles.scheme}>CORE INTELLIGENCE<br /><strong>Technical schematic analysis of multi-flow system architecture.</strong></div>
      <div className={styles.infoBox}><b>Shipping monitoring</b><h3>Unlimited</h3><p>Actions / files processed</p></div>
      <div className={styles.infoBox}><b>Live moderation</b><h3>Trustpilot</h3><p>Real-time monitoring enabled</p></div>
      <div className={styles.yellowBox}><b>Strategic update</b><h3>New material strategy</h3></div>
    </div>
  );
}

function Compensation() {
  return (
    <div className={styles.compGrid}>
      <aside className={styles.sideMetric}><span>Compensation unit</span><strong>704</strong><em>emails</em><p>Deployment successful across 12 sectors. Communications encrypted.</p></aside>
      <section className={styles.matrix}>
        <h2>Cost distribution matrix</h2>
        {[['Logistics: physical assets', '$24,800.00', 'Optimized'], ['Campaign dissemination', '$12,150.00', 'Nominal'], ['Client recovery unit', '$18,400.00', 'High priority']].map((r) => (
          <div key={r[0]} className={styles.matrixRow}><b>{r[0]}</b><span>{r[1]}</span><em>{r[2]}</em></div>
        ))}
        <div className={styles.total}>Total mission cost <strong>$55,350.00</strong></div>
      </section>
    </div>
  );
}

function CTeam() {
  return (
    <div className={styles.cteamGrid}>
      <section><h2>The C-Team<br /><span>Effect</span></h2><p>Cross-functional synchronization achieved. Performance scaling indicates structural efficiency breakthrough across primary operational metrics.</p><div className={styles.redStamp}>-10% cost reduction</div></section>
      <aside className={styles.readouts}><StatCard label="SLA_METRIC_REF" value="17.12" delta="Baseline: 19.54" footer="Improved response time" /><StatCard label="CSAT_SATISFACTION" value="3.99" delta="vs 3.88 prev period" tone="cyan" footer="Satisfaction increase" /><div className={styles.infoBox}><b>Total messages processed</b><h3>82,400</h3><p>Real-time throughput analysis active.</p></div></aside>
    </div>
  );
}

function SlideContent({ slide, setActive }) {
  if (slide.type === 'hub') return <Hub setActive={setActive} />;
  if (slide.type === 'kpi') return <Kpi />;
  if (slide.type === 'dropshipping') return <Dropshipping />;
  if (slide.type === 'complexity') return <Complexity />;
  if (slide.type === 'compensation') return <Compensation />;
  return <CTeam />;
}

export default function DebriefsPage() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const pageLabel = useMemo(() => active === 0 ? '00/05' : `${String(active).padStart(2, '0')}/05`, [active]);

  return (
    <>
      <Head><title>Debriefs | Mother Day Debrief 2026</title></Head>
      <div className={styles.pageShell}>
        <div className={styles.crt} />
        <header className={styles.topbar}>
          <div className={styles.brand}>CLASSIFIED // TENENGROUP DEBRIEF</div>
          <button className={styles.motherLink} onClick={() => setActive(0)}>Mother Day Debrief 2026</button>
          <div className={styles.status}><span>22:45:09Z</span><b>Status: active</b></div>
        </header>

        <main className={styles.deckWrap}>
          <nav className={styles.deckNav} aria-label="Mother Day Debrief slides">
            {slides.map((item, index) => <button key={item.id} onClick={() => setActive(index)} className={active === index ? styles.activeNav : ''}>{item.nav}</button>)}
          </nav>

          <section className={styles.slideFrame}>
            <div className={styles.watermark}>TOP SECRET</div>
            <div className={styles.slideHeader}>
              <span>{slide.eyebrow}</span>
              <strong>PAGE {pageLabel}</strong>
            </div>
            <SlideContent slide={slide} setActive={setActive} />
          </section>
        </main>

        <footer className={styles.footer}>
          <span>FOR EYES ONLY // MISSION SUCCESS</span>
          <div><button onClick={() => setActive(Math.max(0, active - 1))}>Prev</button><button onClick={() => setActive(Math.min(slides.length - 1, active + 1))}>Next</button></div>
        </footer>
      </div>
    </>
  );
}
