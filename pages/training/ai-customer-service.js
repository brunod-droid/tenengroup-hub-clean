import { useState } from "react";

const COLORS = {
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
    subtitle:
      "AI is not replacing expertise. AI removes friction.",
    text:
      "All examples today are done with ChatGPT Enterprise because we work with customer and company data. Be careful: do not paste sensitive data into random AI tools.",
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
    subtitle:
      "Different business problems require different AI setups.",
    cards: [
      [
        "Agent",
        "Autonomous workflow",
        "Orange",
      ],
      [
        "Chat",
        "Quick assistance",
        "Blue",
      ],
      [
        "Project",
        "Shared workspace",
        "Purple",
      ],
      [
        "GPT",
        "Repeatable expert",
        "Green",
      ],
      [
        "Hub",
        "Company knowledge",
        "Cyan",
      ],
    ],
  },

  {
    type: "painpoints",
    section: "intro",
    title: "Where do teams lose the most time?",
    subtitle:
      "This is exactly where AI can help.",
    cards: [
      [
        "Customer Service",
        "Repetitive replies & ticket analysis",
      ],
      [
        "Factory",
        "Supplier delays & monitoring",
      ],
      [
        "Operations",
        "Weekly reporting & consolidation",
      ],
      [
        "Brand",
        "Searching competitor information",
      ],
      [
        "Developers",
        "Documentation & requirements",
      ],
      [
        "Ecommerce",
        "KPIs & trends consolidation",
      ],
    ],
  },

  {
    type: "agent_intro",
    section: "agent",
    title: "AI Agent",
    subtitle:
      "An AI Agent can execute workflows autonomously.",
    image: "/agent-demo.png",
    text:
      "Before this session, an AI Agent automatically sent personalized countdown emails to participants.",
  },

  {
    type: "agent_usecases",
    section: "agent",
    title: "AI Agent use cases",
    subtitle:
      "Examples for different departments.",
    bullets: [
      "Customer Service → backlog alerts",
      "Factory → delay monitoring",
      "Brand → competitor watch",
      "Operations → KPI digest",
      "Developers → ticket summaries",
      "Management → automated reminders",
    ],
  },

  {
    type: "chat",
    section: "chat",
    title: "Chat AI",
    subtitle:
      "The fastest way to improve daily communication.",
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
    title: "Projects",
    subtitle:
      "Projects are shared AI workspaces with files, chats and context.",
    bullets: [
      "Shared team context",
      "Keep all files together",
      "Collaborative workflows",
      "Operational follow-up",
      "Persistent memory",
      "Perfect for recurring business cases",
    ],
  },

  {
    type: "excel_intro",
    section: "gpt",
    title: "Everyone has an Excel file that hurts",
    subtitle:
      "The 37-tab file. The mystery formula. The weekly copy-paste ritual.",
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
    title:
      "GPT = operational expertise translated into AI instructions",
    subtitle:
      "The AI follows stable business logic repeatedly.",
    image: "/Guideline.png",
    bullets: [
      "Remove irrelevant rows",
      "Deduplicate data",
      "Apply operational rules",
      "Create classifications",
      "Generate summaries",
      "Export final files",
    ],
    text:
      "This is not coding. This is business expertise translated into AI logic.",
  },

  {
    type: "exercise",
    section: "gpt",
    title: "Exercise",
    subtitle:
      "Ask AI to improve a real operational file.",
    prompt:
      "Analyze this file. Identify duplicates, blank cells and inconsistent values. Explain why they matter. Suggest formulas or concatenations to improve it. Then propose 3 automation opportunities.",
  },

  {
    type: "hub",
    section: "hub",
    title: "Hub AI",
    subtitle:
      "The final layer: reusable company knowledge.",
    bullets: [
      "Turn documents into pages",
      "Structure company knowledge",
      "Create navigation",
      "Centralize training",
      "Share operational expertise",
      "Build internal AI knowledge",
    ],
  },

  {
    type: "hub_demo",
    section: "hub",
    title: "Live Hub Demo",
    subtitle:
      "Give me any department document.",
    bullets: [
      "AI summarizes it",
      "AI structures categories",
      "AI creates pages",
      "AI creates actions",
      "AI builds navigation",
      "Integrated live into the Hub",
    ],
  },

  {
    type: "next",
    section: "intro",
    title: "What should you try next?",
    subtitle:
      "Start small. Save time tomorrow.",
    cards: [
      [
        "Chat",
        "Rewrite an important email",
      ],

      [
        "Project",
        "Create a shared AI workspace",
      ],

      [
        "GPT",
        "Automate a repetitive process",
      ],

      [
        "Agent",
        "Create a monitoring workflow",
      ],

      [
        "Hub",
        "Transform documents into knowledge",
      ],
    ],
  },
];

export default function AICustomerServiceTraining() {
  const [i, setI] = useState(0);
  const [version, setVersion] = useState(0);
  const [modalImage, setModalImage] =
    useState(null);

  const s = slides[i];

  const next = () => {
    setVersion(0);
    setI(Math.min(i + 1, slides.length - 1));
  };

  const prev = () => {
    setVersion(0);
    setI(Math.max(i - 1, 0));
  };

  const currentColor =
    COLORS[s.section] || "#67e8f9";

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div
            style={{
              ...styles.kicker,
              color: currentColor,
            }}
          >
            {s.section.toUpperCase()}
          </div>

          <div style={styles.progress}>
            Slide {i + 1} / {slides.length}
          </div>
        </div>

        <div style={styles.nav}>
          <button
            style={styles.btn}
            onClick={prev}
          >
            Previous
          </button>

          <button
            style={{
              ...styles.btnPrimary,
              background: currentColor,
            }}
            onClick={next}
          >
            Next
          </button>
        </div>
      </header>

      <section style={styles.slide}>
        <div
          style={{
            ...styles.kicker,
            color: currentColor,
          }}
        >
          {s.section}
        </div>

        <h1 style={styles.title}>
          {s.title}
        </h1>

        <p style={styles.subtitle}>
          {s.subtitle}
        </p>

        {s.type === "intro" && (
          <Intro s={s} color={currentColor} />
        )}

        {s.type === "formats" && (
          <Formats s={s} />
        )}

        {s.type === "painpoints" && (
          <Cards cards={s.cards} />
        )}

        {s.type === "agent_intro" && (
          <AgentIntro
            s={s}
            setModalImage={setModalImage}
          />
        )}

        {s.type === "agent_usecases" && (
          <Bullets s={s} />
        )}

        {s.type === "chat" && (
          <ChatSlide
            s={s}
            version={version}
            setVersion={setVersion}
          />
        )}

        {s.type === "project" && (
          <Bullets s={s} />
        )}

        {s.type === "excel_intro" && (
          <ExcelIntro
            s={s}
            setModalImage={setModalImage}
          />
        )}

        {s.type === "gpt" && (
          <GptSlide
            s={s}
            setModalImage={setModalImage}
          />
        )}

        {s.type === "exercise" && (
          <Prompt s={s} />
        )}

        {s.type === "hub" && (
          <Bullets s={s} />
        )}

        {s.type === "hub_demo" && (
          <Bullets s={s} />
        )}

        {s.type === "next" && (
          <Cards cards={s.cards} />
        )}
      </section>

      {modalImage && (
        <div
          style={styles.modal}
          onClick={() =>
            setModalImage(null)
          }
        >
          <img
            src={modalImage}
            alt="fullscreen"
            style={styles.modalImage}
          />
        </div>
      )}
    </main>
  );
}

function Intro({ s, color }) {
  return (
    <div style={styles.twoCols}>
      <div
        style={{
          ...styles.highlight,
          background: color,
        }}
      >
        {s.text}
      </div>

      <Bullets s={s} />
    </div>
  );
}

function Formats({ s }) {
  return (
    <div style={styles.grid5}>
      {s.cards.map((c) => (
        <div
          key={c[0]}
          style={{
            ...styles.white,
            borderTop: `8px solid ${c[2].toLowerCase()}`,
          }}
        >
          <h2>{c[0]}</h2>

          <p style={styles.cardText}>
            {c[1]}
          </p>
        </div>
      ))}
    </div>
  );
}

function AgentIntro({
  s,
  setModalImage,
}) {
  return (
    <div style={styles.twoCols}>
      <div style={styles.white}>
        <img
          src={s.image}
          alt="agent"
          style={styles.previewImage}
          onClick={() =>
            setModalImage(s.image)
          }
        />

        <p style={styles.previewText}>
          Click to open fullscreen
        </p>
      </div>

      <div
        style={{
          ...styles.highlight,
          background: COLORS.agent,
        }}
      >
        <p style={styles.bigText}>
          {s.text}
        </p>
      </div>
    </div>
  );
}

function ChatSlide({
  s,
  version,
  setVersion,
}) {
  return (
    <div style={styles.twoCols}>
      <div
        style={{
          ...styles.white,
          background: "#fee2e2",
        }}
      >
        <div style={styles.kickerDark}>
          Customer message
        </div>

        <p style={styles.bigText}>
          “{s.original}”
        </p>
      </div>

      <div style={styles.white}>
        <div style={styles.tabs}>
          {s.versions.map((v, idx) => (
            <button
              key={v[0]}
              style={
                idx === version
                  ? styles.tabActive
                  : styles.tab
              }
              onClick={() =>
                setVersion(idx)
              }
            >
              {v[0]}
            </button>
          ))}
        </div>

        <div
          style={{
            background: "#dbeafe",
            padding: 14,
            borderRadius: 16,
            marginBottom: 18,
            color: "#1e3a8a",
            fontWeight: 900,
          }}
        >
          {s.versions[version][1]}
        </div>

        <p style={styles.bigText}>
          “{s.versions[version][2]}”
        </p>
      </div>
    </div>
  );
}

function ExcelIntro({
  s,
  setModalImage,
}) {
  return (
    <div style={styles.twoCols}>
      <div>
        <img
          src={s.image}
          alt="excel"
          style={styles.previewImage}
          onClick={() =>
            setModalImage(s.image)
          }
        />

        <p style={styles.previewText}>
          Click to open fullscreen
        </p>
      </div>

      <Bullets s={s} />
    </div>
  );
}

function GptSlide({
  s,
  setModalImage,
}) {
  return (
    <div style={styles.twoCols}>
      <div>
        <Bullets s={s} />

        <img
          src={s.image}
          alt="guidelines"
          style={styles.previewImage}
          onClick={() =>
            setModalImage(s.image)
          }
        />

        <a
          href="/Guideline.png"
          target="_blank"
          style={styles.link}
        >
          Open full Guidelines
        </a>
      </div>

      <div
        style={{
          ...styles.highlight,
          background: COLORS.gpt,
        }}
      >
        <p style={styles.bigText}>
          {s.text}
        </p>

        <div style={styles.quote}>
          AI is not magic.
          <br />
          It follows business logic.
        </div>
      </div>
    </div>
  );
}

function Prompt({ s }) {
  return (
    <div
      style={{
        ...styles.highlight,
        background: COLORS.gpt,
      }}
    >
      <p style={styles.bigText}>
        “{s.prompt}”
      </p>
    </div>
  );
}

function Bullets({ s }) {
  return (
    <div style={styles.grid3}>
      {s.bullets.map((b) => (
        <div
          key={b}
          style={styles.card}
        >
          {b}
        </div>
      ))}
    </div>
  );
}

function Cards({ cards }) {
  return (
    <div style={styles.grid3}>
      {cards.map((c) => (
        <div
          key={c[0]}
          style={styles.white}
        >
          <h2>{c[0]}</h2>

          <p style={styles.cardText}>
            {c[1]}
          </p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#07111f,#020617)",
    color: "white",
    fontFamily:
      "Arial, Helvetica, sans-serif",
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
    borderBottom:
      "1px solid rgba(255,255,255,.12)",
  },

  kicker: {
    textTransform: "uppercase",
    letterSpacing: 3,
    fontSize: 13,
    fontWeight: 900,
  },

  kickerDark: {
    color: "#0e7490",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 13,
    fontWeight: 900,
  },

  progress: {
    color: "#b8c7d9",
    marginTop: 4,
  },

  nav: {
    display: "flex",
    gap: 10,
  },

  btn: {
    padding: "10px 16px",
    borderRadius: 12,
    border:
      "1px solid rgba(255,255,255,.2)",
    background:
      "rgba(255,255,255,.08)",
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
    fontSize:
      "clamp(44px,6vw,78px)",
    lineHeight: 1,
    margin: "18px 0",
    fontWeight: 950,
  },

  subtitle: {
    fontSize:
      "clamp(22px,2.4vw,34px)",
    color: "#b8c7d9",
    lineHeight: 1.25,
    maxWidth: 1050,
  },

  twoCols: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 24,
    marginTop: 34,
  },

  grid3: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3,1fr)",
    gap: 16,
    marginTop: 34,
  },

  grid5: {
    display: "grid",
    gridTemplateColumns:
      "repeat(5,1fr)",
    gap: 14,
    marginTop: 34,
  },

  white: {
    background: "white",
    color: "#0f172a",
    borderRadius: 28,
    padding: 28,
  },

  highlight: {
    color: "#0f172a",
    borderRadius: 28,
    padding: 30,
    fontWeight: 900,
  },

  card: {
    background:
      "rgba(255,255,255,.1)",
    borderRadius: 24,
    padding: 24,
    fontSize: 26,
    fontWeight: 900,
  },

  cardText: {
    fontSize: 24,
    fontWeight: 900,
  },

  bigText: {
    fontSize: 28,
    lineHeight: 1.25,
    fontWeight: 900,
  },

  previewImage: {
    width: "100%",
    borderRadius: 20,
    cursor: "pointer",
    border:
      "3px solid rgba(255,255,255,.2)",
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
    background: "#3b82f6",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
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
    background:
      "rgba(255,255,255,.25)",
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
