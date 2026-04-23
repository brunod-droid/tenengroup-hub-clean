import { useMemo, useState } from "react";

const MENU = ["Home", "Brands", "Cases", "Policies", "Events", "CRM", "Q&A"];

const QUICK_TOOLS = [
  { name: "Kustomer", url: "https://tenengroup.kustomerapp.com/" },
  { name: "OM", url: "https://bo.tenengroup.com/" },
  { name: "OCS", url: "https://bo.tenengroup.com/" },
  { name: "Notch", url: "https://tenengroup.app.getnotch.com/" },
  { name: "AfterShip", url: "https://www.aftership.com/" },
  { name: "Matrix", url: "http://matrix.tenengroup.com:100/Login.aspx" },
  { name: "17Track", url: "https://www.17track.net/en" },
];

const BRANDS = [
  {
    name: "Theo Grace",
    description:
      "Premium personalized products with an elegant, emotional and family-oriented positioning. Nicky Hilton should remain part of the brand narrative whenever relevant.",
  },
  {
    name: "Oak & Luna",
    description:
      "Modern, refined and fashion-forward personalized jewelry with a polished and trend-led tone of voice.",
  },
  {
    name: "Israel Blessing",
    description:
      "Jewish identity-focused personalized products, culturally sensitive and symbol-driven.",
  },
  {
    name: "Lime & Lou",
    description:
      "Personalized home and lifestyle products with a warm, aesthetic and modern positioning.",
  },
  {
    name: "MYKA",
    description:
      "European brand family close to Theo Grace in assortment style, but without any Nicky Hilton association.",
  },
];

const CASES = [
  {
    name: "Pre-sales",
    desc: "Questions before purchase: product, material, customization, shipping promise, countries and general service questions.",
  },
  {
    name: "Change Order",
    desc: "Changes after order placement: product, material, inscription, address or shipping method.",
  },
  {
    name: "WISMO",
    desc: "Where is my order: tracking, late, DNR, lost, label created, supplier delays, return to sender.",
  },
  {
    name: "Item Received",
    desc: "Damaged, wrong material, production issue, not satisfied, resizing, warranty cases.",
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

const POLICY_BLOCKS = [
  {
    name: "WISMO",
    desc: "Tracking, delays, late supplier, DNR, lost and return-to-sender handling.",
    bullets: [
      "Check ETA before saying late",
      "Under 3 business days late: apologize + updated ETA",
      "Over 3 business days late: compensation may apply",
      "Check Late Supplier before applying standard late flow",
      "DNR: wait 3 business days after delivery scan before acting",
    ],
  },
  {
    name: "Damaged",
    desc: "Warranty-first logic for defective or damaged items.",
    bullets: [
      "Ask for picture",
      "Reorder first",
      "Refund is not first option",
      "Warranty applies from ETA",
    ],
  },
  {
    name: "Not Satisfied",
    desc: "Customer does not like the correctly produced item.",
    bullets: [
      "Exchange first",
      "Then store credit",
      "No refund for personalized items",
    ],
  },
  {
    name: "Resizing",
    desc: "Separate from Not Satisfied and handled under dedicated sizing rules.",
    bullets: [
      "Ring resizing is generally free in standard window",
      "Chains and bracelets follow separate rules",
      "Not a Not Satisfied case",
    ],
  },
];

const EVENT_BLOCKS = [
  {
    name: "Mother's Day 2026",
    desc: "Most detailed current event prompt.",
    bullets: [
      "Green Event = last day to order on time",
      "Red Event = last day to ship on time",
      "On Hold queue logic",
      "Late Red Event tags",
      "Last Chance",
      "MBL and proactive communication",
      "Thought Guaranteed handling",
      "ETA-1 logic",
      "Lime & Lou specifics",
    ],
  },
  {
    name: "Valentine's Day 2026",
    desc: "Same backbone as Mother's Day with heavy focus on event timing and expectation management.",
    bullets: [
      "Red Event logic",
      "On Hold",
      "Late Red Event tags",
      "MBL handling",
    ],
  },
  {
    name: "Christmas 2025",
    desc: "Holiday flow with event logic and fallback alternatives.",
    bullets: [
      "Red Event",
      "MBL",
      "ETA-1",
      "Last Minute Pack logic",
    ],
  },
];

const CRM_BLOCKS = [
  {
    title: "Kustomer",
    text: "Main CRM used for conversations, queues, tags, categories and dispositions.",
  },
  {
    title: "Categories",
    text: "Auto-filled by the system based on source or webform. Useful for routing and reporting.",
  },
  {
    title: "Dispositions",
    text: "Manually selected by agents. They define the true business case more precisely than categories.",
  },
  {
    title: "Tags",
    text: "Tags beginning with Z are archived. Tags may be manual, automatic, event-driven or AI-driven.",
  },
  {
    title: "Queues",
    text: "Used for site ownership or team ownership. On Hold queues become especially important during events.",
  },
  {
    title: "Notch",
    text: "Current automation and AI layer. It handles part of the standard flow but is paused or redirected in some event scenarios.",
  },
];

const SUGGESTED_QUESTIONS = [
  "My order is late by 2 days. What should I do?",
  "The item is damaged. What is the process?",
  "Customer is not satisfied with the item.",
  "How does DNR policy work?",
  "What is a Red Event during Mother's Day?",
  "Difference between category and disposition?",
];

function assistantAnswer(input) {
  const q = input.toLowerCase().trim();

  if (!q) {
    return {
      title: "Ask the assistant",
      body: "Type a customer care question such as: order late, damaged item, DNR, resize, Red Event, tags or dispositions.",
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
      body: "Check whether the order is really late versus still before ETA. Under 3 business days late: apologize and provide updated ETA. Over 3 business days late: compensation may apply depending on the scenario. Also verify whether it is actually a Late Supplier case.",
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
      body: "First make sure the case is not actually damaged. Then offer exchange first, store credit second. Personalized items are not refundable under the Not Satisfied policy.",
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
      body: "The event structure is Green Event → Red Event → On Hold → proactive communication → Last Day of Delivery / MBL → queue review and re-routing. Last Chance may keep some orders on Hold one extra day.",
      tags: ["Event Prompt", "Mother's Day"],
    };
  }

  if (q.includes("tag")) {
    return {
      title: "Tags guidance",
      body: "Tags starting with Z are archived. Tags may be manual, automatic, event-driven or AI-driven. They should eventually be mapped to actions, owners and Notch behavior.",
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
    body: "Start by identifying the case family: Pre-sales, Change Order, WISMO, Item Received, Account Issues or Other. Then open the matching page in the hub.",
    tags: ["General"],
  };
}

function Bullets({ items }) {
  return (
    <ul style={{ lineHeight: 1.8, color: "#4b5563", paddingLeft: 18 }}>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function SectionCard({ title, subtitle, icon, onClick, bg }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: bg || "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 20,
        padding: 22,
        cursor: "pointer",
        minHeight: 170,
      }}
    >
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div style={{ marginTop: 18, fontSize: 24, fontWeight: 700, color: "#111827" }}>
        {title}
      </div>
      <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.6 }}>{subtitle}</div>
      <div style={{ marginTop: 20, fontWeight: 700, color: "#4f46e5" }}>Open →</div>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 18,
        padding: 20,
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{title}</div>
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

function Box({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        border: "1px solid #e5e7eb",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState("Home");
  const [assistantQuery, setAssistantQuery] = useState("");
  const [search, setSearch] = useState("");
  const [logoOk, setLogoOk] = useState(true);

  const assistantResult = useMemo(() => assistantAnswer(assistantQuery), [assistantQuery]);

  const filteredQuickQA = useMemo(() => {
    return SUGGESTED_QUESTIONS.filter((q) =>
      q.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fb", fontFamily: "Arial, sans-serif", color: "#111827" }}>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <aside
          style={{
            width: 260,
            background: "linear-gradient(180deg, #061127 0%, #0b1324 100%)",
            color: "#fff",
            padding: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 14,
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            TG
          </div>

          <div style={{ fontSize: 18, fontWeight: 700 }}>Tenengroup</div>
          <div style={{ opacity: 0.78, marginTop: 6 }}>Customer Care Hub</div>

          <div style={{ marginTop: 28 }}>
            {MENU.map((item) => (
              <div
                key={item}
                onClick={() => setPage(item)}
                style={{
                  marginBottom: 8,
                  padding: "14px 14px",
                  borderRadius: 12,
                  cursor: "pointer",
                  background: page === item ? "#274690" : "transparent",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 24,
              paddingTop: 18,
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.72, marginBottom: 12 }}>QUICK TOOLS</div>
            {QUICK_TOOLS.map((tool) => (
              <div key={tool.name} style={{ marginBottom: 10 }}>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#e5edff", textDecoration: "none" }}
                >
                  {tool.name}
                </a>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "auto",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 700 }}>Need help?</div>
            <div style={{ marginTop: 10, fontSize: 14, opacity: 0.82, lineHeight: 1.6 }}>
              Use the assistant or browse the knowledge base sections.
            </div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: 22 }}>
          {page === "Home" && (
            <>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 26,
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  marginBottom: 22,
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #020617 0%, #081427 100%)",
                    minHeight: 390,
                    position: "relative",
                    padding: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {logoOk ? (
                    <img
                      src="/logo-hub.png"
                      alt="Tenengroup hub logo"
                      onError={() => setLogoOk(false)}
                      style={{
                        maxWidth: "100%",
                        maxHeight: 320,
                        objectFit: "contain",
                        borderRadius: 18,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "90%",
                        height: 300,
                        borderRadius: 24,
                        border: "1px solid rgba(255,255,255,0.12)",
                        background:
                          "radial-gradient(circle at center, rgba(56,189,248,0.18), rgba(2,6,23,0.1) 45%), linear-gradient(135deg, #020617, #111827)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        textAlign: "center",
                        padding: 30,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 18, opacity: 0.8 }}>Add your image as</div>
                        <div style={{ marginTop: 10, fontSize: 28, fontWeight: 700 }}>
                          public/logo-hub.png
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ padding: 34, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ color: "#2563eb", fontWeight: 700, fontSize: 18 }}>Welcome to</div>
                  <div style={{ marginTop: 8, fontSize: 62, lineHeight: 1, fontWeight: 800, letterSpacing: -1 }}>
                    TENENGROUP
                  </div>
                  <div style={{ marginTop: 8, fontSize: 36, color: "#2563eb", fontWeight: 500 }}>
                    Customer Care Hub
                  </div>
                  <div style={{ marginTop: 20, fontSize: 18, lineHeight: 1.7, color: "#374151" }}>
                    Your central place for policies, event playbooks, CRM guidance and support best practices.
                  </div>

                  <div
                    style={{
                      marginTop: 26,
                      background: "#0f172a",
                      color: "#fff",
                      padding: "18px 22px",
                      borderRadius: 18,
                      display: "inline-flex",
                      alignItems: "center",
                      width: "fit-content",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 22 }}>🛡️</span>
                    <span style={{ fontSize: 18 }}>One team. One standard. One experience.</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.15fr", gap: 22, alignItems: "start" }}>
                <div>
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 22,
                      padding: 22,
                      marginBottom: 22,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                      <div style={{ fontSize: 30, fontWeight: 800 }}>Quick access</div>
                      <div style={{ color: "#4f46e5", fontWeight: 700 }}>View all</div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                      <SectionCard
                        title="Policies"
                        subtitle="Official guidelines and procedures"
                        icon="📄"
                        bg="#f3efff"
                        onClick={() => setPage("Policies")}
                      />
                      <SectionCard
                        title="Events"
                        subtitle="Peak season playbooks"
                        icon="📅"
                        bg="#edf8f0"
                        onClick={() => setPage("Events")}
                      />
                      <SectionCard
                        title="CRM"
                        subtitle="Tools, tags and processes"
                        icon="👥"
                        bg="#eef4ff"
                        onClick={() => setPage("CRM")}
                      />
                      <SectionCard
                        title="Q&A"
                        subtitle="Ask the assistant or search answers"
                        icon="💬"
                        bg="#faf1dc"
                        onClick={() => setPage("Q&A")}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 22,
                      padding: 22,
                    }}
                  >
                    <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 20 }}>Knowledge base</div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                      <InfoCard
                        title="Brands"
                        text="Brand positioning, tone of voice and key information."
                      />
                      <InfoCard
                        title="Cases"
                        text="Case typology and how to identify the right category."
                      />
                      <InfoCard
                        title="Policies"
                        text="Step-by-step policies for every situation."
                      />
                      <InfoCard
                        title="Events"
                        text="Event prompts, timelines and operational flows."
                      />
                      <InfoCard
                        title="CRM"
                        text="Kustomer, tags, dispositions, queues and Notch."
                      />
                      <InfoCard
                        title="Q&A"
                        text="Common questions and smart assistant support."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 22,
                      padding: 22,
                      marginBottom: 22,
                    }}
                  >
                    <div style={{ fontSize: 30, fontWeight: 800, color: "#4f46e5", marginBottom: 18 }}>
                      Ask the assistant
                    </div>

                    <input
                      value={assistantQuery}
                      onChange={(e) => setAssistantQuery(e.target.value)}
                      placeholder="Type your question..."
                      style={{
                        width: "100%",
                        padding: "16px 18px",
                        borderRadius: 14,
                        border: "1px solid #d1d5db",
                        fontSize: 16,
                        boxSizing: "border-box",
                      }}
                    />

                    <div style={{ marginTop: 12, color: "#6b7280", fontSize: 14 }}>
                      Try: order late by 2 days, damaged item, DNR, resize, red event...
                    </div>

                    <div
                      style={{
                        marginTop: 20,
                        background: "#fafafa",
                        border: "1px solid #e5e7eb",
                        borderRadius: 16,
                        padding: 18,
                      }}
                    >
                      <div style={{ fontSize: 24, fontWeight: 800 }}>{assistantResult.title}</div>
                      <div style={{ marginTop: 12, color: "#374151", lineHeight: 1.7 }}>
                        {assistantResult.body}
                      </div>
                      <div style={{ marginTop: 14 }}>
                        {assistantResult.tags.map((tag) => (
                          <TagChip key={tag} text={tag} />
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: 24, fontWeight: 800, fontSize: 20 }}>Suggested questions</div>
                    <div style={{ marginTop: 14 }}>
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <div
                          key={q}
                          onClick={() => setAssistantQuery(q)}
                          style={{
                            padding: "14px 14px",
                            border: "1px solid #e5e7eb",
                            borderRadius: 14,
                            marginBottom: 10,
                            cursor: "pointer",
                            background: "#fff",
                          }}
                        >
                          {q}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 22,
                      padding: 22,
                    }}
                  >
                    <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 18 }}>Important reminders</div>
                    <Bullets
                      items={[
                        "Always check OM before replying",
                        "Follow the correct policy",
                        "Tag accurately",
                        "Escalate when unsure",
                      ]}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {page === "Brands" && (
            <>
              <h1 style={{ fontSize: 42, marginBottom: 18 }}>Brands</h1>
              {BRANDS.map((b) => (
                <Box key={b.name}>
                  <h3 style={{ fontSize: 28, marginTop: 0 }}>{b.name}</h3>
                  <p style={{ lineHeight: 1.8, color: "#374151" }}>{b.description}</p>
                </Box>
              ))}
            </>
          )}

          {page === "Cases" && (
            <>
              <h1 style={{ fontSize: 42, marginBottom: 18 }}>Case Typology</h1>
              {CASES.map((c) => (
                <Box key={c.name}>
                  <h3 style={{ fontSize: 28, marginTop: 0 }}>{c.name}</h3>
                  <p style={{ lineHeight: 1.8, color: "#374151" }}>{c.desc}</p>
                </Box>
              ))}
            </>
          )}

          {page === "Policies" && (
            <>
              <h1 style={{ fontSize: 42, marginBottom: 18 }}>Policies</h1>
              {POLICY_BLOCKS.map((p) => (
                <Box key={p.name}>
                  <h3 style={{ fontSize: 28, marginTop: 0 }}>{p.name}</h3>
                  <p style={{ color: "#374151", lineHeight: 1.8 }}>{p.desc}</p>
                  <Bullets items={p.bullets} />
                </Box>
              ))}
            </>
          )}

          {page === "Events" && (
            <>
              <h1 style={{ fontSize: 42, marginBottom: 18 }}>Event Prompts</h1>
              {EVENT_BLOCKS.map((e) => (
                <Box key={e.name}>
                  <h2 style={{ marginTop: 0 }}>{e.name}</h2>
                  <p style={{ color: "#374151", lineHeight: 1.8 }}>{e.desc}</p>
                  <Bullets items={e.bullets} />
                </Box>
              ))}
            </>
          )}

          {page === "CRM" && (
            <>
              <h1 style={{ fontSize: 42, marginBottom: 18 }}>CRM</h1>
              {CRM_BLOCKS.map((b) => (
                <Box key={b.title}>
                  <h3 style={{ fontSize: 28, marginTop: 0 }}>{b.title}</h3>
                  <p style={{ color: "#374151", lineHeight: 1.8 }}>{b.text}</p>
                </Box>
              ))}
            </>
          )}

          {page === "Q&A" && (
            <>
              <h1 style={{ fontSize: 42, marginBottom: 18 }}>Q&A</h1>

              <Box>
                <h3 style={{ marginTop: 0 }}>Ask the assistant</h3>
                <input
                  value={assistantQuery}
                  onChange={(e) => setAssistantQuery(e.target.value)}
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
                  <div style={{ fontWeight: 800, fontSize: 24 }}>{assistantResult.title}</div>
                  <div style={{ marginTop: 12, lineHeight: 1.7 }}>{assistantResult.body}</div>
                  <div style={{ marginTop: 12 }}>
                    {assistantResult.tags.map((tag) => (
                      <TagChip key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              </Box>

              <Box>
                <h3 style={{ marginTop: 0 }}>Search common questions</h3>
                <input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 10,
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                    marginBottom: 16,
                  }}
                />
                {filteredQuickQA.map((q) => (
                  <div key={q} style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                    {q}
                  </div>
                ))}
              </Box>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
