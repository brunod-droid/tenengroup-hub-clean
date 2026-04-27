import qaTeam from "../data/qaTeam";
import ocyTeam from "../data/ocyTeam";
import shineonProducts from "../data/shineonProducts";
import { useMemo, useState } from "react";

import BRANDS from "../data/brands";
import CASES from "../data/cases";
import POLICIES from "../data/policies";
import EVENTS from "../data/events";
import CRM from "../data/crm";
import LOGISTICS from "../data/logistics";
import AI_AGENTS from "../data/aiAgents";
import YVES_ROCHER from "../data/yvesRocher";
import SOCIAL_POLICY from "../data/socialPolicy";

const MENU = [
  "Home",
  "Training",
  "Brands",
  "Cases",
  "Policies",
  "Events",
  "CRM",
  "Logistics",
  "Yves Rocher",
  "Social Policy",
  "QA Team",
  "OCy",
  "AI Agents",
  "Q&A",
];

const QUICK_TOOLS = [
  { name: "Kustomer", url: "https://tenengroup.kustomerapp.com/" },
  { name: "OM / OCS", url: "https://bo.tenengroup.com/" },
  { name: "Notch", url: "https://tenengroup.app.getnotch.com/" },
  { name: "AfterShip", url: "https://www.aftership.com/" },
  { name: "Matrix", url: "http://matrix.tenengroup.com:100/Login.aspx" },
  { name: "17Track", url: "https://www.17track.net/en" },
];

const TRAINING = [
  {
    id: "intro",
    name: "Customer Care in 20 minutes",
    short: "A quick orientation for new Tenengroup employees.",
    full: [
      "Customer Care is one of the main bridges between customers and the company.",
      "The team protects customer experience, brand reputation and business performance.",
      "The goal of this session is not to train people as agents, but to help every new employee understand what Customer Care does and why it matters.",
    ],
  },
  {
    id: "team",
    name: "Who we are",
    short: "A global customer team with multiple expert functions.",
    full: [
      "Customer Care includes 50–100 agents around the world.",
      "The team works with leadership, QA, Order Cycle, Operations, Project Management and team leaders.",
      "Main countries represented include Israel, Italy, Hungary, Ukraine, Philippines, Mexico, Thailand, Spain and Austria.",
    ],
  },
  {
    id: "mission",
    name: "Our mission",
    short: "Customer experience, retention and company insight.",
    full: [
      "Optimize the customer experience through tone of voice, policies and service quality.",
      "Maximize lifetime value and reduce customer churn.",
      "Identify and implement new channels to improve satisfaction.",
      "Coordinate with Shipping, Factory and Brands to bring customer insights back to the company.",
    ],
  },
  {
    id: "channels",
    name: "Where customers reach us",
    short: "Customers contact us through many channels.",
    full: [
      "Webform and emails.",
      "Social media such as Facebook and Instagram.",
      "Trustpilot reviews.",
      "Other public platforms such as Reddit, BBB and complaint websites.",
    ],
  },
  {
    id: "kpis",
    name: "Our KPIs",
    short: "How Customer Care performance is measured.",
    full: [
      "CSAT: customer satisfaction after interaction.",
      "SLA: speed and respect of response-time commitments.",
      "NPS: customer loyalty and likelihood to recommend.",
      "Order cost: operational efficiency and cost of resolving issues.",
    ],
  },
  {
    id: "wheel",
    name: "Customer Service Wheel",
    short: "The main families of customer questions.",
    full: [
      "Pre-sales: products, shipping, warranty, special requests, payment, technical issues and coupons.",
      "Change Order: address, item, inscription or shipping method changes.",
      "WISMO: Where Is My Order, late supplier, late, on time, lost, DNR and return to sender.",
      "Item Received: damaged, not satisfied, production mistake or customer mistake.",
      "Other cases: account issues, collaboration requests and spam.",
    ],
  },
  {
    id: "responsibilities",
    name: "Responsibilities",
    short: "Different teams support different parts of the customer journey.",
    full: [
      "CS handles direct customer conversations.",
      "OCy supports order cycle topics and partner-specific order rules.",
      "QA supports product quality, complex item received cases and escalations.",
      "AI / Notch supports automation and monitoring for standard flows.",
      "Customer Care also handles proactive monitoring: OOS, payment issues, late supplier, upgrade, shipping issues and ETA-1.",
    ],
  },
  {
    id: "trustpilot",
    name: "Trustpilot examples",
    short: "How public reviews should be understood.",
    full: [
      "A good Trustpilot response is personal, empathetic and solution-oriented.",
      "A good response shows ownership and gives a next step: ETA, reorder, refund, escalation or direct contact.",
      "A weak response is generic, defensive, too long, or does not show a clear solution.",
      "Trustpilot is not only a complaint channel; it is also a public signal of trust and brand credibility.",
      "Examples to discuss in session: late delivery review, damaged item review, excellent service review, and frustrated customer who received no update.",
    ],
  },
  {
    id: "final",
    name: "Final message",
    short: "Customer Care success depends on cooperation.",
    full: [
      "High-quality service depends on cooperation between departments.",
      "Customer Care is not only a support function; it is also a source of customer insight.",
      "The Customer Care Hub is the reference point for policies, teams, tools and customer handling logic.",
    ],
  },
];

const QUIZ = [
  {
    question: "What is WISMO?",
    answer: "Where Is My Order: tracking, late, DNR, lost, return to sender and delivery questions.",
  },
  {
    question: "Why does Customer Care matter for the company?",
    answer: "It protects customer experience, retention, brand reputation and brings insights back to the business.",
  },
  {
    question: "Name two public channels where customers can leave feedback.",
    answer: "Trustpilot, Facebook, Instagram, Reddit, BBB or complaint websites.",
  },
  {
    question: "What is the role of QA?",
    answer: "QA supports complex quality cases, product issues, damaged/wrong item validation and escalations.",
  },
  {
    question: "What is one thing a good Trustpilot reply should include?",
    answer: "Empathy, ownership and a clear next step.",
  },
];

const SUGGESTED_QUESTIONS = [
  "My order is late by 2 days. What should I do?",
  "The item is damaged. What is the process?",
  "Customer is not satisfied with the item.",
  "How does DNR policy work?",
  "What is a Red Event during Mother's Day?",
  "Difference between category and disposition?",
  "Yves Rocher wrong address reship?",
  "Oak & Luna negative public comment?",
  "When should I escalate to QA?",
  "What are the ShineOn product rules?",
];

function normalizeProduct(p, index) {
  const notes = p.notes || "No specific note documented.";
  return {
    id: "shineon-" + index,
    name: p.productName || "ShineOn product",
    short: notes.length > 180 ? notes.slice(0, 180) + "..." : notes,
    full: [notes],
    type: "ShineOn Product",
  };
}

function assistantAnswer(input) {
  const q = input.toLowerCase().trim();

  if (!q) {
    return {
      title: "Ask the assistant",
      body: "Ask about late orders, damaged items, DNR, Red Event, Social, Yves Rocher, QA, OCy, ShineOn, tags or dispositions.",
      tags: [],
    };
  }

  if (q.includes("training") || q.includes("new employee") || q.includes("orientation")) {
    return {
      title: "Training guidance",
      body: "Open the Training page. It gives a 20-minute overview of Customer Care: mission, team, channels, KPIs, responsibilities and a short quiz.",
      tags: ["Training"],
    };
  }

  if (q.includes("trustpilot") || q.includes("review")) {
    return {
      title: "Trustpilot guidance",
      body: "A good public review response should be empathetic, personal and solution-oriented. It should show ownership and provide a clear next step.",
      tags: ["Trustpilot", "Public Reviews"],
    };
  }

  if (q.includes("shineon") || q.includes("ocy") || q.includes("product")) {
    return {
      title: "OCy / ShineOn guidance",
      body: "Go to the OCy page and search the ShineOn product. Always check product-specific notes before confirming personalization or feasibility.",
      tags: ["OCy", "ShineOn"],
    };
  }

  if (q.includes("qa") || q.includes("quality") || q.includes("escalate")) {
    return {
      title: "QA guidance",
      body: "Escalate unclear, repeated, sensitive or product-quality cases to QA. QA helps classify damaged vs Not Satisfied vs production error.",
      tags: ["QA Team"],
    };
  }

  if (q.includes("oak") && (q.includes("negative") || q.includes("comment") || q.includes("criticism"))) {
    return {
      title: "Oak & Luna social criticism",
      body: "Use only approved neutral public wording, move immediately to DM, do not explain publicly, and hide the negative comment after the approved public response.",
      tags: ["Social", "Oak & Luna"],
    };
  }

  if (q.includes("social") || q.includes("facebook") || q.includes("instagram")) {
    return {
      title: "Social guidance",
      body: "Sort by newest, reply directly under the comment, keep public replies short and professional, move concerns to DM, then document context in Kustomer/OM where needed.",
      tags: ["Social"],
    };
  }

  if (q.includes("yves") || q.includes("shopify") || q.includes("gorgias")) {
    return {
      title: "Yves Rocher guidance",
      body: "Yves Rocher uses Shopify for orders, Gorgias for tickets and Notch/Taylor for AI. Check Shopify tags, order status, BC number and Gorgias timeline before deciding.",
      tags: ["Yves Rocher", "Shopify", "Gorgias"],
    };
  }

  if (q.includes("dnr") || q.includes("delivered not received")) {
    return {
      title: "DNR guidance",
      body: "Tenengroup: wait 3 business days after delivery scan. Yves Rocher: allow 7 business days and ask for Non-Receipt form before action.",
      tags: ["DNR", "WISMO"],
    };
  }

  if (q.includes("late") || q.includes("delay")) {
    return {
      title: "Late order guidance",
      body: "Check ETA first. Under 3 business days late: apologize and give ETA. Over 3 business days late: compensation may apply. Also verify Late Supplier.",
      tags: ["WISMO", "Late"],
    };
  }

  if (q.includes("damaged") || q.includes("broken") || q.includes("defect")) {
    return {
      title: "Damaged item guidance",
      body: "Ask for picture, confirm issue, apply warranty logic, reorder first. Refund is not the first option unless policy allows it.",
      tags: ["Damaged"],
    };
  }

  if (q.includes("not satisfied") || q.includes("dont like") || q.includes("don't like")) {
    return {
      title: "Not Satisfied guidance",
      body: "Confirm it is not damaged. Offer exchange first, then store credit. For Yves Rocher, first offer 100% coupon, then return/refund if refused.",
      tags: ["Not Satisfied"],
    };
  }

  if (q.includes("red event") || q.includes("mother") || q.includes("mbl") || q.includes("last chance")) {
    return {
      title: "Event guidance",
      body: "Use Green Event, Red Event, On Hold, proactive communication, MBL and Last Chance logic. Check if proactive message was already sent before replying.",
      tags: ["Event"],
    };
  }

  if (q.includes("tag")) {
    return {
      title: "Tags guidance",
      body: "Tags may be manual, automatic, event-driven or AI-driven. They should map to actions, owners and Notch behavior.",
      tags: ["Tags", "CRM"],
    };
  }

  if (q.includes("disposition")) {
    return {
      title: "Dispositions guidance",
      body: "Dispositions are selected manually by agents and define the real business case more precisely than categories.",
      tags: ["Dispositions", "CRM"],
    };
  }

  return {
    title: "General guidance",
    body: "Identify the case family first, then open the matching section in the hub.",
    tags: ["General"],
  };
}

function Box({ children }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      marginBottom: 18,
    }}>
      {children}
    </div>
  );
}

function Bullets({ items }) {
  return (
    <ul style={{ lineHeight: 1.8, color: "#4b5563", paddingLeft: 18 }}>
      {(items || []).map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function TagChip({ text }) {
  return (
    <span style={{
      display: "inline-block",
      marginRight: 8,
      marginBottom: 8,
      padding: "6px 10px",
      background: "#eef2ff",
      borderRadius: 999,
      fontSize: 12,
      color: "#3730a3",
    }}>
      {text}
    </span>
  );
}

function SmallCard({ title, text, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 18,
      padding: 18,
      cursor: "pointer",
    }}>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

function ExpandableCard({ title, shortText, bullets, extraTitle, extraItems, wording }) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <div style={{ fontSize: 28, fontWeight: 800 }}>{title}</div>
      <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{shortText}</div>

      <button
        onClick={() => setOpen(!open)}
        style={{
          marginTop: 14,
          background: "#eef2ff",
          color: "#3730a3",
          border: "none",
          borderRadius: 10,
          padding: "10px 14px",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        {open ? "Hide details" : "Show details"}
      </button>

      {open && (
        <div style={{ marginTop: 18 }}>
          {bullets && <Bullets items={bullets} />}

          {extraItems && (
            <>
              <div style={{ fontWeight: 800, marginTop: 14 }}>{extraTitle}</div>
              <Bullets items={extraItems} />
            </>
          )}

          {wording && (
            <>
              <div style={{ fontWeight: 800, marginTop: 14 }}>Suggested wording</div>
              <div style={{ marginTop: 8, fontStyle: "italic", color: "#374151", lineHeight: 1.7 }}>
                {wording}
              </div>
            </>
          )}
        </div>
      )}
    </Box>
  );
}

export default function Home() {
  const [page, setPage] = useState("Home");
  const [question, setQuestion] = useState("");
  const [search, setSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [logoOk, setLogoOk] = useState(true);

  const answer = useMemo(() => assistantAnswer(question), [question]);
  const shineonItems = useMemo(() => shineonProducts.map(normalizeProduct), []);

  const pageData = {
    Brands: BRANDS,
    Cases: CASES,
    Policies: POLICIES,
    CRM,
    Logistics: LOGISTICS,
    "Yves Rocher": YVES_ROCHER,
    "Social Policy": SOCIAL_POLICY,
    "QA Team": qaTeam,
    "AI Agents": AI_AGENTS,
  };

  const searchableItems = useMemo(() => {
    const eventItems = EVENTS.map((e) => ({
      type: "Event",
      title: e.name,
      text: [e.short, e.intro, e.wording].concat(e.sections.flatMap((s) => s.items)).join(" "),
      openPage: "Events",
    }));

    const trainingItems = TRAINING.map((x) => ({
      type: "Training",
      title: x.name,
      text: [x.short].concat(x.full || []).join(" "),
      openPage: "Training",
    }));

    const generic = Object.keys(pageData).flatMap((key) =>
      pageData[key].map((x) => ({
        type: key,
        title: x.name || x.title,
        text: [x.short || "", x.wording || ""].concat(x.full || []).concat(x.tone || []).join(" "),
        openPage: key,
      }))
    );

    const shineonSearch = shineonItems.map((x) => ({
      type: "ShineOn Product",
      title: x.name,
      text: [x.short].concat(x.full || []).join(" "),
      openPage: "OCy",
    }));

    return generic.concat(eventItems).concat(trainingItems).concat(shineonSearch);
  }, [shineonItems]);

  const filteredResults = useMemo(() => {
    if (!search.trim()) return searchableItems.slice(0, 10);
    const q = search.toLowerCase();
    return searchableItems.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.text.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  }, [search, searchableItems]);

  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return shineonItems;
    const q = productSearch.toLowerCase();
    return shineonItems.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.short.toLowerCase().includes(q) ||
      (item.full || []).join(" ").toLowerCase().includes(q)
    );
  }, [productSearch, shineonItems]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb", fontFamily: "Arial, sans-serif" }}>
      <aside style={{ width: 250, background: "#0f172a", color: "#fff", padding: 20, overflowY: "auto" }}>
        <div style={{
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
        }}>
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
        {page === "Home" && (
          <>
            <div style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 26,
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              marginBottom: 22,
            }}>
              <div style={{
                background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
                minHeight: 340,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
              }}>
                {logoOk ? (
                  <img
                    src="/logo-hub.png"
                    alt="Tenengroup hub logo"
                    onError={() => setLogoOk(false)}
                    style={{ maxWidth: "100%", maxHeight: 280, objectFit: "contain", borderRadius: 18 }}
                  />
                ) : (
                  <div style={{ color: "#fff", fontSize: 26, fontWeight: 800 }}>Tenengroup Customer Care Hub</div>
                )}
              </div>

              <div style={{ padding: 34, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ color: "#2563eb", fontWeight: 700, fontSize: 18 }}>Welcome to</div>
                <div style={{ fontSize: 54, fontWeight: 900, marginTop: 6 }}>TENENGROUP</div>
                <div style={{ fontSize: 32, color: "#2563eb", marginTop: 6 }}>Customer Care Hub</div>
                <div style={{ marginTop: 18, lineHeight: 1.7, fontSize: 18, color: "#374151" }}>
                  Policies, event playbooks, CRM definitions, brand tone of voice, logistics, social handling, Yves Rocher training, QA, OCy / ShineOn and new employee orientation.
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 22 }}>
              <SmallCard title="Training" text="20-minute CS overview" onClick={() => setPage("Training")} />
              <SmallCard title="QA Team" text="Escalations and quality checks" onClick={() => setPage("QA Team")} />
              <SmallCard title="OCy" text="Order Cycle and ShineOn rules" onClick={() => setPage("OCy")} />
              <SmallCard title="Yves Rocher" text="Shopify and Gorgias" onClick={() => setPage("Yves Rocher")} />
              <SmallCard title="Social Policy" text="Facebook / Instagram" onClick={() => setPage("Social Policy")} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}>
              <Box>
                <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>Global search</div>
                <input
                  placeholder="Search everything..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />

                <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
                  {filteredResults.map((item) => (
                    <div
                      key={item.type + item.title}
                      onClick={() => setPage(item.openPage)}
                      style={{ padding: 14, border: "1px solid #e5e7eb", borderRadius: 12, cursor: "pointer", background: "#fafafa" }}
                    >
                      <div style={{ fontSize: 12, color: "#4f46e5", fontWeight: 700 }}>{item.type}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{item.title}</div>
                      <div style={{ color: "#4b5563", lineHeight: 1.6, marginTop: 6 }}>{item.text.slice(0, 190)}...</div>
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
                  style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />
                <div style={{ marginTop: 16, fontSize: 22, fontWeight: 800 }}>{answer.title}</div>
                <div style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>{answer.body}</div>
                <div style={{ marginTop: 14 }}>{answer.tags.map((tag) => <TagChip key={tag} text={tag} />)}</div>

                <div style={{ marginTop: 24, fontWeight: 800 }}>Suggested questions</div>
                <div style={{ marginTop: 12 }}>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <div
                      key={q}
                      onClick={() => setQuestion(q)}
                      style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 10, cursor: "pointer", background: "#fff" }}
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </Box>
            </div>
          </>
        )}

        {page === "Training" && (
          <>
            <h1 style={{ fontSize: 40 }}>New Employee Training — Customer Care Overview</h1>
            <Box>
              <div style={{ fontSize: 26, fontWeight: 800 }}>20-minute session flow</div>
              <Bullets items={[
                "0–3 min: who we are",
                "3–7 min: mission and channels",
                "7–12 min: service wheel and case types",
                "12–16 min: responsibilities and cooperation",
                "16–18 min: Trustpilot examples",
                "18–20 min: quick quiz"
              ]} />
            </Box>

            {TRAINING.map((x) => (
              <ExpandableCard
                key={x.id}
                title={x.name}
                shortText={x.short}
                bullets={x.full}
              />
            ))}

            <Box>
              <div style={{ fontSize: 28, fontWeight: 800 }}>Quick quiz</div>
              {QUIZ.map((q, index) => (
                <ExpandableCard
                  key={q.question}
                  title={(index + 1) + ". " + q.question}
                  shortText="Click to reveal the answer."
                  bullets={[q.answer]}
                />
              ))}
            </Box>
          </>
        )}

        {Object.keys(pageData).includes(page) && (
          <>
            <h1 style={{ fontSize: 40 }}>{page}</h1>
            {pageData[page].map((x) => (
              <ExpandableCard
                key={x.id}
                title={x.name || x.title}
                shortText={x.short}
                bullets={x.full}
                extraTitle={x.tone ? "Tone of voice" : null}
                extraItems={x.tone || null}
                wording={x.wording || null}
              />
            ))}
          </>
        )}

        {page === "OCy" && (
          <>
            <h1 style={{ fontSize: 40 }}>OCy / Order Cycle</h1>

            {ocyTeam.map((x) => (
              <ExpandableCard key={x.id} title={x.name || x.title} shortText={x.short} bullets={x.full} />
            ))}

            <Box>
              <div style={{ fontSize: 28, fontWeight: 800 }}>ShineOn Product Specifics</div>
              <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>
                Search product rules extracted from Product Name and Notes.
              </div>
              <input
                placeholder="Search product name or note..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #d1d5db", boxSizing: "border-box", marginTop: 14 }}
              />
            </Box>

            {filteredProducts.map((x) => (
              <ExpandableCard key={x.id} title={x.name} shortText={x.short} bullets={x.full} />
            ))}
          </>
        )}

        {page === "Events" && (
          <>
            <h1 style={{ fontSize: 40 }}>Event prompts</h1>
            {EVENTS.map((e) => (
              <Box key={e.id}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{e.name}</div>
                <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{e.short}</div>
                <div style={{ marginTop: 12, color: "#374151", lineHeight: 1.7 }}>{e.intro}</div>

                {e.sections.map((section) => (
                  <div key={section.title} style={{ marginTop: 20 }}>
                    <div style={{ fontWeight: 800, marginBottom: 8 }}>{section.title}</div>
                    <Bullets items={section.items} />
                  </div>
                ))}

                <div style={{ marginTop: 18, fontWeight: 800 }}>Suggested wording</div>
                <div style={{ marginTop: 8, fontStyle: "italic", color: "#374151", lineHeight: 1.7 }}>{e.wording}</div>
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
                style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #ccc", boxSizing: "border-box" }}
              />
              <div style={{ marginTop: 18 }}>
                <div style={{ fontWeight: 800, fontSize: 24 }}>{answer.title}</div>
                <div style={{ marginTop: 12, lineHeight: 1.7 }}>{answer.body}</div>
                <div style={{ marginTop: 12 }}>{answer.tags.map((tag) => <TagChip key={tag} text={tag} />)}</div>
              </div>
            </Box>
          </>
        )}
      </main>
    </div>
  );
}
