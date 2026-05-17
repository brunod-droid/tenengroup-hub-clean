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
    type: "intro",
    section: "intro",
    title: "AI at Work",
    subtitle: "AI is not replacing expertise. AI removes friction.",
    text:
      "All examples today are designed around ChatGPT Enterprise / Copilot because we work with customer and company data. Be careful: do not paste sensitive data into random AI tools.",
    bullets: [
      "GDPR matters",
      "Use approved AI tools",
      "Practical business cases",
      "One useful idea for tomorrow",
    ],
  },
  {
    type: "formats",
    section: "intro",
    title: "Choose the right AI format",
    subtitle: "Different business problems require different AI setups.",
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
      ["Advanced", "Create shared Projects with files and context"],
      ["Expert", "Build GPTs with repeatable business logic"],
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
    title: "Demo: Competitor Benchmark AI Agent",
    subtitle:
      "Theograce currently benchmarks competitors manually twice per week. This is a perfect AI Agent use case.",
    bullets: [
      "Monitor competitors automatically",
      "Track promotions and launches",
      "Summarize changes",
      "Send daily digest by email",
      "Centralize benchmark information",
      "Reduce repetitive manual work",
    ],
    resultCards: [
      ["Daily alert", "New promotion detected on competitor website"],
      ["Benchmark table", "Price, offer, message, product focus"],
      ["Action email", "Short recommendation sent to the team"],
    ],
  },
  {
    type: "copilot_steps",
    section: "agent",
    title: "How to start with Copilot",
    subtitle: "The audience can follow this logic even without being AI experts.",
    bullets: [
      "Open Copilot",
      "Paste competitor list",
      "Ask it to compare latest public changes",
      "Ask for an executive summary",
      "Ask for a short email draft",
      "Repeat daily or weekly",
    ],
    prompt:
      "Act as a competitor benchmark assistant. Compare these competitors and summarize new promotions, product launches, prices, messaging and customer-facing changes. Return a short table and a 5-line email digest.",
  },
  {
    type: "chat",
    section: "chat",
    title: "Chat AI",
    subtitle: "The fastest way to improve daily communication.",
    original:
      "where is my order i wait since 2 weeks no answer this is unacceptable",
    versions: [
      [
        "Professional",
        "Clear structure and reassurance",
        "I am sorry for the delay and I understand your frustration. I will check your order status and get back to you with a clear update as soon as possible.",
      ],
      [
        "Empathetic",
        "Emotion and understanding",
        "I completely understand how disappointing it is to wait without a clear update. Let me look into this right away.",
      ],
      [
        "Luxury",
        "Elegant and premium tone",
        "Thank you for your patience. I am truly sorry for the wait and will personally review your order to provide a clear update.",
      ],
      [
        "Short",
        "Efficiency and speed",
        "I am sorry for the delay. I will check your order now and send you an update quickly.",
      ],
    ],
  },
  {
    type: "project",
    section: "project",
    title: "Project = shared AI workspace",
    subtitle: "Projects keep files, chats and context together.",
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
    title: "Project demo: Brand Launch Workspace",
    subtitle: "Ask a Brand team for 2–3 files and AI can structure the work.",
    bullets: [
      "Campaign calendar",
      "Product launch brief",
      "Customer reviews",
      "Competitor benchmark",
      "Brand tone guidelines",
      "Marketing assets",
    ],
    prompt:
      "Using these files, summarize the launch, identify risks, missing information, customer pain points, competitor signals and recommended next actions.",
  },
  {
    type: "excel_intro",
    section: "gpt",
    title: "Everyone has an Excel file that hurts",
    subtitle: "The 37-tab file. The mystery formula. The weekly copy-paste ritual.",
    image: "/big-excel.png",
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
    title: "When should you move from Chat to GPT?",
    subtitle: "When the process repeats with the same rules.",
    image: "/Guideline.png",
    fileLink: "/Guideline.png",
    bullets: [
      "Chat = test manually",
      "Project = collaborate with context",
      "GPT = standardize the logic",
      "Same instructions every time",
      "Stable outputs",
      "Usable by anyone",
    ],
    text:
      "I started this process in Chat. I move it to a GPT when the logic becomes stable, repeatable and useful for other people.",
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
    subtitle: "Give me any Lime & Lou / department document.",
    bullets: [
      "AI summarizes the document",
      "AI creates a menu category",
      "AI creates FAQ",
      "AI structures actions",
      "AI creates a clean page",
      "Integrated live into the Hub",
    ],
    prompt:
      "Transform this document into a Hub page with overview, key process, FAQ, risks, escalation rules, owner actions and training summary.",
  },
  {
    type: "quiz_final",
    section: "intro",
    title: "Final quiz: which AI format should you use?",
    subtitle: "Choose the right setup for each business situation.",
    cards: [
      ["Weekly Excel process repeated every Monday", "GPT"],
      ["Quick email rewrite", "Chat"],
      ["Shared launch workspace with files", "Project"],
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
  const s = slides[i];
  const currentColor = COLORS[s.section] || COLORS.intro;

  const next = () => {
    setVersion(0);
    setI(Math.min(i + 1, slides.length - 1));
  };

  const prev = () => {
    setVersion(0);
    setI(Math.max(i - 1, 0));
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={{ ...styles.kicker, color: currentColor }}>
            {s.section.toUpperCase()}
          </div>
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
        {s.type === "exercise" && <Prompt s={s} color={currentColor} />}
        {s.type === "hub" && <Bullets s={s} />}
        {s.type === "hub_demo" && <HubDemo s={s} />}
        {s.type === "quiz_final" && <QuizFinal s={s} />}
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
    </>
  );
}

function CopilotSteps({ s }) {
  return (
    <div style={styles.twoCols}>
      <Bullets s={s} />
      <div style={{ ...styles.highlight, background: COLORS.agent }}>
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
            <button
              key={v[0]}
              style={idx === version ? styles.tabActive : styles.tab}
              onClick={() => setVersion(idx)}
            >
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
      <Bullets s={s} />
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

function QuizFinal({ s }) {
  return (
    <div style={styles.grid5}>
      {s.cards.map((c) => (
        <div key={c[0]} style={styles.white}>
          <p style={styles.smallText}>{c[0]}</p>
          <h2>{c[1]}</h2>
        </div>
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
      {s.bullets.map((b) => (
        <div key={b} style={styles.card}>{b}</div>
      ))}
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
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#07111f,#020617)",
    color: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 28px",
    background: "rgba(7,17,31,.95)",
    borderBottom: "1px solid rgba(255,255,255,.12)",
  },
  kicker: {
    textTransform: "uppercase",
    letterSpacing: 3,
    fontSize: 13,
    fontWeight: 900,
  },
  kickerDark: {
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 13,
    fontWeight: 900,
    opacity: 0.8,
  },
  progress: { color: "#b8c7d9", marginTop: 4 },
  nav: { display: "flex", gap: 10 },
  btn: {
    padding: "10px 16px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.2)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  },
  btnPrimary: {
    padding: "10px 16px",
    borderRadius: 12,
    border: "none",
    color: "#0f172a",
    fontWeight: 900,
    cursor: "pointer",
  },
  slide: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "42px 34px",
  },
  title: {
    fontSize: "clamp(44px,6vw,78px)",
    lineHeight: 1,
    margin: "18px 0",
    fontWeight: 950,
  },
  subtitle: {
    fontSize: "clamp(22px,2.4vw,34px)",
    color: "#b8c7d9",
    lineHeight: 1.25,
    maxWidth: 1050,
  },
  twoCols: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    marginTop: 34,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 16,
    marginTop: 34,
  },
  grid5: {
    display: "grid",
    gridTemplateColumns: "repeat(5,1fr)",
    gap: 14,
    marginTop: 34,
  },
  white: {
    background: "white",
    color: "#0f172a",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 18px 42px rgba(0,0,0,.22)",
  },
  highlight: {
    color: "#0f172a",
    borderRadius: 28,
    padding: 30,
    fontWeight: 900,
    boxShadow: "0 18px 42px rgba(0,0,0,.22)",
  },
  card: {
    background: "rgba(255,255,255,.1)",
    borderRadius: 24,
    padding: 24,
    fontSize: 25,
    fontWeight: 900,
    border: "1px solid rgba(255,255,255,.14)",
  },
  cardText: { fontSize: 23, fontWeight: 900 },
  smallText: { color: "#0e7490", fontSize: 18, fontWeight: 800 },
  bigText: { fontSize: 28, lineHeight: 1.25, fontWeight: 900 },
  previewImage: {
    width: "100%",
    borderRadius: 20,
    cursor: "pointer",
    border: "3px solid rgba(255,255,255,.2)",
    maxHeight: 420,
    objectFit: "cover",
  },
  previewText: {
    textAlign: "center",
    marginTop: 10,
    color: "#67e8f9",
    fontWeight: 900,
  },
  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  tab: {
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    background: "#e2e8f0",
    fontWeight: 900,
    cursor: "pointer",
  },
  tabActive: {
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    background: COLORS.chat,
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
  },
  toneBox: {
    background: "#dbeafe",
    padding: 14,
    borderRadius: 16,
    marginBottom: 18,
    color: "#1e3a8a",
    fontWeight: 900,
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.92)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    cursor: "pointer",
  },
  modalImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: 20,
  },
  quote: {
    marginTop: 24,
    background: "rgba(255,255,255,.25)",
    borderRadius: 20,
    padding: 20,
    fontSize: 24,
  },
  link: {
    display: "block",
    marginTop: 14,
    color: "#67e8f9",
    fontWeight: 900,
    textAlign: "center",
  },
};
