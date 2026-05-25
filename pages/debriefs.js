import { useMemo, useState } from 'react';
import styles from '../../styles/MotherDayDebrief.module.css';

const slides = [
  {
    id: '01',
    nav: 'KPI',
    eyebrow: 'MISSION PERFORMANCE',
    title: 'Mission Performance',
    subtitle: 'Targeting delivery metrics and system up-time',
    type: 'kpi',
  },
  {
    id: '02',
    nav: 'Leak',
    eyebrow: 'THREAT ASSESSMENT',
    title: 'Dropshipping Exposure',
    subtitle: 'Analyzing vulnerabilities in third-party logistics chains',
    type: 'exposure',
  },
  {
    id: '03',
    nav: 'Leak',
    eyebrow: 'SYSTEM OVERVIEW',
    title: 'System Complexity',
    subtitle: 'Identifying structural bottlenecks in operational software',
    type: 'complexity',
  },
  {
    id: '04',
    nav: 'New',
    eyebrow: 'SUCCESS RECOVERY',
    title: 'Compensation Strategy',
    subtitle: 'Implementing high-incentive operational protocols',
    type: 'compensation',
  },
  {
    id: '05',
    nav: 'Multiplier',
    eyebrow: 'MISSION PARAMETERS',
    title: 'The C-Team Effect',
    subtitle: 'Performance scaling through cross-functional synchronization',
    type: 'team',
  },
];

function MetricCard({ label, value, delta, accent = 'yellow', note }) {
  return (
    <div className={`${styles.metricCard} ${styles[accent]}`}>
      <div className={styles.metricLabel}>{label}</div>
      <div className={styles.metricValue}>{value}</div>
      <div className={styles.metricDelta}>{delta}</div>
      <div className={styles.segmentBar}><span /></div>
      <div className={styles.metricNote}>{note}</div>
    </div>
  );
}

function SlideContent({ slide }) {
  if (slide.type === 'kpi') {
    return (
      <div className={styles.kpiGrid}>
        <MetricCard label="CSAT_LEVEL" value="3.87" delta="▼ 0.03 target: 3.9" note="Lower bound 3.0 / upper bound 4.0" />
        <MetricCard label="SLA_RESPONSE" value="27.0 HR" delta="▲ 8.5 target: 18.5" accent="red" note="Critical threshold breached" />
        <MetricCard label="INTEL_VOLUME" value="12,313" delta="▲ 3,207 baseline: 9,106" accent="cyan" note="Operational capacity: 82%" />
        <MetricCard label="UNIT_EXPENSE" value="$0.37" delta="▼ $0.04 budget: $0.41" note="Efficiency optimized" />
        <div className={styles.chartPanel}>
          <div className={styles.panelHeader}>Historical performance tracking [sector_7]</div>
          <div className={styles.fakeChart}>{[32, 48, 39, 66, 59, 88, 53, 43].map((h, i) => <span key={i} style={{ height: `${h}%` }} className={i === 5 ? styles.currentBar : ''} />)}</div>
        </div>
        <div className={styles.feedPanel}>
          <div className={styles.panelHeaderRed}>Anomalies detected</div>
          <p>SLA threshold breach in AP-SOUTHEAST-1. High volume detected.</p>
          <p>Unit cost reduction successful following AI-Agent deployment.</p>
          <p>CSAT stabilizing at 3.87 after localized dip.</p>
        </div>
      </div>
    );
  }

  if (slide.type === 'exposure') {
    return (
      <div className={styles.twoColumn}>
        <div className={styles.stack}>
          <div className={styles.intelBox}><b>LOGISTICS PARTNERS</b><span>NODE_A — JONDO</span><span>NODE_B — SHINEON</span></div>
          <div className={styles.alertBox}><b>SYSTEM INTERACTION</b><p>Automated sync failure detected between front-end UI and fulfillment back-end. Real-time parity compromised.</p></div>
          <div className={styles.redBand}>SHIPPING VOIDS DETECTED // EU SOUTH-WEST // APAC HUB B // LATAM CORRIDOR</div>
        </div>
        <div className={styles.actionPlan}>
          <b>OPERATIONAL ACTION PLAN</b>
          <h3>01 RE-ESTABLISH HANDSHAKE</h3>
          <h3>02 VOID NEUTRALIZATION</h3>
          <h3>03 POLICY RECONSTRUCTION</h3>
        </div>
      </div>
    );
  }

  if (slide.type === 'complexity') {
    return (
      <div className={styles.complexityGrid}>
        <div className={styles.bigLabel}>SYSTEM<br />COMPLEXITY</div>
        <div className={styles.moduleBox}>SHIPPING MONITORING<br /><b>UNLIMITED</b></div>
        <div className={styles.moduleBox}>LIVE MODERATION<br /><b>TRUSTPILOT</b></div>
        <div className={styles.moduleBox}>URGENT COMMS<br /><b>LAST MINUTE</b></div>
        <div className={styles.yellowBlock}>NEW MATERIAL STRATEGY</div>
      </div>
    );
  }

  if (slide.type === 'compensation') {
    return (
      <div className={styles.compGrid}>
        <div className={styles.compSide}><span>COMPENSATION UNIT</span><b>704</b><em>EMAILS</em><p>Deployment successful across 12 sectors.</p></div>
        <div className={styles.costTable}>
          <h3>COST DISTRIBUTION MATRIX</h3>
          <div><span>LOGISTICS: PHYSICAL ASSETS</span><b>$24,800</b></div>
          <div><span>CAMPAIGN DISSEMINATION</span><b>$12,150</b></div>
          <div><span>CLIENT RECOVERY UNIT</span><b>$18,400</b></div>
          <footer>TOTAL MISSION COST <b>$55,350</b></footer>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.teamGrid}>
      <div><h3>THE C-TEAM<br /><span>EFFECT</span></h3><p>Cross-functional synchronization achieved. Performance scaling indicates a structural efficiency breakthrough across primary operational metrics.</p><strong>-10% COST REDUCTION</strong></div>
      <MetricCard label="SLA_METRIC_REF" value="17.12" delta="baseline: 19.54" />
      <MetricCard label="CSAT_SATISFACTION" value="3.99" delta="vs 3.88 previous period" accent="cyan" />
      <div className={styles.moduleBox}><b>82,400</b><br />Total messages processed</div>
    </div>
  );
}

export default function DebriefsPage() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const progress = useMemo(() => `${active + 1}`.padStart(2, '0'), [active]);

  return (
    <div className={styles.pageShell}>
      <section className={styles.libraryHero}>
        <h1>Debriefs</h1>
        <div className={styles.heroCard}>
          <h2>Event debrief library</h2>
          <p>Keep all debrief decks in one place. Use the menu to switch between events/decks.</p>
          <button>Debriefs Customer</button>
          <button className={styles.motherButton} onClick={() => setActive(0)}>Mother Day Debrief 2026</button>
        </div>
      </section>

      <section className={styles.debriefSection} id="mother-day-debrief-2026">
        <div className={styles.debriefHeader}>
          <div>
            <p>CLASSIFIED // TENENGROUP</p>
            <h2>Mother Day Debrief 2026</h2>
          </div>
          <a href="#mother-day-debrief-2026">STATUS: ACTIVE</a>
        </div>

        <div className={styles.deckNav}>
          {slides.map((item, index) => (
            <button key={item.id} onClick={() => setActive(index)} className={active === index ? styles.activeDot : ''}>
              {item.id}-{item.nav}
            </button>
          ))}
        </div>

        <article className={styles.deckFrame}>
          <aside className={styles.slideMenu}>
            {slides.map((item, index) => (
              <button key={item.id} onClick={() => setActive(index)} className={active === index ? styles.activeSlide : ''}>
                <span>{item.id}</span>{item.nav}
              </button>
            ))}
          </aside>

          <main className={styles.slideCanvas}>
            <div className={styles.scanlines} />
            <header className={styles.slideTopbar}>
              <b>CLASSIFIED // TENENGROUP DEBRIEF</b>
              <span>22:45:09Z</span>
              <em>STATUS: ACTIVE</em>
            </header>
            <section className={styles.slideHero}>
              <small>{slide.eyebrow} // MODULE {progress}</small>
              <h3>{slide.title}</h3>
              <p>{slide.subtitle}</p>
            </section>
            <SlideContent slide={slide} />
            <footer className={styles.slideFooter}>FOR EYES ONLY // MISSION SUCCESS <span>PAGE {progress}/05</span></footer>
          </main>
        </article>
      </section>
    </div>
  );
}
