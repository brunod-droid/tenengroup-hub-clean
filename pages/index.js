import { useMemo, useState } from "react";

const MENU = ["Dashboard", "Brands", "Cases", "Policies", "Events", "CRM", "Logistics", "AI Agents", "Q&A"];

const QUICK_TOOLS = [
  { name: "Kustomer", url: "https://tenengroup.kustomerapp.com/" },
  { name: "OM / OCS", url: "https://bo.tenengroup.com/" },
  { name: "Notch", url: "https://tenengroup.app.getnotch.com/" },
  { name: "AfterShip", url: "https://www.aftership.com/" },
  { name: "Matrix", url: "http://matrix.tenengroup.com:100/Login.aspx" },
  { name: "17Track", url: "https://www.17track.net/en" },
];

const BRANDS = [
  {
    id: "theo-grace",
    name: "Theo Grace",
    short: "Premium personalized products, elegant and emotional, with Nicky Hilton as part of the brand story.",
    full: [
      "Theo Grace is a premium personalized product brand.",
      "Nicky Hilton is part of the brand story and should remain visible when relevant.",
      "The tone should feel elegant, stylish, refined, emotional and family-oriented.",
      "The brand should connect personalization with family joy, gifting and meaningful relationships.",
    ],
    tone: ["Elegant", "Premium", "Emotional", "Family-oriented", "Stylish", "Nicky Hilton association"],
  },
  {
    id: "oak-luna",
    name: "Oak & Luna",
    short: "Modern, refined and fashion-forward personalized jewelry.",
    full: [
      "Oak & Luna speaks to customers looking for modern and refined jewelry.",
      "The tone is less sentimental-first and more fashion-led.",
      "Products should feel polished, trendy, stylish and elevated.",
    ],
    tone: ["Modern", "Chic", "Polished", "Fashion-forward", "Refined"],
  },
  {
    id: "israel-blessing",
    name: "Israel Blessing",
    short: "Jewish identity-focused personalized products.",
    full: [
      "Israel Blessing focuses on Jewish identity and symbolism.",
      "Typical product universe includes Magen David, Chai, Israel map and Hebrew personalization.",
      "Tone must remain respectful, culturally aware and meaningful.",
    ],
    tone: ["Respectful", "Identity-driven", "Symbolic", "Culturally aware", "Meaningful"],
  },
  {
    id: "lime-lou",
    name: "Lime & Lou",
    short: "Personalized home and lifestyle products.",
    full: [
      "Lime & Lou focuses on personalized home and lifestyle items.",
      "Examples include blankets, canvas, hoodies and decor-related gifts.",
      "Tone should be warm, modern, cozy, aesthetic and gift-friendly.",
    ],
    tone: ["Warm", "Modern", "Home-oriented", "Aesthetic", "Gift-friendly"],
  },
  {
    id: "myka",
    name: "MYKA",
    short: "European brand family similar to Theo Grace but without Nicky Hilton.",
    full: [
      "MYKA is the European brand family.",
      "It is close to Theo Grace in assortment style but has no Nicky Hilton association.",
      "The tone should remain elegant, accessible, commercial and localized.",
    ],
    tone: ["Elegant", "Accessible", "European", "Localized", "No Nicky Hilton association"],
  },
];

const CASES = [
  {
    id: "pre-sales",
    name: "Pre-sales",
    short: "Questions before purchase.",
    full: [
      "Product questions",
      "Material questions",
      "Personalization possibilities",
      "Maximum characters or special requests",
      "Delivery promise before purchase",
      "Countries served",
      "What happens if there is a problem after purchase",
    ],
  },
  {
    id: "change-order",
    name: "Change Order",
    short: "Changes after order placement.",
    full: [
      "Change product",
      "Change material",
      "Change inscription",
      "Change address",
      "Change shipping method",
      "Agent must check whether the order can still be modified before promising anything",
    ],
  },
  {
    id: "wismo",
    name: "WISMO",
    short: "Where is my order.",
    full: [
      "Tracking unclear or not updating",
      "Late delivery",
      "Late supplier",
      "DNR: Delivered Not Received",
      "Lost parcel",
      "Label created only",
      "Return to sender",
      "Everything between production, shipment and delivery",
    ],
  },
  {
    id: "item-received",
    name: "Item Received",
    short: "Problems after delivery.",
    full: [
      "Damaged product",
      "Wrong product",
      "Wrong material",
      "Wrong inscription",
      "Production error",
      "Warranty case",
      "Not satisfied",
      "Gift recipient does not like it",
      "Resizing or fit issue",
    ],
  },
  {
    id: "account",
    name: "Account Issues",
    short: "Account, login, GDPR and loyalty support.",
    full: [
      "Customer cannot log in",
      "GDPR request",
      "Delete data request",
      "Customer cannot find loyalty points",
      "Account information issue",
    ],
  },
  {
    id: "other",
    name: "Other",
    short: "Miscellaneous or external requests.",
    full: [
      "Newsletter unsubscribe",
      "Collaboration request",
      "Supplier or partnership request",
      "Unclassified contact",
    ],
  },
];

const POLICIES = [
  {
    id: "wismo",
    name: "Late / WISMO",
    short: "Delay, tracking, DNR, lost parcel and shipping issue handling.",
    full: [
      "Always check ETA before saying the order is late.",
      "If today is still before ETA, the order is not late.",
      "Under 3 business days late: apologize and provide updated ETA.",
      "Over 3 business days late: compensation may apply depending on scenario.",
      "Always check whether it is Late Supplier before using regular late flow.",
      "For DNR, if less than 3 business days since delivery scan, ask the customer to wait.",
      "After the waiting period, reorder or refund may be considered depending on policy.",
      "Always check carrier tracking before replying.",
    ],
    wording: "I'm really sorry for the delay. I've checked your order and here is the latest update: [ETA]. We are closely monitoring it for you.",
  },
  {
    id: "late-supplier",
    name: "Late Supplier",
    short: "Production delay before shipment.",
    full: [
      "Late Supplier means the order is delayed before shipment due to production or supplier issue.",
      "Do not automatically treat it as a regular delivery delay.",
      "Check whether proactive communication was already sent.",
      "Check whether supply, factory or production team already gave an update.",
      "If no clear internal update exists, escalate before giving a strong promise.",
    ],
    wording: "Your order is currently experiencing a production delay. Our team is already working on it and we will keep you updated as soon as we have a confirmed shipping timeline.",
  },
  {
    id: "damaged",
    name: "Damaged",
    short: "Defective, broken or damaged product.",
    full: [
      "Ask for a picture if none was provided.",
      "Confirm whether this is damaged, wrong item or Not Satisfied.",
      "Reorder is the preferred first solution.",
      "Refund is not the first option.",
      "Warranty applies from ETA according to policy.",
      "Premium or repeat cases may require stricter handling.",
    ],
    wording: "I'm really sorry about this. Could you please share a picture so I can resolve this for you right away? We will prioritize sending you a replacement.",
  },
  {
    id: "not-satisfied",
    name: "Not Satisfied",
    short: "Customer does not like a correctly produced item.",
    full: [
      "First confirm the case is not actually damaged or production error.",
      "Exchange first.",
      "Store credit second.",
      "No refund for personalized items under Not Satisfied policy.",
      "Timing windows may differ by brand.",
      "Ask for enough context to understand why the customer is dissatisfied.",
    ],
    wording: "I understand this is not exactly what you expected. We'd be happy to offer you an exchange or store credit so you can choose something you truly love.",
  },
  {
    id: "resizing",
    name: "Resizing",
    short: "Size and fit-related issue.",
    full: [
      "Resizing is not a Not Satisfied case.",
      "Ring resizing is usually free within the valid window.",
      "Chains and bracelets follow separate rules.",
      "Confirm the requested size before acting.",
      "Check whether a return is required before replacement or adjustment.",
    ],
    wording: "We can definitely help with resizing. Let me guide you through the available options based on your item.",
  },
  {
    id: "change-order",
    name: "Change Order",
    short: "Customer wants to change an existing order.",
    full: [
      "Check order status before promising a change.",
      "If order is already in production or shipped, change may not be possible.",
      "Possible changes: inscription, material, product, address, shipping method.",
      "If special request is outside standard options, factory validation may be needed.",
    ],
    wording: "I'll check whether your order can still be updated. Because personalized items move quickly into production, changes are only possible before a certain stage.",
  },
];

const EVENTS = [
  {
    id: "mday",
    name: "Mother's Day 2026",
    short: "Main event playbook for jewelry and Lime & Lou.",
    intro: "Mother's Day is a peak event. The goal is to monitor delivery promises, stop risky automated replies, use proactive communication, and protect customer experience.",
    sections: [
      {
        title: "Core concepts",
        items: [
          "Green Event = last day to order on time.",
          "Red Event = last day to ship on time.",
          "Last Day of Delivery = shipped orders still at risk.",
          "ETA-1 = proactive delay monitoring before ETA.",
        ],
      },
      {
        title: "Jewelry Red Event logic",
        items: [
          "At 7:00 AM IL time on relevant Red Event dates, Notch stops answering relevant non-shipped WISMO cases.",
          "Messages move to On Hold for manual review.",
          "Orders missing the final shipment window can be tagged Late Red Event MDAY2026.",
          "Proactive communication is sent to set expectations.",
          "Messages are later closed as duplicates or released back to normal flow.",
        ],
      },
      {
        title: "Last Chance",
        items: [
          "Last Chance means a one-day extra attempt when factory and shipping teams agree.",
          "Orders stay On Hold for one more day.",
          "If shipped next day, message can say it might still arrive on time.",
          "If not shipped, standard Red Event proactive late logic applies.",
        ],
      },
      {
        title: "MBL / Last Day of Delivery",
        items: [
          "MBL means May Be Late.",
          "Used for shipped orders still at risk of missing the event.",
          "Shipping team may provide a risk list.",
          "Customers receive proactive communication when needed.",
        ],
      },
      {
        title: "Thought Guaranteed",
        items: [
          "Customer believed delivery was guaranteed.",
          "Possible causes: wrong shipping chosen, misunderstanding, cart bug, or promise mismatch.",
          "Check whether the fastest shipping was selected.",
          "If slower shipping was chosen and Green Event still exists, upgrade may help.",
          "If cart promised on-time but OM shows later ETA, route for manual review.",
        ],
      },
      {
        title: "Lime & Lou specifics",
        items: [
          "Same Green / Red / MBL backbone can apply.",
          "Production speed is fixed and cannot simply be solved with faster shipping.",
          "Use wording like production facility, warehouse or factory, not supplier.",
        ],
      },
      {
        title: "Agent actions",
        items: [
          "Check Green vs Red timing.",
          "Check if proactive message already sent.",
          "Check if order is Last Chance, MBL or Thought Guaranteed.",
          "Use correct queue and event tags.",
          "Avoid promising delivery if Red Event was missed.",
        ],
      },
    ],
    wording: "I'm very sorry that your order may not arrive in time for Mother's Day. We are monitoring it closely and want to be fully transparent about the current delivery outlook.",
  },
  {
    id: "vday",
    name: "Valentine's Day 2026",
    short: "Same event backbone with strong expectation management.",
    intro: "Valentine's Day follows the same Green / Red / MBL event structure, with special attention to expectations and gift timing.",
    sections: [
      {
        title: "Main structure",
        items: ["Green Event", "Red Event", "On Hold routing", "Late Red Event tags", "MBL handling"],
      },
      {
        title: "Decision points",
        items: [
          "Was the customer promised on-time delivery?",
          "Is the order before or after Red Event?",
          "Does a shipping upgrade still help?",
          "Should proactive communication be sent?",
        ],
      },
    ],
    wording: "I completely understand how important timing is for this occasion. I've reviewed the current status and here is the most accurate update we can share with you right now.",
  },
  {
    id: "xmas",
    name: "Christmas 2025",
    short: "Holiday event flow with fallback alternatives.",
    intro: "Christmas uses the event backbone plus holiday-specific fallback logic such as Last Minute Pack.",
    sections: [
      {
        title: "Main structure",
        items: ["Red Event", "MBL handling", "ETA-1 logic", "Last Minute Pack fallback"],
      },
      {
        title: "Last Minute Pack",
        items: [
          "A stock item can be sent immediately to arrive on time.",
          "A personalized item is produced and delivered after Christmas.",
          "This is used when the standard on-time promise can no longer be maintained.",
        ],
      },
    ],
    wording: "I'm sorry for the inconvenience. We're checking the best available option for your order and will guide you toward the fastest or most suitable solution.",
  },
];

const CRM = [
  {
    id: "kustomer",
    title: "Kustomer",
    short: "Main CRM for conversations and case handling.",
    full: [
      "Kustomer is the main CRM used for customer conversations.",
      "It handles queues, tags, categories and dispositions.",
      "It is the operational center for routing, classification and visibility.",
    ],
  },
  {
    id: "categories",
    title: "Categories",
    short: "System-filled classification from source or webform.",
    full: [
      "Categories are auto-filled by the system.",
      "They are based on the webform or source used by the customer.",
      "They support routing and reporting.",
      "They are not manually chosen by agents.",
    ],
  },
  {
    id: "dispositions",
    title: "Dispositions",
    short: "Manual case typing by the agent.",
    full: [
      "Dispositions are selected manually by agents.",
      "They define the real business case more precisely than categories.",
      "They are central for reporting accuracy and quality analysis.",
      "They should reflect the actual issue handled by the agent.",
      "Examples to define later: pre-sales, change order, WISMO, damaged, not satisfied, account issue.",
    ],
  },
  {
    id: "tags",
    title: "Tags",
    short: "Operational labels with multiple levels of importance.",
    full: [
      "Tags beginning with Z are archived.",
      "Tags do not all have the same importance.",
      "Tags can be manual, automatic, event-driven or AI-driven.",
      "Tags should map to actions, owners and Notch behavior.",
      "Examples already identified: AI reply, auto change address, auto change inscription, auto free gift, admin testing.",
      "Event examples: Late Red Event, Last Chance, MBL.",
    ],
  },
  {
    id: "queues",
    title: "Queues",
    short: "Routing by site or team ownership.",
    full: [
      "Queues can represent site ownership.",
      "Queues can represent team ownership.",
      "On Hold queues are critical during events.",
      "Queues support workload distribution and escalation.",
    ],
  },
  {
    id: "notch",
    title: "Notch",
    short: "Current automation and AI layer.",
    full: [
      "Notch handles part of the standard automated flow.",
      "It can answer simple or standard cases.",
      "It is paused or redirected during complex event scenarios.",
      "Red Event and MBL cases may require pausing or holding messages.",
      "Future goal: map Notch behavior to tags, queues and case type.",
    ],
  },
];

const LOGISTICS = [
  {
    id: "factories",
    title: "Factories and production",
    short: "Production location and timing affect ETA.",
    full: [
      "Factories are located in Israel, Thailand and Hungary.",
      "Israel includes Kiryat Gat and Nazareth.",
      "Each product has its own production time.",
      "Production days, factory location and destination determine delivery promise.",
      "Factories do not all work the same days: Israel does not work Saturday, Thailand does not work Sunday.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping logic",
    short: "ETA depends on product, factory, destination and carrier.",
    full: [
      "A product made in Hungary and shipped to America with DHL is not the same as a product made in Israel and shipped to France with Mailog.",
      "Shipping method can improve transit speed but not production speed.",
      "Carrier checks are needed for trackable shipments.",
      "AfterShip and 17Track can support tracking investigation.",
    ],
  },
];

const AI_AGENTS = [
  {
    id: "dispatcher",
    title: "Manager / Dispatcher Agent",
    short: "Classifies the case and routes it to the right specialist.",
    full: [
      "Detects case type: Pre-sales, Change Order, WISMO, Item Received, Account Issues or Other.",
      "Checks urgency, brand, event context and available information.",
      "Routes to Shipping, Factory, Refund, QA, VIP or CRM analysis agent.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping Agent",
    short: "Handles WISMO, tracking, late, DNR, lost and carrier investigation.",
    full: [
      "Checks OM, tracking, carrier and ETA.",
      "Identifies DNR, lost, label created, RTS or delay.",
      "Prepares carrier escalation when needed.",
    ],
  },
  {
    id: "factory",
    title: "Factory Agent",
    short: "Handles special requests, production delays and factory feasibility.",
    full: [
      "Checks whether a special request is possible.",
      "Understands production location and production time.",
      "Escalates to factory when customization is outside standard rules.",
    ],
  },
  {
    id: "refund",
    title: "Refund / Compensation Agent",
    short: "Applies refund, credit and compensation logic.",
    full: [
      "Checks policy before refund.",
      "Verifies if reorder, exchange or credit should come first.",
      "Avoids refund when policy does not allow it.",
    ],
  },
  {
    id: "qa",
    title: "QA / Item Received Agent",
    short: "Handles damaged, wrong item, not satisfied and warranty cases.",
    full: [
      "Requests pictures where needed.",
      "Identifies damaged vs not satisfied vs production error.",
      "Recommends reorder, exchange, credit or escalation.",
    ],
  },
  {
    id: "queue-analysis",
    title: "Queue / Quality Analysis Agent",
    short: "Analyzes queues, dispositions, tags and performance.",
    full: [
      "Monitors queue volume and aging.",
      "Checks tag and disposition quality.",
      "Identifies wrong routing or repeated issues.",
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

  if (!q) return { title: "Ask the assistant", body: "Type a customer care question such as: late order, damaged item, DNR, Red Event, tags, dispositions or Notch.", tags: [] };
  if (q.includes("late supplier")) return { title: "Late Supplier guidance", body: "Confirm whether the case is truly Late Supplier internally. If not, treat it as regular late. Check whether proactive communication was already sent.", tags: ["WISMO", "Late Supplier"] };
  if (q.includes("late") || q.includes("delay")) return { title: "Late order guidance", body: "Check ETA first. Under 3 business days late: apologize and give ETA. Over 3 business days late: compensation may apply. Also verify Late Supplier.", tags: ["WISMO", "Late"] };
  if (q.includes("damaged") || q.includes("broken") || q.includes("defect")) return { title: "Damaged item guidance", body: "Ask for picture, confirm issue, apply warranty logic, reorder first. Refund is not the first option.", tags: ["Damaged", "Warranty"] };
  if (q.includes("not satisfied") || q.includes("dont like") || q.includes("don't like")) return { title: "Not Satisfied guidance", body: "Confirm it is not damaged. Offer exchange first, then store credit. Personalized items are not refundable under NS policy.", tags: ["Not Satisfied"] };
  if (q.includes("dnr") || q.includes("delivered not received")) return { title: "DNR guidance", body: "If less than 3 business days since delivery scan, ask customer to wait. After that, reorder or refund may be considered according to policy.", tags: ["DNR", "WISMO"] };
  if (q.includes("red event") || q.includes("mother") || q.includes("mbl") || q.includes("last chance")) return { title: "Event guidance", body: "Use Green Event, Red Event, On Hold, proactive communication, MBL and Last Chance logic. Check if proactive message was already sent before replying.", tags: ["Event", "Mother's Day"] };
  if (q.includes("tag")) return { title: "Tags guidance", body: "Z tags are archived. Tags may be manual, automatic, event-driven or AI-driven. They should map to actions, owners and Notch behavior.", tags: ["Tags", "CRM"] };
  if (q.includes("disposition")) return { title: "Dispositions guidance", body: "Dispositions are selected manually by agents and define the real business case more precisely than categories.", tags: ["Dispositions", "CRM"] };
  if (q.includes("category")) return { title: "Categories guidance", body: "Categories are auto-filled by the system from source or webform. They are not the same as dispositions.", tags: ["Categories", "CRM"] };
  if (q.includes("notch")) return { title: "Notch guidance", body: "Notch is the AI automation layer. It handles standard flows but can be paused or redirected during Red Event, MBL or complex handling.", tags: ["Notch", "AI"] };

  return { title: "General guidance", body: "Identify the case family first: Pre-sales, Change Order, WISMO, Item Received, Account Issues or Other. Then apply the matching policy.", tags: ["General"] };
}

function Box({ children }) {
  return <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", marginBottom: 18 }}>{children}</div>;
}

function Bullets({ items }) {
  return <ul style={{ lineHeight: 1.8, color: "#4b5563", paddingLeft: 18 }}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function TagChip({ text }) {
  return <span style={{ display: "inline-block", marginRight: 8, marginBottom: 8, padding: "6px 10px", background: "#eef2ff", borderRadius: 999, fontSize: 12, color: "#3730a3" }}>{text}</span>;
}

function SmallCard({ title, text, onClick }) {
  return <div onClick={onClick} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, padding: 18, cursor: "pointer" }}><div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div><div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{text}</div></div>;
}

function ExpandableCard({ title, shortText, bullets, extraTitle, extraItems, wording }) {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <div style={{ fontSize: 28, fontWeight: 800 }}>{title}</div>
      <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{shortText}</div>
      <button onClick={() => setOpen(!open)} style={{ marginTop: 14, background: "#eef2ff", color: "#3730a3", border: "none", borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontWeight: 700 }}>
        {open ? "Hide details" : "Show details"}
      </button>
      {open && (
        <div style={{ marginTop: 18 }}>
          {bullets && <Bullets items={bullets} />}
          {extraItems && <><div style={{ fontWeight: 800, marginTop: 14 }}>{extraTitle}</div><Bullets items={extraItems} /></>}
          {wording && <><div style={{ fontWeight: 800, marginTop: 14 }}>Suggested wording</div><div style={{ marginTop: 8, fontStyle: "italic", color: "#374151", lineHeight: 1.7 }}>{wording}</div></>}
        </div>
      )}
    </Box>
  );
}

export default function Home() {
  const [page, setPage] = useState("Dashboard");
  const [question, setQuestion] = useState("");
  const [search, setSearch] = useState("");
  const [logoOk, setLogoOk] = useState(true);

  const answer = useMemo(() => assistantAnswer(question), [question]);

  const searchableItems = useMemo(() => {
    const flattenEvent = EVENTS.map((e) => ({ type: "Event", title: e.name, text: [e.short, e.intro, e.wording].concat(e.sections.flatMap((s) => s.items)).join(" "), openPage: "Events" }));
    return []
      .concat(BRANDS.map((x) => ({ type: "Brand", title: x.name, text: [x.short].concat(x.full).concat(x.tone).join(" "), openPage: "Brands" })))
      .concat(CASES.map((x) => ({ type: "Case", title: x.name, text: [x.short].concat(x.full).join(" "), openPage: "Cases" })))
      .concat(POLICIES.map((x) => ({ type: "Policy", title: x.name, text: [x.short, x.wording].concat(x.full).join(" "), openPage: "Policies" })))
      .concat(flattenEvent)
      .concat(CRM.map((x) => ({ type: "CRM", title: x.title, text: [x.short].concat(x.full).join(" "), openPage: "CRM" })))
      .concat(LOGISTICS.map((x) => ({ type: "Logistics", title: x.title, text: [x.short].concat(x.full).join(" "), openPage: "Logistics" })))
      .concat(AI_AGENTS.map((x) => ({ type: "AI Agent", title: x.title, text: [x.short].concat(x.full).join(" "), openPage: "AI Agents" })));
  }, []);

  const filteredResults = useMemo(() => {
    if (!search.trim()) return searchableItems.slice(0, 10);
    const q = search.toLowerCase();
    return searchableItems.filter((item) => item.title.toLowerCase().includes(q) || item.text.toLowerCase().includes(q) || item.type.toLowerCase().includes(q));
  }, [search, searchableItems]);

  const pageData = {
    Brands: BRANDS,
    Cases: CASES,
    Policies: POLICIES,
    CRM: CRM,
    Logistics: LOGISTICS,
    "AI Agents": AI_AGENTS,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb", fontFamily: "Arial, sans-serif" }}>
      <aside style={{ width: 250, background: "#0f172a", color: "#fff", padding: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: 14, background: "#111827", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, marginBottom: 12 }}>TG</div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>Tenengroup</div>
        <div style={{ marginTop: 6, opacity: 0.75 }}>Customer Care Hub</div>

        <div style={{ marginTop: 28 }}>
          {MENU.map((m) => <div key={m} onClick={() => setPage(m)} style={{ padding: "12px 14px", borderRadius: 10, cursor: "pointer", background: page === m ? "#1d4ed8" : "transparent", marginBottom: 8, fontWeight: 600 }}>{m}</div>)}
        </div>

        <div style={{ marginTop: 26, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 10 }}>QUICK TOOLS</div>
          {QUICK_TOOLS.map((tool) => <div key={tool.name} style={{ marginBottom: 10 }}><a href={tool.url} target="_blank" rel="noreferrer" style={{ color: "#dbeafe", textDecoration: "none" }}>{tool.name}</a></div>)}
        </div>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>
        {page === "Dashboard" && (
          <>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 26, overflow: "hidden", display: "grid", gridTemplateColumns: "1.15fr 1fr", marginBottom: 22 }}>
              <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)", minHeight: 340, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                {logoOk ? <img src="/logo-hub.png" alt="Tenengroup hub logo" onError={() => setLogoOk(false)} style={{ maxWidth: "100%", maxHeight: 280, objectFit: "contain", borderRadius: 18 }} /> : <div style={{ color: "#fff", fontSize: 26, fontWeight: 800 }}>Tenengroup Customer Care Hub</div>}
              </div>
              <div style={{ padding: 34, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ color: "#2563eb", fontWeight: 700, fontSize: 18 }}>Welcome to</div>
                <div style={{ fontSize: 54, fontWeight: 900, marginTop: 6 }}>TENENGROUP</div>
                <div style={{ fontSize: 32, color: "#2563eb", marginTop: 6 }}>Customer Care Hub</div>
                <div style={{ marginTop: 18, lineHeight: 1.7, fontSize: 18, color: "#374151" }}>
                  Policies, event playbooks, CRM definitions, brand tone of voice, logistics and AI agent structure.
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginBottom: 22 }}>
              <SmallCard title="Brands" text="Tone of voice" onClick={() => setPage("Brands")} />
              <SmallCard title="Policies" text="Rules and wording" onClick={() => setPage("Policies")} />
              <SmallCard title="Events" text="Peak playbooks" onClick={() => setPage("Events")} />
              <SmallCard title="CRM" text="Tags and dispositions" onClick={() => setPage("CRM")} />
              <SmallCard title="Logistics" text="Factories and shipping" onClick={() => setPage("Logistics")} />
              <SmallCard title="AI Agents" text="Future assistant roles" onClick={() => setPage("AI Agents")} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}>
              <Box>
                <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>Global search</div>
                <input placeholder="Search everything..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #d1d5db", boxSizing: "border-box" }} />
                <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
                  {filteredResults.map((item) => <div key={item.type + item.title} onClick={() => setPage(item.openPage)} style={{ padding: 14, border: "1px solid #e5e7eb", borderRadius: 12, cursor: "pointer", background: "#fafafa" }}><div style={{ fontSize: 12, color: "#4f46e5", fontWeight: 700 }}>{item.type}</div><div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{item.title}</div><div style={{ color: "#4b5563", lineHeight: 1.6, marginTop: 6 }}>{item.text.slice(0, 190)}...</div></div>)}
                </div>
              </Box>

              <Box>
                <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>Assistant</div>
                <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question..." style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #d1d5db", boxSizing: "border-box" }} />
                <div style={{ marginTop: 16, fontSize: 22, fontWeight: 800 }}>{answer.title}</div>
                <div style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>{answer.body}</div>
                <div style={{ marginTop: 14 }}>{answer.tags.map((tag) => <TagChip key={tag} text={tag} />)}</div>
                <div style={{ marginTop: 24, fontWeight: 800 }}>Suggested questions</div>
                <div style={{ marginTop: 12 }}>{SUGGESTED_QUESTIONS.map((q) => <div key={q} onClick={() => setQuestion(q)} style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 10, cursor: "pointer", background: "#fff" }}>{q}</div>)}</div>
              </Box>
            </div>
          </>
        )}

        {["Brands", "Cases", "Policies", "CRM", "Logistics", "AI Agents"].includes(page) && (
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

        {page === "Events" && (
          <>
            <h1 style={{ fontSize: 40 }}>Event prompts</h1>
            {EVENTS.map((e) => (
              <Box key={e.id}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{e.name}</div>
                <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{e.short}</div>
                <div style={{ marginTop: 12, color: "#374151", lineHeight: 1.7 }}>{e.intro}</div>
                {e.sections.map((section) => <div key={section.title} style={{ marginTop: 20 }}><div style={{ fontWeight: 800, marginBottom: 8 }}>{section.title}</div><Bullets items={section.items} /></div>)}
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
              <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Example: my order is late by 2 days" style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #ccc", boxSizing: "border-box" }} />
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
