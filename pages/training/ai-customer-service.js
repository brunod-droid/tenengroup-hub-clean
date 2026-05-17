import { useState } from "react";

const COLORS = {
  intro: "#67e8f9",
  agent: "#f97316",
  chat: "#3b82f6",
  project: "#8b5cf6",
  gpt: "#22c55e",
  hub: "#06b6d4",
};

const slides = [
  {
    type: "hero_image",
    section: "intro",
    title: "AI AT WORK",
    subtitle: "Smarter tools. Stronger teams. Better results.",
    image: "/ai-work-hero.png",
  },
  {
    type: "formats",
    section: "intro",
    title: "Choose the right AI format",
    subtitle: "This is the map for the full training.",
    cards: [
      ["Agent", "Autonomous workflow", "Runs, searches, sends"],
      ["Chat", "Quick assistance", "Rewrite, summarize, explain"],
      ["Project", "Shared workspace", "Files + chats + context"],
      ["GPT", "Repeatable expert", "Same rules, same output"],
      ["Hub", "Company knowledge", "Reusable documentation"],
    ],
  },
  {
    type: "maturity",
    section: "intro",
    title: "How mature is your AI usage?",
    subtitle: "Most teams start simple, then move toward repeatable workflows.",
    cards: [
      ["Beginner", "Rewrite emails and messages"],
      ["Intermediate", "Analyze files and summarize information"],
      ["Advanced", "Create shared workspaces with files"],
      ["Expert", "Standardize repeatable business logic"],
      ["Autonomous", "AI Agents running workflows automatically"],
    ],
  },
  {
    type: "painpoints",
    section: "intro",
    title: "Where do teams lose the most time?",
    subtitle: "This is exactly where AI can help.",
    cards: [
      ["Customer Service", "Repetitive replies & ticket analysis"],
      ["Factory", "Supplier delays & monitoring"],
      ["Operations", "Weekly reporting & consolidation"],
      ["Brand", "Searching competitor information"],
      ["Developers", "Documentation & requirements"],
      ["Ecommerce", "KPIs & trends consolidation"],
    ],
  },
  {
    type: "agent_intro",
    section: "agent",
    title: "AI Agent = autonomous workflow",
    subtitle: "An AI Agent can search, analyze and send information automatically.",
    image: "/agent-demo.png",
    text:
      "Before this session, an AI Agent automatically sent personalized countdown emails to participants.",
  },
  {
    type: "competitor_agent",
    section: "agent",
    title: "Demo: Theograce Competitor Benchmark AI Agent",
    subtitle:
      "Theograce benchmarks competitors manually twice per week today. This is a perfect AI Agent use case.",
    bullets: [
      "Monitor competitors automatically",
      "Track promotions and launches",
      "Summarize changes",
      "Send daily digest by email",
      "Centralize benchmark information",
      "Reduce repetitive manual work",
    ],
    resultCards: [
      ["Daily alert", "New promotion detected"],
      ["Benchmark table", "Price, offer, product focus"],
      ["Action email", "Recommendation sent to the team"],
    ],
    prompt:
      "Create a daily competitor benchmark digest for Theograce. Monitor Pandora, Kendra Scott, Mint&Lily, Tiny Tags, James Avery, GLDN, Made by Mary and Haverhill. Check promotions, new collections, messaging, pricing signals, gifting angles and customer-facing changes. Return a short table, 3 key insights and a ready-to-send email summary.",
  },
  {
    type: "copilot_steps",
    section: "agent",
    title: "Copilot path: competitor benchmark",
    subtitle: "A simple version everyone can try immediately.",
    bullets: [
      "Open Microsoft 365 Copilot Chat",
      "Use Work mode if available",
      "Paste the competitor list",
      "Paste the benchmark prompt",
      "Ask for a table + email digest",
      "Copy the output to Outlook or Teams",
    ],
    prompt:
      "Act as a competitor benchmark assistant. Compare Pandora, Kendra Scott, Mint&Lily, Tiny Tags, James Avery, GLDN, Made by Mary and Haverhill. Summarize promotions, launches, pricing signals, messaging and customer-facing changes. Return a table and a 5-line email digest.",
  },
  {
    type: "chat",
    section: "chat",
    title: "Chat AI",
    subtitle: "The fastest way to improve daily communication.",
    original:
      "where is my order i wait since 2 weeks no answer this is unacceptable",
    versions: [
      ["Professional", "Clear structure and reassurance", "I am sorry for the delay and I understand your frustration. I will check your order status and get back to you with a clear update as soon as possible."],
      ["Empathetic", "Emotion and understanding", "I completely understand how disappointing it is to wait without a clear update. Let me look into this right away."],
      ["Luxury", "Elegant and premium tone", "Thank you for your patience. I am truly sorry for the wait and will personally review your order to provide a clear update."],
      ["Short", "Efficiency and speed", "I am sorry for the delay. I will check your order now and send you an update quickly."],
    ],
  },
  {
    type: "project",
    section: "project",
    title: "Project = shared AI workspace",
    subtitle: "Use it when files, conversations and context belong together.",
    bullets: [
      "Shared team workspace",
      "Persistent context",
      "All files in one place",
      "Operational follow-up",
      "Team collaboration",
      "Better for ongoing work than one chat",
    ],
  },
  {
    type: "project_example",
    section: "project",
    title: "Project demo: Oak & Luna Brand Workspace",
    subtitle: "Upload 3 files: launch brief, competitor snapshot and customer feedback CSV.",
    bullets: [
      "Launch brief",
      "Competitor snapshot",
      "Customer feedback CSV",
      "AI connects the files",
      "AI finds risks",
      "AI suggests next actions",
    ],
    copilotPath: [
      "Open Microsoft 365 Copilot",
      "Open Copilot Chat or Copilot Notebook if available",
      "Attach the 3 Oak & Luna demo files",
      "Paste the full project prompt",
      "Ask for risks, insights and next actions",
      "Save the output as a Copilot Page or document",
    ],
    prompt:
      "Using these Oak & Luna files, create a launch workspace summary.\n\nAnalyze:\n- the launch objective,\n- the target customer,\n- customer feedback trends,\n- competitor positioning,\n- operational risks,\n- missing information,\n- and recommended next actions.\n\nUse:\n- the launch brief,\n- the competitor snapshot,\n- and the customer feedback CSV together.\n\nReturn:\n1. Executive summary\n2. Key risks\n3. Customer insights\n4. Competitor insights\n5. Recommended actions\n6. Suggested priorities for the launch team",
  },
  {
    type: "excel_intro",
    section: "gpt",
    title: "Everyone has an Excel file that hurts",
    subtitle: "This is the operational reality: big files, rules, exceptions and manual checks.",
    image: "/big%20excel.png",
    bullets: [
      "Find duplicates",
      "Explain blank cells",
      "Detect anomalies",
      "Generate formulas",
      "Summarize KPIs",
      "Suggest automation",
    ],
  },
  {
    type: "gpt",
    section: "gpt",
    title: "Chat vs Project vs GPT",
    subtitle: "The Late Supplier process started in Chat. GPT is better when we want to standardize it.",
    image: "/Guideline.png",
    fileLink: "/Guideline.png",
    bullets: [
      "Chat = test the task manually",
      "Project = collaborate with files and context",
      "GPT = standardize the same process",
      "Same instructions every time",
      "Stable outputs",
      "Usable by anyone",
    ],
    text:
      "If I repeat the same prompt every week, I should turn it into a GPT or a standardized Copilot workflow. The value is consistency: same rules, same output, less manual risk.",
  },
  {
    type: "gpt_path",
    section: "gpt",
    title: "Copilot path: repeatable process",
    subtitle: "Copilot may not work exactly like a GPT, but the logic is the same: standardize the prompt and reuse it.",
    bullets: [
      "Open Microsoft 365 Copilot Chat",
      "Attach the file or type / to reference work files",
      "Paste the standardized rules prompt",
      "Ask for the same output format every time",
      "Save the prompt in a Word file, Page or Notebook",
      "Reuse it each week with the new file",
    ],
    prompt:
      "Act as my weekly report processor. Follow these rules every time: clean the file, identify duplicates and blank cells, detect anomalies, summarize KPIs, explain risks and create a management summary.",
  },
  {
    type: "exercise",
    section: "gpt",
    title: "Exercise: improve one real Excel file",
    subtitle: "Ask AI to go one step further.",
    prompt:
      "Analyze this file. Identify duplicates, blank cells and inconsistent values. Explain why they matter. Suggest formulas or concatenations to improve it. Then propose 3 automation opportunities.",
  },
  {
    type: "hub",
    section: "hub",
    title: "Hub AI",
    subtitle: "The final layer: reusable company knowledge.",
    bullets: [
      "Turn documents into pages",
      "Structure company knowledge",
      "Create navigation",
      "Centralize training",
      "Share operational expertise",
      "Build internal knowledge",
    ],
  },
  {
    type: "hub_demo",
    section: "hub",
    title: "Live Demo: Start a Lime & Lou Hub",
    subtitle: "The GitHub repository is ready and deployed on Vercel. We only need files to add.",
    bullets: [
      "Upload department document",
      "AI summarizes it",
      "AI creates a menu category",
      "AI creates FAQ and actions",
      "Add files to GitHub",
      "Vercel deploys the page live",
    ],
    prompt:
      "Transform this Lime & Lou document into a Hub page with overview, key process, FAQ, risks, escalation rules, owner actions and training summary.",
  },
  {
    type: "quiz_final",
    section: "intro",
    title: "Final quiz: which AI format should you use?",
    subtitle: "Click a card to reveal the recommended format.",
    cards: [
      ["Weekly Excel process repeated every Monday", "GPT / standardized Copilot workflow"],
      ["Quick email rewrite", "Chat"],
      ["Shared launch workspace with files", "Project / Copilot Notebook"],
      ["Automatic daily competitor monitoring", "Agent"],
      ["Reusable company knowledge page", "Hub"],
    ],
  },
  {
    type: "next",
    section: "intro",
    title: "What should you try next?",
    subtitle: "Start small. Save time tomorrow.",
    cards: [
      ["Chat", "Rewrite an important email"],
      ["Project", "Create a shared AI workspace"],
      ["GPT", "Automate a repetitive process"],
      ["Agent", "Create a monitoring workflow"],
      ["Hub", "Transform documents into knowledge"],
    ],
  },
];

export default function AICustomerServiceTraining() {
  const [i, setI] = useState(0);
  const [version, setVersion] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [revealedCards, setRevealedCards] = useState({});
  const s = slides[i];
  const currentColor = COLORS[s.section] || COLORS.intro;

  const next = () => {
    setVersion(0);
    setRevealedCards({});
    setI(Math.min(i + 1, slides.length - 1));
  };

  const prev = () => {
    setVersion(0);
    setRevealedCards({});
    setI(Math.max(i - 1, 0));
  };

  const revealCard = (idx) => {
    setRevealedCards((current) => ({ ...current, [idx]: !current[idx] }));
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={{ ...styles.kicker, color: currentColor }}>{s.section.toUpperCase()}</div>
          <div style={styles.progress}>Slide {i + 1} / {slides.length}</div>
        </div>
        <div style={styles.nav}>
          <button style={styles.btn} onClick={prev}>Previous</button>
          <button style={{ ...styles.btnPrimary, background: currentColor }} onClick={next}>Next</button>
        </div>
      </header>

      <section style={styles.slide}>
        <div style={{ ...styles.kicker, color: currentColor }}>{s.section}</div>
        <h1 style={styles.title}>{s.title}</h1>
        <p style={styles.subtitle}>{s.subtitle}</p>

        {s.type === "hero_image" && <HeroImage s={s} />}
        {s.type === "wow_intro" && <WowIntro s={s} color={currentColor} />}
        {s.type === "intro" && <Intro s={s} color={currentColor} />}
        {s.type === "formats" && <Formats s={s} />}
        {s.type === "maturity" && <Cards cards={s.cards} />}
        {s.type === "painpoints" && <Cards cards={s.cards} />}
        {s.type === "agent_intro" && <AgentIntro s={s} setModalImage={setModalImage} />}
        {s.type === "competitor_agent" && <CompetitorAgent s={s} />}
        {s.type === "copilot_steps" && <CopilotSteps s={s} />}
        {s.type === "chat" && <ChatSlide s={s} version={version} setVersion={setVersion} />}
        {s.type === "project" && <Bullets s={s} />}
        {s.type === "project_example" && <ProjectExample s={s} />}
        {s.type === "excel_intro" && <ExcelIntro s={s} setModalImage={setModalImage} />}
        {s.type === "gpt" && <GptSlide s={s} setModalImage={setModalImage} />}
        {s.type === "gpt_path" && <CopilotSteps s={s} color={COLORS.gpt} />}
        {s.type === "exercise" && <Prompt s={s} color={currentColor} />}
        {s.type === "hub" && <Bullets s={s} />}
        {s.type === "hub_demo" && <HubDemo s={s} />}
        {s.type === "quiz_final" && <QuizFinal s={s} revealedCards={revealedCards} revealCard={revealCard} />}
        {s.type === "next" && <Cards cards={s.cards} />}
      </section>

      {modalImage && (
        <div style={styles.modal} onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="fullscreen" style={styles.modalImage} />
        </div>
      )}
    </main>
  );
}


function HeroImage({ s }) {
  return (
    <div style={styles.heroImageWrap}>
      <img src={s.image} alt="AI at Work" style={styles.heroImage} />
    </div>
  );
}

function WowIntro({ s, color }) {
  return (
    <>
      <div style={{ ...styles.highlight, background: color, marginTop: 28 }}>
        {s.text}
      </div>
      <div style={styles.beforeAfterGrid}>
        {s.beforeAfter.map((row) => (
          <div key={row[0]} style={styles.beforeAfterCard}>
            <div>
              <div style={styles.kickerDark}>Yesterday</div>
              <p style={styles.beforeText}>{row[0]}</p>
            </div>
            <div style={styles.arrow}>→</div>
            <div>
              <div style={styles.kickerDark}>Tomorrow</div>
              <p style={styles.afterText}>{row[1]}</p>
            </div>
          </div>
        ))}
      </div>
      <Bullets s={s} />
    </>
  );
}

function Intro({ s, color }) {
  return (
    <div style={styles.twoCols}>
      <div style={{ ...styles.highlight, background: color }}>{s.text}</div>
      <Bullets s={s} />
    </div>
  );
}

function Formats({ s }) {
  const formatColors = [COLORS.agent, COLORS.chat, COLORS.project, COLORS.gpt, COLORS.hub];
  return (
    <div style={styles.grid5}>
      {s.cards.map((c, idx) => (
        <div key={c[0]} style={{ ...styles.white, borderTop: `9px solid ${formatColors[idx]}` }}>
          <h2>{c[0]}</h2>
          <p style={styles.cardText}>{c[1]}</p>
          <p style={styles.smallText}>{c[2]}</p>
        </div>
      ))}
    </div>
  );
}

function AgentIntro({ s, setModalImage }) {
  return (
    <div style={styles.twoCols}>
      <div style={styles.white}>
        <img src={s.image} alt="agent" style={styles.previewImage} onClick={() => setModalImage(s.image)} />
        <p style={styles.previewText}>Click to open fullscreen</p>
      </div>
      <div style={{ ...styles.highlight, background: COLORS.agent }}>
        <p style={styles.bigText}>{s.text}</p>
      </div>
    </div>
  );
}

function CompetitorAgent({ s }) {
  return (
    <>
      <div style={styles.grid3}>
        {s.bullets.map((b) => <div key={b} style={{ ...styles.card, borderTop: `6px solid ${COLORS.agent}` }}>{b}</div>)}
      </div>
      <div style={styles.grid3}>
        {s.resultCards.map((c) => (
          <div key={c[0]} style={styles.white}>
            <h2>{c[0]}</h2>
            <p style={styles.cardText}>{c[1]}</p>
          </div>
        ))}
      </div>
      <div style={{ ...styles.highlight, background: COLORS.agent, marginTop: 18 }}>
        <div style={styles.kickerDark}>Agent prompt</div>
        <p style={styles.smallPrompt}>“{s.prompt}”</p>
      </div>
    </>
  );
}

function CopilotSteps({ s, color }) {
  return (
    <div style={styles.twoCols}>
      <Bullets s={s} />
      <div style={{ ...styles.highlight, background: color || COLORS.agent }}>
        <div style={styles.kickerDark}>Copilot prompt</div>
        <p style={styles.bigText}>“{s.prompt}”</p>
      </div>
    </div>
  );
}

function ChatSlide({ s, version, setVersion }) {
  return (
    <div style={styles.twoCols}>
      <div style={{ ...styles.white, background: "#fee2e2" }}>
        <div style={styles.kickerDark}>Customer message</div>
        <p style={styles.bigText}>“{s.original}”</p>
      </div>
      <div style={styles.white}>
        <div style={styles.tabs}>
          {s.versions.map((v, idx) => (
            <button key={v[0]} style={idx === version ? styles.tabActive : styles.tab} onClick={() => setVersion(idx)}>
              {v[0]}
            </button>
          ))}
        </div>
        <div style={styles.toneBox}>{s.versions[version][1]}</div>
        <p style={styles.bigText}>“{s.versions[version][2]}”</p>
      </div>
    </div>
  );
}

function ProjectExample({ s }) {
  return (
    <div style={styles.twoCols}>
      <div>
        <Bullets s={s} />
        <div style={{ ...styles.white, marginTop: 18 }}>
          <div style={styles.kickerDark}>Copilot path</div>
          {s.copilotPath.map((step, idx) => (
            <p key={step} style={styles.stepText}>{idx + 1}. {step}</p>
          ))}
        </div>
      </div>
      <div style={{ ...styles.highlight, background: COLORS.project }}>
        <div style={styles.kickerDark}>Project prompt</div>
        <p style={styles.bigText}>“{s.prompt}”</p>
      </div>
    </div>
  );
}

function ExcelIntro({ s, setModalImage }) {
  return (
    <div style={styles.twoCols}>
      <div>
        <img src={s.image} alt="excel" style={styles.previewImage} onClick={() => setModalImage(s.image)} />
        <p style={styles.previewText}>Click to open fullscreen</p>
      </div>
      <Bullets s={s} />
    </div>
  );
}

function GptSlide({ s, setModalImage }) {
  return (
    <div style={styles.twoCols}>
      <div>
        <Bullets s={s} />
        <img src={s.image} alt="guidelines" style={styles.previewImage} onClick={() => setModalImage(s.image)} />
        <a href={s.fileLink || s.image} target="_blank" rel="noreferrer" style={styles.link}>Open full Guidelines file</a>
      </div>
      <div style={{ ...styles.highlight, background: COLORS.gpt }}>
        <p style={styles.bigText}>{s.text}</p>
        <div style={styles.quote}>
          Chat tests the task.<br />
          GPT standardizes the task.
        </div>
      </div>
    </div>
  );
}

function HubDemo({ s }) {
  return (
    <div style={styles.twoCols}>
      <Bullets s={s} />
      <div style={{ ...styles.highlight, background: COLORS.hub }}>
        <div style={styles.kickerDark}>Hub prompt</div>
        <p style={styles.bigText}>“{s.prompt}”</p>
      </div>
    </div>
  );
}

function QuizFinal({ s, revealedCards, revealCard }) {
  return (
    <div style={styles.grid5}>
      {s.cards.map((c, idx) => (
        <button key={c[0]} style={styles.quizCard} onClick={() => revealCard(idx)}>
          <p style={styles.smallText}>{c[0]}</p>
          {revealedCards[idx] ? <h2>{c[1]}</h2> : <h2>Click to reveal</h2>}
        </button>
      ))}
    </div>
  );
}

function Prompt({ s, color }) {
  return (
    <div style={{ ...styles.highlight, background: color }}>
      <div style={styles.kickerDark}>Prompt to try</div>
      <p style={styles.bigText}>“{s.prompt}”</p>
    </div>
  );
}

function Bullets({ s }) {
  return (
    <div style={styles.grid3}>
      {s.bullets.map((b) => <div key={b} style={styles.card}>{b}</div>)}
    </div>
  );
}

function Cards({ cards }) {
  return (
    <div style={styles.grid3}>
      {cards.map((c) => (
        <div key={c[0]} style={styles.white}>
          <h2>{c[0]}</h2>
          <p style={styles.cardText}>{c[1]}</p>
          {c[2] && <p style={styles.smallText}>{c[2]}</p>}
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#07111f,#020617)", color: "white", fontFamily: "Arial, Helvetica, sans-serif" },
  header: { position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", background: "rgba(7,17,31,.95)", borderBottom: "1px solid rgba(255,255,255,.12)" },
  kicker: { textTransform: "uppercase", letterSpacing: 3, fontSize: 13, fontWeight: 900 },
  kickerDark: { color: "#0f172a", textTransform: "uppercase", letterSpacing: 2, fontSize: 13, fontWeight: 900, opacity: 0.8 },
  progress: { color: "#b8c7d9", marginTop: 4 },
  nav: { display: "flex", gap: 10 },
  btn: { padding: "10px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.08)", color: "white", fontWeight: 800, cursor: "pointer" },
  btnPrimary: { padding: "10px 16px", borderRadius: 12, border: "none", color: "#0f172a", fontWeight: 900, cursor: "pointer" },
  slide: { maxWidth: 1280, margin: "0 auto", padding: "42px 34px" },
  title: { fontSize: "clamp(44px,6vw,78px)", lineHeight: 1, margin: "18px 0", fontWeight: 950 },
  subtitle: { fontSize: "clamp(22px,2.4vw,34px)", color: "#b8c7d9", lineHeight: 1.25, maxWidth: 1050 },
  twoCols: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 34 },
  grid3: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 34 },
  grid5: { display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginTop: 34 },
  beforeAfterGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 12, marginTop: 22 },
  beforeAfterCard: { display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: 12, alignItems: "center", background: "rgba(255,255,255,.1)", borderRadius: 22, padding: 18, border: "1px solid rgba(255,255,255,.14)" },
  beforeText: { margin: "8px 0 0", fontSize: 22, fontWeight: 900, color: "#fecaca" },
  afterText: { margin: "8px 0 0", fontSize: 22, fontWeight: 900, color: "#bbf7d0" },
  arrow: { textAlign: "center", fontSize: 36, fontWeight: 950, color: "#67e8f9" },
  white: { background: "white", color: "#0f172a", borderRadius: 28, padding: 28, boxShadow: "0 18px 42px rgba(0,0,0,.22)" },
  highlight: { color: "#0f172a", borderRadius: 28, padding: 30, fontWeight: 900, boxShadow: "0 18px 42px rgba(0,0,0,.22)" },
  card: { background: "rgba(255,255,255,.1)", borderRadius: 24, padding: 24, fontSize: 25, fontWeight: 900, border: "1px solid rgba(255,255,255,.14)" },
  cardText: { fontSize: 23, fontWeight: 900 },
  smallText: { color: "#0e7490", fontSize: 18, fontWeight: 800 },
  bigText: { fontSize: 28, lineHeight: 1.25, fontWeight: 900 },
  smallPrompt: { fontSize: 20, lineHeight: 1.35, fontWeight: 900 },
  stepText: { fontSize: 18, lineHeight: 1.25, fontWeight: 850 },
  previewImage: { width: "100%", borderRadius: 20, cursor: "pointer", border: "3px solid rgba(255,255,255,.2)", maxHeight: 420, objectFit: "cover" },
  previewText: { textAlign: "center", marginTop: 10, color: "#67e8f9", fontWeight: 900 },
  tabs: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  tab: { border: "none", borderRadius: 12, padding: "10px 14px", background: "#e2e8f0", fontWeight: 900, cursor: "pointer" },
  tabActive: { border: "none", borderRadius: 12, padding: "10px 14px", background: COLORS.chat, color: "white", fontWeight: 900, cursor: "pointer" },
  toneBox: { background: "#dbeafe", padding: 14, borderRadius: 16, marginBottom: 18, color: "#1e3a8a", fontWeight: 900 },
  modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,.92)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, cursor: "pointer" },
  modalImage: { maxWidth: "100%", maxHeight: "100%", borderRadius: 20 },
  quote: { marginTop: 24, background: "rgba(255,255,255,.25)", borderRadius: 20, padding: 20, fontSize: 24 },
  link: { display: "block", marginTop: 14, color: "#67e8f9", fontWeight: 900, textAlign: "center" },
  quizCard: { background: "white", color: "#0f172a", borderRadius: 28, padding: 24, border: "none", cursor: "pointer", textAlign: "left", minHeight: 220, boxShadow: "0 18px 42px rgba(0,0,0,.22)" },

  heroImageWrap: {
    marginTop: 26,
    width: "100%",
    borderRadius: 28,
    overflow: "hidden",
    boxShadow: "0 30px 90px rgba(0,0,0,.45)",
    border: "1px solid rgba(255,255,255,.18)",
    background: "#020617",
  },
  heroImage: {
    display: "block",
    width: "100%",
    height: "calc(100vh - 190px)",
    minHeight: 640,
    objectFit: "cover",
  },
};
