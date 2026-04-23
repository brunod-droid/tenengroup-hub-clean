import { useMemo, useState } from "react";

/* =========================
   DATA
========================= */

const MENU = ["Home", "Policies", "Events", "CRM", "Q&A"];

const POLICY_BLOCKS = [
  {
    name: "Late / WISMO",
    desc: "Handling delays, tracking issues and delivery problems.",
    rules: [
      "Always check ETA before saying late",
      "Under 3 business days late → apologize + give updated ETA",
      "Over 3 business days late → compensation may apply",
      "Check Late Supplier BEFORE applying standard late flow",
      "DNR → wait 3 business days after delivery scan",
    ],
    wording:
      "I'm really sorry for the delay. I’ve checked your order and here is the latest update: [ETA]. We are closely monitoring it for you.",
  },

  {
    name: "Late Supplier",
    desc: "Production delay before shipment.",
    rules: [
      "Check internal Late Supplier file",
      "Do NOT treat as normal delay",
      "Proactive communication is key",
      "Align with supply team if needed",
    ],
    wording:
      "Your order is currently experiencing a production delay. Our team is already working on it and we will keep you updated as soon as we have a confirmed shipping timeline.",
  },

  {
    name: "Damaged",
    desc: "Item defective or broken.",
    rules: [
      "Ask for picture (mandatory)",
      "Reorder FIRST (not refund)",
      "Warranty applies from ETA",
      "Refund only if reorder not possible",
    ],
    wording:
      "I'm really sorry about this. Could you please share a picture so I can resolve this for you right away? We will prioritize sending you a replacement.",
  },

  {
    name: "Not Satisfied",
    desc: "Customer does not like item.",
    rules: [
      "Check NOT damaged first",
      "Exchange FIRST",
      "Then store credit",
      "No refund (personalized)",
    ],
    wording:
      "I understand this is not exactly what you expected. We’d be happy to offer you an exchange or store credit so you can choose something you truly love.",
  },

  {
    name: "Resizing",
    desc: "Size-related requests.",
    rules: [
      "Not a Not Satisfied case",
      "Ring resizing usually free (within window)",
      "Chains follow different rules",
    ],
    wording:
      "We can definitely help with resizing. Let me guide you through the available options based on your item.",
  },
];

/* =========================
   EVENTS (Mother's Day level)
========================= */

const EVENT_BLOCKS = [
  {
    name: "Mother’s Day Playbook",
    steps: [
      "Green Event → last day to ORDER",
      "Red Event → last day to SHIP",
      "After Red → orders move to On Hold",
      "MBL (May Be Late) communication",
      "Last Chance logic",
      "ETA-1 handling",
    ],
    decisions: [
      "Order before Green → safe",
      "Between Green and Red → risk",
      "After Red → On Hold + proactive comm",
      "DNR during event → stricter rules",
    ],
  },
];

/* =========================
   CRM
========================= */

const CRM_BLOCKS = [
  {
    title: "Tags",
    content: [
      "Z tags = archived",
      "Manual vs automatic tags",
      "Event tags (Red Event, MBL, etc.)",
      "Tags should trigger actions",
    ],
  },
  {
    title: "Dispositions",
    content: [
      "Selected manually by agent",
      "Reflect real case type",
      "Used for reporting accuracy",
    ],
  },
  {
    title: "Categories",
    content: [
      "Auto-filled by system",
      "Based on webform/source",
      "Less precise than dispositions",
    ],
  },
  {
    title: "Queues",
    content: [
      "Ownership per team or site",
      "On Hold queue during events",
      "Important for workload management",
    ],
  },
  {
    title: "Notch",
    content: [
      "AI automation layer",
      "Handles basic flows",
      "Limited during events",
    ],
  },
];

/* =========================
   ASSISTANT
========================= */

function assistantAnswer(input) {
  const q = input.toLowerCase();

  if (q.includes("late supplier")) {
    return "Check internal Late Supplier first. Do NOT treat as standard delay. Use proactive communication.";
  }

  if (q.includes("late")) {
    return "Check ETA. <3 days late → apology + ETA. >3 days → compensation possible.";
  }

  if (q.includes("damaged")) {
    return "Ask for picture → reorder first → refund only if needed.";
  }

  if (q.includes("not satisfied")) {
    return "Offer exchange first, then store credit. No refund for personalized.";
  }

  if (q.includes("dnr")) {
    return "Wait 3 business days after delivery scan before action.";
  }

  if (q.includes("tag")) {
    return "Tags define actions. Z tags are archived.";
  }

  return "Identify case type first (WISMO, Damaged, etc.) then apply policy.";
}

/* =========================
   COMPONENTS
========================= */

function Box({ children }) {
  return (
    <div style={{ background: "#fff", padding: 20, borderRadius: 12, marginBottom: 20 }}>
      {children}
    </div>
  );
}

function Bullets({ items }) {
  return (
    <ul>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

/* =========================
   MAIN
========================= */

export default function Home() {
  const [page, setPage] = useState("Home");
  const [question, setQuestion] = useState("");

  const answer = useMemo(() => assistantAnswer(question), [question]);

  return (
    <div style={{ display: "flex", fontFamily: "Arial" }}>
      <aside style={{ width: 220, background: "#111", color: "#fff", padding: 20 }}>
        <h2>Tenengroup</h2>

        {MENU.map((m) => (
          <div
            key={m}
            onClick={() => setPage(m)}
            style={{ padding: 10, cursor: "pointer" }}
          >
            {m}
          </div>
        ))}
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        {page === "Home" && (
          <>
            <h1>Customer Care Hub</h1>
            <p>Central knowledge base for CS teams.</p>
          </>
        )}

        {page === "Policies" && (
          <>
            <h1>Policies</h1>
            {POLICY_BLOCKS.map((p) => (
              <Box key={p.name}>
                <h2>{p.name}</h2>
                <p>{p.desc}</p>

                <h4>Rules</h4>
                <Bullets items={p.rules} />

                <h4>Agent wording</h4>
                <p style={{ fontStyle: "italic" }}>{p.wording}</p>
              </Box>
            ))}
          </>
        )}

        {page === "Events" && (
          <>
            <h1>Events</h1>
            {EVENT_BLOCKS.map((e) => (
              <Box key={e.name}>
                <h2>{e.name}</h2>

                <h4>Steps</h4>
                <Bullets items={e.steps} />

                <h4>Decisions</h4>
                <Bullets items={e.decisions} />
              </Box>
            ))}
          </>
        )}

        {page === "CRM" && (
          <>
            <h1>CRM</h1>
            {CRM_BLOCKS.map((c) => (
              <Box key={c.title}>
                <h2>{c.title}</h2>
                <Bullets items={c.content} />
              </Box>
            ))}
          </>
        )}

        {page === "Q&A" && (
          <>
            <h1>Assistant</h1>

            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              style={{ width: "100%", padding: 10 }}
            />

            <Box>
              <strong>Answer:</strong>
              <p>{answer}</p>
            </Box>
          </>
        )}
      </main>
    </div>
  );
}
