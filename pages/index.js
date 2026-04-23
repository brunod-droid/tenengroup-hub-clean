import { useMemo, useState } from "react";

const MENU = ["Dashboard", "Policies", "Events", "CRM", "Cases", "Q&A"];

const QUICK_TOOLS = [
  { name: "Kustomer", url: "https://tenengroup.kustomerapp.com/" },
  { name: "OM", url: "https://bo.tenengroup.com/" },
  { name: "OCS", url: "https://bo.tenengroup.com/" },
  { name: "Notch", url: "https://tenengroup.app.getnotch.com/" },
  { name: "AfterShip", url: "https://www.aftership.com/" },
  { name: "Matrix", url: "http://matrix.tenengroup.com:100/Login.aspx" },
  { name: "17Track", url: "https://www.17track.net/en" },
];

const CASES = [
  {
    name: "Pre-sales",
    desc: "Questions before purchase: product, materials, customization, shipping promise, countries and service questions.",
  },
  {
    name: "Change Order",
    desc: "Changes after order placement: product, material, inscription, address or shipping method.",
  },
  {
    name: "WISMO",
    desc: "Where is my order: tracking, late, DNR, lost, label created, supplier delays and return to sender.",
  },
  {
    name: "Item Received",
    desc: "Damaged, wrong material, production issue, not satisfied, resizing and warranty cases.",
  },
  {
    name: "Account Issues",
    desc: "Login, GDPR, delete data, points and customer account support.",
  },
  {
    name: "Other",
    desc: "Newsletter, collaboration, partnerships and miscellaneous requests.",
  },
];

const POLICIES = [
  {
    name: "Late / WISMO",
    desc: "Handling delays, tracking issues and delivery problems.",
    rules: [
      "Always check ETA before saying late.",
      "Under 3 business days late: apologize and provide updated ETA.",
      "Over 3 business days late: compensation may apply.",
      "Check Late Supplier before applying standard late flow.",
      "DNR: wait 3 business days after delivery scan before acting.",
    ],
    wording:
      "I'm really sorry for the delay. I've checked your order and here is the latest update: [ETA]. We are closely monitoring it for you.",
  },
  {
    name: "Late Supplier",
    desc: "Production delay before shipment.",
    rules: [
      "Check internal Late Supplier handling first.",
      "Do not treat as normal delay automatically.",
      "Proactive communication is key.",
      "Align with supply or production team if needed.",
    ],
    wording:
      "Your order is currently experiencing a production delay. Our team is already working on it and we will keep you updated as soon as we have a confirmed shipping timeline.",
  },
  {
    name: "Damaged",
    desc: "Item defective or broken.",
    rules: [
      "Ask for picture.",
      "Reorder first.",
      "Warranty applies from ETA.",
      "Refund only if reorder is not possible or policy allows it.",
    ],
    wording:
      "I'm really sorry about this. Could you please share a picture so I can resolve this for you right away? We will prioritize sending you a replacement.",
  },
  {
    name: "Not Satisfied",
    desc: "Customer does not like the item although it was produced correctly.",
    rules: [
      "Check it is not actually damaged.",
      "Exchange first.",
      "Then store credit.",
      "No refund for personalized items.",
    ],
    wording:
      "I understand this is not exactly what you expected. We'd be happy to offer you an exchange or store credit so you can choose something you truly love.",
  },
  {
    name: "Resizing",
    desc: "Size-related requests.",
    rules: [
      "Not a Not Satisfied case.",
      "Ring resizing is usually free within the valid window.",
      "Chains and bracelets follow different rules.",
    ],
    wording:
      "We can definitely help with resizing. Let me guide you through the available options based on your item.",
  },
];

const EVENTS = [
  {
    name: "Mother's Day 2026",
    desc: "Main event playbook for jewelry and Lime & Lou.",
    steps: [
      "Green Event = last day to order on time.",
      "Red Event = last day to ship on time.",
      "After Red Event, relevant messages move to On Hold.",
      "MBL communication is used for shipped orders still at risk.",
      "Last Chance may keep some orders on Hold one extra day.",
      "ETA-1 logic is adjusted around final event days.",
    ],
    decisions: [
      "Order before Green → safe.",
      "Between Green and Red → risk zone.",
      "After Red → proactive communication and On Hold logic.",
      "Thought Guaranteed = expectation mismatch case.",
    ],
  },
  {
    name: "Valentine's Day 2026",
    desc: "Same backbone as Mother's Day with event timing and expectation management.",
    steps: [
      "Green Event.",
      "Red Event.",
      "On Hold routing.",
      "Late Red Event tags.",
      "MBL handling.",
    ],
    decisions: [
      "Use expectation management heavily.",
      "Check if customer believed order was guaranteed on time.",
    ],
  },
  {
    name: "Christmas 2025",
    desc: "Holiday flow with event logic and fallback alternatives.",
    steps: [
      "Red Event.",
      "MBL handling.",
      "ETA-1 logic.",
      "Last Minute Pack fallback.",
    ],
    decisions: [
      "Use fallback alternatives when standard on-time promise is no longer possible.",
    ],
  },
];

const CRM = [
  {
    title: "Kustomer",
    content: [
      "Main CRM for customer conversations.",
      "Handles queues, tags, categories and dispositions.",
    ],
  },
  {
    title: "Categories",
    content: [
      "Auto-filled by the system.",
      "Based on source or webform.",
      "Useful for routing and reporting.",
    ],
  },
  {
    title: "Dispositions",
    content: [
      "Selected manually by agents.",
      "Reflect the real business case.",
      "More precise than categories.",
    ],
  },
  {
    title: "Tags",
    content: [
      "Tags beginning with Z are archived.",
      "Tags may be manual, automatic, event-driven or AI-driven.",
      "They should eventually map to actions, owners and Notch behavior.",
    ],
  },
  {
    title: "Queues",
    content: [
      "Queues can represent site ownership or team ownership.",
      "On Hold queues are especially important during events.",
      "Queues are key for operational workload management.",
    ],
  },
  {
    title: "Notch",
    content: [
      "Current automation and AI layer.",
      "Handles part of the standard flow.",
      "Paused or redirected in some event scenarios.",
    ],
  },
];

const SUGGESTED_QUESTIONS = [
  "My order is late by 2 days. What should I do?",
  "The item is damaged. What is the process?",
  "Customer is not satisfied with the item.",
  "How does DNR policy work?",
  "What is a Red Event during Mother's Day?",
  "Difference between category and disposition?",
  "How should I use tags?",
  "What does Notch do?",
];

function assistantAnswer(input) {
  const q = input.toLowerCase().trim();

  if (!q) {
    return {
      title: "Ask the assistant",
      body: "Type a customer care question such as: order late, damaged item, DNR, resize, Red Event, tags, dispositions or Notch.",
      tags: [],
    };
  }

  if (q.includes("late supplier")) {
    return {
      title: "Late Supplier guidance",
      body: "First confirm whether the case is truly a Late Supplier case internally. If not, handle it as regular late. Also check whether proactive communication was already sent.",
      tags: ["WISMO", "Late Supplier"],
    };
  }

  if (q.includes("late") || q.includes("delay")) {
    return {
      title: "Late order guidance",
      body: "Check whether the order is really late versus still before ETA. Under 3 business days late: apologize and provide updated ETA. Over 3 business days late: compensation may apply depending on the case. Also verify whether it is actually a Late Supplier case.",
      tags: ["WISMO", "Late"],
    };
  }

  if (q.includes("damaged") || q.includes("broken") || q.includes("defect")) {
    return {
      title: "Damaged item guidance",
      body: "Ask for a picture if none was sent, confirm the issue, apply warranty logic, and use reorder as the preferred first solution. Refund is not the first option.",
      tags: ["Damaged", "Warranty"],
    };
  }

  if (q.includes("not satisfied") || q.includes("don't like") || q.includes("dont like")) {
    return {
      title: "Not Satisfied guidance",
      body: "First make sure the case is not actually damaged. Then offer exchange first, store credit second. Personalized items are not refundable under this policy.",
      tags: ["Not Satisfied"],
    };
  }

  if (q.includes("resize") || q.includes("resizing") || q.includes("size")) {
    return {
      title: "Resizing guidance",
      body: "Resizing is a dedicated policy and should not be treated as Not Satisfied. Ring resizing is generally free within the standard window, while chains and bracelets follow separate rules.",
      tags: ["Resizing"],
    };
  }

  if (q.includes("dnr") || q.includes("delivered not received")) {
    return {
      title: "DNR guidance",
      body: "If it has been less than 3 business days since the delivery scan, ask the customer to wait. After that period, reorder or refund may be considered according to policy.",
      tags: ["DNR", "WISMO"],
    };
  }

  if (
    q.includes("mother") ||
    q.includes("red event") ||
    q.includes("green event") ||
    q.includes("mbl") ||
    q.includes("last chance")
  ) {
    return {
      title: "Event guidance",
      body: "The event structure is Green Event to Red Event to On Hold to proactive communication to Last Day of Delivery or MBL, then queue review and re-routing. Last Chance may keep some orders on Hold one extra day.",
      tags: ["Event Prompt", "Mother's Day"],
    };
  }

  if (q.includes("tag")) {
    return {
      title: "Tags guidance",
      body: "Tags starting with Z are archived. Tags may be manual, automatic, event-driven or AI-driven. They should eventually map to actions, owners and Notch behavior.",
      tags: ["Tags", "CRM"],
    };
  }

  if (q.includes("disposition")) {
    return {
      title: "Dispositions guidance",
      body: "Dispositions are selected manually by agents. They reflect the real business case and are more precise than categories.",
      tags: ["Dispositions", "CRM"],
    };
  }

  if (q.includes("category")) {
    return {
      title: "Categories guidance",
      body: "Categories are auto-filled by the system based on the webform or source. They help with routing and reporting but are different from agent-selected dispositions.",
      tags: ["Categories", "CRM"],
    };
  }

  if (q.includes("queue")) {
    return {
      title: "Queues guidance",
      body: "Queues can represent site ownership or team ownership. On Hold queues are especially important during event management and escalations.",
      tags: ["Queues", "CRM"],
    };
  }

  if (q.includes("notch")) {
    return {
      title: "Notch guidance",
      body: "Notch is the current automation and AI layer. It handles part of the standard flow, but it is paused or redirected in some event scenarios such as Red Event handling.",
      tags: ["Notch", "CRM"],
    };
  }

  return {
    title: "General guidance",
    body: "Start by identifying the case family: Pre-sales, Change Order, WISMO, Item Received, Account Issues or Other. Then open the matching section in the hub.",
    tags: ["General"],
  };
}

function Box({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

function Bullets({ items }) {
  return (
    <ul style={{ lineHeight: 1.8, color: "#4b5563", paddingLeft: 18 }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function SmallCard({ title, text, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 18,
        padding: 18,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

function TagChip({ text }) {
  return (
    <span
      style={{
        display: "inline-block",
        marginRight: 8,
        marginBottom: 8,
        padding: "6px 10px",
        background: "#eef2ff",
        borderRadius: 999,
        fontSize: 12,
        color: "#3730a3",
      }}
    >
      {text}
    </span>
  );
}

export default function Home() {
  const [page, setPage] = useState("Dashboard");
  const [question, setQuestion] = useState("");
  const [search, setSearch] = useState("");

  const answer = useMemo(() => assistantAnswer(question), [question]);

  const searchableItems = useMemo(() => {
    const policyItems = POLICIES.map((p) => ({
      type: "Policy",
      title: p.name,
      text: [p.desc, p.wording].concat(p.rules).join(" "),
      openPage: "Policies",
    }));

    const eventItems = EVENTS.map((e) => ({
      type: "Event",
      title: e.name,
      text: [e.desc].concat(e.steps).concat(e.decisions).join(" "),
      openPage: "Events",
    }));

    const crmItems = CRM.map((c) => ({
      type: "CRM",
      title: c.title,
      text: c.content.join(" "),
      openPage: "CRM",
    }));

    const caseItems = CASES.map((c) => ({
      type: "Case",
      title: c.name,
      text: c.desc,
      openPage: "Cases",
    }));

    return policyItems.concat(eventItems).concat(crmItems).concat(caseItems);
  }, []);

  const filteredResults = useMemo(() => {
    if (!search.trim()) return searchableItems.slice(0, 8);
    const q = search.toLowerCase();
    return searchableItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    });
  }, [search, searchableItems]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb", fontFamily: "Arial, sans-serif" }}>
      <aside
        style={{
          width: 250,
          background: "#0f172a",
          color: "#fff",
          padding: 20,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: "#111827",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          TG
        </div>

        <div style={{ fontSize: 22, fontWeight: 800 }}>Tenengroup</div>
        <div style={{ marginTop: 6, opacity: 0.75 }}>Customer Care Hub</div>

        <div style={{ marginTop: 28 }}>
          {MENU.map((m) => (
            <div
              key={m}
              onClick={() => setPage(m)}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                cursor: "pointer",
                background: page === m ? "#1d4ed8" : "transparent",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              {m}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 26, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 10 }}>QUICK TOOLS</div>
          {QUICK_TOOLS.map((tool) => (
            <div key={tool.name} style={{ marginBottom: 10 }}>
              <a href={tool.url} target="_blank" rel="noreferrer" style={{ color: "#dbeafe", textDecoration: "none" }}>
                {tool.name}
              </a>
            </div>
          ))}
        </div>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>
        {page === "Dashboard" && (
          <>
            <div
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
                color: "#fff",
                borderRadius: 24,
                padding: 28,
                marginBottom: 22,
              }}
            >
              <div style={{ fontSize: 18, color: "#60a5fa", fontWeight: 700 }}>Welcome to</div>
              <div style={{ fontSize: 54, fontWeight: 900, marginTop: 6 }}>TENENGROUP</div>
              <div style={{ fontSize: 32, color: "#93c5fd", marginTop: 6 }}>Customer Care Hub</div>
              <div style={{ marginTop: 18, maxWidth: 820, lineHeight: 1.7, fontSize: 18, color: "#e5e7eb" }}>
                Your central place for policies, event playbooks, CRM guidance and customer service best practices.
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 22 }}>
              <SmallCard title="Policies" text="Operational rules and wording" onClick={() => setPage("Policies")} />
              <SmallCard title="Events" text="Peak season playbooks" onClick={() => setPage("Events")} />
              <SmallCard title="CRM" text="Tags, dispositions, queues and Notch" onClick={() => setPage("CRM")} />
              <SmallCard title="Q&A" text="Assistant and quick guidance" onClick={() => setPage("Q&A")} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}>
              <Box>
                <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>Global search</div>
                <input
                  placeholder="Search policies, CRM, events or case types..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
                  {filteredResults.map((item) => (
                    <div
                      key={item.type + item.title}
                      onClick={() => setPage(item.openPage)}
                      style={{
                        padding: 14,
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        cursor: "pointer",
                        background: "#fafafa",
                      }}
                    >
                      <div style={{ fontSize: 12, color: "#4f46e5", fontWeight: 700 }}>{item.type}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{item.title}</div>
                      <div style={{ color: "#4b5563", lineHeight: 1.6, marginTop: 6 }}>
                        {item.text.slice(0, 180)}...
                      </div>
                    </div>
                  ))}
                </div>
              </Box>

              <Box>
                <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>Assistant</div>
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ marginTop: 16, fontSize: 22, fontWeight: 800 }}>{answer.title}</div>
                <div style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>{answer.body}</div>
                <div style={{ marginTop: 14 }}>
                  {answer.tags.map((tag) => (
                    <TagChip key={tag} text={tag} />
                  ))}
                </div>

                <div style={{ marginTop: 24, fontWeight: 800 }}>Suggested questions</div>
                <div style={{ marginTop: 12 }}>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <div
                      key={q}
                      onClick={() => setQuestion(q)}
                      style={{
                        padding: 12,
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        marginBottom: 10,
                        cursor: "pointer",
                        background: "#fff",
                      }}
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </Box>
            </div>
          </>
        )}

        {page === "Policies" && (
          <>
            <h1 style={{ fontSize: 40 }}>Policies</h1>
            {POLICIES.map((p) => (
              <Box key={p.name}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{p.name}</div>
                <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{p.desc}</div>

                <div style={{ marginTop: 18, fontWeight: 800 }}>Rules</div>
                <Bullets items={p.rules} />

                <div style={{ marginTop: 18, fontWeight: 800 }}>Agent wording</div>
                <div style={{ marginTop: 8, fontStyle: "italic", color: "#374151", lineHeight: 1.7 }}>
                  {p.wording}
                </div>
              </Box>
            ))}
          </>
        )}

        {page === "Events" && (
          <>
            <h1 style={{ fontSize: 40 }}>Events</h1>
            {EVENTS.map((e) => (
              <Box key={e.name}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{e.name}</div>
                <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{e.desc}</div>

                <div style={{ marginTop: 18, fontWeight: 800 }}>Steps</div>
                <Bullets items={e.steps} />

                <div style={{ marginTop: 18, fontWeight: 800 }}>Decisions</div>
                <Bullets items={e.decisions} />
              </Box>
            ))}
          </>
        )}

        {page === "CRM" && (
          <>
            <h1 style={{ fontSize: 40 }}>CRM</h1>
            {CRM.map((c) => (
              <Box key={c.title}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{c.title}</div>
                <Bullets items={c.content} />
              </Box>
            ))}
          </>
        )}

        {page === "Cases" && (
          <>
            <h1 style={{ fontSize: 40 }}>Cases</h1>
            {CASES.map((c) => (
              <Box key={c.name}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{c.name}</div>
                <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{c.desc}</div>
              </Box>
            ))}
          </>
        )}

        {page === "Q&A" && (
          <>
            <h1 style={{ fontSize: 40 }}>Q&A</h1>
            <Box>
              <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Ask the assistant</div>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Example: my order is late by 2 days"
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 10,
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                }}
              />
              <div style={{ marginTop: 18 }}>
                <div style={{ fontWeight: 800, fontSize: 24 }}>{answer.title}</div>
                <div style={{ marginTop: 12, lineHeight: 1.7 }}>{answer.body}</div>
                <div style={{ marginTop: 12 }}>
                  {answer.tags.map((tag) => (
                    <TagChip key={tag} text={tag} />
                  ))}
                </div>
              </div>
            </Box>
          </>
        )}
      </main>
    </div>
  );
}
