import { useState } from "react";

const slides = [
  {
    type: "intro",
    title: "AI at Work",
    subtitle: "How AI removes friction from everyday work",
    text: "All examples today are done with ChatGPT Enterprise because we work with customer and company data. Be careful: do not paste sensitive data into random AI tools.",
    bullets: [
      "GDPR matters",
      "Use approved tools",
      "Practical demos",
      "One useful idea for tomorrow",
    ],
  },

  {
    type: "quiz",
    title: "You already experienced an AI Agent",
    subtitle:
      "The countdown emails before this training were part of the demo.",
    image: "/agent-demo.png",
    question: "What did the AI Agent do?",
    options: [
      "Only drafted text manually copied by Bruno",
      "Read a Google Sheet, wrote personalized emails and sent them automatically",
      "Only corrected spelling",
      "Only created this presentation",
    ],
    answer: 1,
    explanation:
      "Exactly. It was a real autonomous workflow: source → logic → personalized email → automatic sending.",
  },

  {
    type: "agent",
    title: "What can an AI Agent do?",
    subtitle:
      "Agents are useful when a task repeats and needs information.",
    bullets: [
      "Send daily reminders",
      "Search Google and summarize",
      "Monitor competitors",
      "Send CX alerts",
      "Prepare daily digests",
      "Follow operational risks",
    ],
  },

  {
    type: "poll",
    title: "Where do you lose the most time?",
    subtitle:
      "Vote by hand. We will prioritize the most relevant demos.",
    cards: [
      ["Brand", "Customer feedback"],
      ["Factory", "Operational delays"],
      ["Operations", "Weekly reports"],
      ["Dev", "Requirements / documentation"],
      ["Customer Service", "Tickets and replies"],
      ["Ecommerce", "Trends and KPIs"],
    ],
  },

  {
    type: "tools",
    title: "Choose the right AI format",
    subtitle:
      "Different needs require different AI setups.",
    cards: [
      ["Chat", "Quick help", "Rewrite, summarize, explain"],
      ["Project", "Shared workspace", "Files + chats + context"],
      ["GPT", "Repeatable expert", "Same rules, same output"],
      ["Agent", "Autonomous workflow", "Runs, searches, sends"],
      ["Hub", "Company knowledge", "Reusable documentation"],
    ],
  },

  {
    type: "case",
    title: "AI can improve customer communication",
    subtitle:
      "AI understands both the facts and the emotional priority.",
    leftTitle: "Customer message",
    left:
      "Sentimental locket. Unexpected delay. Customer asks us to push production and get a clear new arrival date.",
    rightTitle: "AI-assisted answer",
    right:
      "Empathy, ownership, reassurance, clear next step, professional tone.",
    bullets: [
      "Empathy",
      "Clarity",
      "Ownership",
      "Consistency",
    ],
  },

  {
    type: "rewrite",
    title: "One message. Five useful versions.",
    subtitle:
      "Same input, different business need.",
    original:
      "where is my order i wait since 2 weeks no answer this is unacceptable",
    versions: [
      [
        "Professional",
        "I am sorry for the delay and I understand your frustration. I will check your order status and get back to you with a clear update as soon as possible.",
      ],
      [
        "Empathetic",
        "I completely understand how disappointing it is to wait without a clear update. Let me look into this right away.",
      ],
      [
        "Luxury tone",
        "Thank you for your patience. I am truly sorry for the wait and will personally review your order to provide a clear update.",
      ],
      [
        "Short",
        "I am sorry for the delay. I will check your order now and send you an update as quickly as possible.",
      ],
      [
        "French",
        "Je suis désolé pour ce délai et je comprends votre frustration. Je vais vérifier votre commande et revenir vers vous rapidement.",
      ],
    ],
  },

  {
    type: "excel",
    title: "Everyone has an Excel file that hurts",
    subtitle:
      "The 37-tab file. The mystery formula. The weekly copy-paste ritual.",
    bullets: [
      "Clean data",
      "Find duplicates",
      "Explain blank cells",
      "Create formulas",
      "Detect anomalies",
      "Summarize KPIs",
    ],
  },

  {
    type: "gpt",
    title:
      "Late Supplier: complex rules, simple execution",
    subtitle:
      "A GPT is ideal when the process is stable and repeatable.",
    image: "/guidelines-preview.png",
    bullets: [
      "Remove irrelevant rows",
      "Deduplicate by ID",
      "Parse dates",
      "Apply classification rules",
      "Create summary",
      "Export Excel and CSV",
    ],
    text:
      "This is not coding. This is operational expertise translated into instructions that AI can execute repeatedly.",
  },

  {
    type: "exercise",
    title: "Exercise: improve one real Excel file",
    subtitle:
      "Ask AI to go one step further.",
    prompt:
      "Analyze this file. Identify duplicates, blank cells and inconsistent values. Explain why they matter. Suggest formulas or concatenations to improve it. Then propose 3 automation opportunities.",
  },

  {
    type: "agentbuild",
    title: "Design your own AI Agent",
    subtitle:
      "Even without paid access, everyone can design the workflow.",
    bullets: [
      "Trigger: when should it run?",
      "Sources: what should it check?",
      "Task: what should it do?",
      "Output: what should it send?",
      "Audience: who receives it?",
    ],
  },

  {
    type: "hub",
    title: "Live Hub build",
    subtitle:
      "Give me a department document. We turn it into a Hub category in 5 minutes.",
    bullets: [
      "Summarize the document",
      "Create a menu category",
      "Structure the page",
      "Add actions and FAQs",
      "Publish reusable knowledge",
    ],
  },

  {
    type: "next",
    title: "What should you try next?",
    subtitle:
      "Pick one format and one task.",
    cards: [
      ["Chat", "Rewrite this email professionally."],
      [
        "Project",
        "Summarize files and list next actions.",
      ],
      [
        "GPT",
        "Analyze this report every week with the same rules.",
      ],
      [
        "Agent",
        "Monitor this topic daily and email me a digest.",
      ],
      [
        "Hub",
        "Turn this document into a training page.",
      ],
    ],
  },
];

export default function AICustomerServiceTraining() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [version, setVersion] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const s = slides[i];

  const next = () => {
    setShow(false);
    setVersion(0);
    setI(Math.min(i + 1, slides.length - 1));
  };

  const prev = () => {
    setShow(false);
    setVersion(0);
    setI(Math.max(i - 1, 0));
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.kicker}>
            Tenengroup AI Training
          </div>

          <div style={styles.progress}>
            Slide {i + 1} / {slides.length}
          </div>
        </div>

        <div style={styles.nav}>
          <button style={styles.btn} onClick={prev}>
            Previous
          </button>

          <button
            style={styles.btnPrimary}
            onClick={next}
          >
            Next
          </button>
        </div>
      </header>

      <section style={styles.slide}>
        <div style={styles.kicker}>{s.type}</div>

        <h1 style={styles.title}>{s.title}</h1>

        <p style={styles.subtitle}>
          {s.subtitle}
        </p>

        {s.type === "intro" && <Intro s={s} />}

        {s.type === "quiz" && (
          <Quiz
            s={s}
            show={show}
            setShow={setShow}
            setModalImage={setModalImage}
          />
        )}

        {["agent", "excel", "agentbuild", "hub"].includes(
          s.type
        ) && <Bullets s={s} />}

        {s.type === "poll" && (
          <Cards cards={s.cards} />
        )}

        {s.type === "tools" && (
          <Cards cards={s.cards} big />
        )}

        {s.type === "case" && <Case s={s} />}

        {s.type === "rewrite" && (
          <Rewrite
            s={s}
            version={version}
            setVersion={setVersion}
          />
        )}

        {s.type === "gpt" && (
          <Gpt
            s={s}
            setModalImage={setModalImage}
          />
        )}

        {s.type === "exercise" && (
          <Prompt s={s} />
        )}

        {s.type === "next" && (
          <Cards cards={s.cards} />
        )}
      </section>

      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          style={styles.modal}
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

function Intro({ s }) {
  return (
    <div style={styles.twoCols}>
      <div style={styles.highlight}>
        {s.text}
      </div>

      <Bullets s={s} />
    </div>
  );
}

function Quiz({
  s,
  show,
  setShow,
  setModalImage,
}) {
  return (
    <div style={styles.white}>
      {s.image && (
        <div
          onClick={() => setModalImage(s.image)}
          style={{
            marginBottom: 24,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <img
            src={s.image}
            alt="AI Agent"
            style={styles.previewImage}
          />

          <p style={styles.previewText}>
            Click to open fullscreen
          </p>
        </div>
      )}

      <h2>{s.question}</h2>

      <div style={styles.grid2}>
        {s.options.map((o, idx) => (
          <div
            key={o}
            style={{
              ...styles.option,
              background:
                show && idx === s.answer
                  ? "#bbf7d0"
                  : "#f8fafc",
            }}
          >
            {o}
          </div>
        ))}
      </div>

      <button
        style={styles.darkBtn}
        onClick={() => setShow(!show)}
      >
        {show ? "Hide answer" : "Reveal answer"}
      </button>

      {show && (
        <div style={styles.answer}>
          {s.explanation}
        </div>
      )}
    </div>
  );
}

function Bullets({ s }) {
  return (
    <div style={styles.grid3}>
      {s.bullets.map((b) => (
        <div key={b} style={styles.card}>
          {b}
        </div>
      ))}
    </div>
  );
}

function Cards({ cards, big }) {
  return (
    <div style={big ? styles.grid5 : styles.grid3}>
      {cards.map((c) => (
        <div key={c[0]} style={styles.white}>
          <h2>{c[0]}</h2>

          <p style={styles.cardText}>{c[1]}</p>

          {c[2] && (
            <p style={styles.smallText}>
              {c[2]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Case({ s }) {
  return (
    <>
      <div style={styles.twoCols}>
        <div
          style={{
            ...styles.white,
            background: "#fef3c7",
          }}
        >
          <div style={styles.kickerDark}>
            {s.leftTitle}
          </div>

          <p style={styles.bigText}>{s.left}</p>
        </div>

        <div style={styles.white}>
          <div style={styles.kickerDark}>
            {s.rightTitle}
          </div>

          <p style={styles.bigText}>{s.right}</p>
        </div>
      </div>

      <Bullets s={s} />
    </>
  );
}

function Rewrite({
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
          Original
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
              onClick={() => setVersion(idx)}
            >
              {v[0]}
            </button>
          ))}
        </div>

        <p style={styles.bigText}>
          “{s.versions[version][1]}”
        </p>
      </div>
    </div>
  );
}

function Gpt({ s, setModalImage }) {
  return (
    <div style={styles.twoCols}>
      <div>
        <Bullets s={s} />

        {s.image && (
          <div
            onClick={() => setModalImage(s.image)}
            style={{
              marginTop: 20,
              cursor: "pointer",
            }}
          >
            <img
              src={s.image}
              alt="Guidelines"
              style={styles.previewImage}
            />

            <p style={styles.previewText}>
              Click to open full Guidelines
            </p>
          </div>
        )}
      </div>

      <div style={styles.highlight}>
        <div style={styles.kickerDark}>
          Operational expertise
        </div>

        <p style={styles.bigText}>
          {s.text}
        </p>

        <div
          style={{
            marginTop: 24,
            background:
              "rgba(255,255,255,.25)",
            borderRadius: 20,
            padding: 20,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            “AI is not magic.
            <br />
            It follows business logic.”
          </p>
        </div>
      </div>
    </div>
  );
}

function Prompt({ s }) {
  return (
    <div style={styles.highlight}>
      <div style={styles.kickerDark}>
        Prompt to try
      </div>

      <p style={styles.bigText}>
        “{s.prompt}”
      </p>
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
    color: "#67e8f9",
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
    background: "#67e8f9",
    color: "#0f172a",
    fontWeight: 900,
    cursor: "pointer",
  },

  slide: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "42px 34px",
    minHeight:
      "calc(100vh - 80px)",
  },

  title: {
    fontSize:
      "clamp(44px,6vw,78px)",
    lineHeight: 1,
    margin: "18px 0",
    fontWeight: 950,
    letterSpacing: -2,
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

  grid2: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 16,
    marginTop: 20,
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

  card: {
    background:
      "rgba(255,255,255,.1)",
    border:
      "1px solid rgba(255,255,255,.15)",
    borderRadius: 24,
    padding: 24,
    fontSize: 26,
    fontWeight: 900,
  },

  white: {
    background: "white",
    color: "#0f172a",
    borderRadius: 28,
    padding: 28,
    boxShadow:
      "0 20px 50px rgba(0,0,0,.25)",
  },

  highlight: {
    background: "#67e8f9",
    color: "#0f172a",
    borderRadius: 28,
    padding: 30,
    fontSize: 30,
    lineHeight: 1.2,
    fontWeight: 950,
    boxShadow:
      "0 20px 50px rgba(0,0,0,.25)",
  },

  option: {
    border:
      "2px solid #e2e8f0",
    borderRadius: 18,
    padding: 20,
    fontSize: 21,
    fontWeight: 900,
  },

  darkBtn: {
    marginTop: 24,
    border: "none",
    borderRadius: 16,
    background: "#0f172a",
    color: "white",
    padding: "14px 24px",
    fontSize: 18,
    fontWeight: 900,
    cursor: "pointer",
  },

  answer: {
    marginTop: 18,
    background: "#bbf7d0",
    borderRadius: 20,
    padding: 20,
    fontSize: 22,
    fontWeight: 900,
    color: "#0f172a",
  },

  cardText: {
    fontSize: 24,
    fontWeight: 900,
  },

  smallText: {
    color: "#0e7490",
    fontSize: 18,
    fontWeight: 800,
  },

  bigText: {
    fontSize: 28,
    lineHeight: 1.25,
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
    background: "#67e8f9",
    fontWeight: 900,
    cursor: "pointer",
  },

  previewImage: {
    width: "100%",
    borderRadius: 20,
    border: "3px solid #67e8f9",
    maxHeight: 260,
    objectFit: "cover",
  },

  previewText: {
    textAlign: "center",
    marginTop: 10,
    color: "#67e8f9",
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
};
