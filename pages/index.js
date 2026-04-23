import { useMemo, useState } from "react";

const MENU = ["Home", "Brands", "Cases", "Policies", "Events", "CRM", "Q&A"];

const CASES = [
  {
    name: "Pre-sales",
    desc: "Questions before purchase (product, materials, shipping, customization, countries, etc.)",
  },
  {
    name: "Change Order",
    desc: "Changes after order: product, material, inscription, address, shipping method",
  },
  {
    name: "WISMO",
    desc: "Where is my order – tracking, late, DNR, lost, supplier delays",
  },
  {
    name: "Item Received",
    desc: "Damaged, wrong product, not satisfied, warranty cases",
  },
  {
    name: "Account Issues",
    desc: "Login, GDPR, account data, loyalty points",
  },
  {
    name: "Other",
    desc: "Newsletter, partnerships, miscellaneous",
  },
];

const CRM_BLOCKS = [
  {
    title: "Kustomer",
    level: "CONFIRMED",
    content: [
      "Main CRM used for all customer interactions",
      "Handles conversations, queues, tags, dispositions, categories",
    ],
  },
  {
    title: "Categories",
    level: "CONFIRMED",
    content: [
      "Auto-filled based on webform or entry point",
      "Used for routing and reporting",
      "NOT chosen manually by agents",
    ],
  },
  {
    title: "Dispositions",
    level: "CONFIRMED",
    content: [
      "Selected manually by agents",
      "Defines the real business case",
      "More precise than categories",
      "Used for reporting and analysis",
    ],
  },
  {
    title: "Tags",
    level: "OPERATIONAL DRAFT",
    content: [
      "Tags starting with Z = archived",
      "Tags have different importance levels",
      "Can be manual, automatic, event-driven or AI-driven",
      "Examples: AI reply, auto change address, auto inscription, free gift",
      "Future goal: tag → action mapping",
    ],
  },
  {
    title: "Queues",
    level: "CONFIRMED",
    content: [
      "Represent site or team ownership",
      "Used for routing workload",
      "On Hold queues are critical during events",
    ],
  },
  {
    title: "Notch (AI layer)",
    level: "OPERATIONAL DRAFT",
    content: [
      "Handles part of the automated support flow",
      "Answers simple cases automatically",
      "Paused during Red Events or complex situations",
      "Can escalate to human agents",
    ],
  },
];

const EVENTS = [
  {
    name: "Mother’s Day 2026",
    sections: [
      {
        title: "Core structure",
        items: [
          "Green Event = last day to order on time",
          "Red Event = last day to ship on time",
          "Last Delivery Day = last arrival window",
          "ETA-1 = proactive delay before ETA",
        ],
      },
      {
        title: "Operational flow",
        items: [
          "At Red Event → Notch stops answering",
          "Messages go to On Hold",
          "Orders tagged Late Red Event",
          "Proactive delay message sent",
        ],
      },
      {
        title: "Advanced flows",
        items: [
          "Last Chance = +1 day attempt",
          "MBL = risk orders still not delivered",
          "Thought Guaranteed = customer expectation mismatch",
        ],
      },
      {
        title: "Lime & Lou",
        items: [
          "Local production logic",
          "Shipping speed does NOT impact production time",
          "Different messaging (no 'supplier')",
        ],
      },
    ],
  },
];

const POLICIES = [
  {
    name: "WISMO",
    content: [
      "Check ETA before saying late",
      "Under 3 days late → apology only",
      "Over 3 days → compensation possible",
      "DNR → wait 3 business days",
    ],
  },
  {
    name: "Damaged",
    content: [
      "Ask for picture",
      "Reorder first",
      "Refund last",
      "2-year warranty applies",
    ],
  },
  {
    name: "Not Satisfied",
    content: [
      "Exchange first",
      "Store credit second",
      "No refund for personalized items",
    ],
  },
];

const QA = [
  {
    q: "Order late by 2 days?",
    a: "Apologize + give updated ETA. No compensation yet.",
  },
  {
    q: "Damaged item?",
    a: "Ask for picture and reorder.",
  },
  {
    q: "Customer not satisfied?",
    a: "Exchange → store credit → no refund for personalized.",
  },
];

function Box({ children }) {
  return (
    <div style={{ background: "#fff", padding: 20, borderRadius: 12, marginBottom: 20 }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState("Home");
  const [search, setSearch] = useState("");

  const filteredQA = useMemo(() => {
    return QA.filter((q) =>
      q.q.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      
      {/* MENU */}
      <div style={{ width: 260, background: "#111", color: "#fff", padding: 20 }}>
        <h2>Tenengroup</h2>
        {MENU.map((m) => (
          <div key={m} onClick={() => setPage(m)} style={{ margin: 10, cursor: "pointer" }}>
            {m}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 30 }}>

        {page === "Home" && (
          <>
            <h1>Customer Care Hub</h1>
            <p>Internal knowledge base for support and management.</p>
          </>
        )}

        {page === "Cases" && (
          <>
            <h1>Case Typology</h1>
            {CASES.map((c) => (
              <Box key={c.name}>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
              </Box>
            ))}
          </>
        )}

        {page === "CRM" && (
          <>
            <h1>CRM Structure</h1>
            {CRM_BLOCKS.map((b) => (
              <Box key={b.title}>
                <h3>{b.title}</h3>
                <p><b>Status:</b> {b.level}</p>
                <ul>
                  {b.content.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </Box>
            ))}
          </>
        )}

        {page === "Events" && (
          <>
            <h1>Event Prompt</h1>
            {EVENTS.map((e) => (
              <Box key={e.name}>
                <h2>{e.name}</h2>
                {e.sections.map((s) => (
                  <div key={s.title}>
                    <h4>{s.title}</h4>
                    <ul>
                      {s.items.map((i) => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
                ))}
              </Box>
            ))}
          </>
        )}

        {page === "Policies" && (
          <>
            <h1>Policies</h1>
            {POLICIES.map((p) => (
              <Box key={p.name}>
                <h3>{p.name}</h3>
                <ul>
                  {p.content.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </Box>
            ))}
          </>
        )}

        {page === "Q&A" && (
          <>
            <h1>Q&A</h1>
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {filteredQA.map((q) => (
              <Box key={q.q}>
                <b>{q.q}</b>
                <p>{q.a}</p>
              </Box>
            ))}
          </>
        )}

      </div>
    </div>
  );
}
