import { useMemo, useState } from "react";

const MENU = ["Home", "Brands", "Policies", "Events", "CRM", "Q&A"];

const TOOLS = [
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
    links: [
      ["US", "https://www.theograce.com/"],
      ["UK", "https://www.theograce.co.uk/"],
    ],
  },
  {
    name: "Oak & Luna",
    description:
      "Modern, refined and fashion-forward personalized jewelry.",
    links: [
      ["Main", "https://www.oakandluna.com/"],
      ["FR", "https://www.oakandluna.com/fr"],
    ],
  },
  {
    name: "Israel Blessing",
    description: "Jewish identity-focused personalized products.",
    links: [["Main", "https://www.israelblessing.com/"]],
  },
  {
    name: "Lime & Lou",
    description: "Personalized home and lifestyle products.",
    links: [["Main", "https://www.limeandlou.com/"]],
  },
  {
    name: "MYKA",
    description: "European brand similar to Theo Grace without Nicky Hilton.",
    links: [
      ["FR", "https://www.myka.com/fr/"],
      ["DE", "https://www.myka.com/de/"],
    ],
  },
];

const CASES = [
  "Pre-sales",
  "Change Order",
  "WISMO",
  "Item Received",
  "Account Issues",
  "Other",
];

const POLICY_NAMES = ["WISMO", "Damaged", "Not Satisfied", "Resizing"];

const POLICIES = {
  WISMO: {
    subtitle: "Tracking, delays, DNR and lost orders.",
    sections: [
      {
        title: "Late logic",
        bullets: [
          "Under 3 days → apologize + ETA",
          "Over 3 days → compensation possible",
          "Check Late Supplier before acting",
        ],
      },
    ],
  },
  Damaged: {
    subtitle: "Warranty-based handling.",
    sections: [
      {
        title: "Main rules",
        bullets: [
          "Ask for picture",
          "Reorder first",
          "Refund last option",
        ],
      },
    ],
  },
  "Not Satisfied": {
    subtitle: "Customer doesn’t like product.",
    sections: [
      {
        title: "Rules",
        bullets: [
          "Exchange first",
          "Store credit second",
          "No refund for personalized",
        ],
      },
    ],
  },
  Resizing: {
    subtitle: "Sizing issues.",
    sections: [
      {
        title: "Rules",
        bullets: [
          "Free resizing for rings",
          "Check return requirement",
        ],
      },
    ],
  },
};

const EVENT_NAMES = ["Mother's Day 2026"];

const EVENTS = {
  "Mother's Day 2026": {
    intro: "Peak event management logic.",
    sections: [
      {
        title: "Core",
        bullets: [
          "Green Event = last day to order",
          "Red Event = last day to ship",
          "On Hold queue used",
          "Proactive messages sent",
        ],
      },
    ],
  },
};

const QA_ITEMS = [
  {
    q: "Order late by 2 days?",
    a: "Apologize and provide ETA.",
  },
  {
    q: "Damaged item?",
    a: "Ask for picture and reorder.",
  },
];

function Box({ children }) {
  return (
    <div style={{ background: "#fff", padding: 20, borderRadius: 12 }}>
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

export default function Home() {
  const [page, setPage] = useState("Home");
  const [policy, setPolicy] = useState("WISMO");
  const [eventName, setEventName] = useState("Mother's Day 2026");
  const [query, setQuery] = useState("");

  const filteredQa = useMemo(() => {
    return QA_ITEMS.filter((item) =>
      item.q.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 250, background: "#111", color: "#fff", padding: 20 }}>
        {MENU.map((m) => (
          <div key={m} onClick={() => setPage(m)} style={{ margin: 10 }}>
            {m}
          </div>
        ))}
      </div>

      <div style={{ padding: 20, flex: 1 }}>
        {page === "Home" && (
          <>
            <h1>Tenengroup Hub</h1>
            <Bullets items={CASES} />
          </>
        )}

        {page === "Brands" &&
          BRANDS.map((b) => (
            <Box key={b.name}>
              <h2>{b.name}</h2>
              <p>{b.description}</p>
            </Box>
          ))}

        {page === "Policies" && (
          <>
            <h1>{policy}</h1>
            {POLICIES[policy].sections.map((s) => (
              <Box key={s.title}>
                <h3>{s.title}</h3>
                <Bullets items={s.bullets} />
              </Box>
            ))}
          </>
        )}

        {page === "Events" && (
          <>
            <h1>{eventName}</h1>
            {EVENTS[eventName].sections.map((s) => (
              <Box key={s.title}>
                <h3>{s.title}</h3>
                <Bullets items={s.bullets} />
              </Box>
            ))}
          </>
        )}

        {page === "Q&A" && (
          <>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {filteredQa.map((q) => (
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
