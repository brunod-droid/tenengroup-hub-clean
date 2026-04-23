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
      "Modern, refined and fashion-forward personalized jewelry with a polished and trend-led tone of voice.",
    links: [
      ["Main", "https://www.oakandluna.com/"],
      ["FR", "https://www.oakandluna.com/fr"],
    ],
  },
  {
    name: "Israel Blessing",
    description:
      "Jewish identity-focused personalized products, culturally sensitive and symbol-driven.",
    links: [["Main", "https://www.israelblessing.com/"]],
  },
  {
    name: "Lime & Lou",
    description:
      "Personalized home and lifestyle products with a warm, aesthetic and modern positioning.",
    links: [["Main", "https://www.limeandlou.com/"]],
  },
  {
    name: "MYKA",
    description:
      "European brand family close to Theo Grace in assortment style, but without any Nicky Hilton association.",
    links: [
      ["FR", "https://www.myka.com/fr/"],
      ["DE", "https://www.myka.com/de/"],
      ["ES", "https://www.myka.com/es/"],
      ["IT", "https://www.myka.com/it/"],
      ["NL", "https://www.myka.com/nl/"],
      ["MX", "https://www.myka.com/mx/"],
    ],
  },
];

const POLICY_NAMES = ["WISMO", "Damaged", "Not Satisfied", "Resizing"];

const POLICIES = {
  WISMO: {
    subtitle:
      "How to handle on-time, late, lost, DNR, RTS and supplier-delay cases.",
    sections: [
      {
        title: "Main scope",
        bullets: [
          "Where is my order",
          "Tracking unclear or not updating",
          "Late delivery",
          "Late supplier",
          "DNR (Delivered Not Received)",
          "Lost parcel",
          "Return to sender",
          "Label created only",
        ],
      },
      {
        title: "Late logic",
        bullets: [
          "Late under 3 business days: apologize and provide updated ETA.",
          "Late above 3 business days: compensation may apply depending on the brand and scenario.",
          "Always check whether the case is actually Late Supplier before using regular late logic.",
          "Never answer complex ETA questions using only a generic lead time.",
        ],
      },
      {
        title: "DNR and Lost",
        bullets: [
          "DNR: if less than 3 business days since marked delivery, ask the customer to wait.",
          "After that period, reorder or refund can be considered according to policy.",
          "Lost logic depends on ETA plus no movement in tracking for a defined number of days.",
          "Always verify the carrier tracking before replying.",
        ],
      },
    ],
  },
  Damaged: {
    subtitle: "Warranty-first handling of damaged or defective items.",
    sections: [
      {
        title: "Coverage",
        bullets: [
          "Orders from January 22, 2023 onward are covered by a 2-year warranty from ETA.",
          "Typical covered issues include factory defects, inscription errors, tarnishing, breakage and damaged chains.",
          "A picture should be requested if one was not already provided.",
        ],
      },
      {
        title: "Resolution order",
        bullets: [
          "Reorder first.",
          "Exchange when relevant.",
          "Store credit if needed.",
          "Refund only under policy conditions.",
        ],
      },
    ],
  },
  "Not Satisfied": {
    subtitle:
      "When the item was produced correctly but the customer does not like it.",
    sections: [
      {
        title: "Main principles",
        bullets: [
          "This is not a damaged case.",
          "Exchange first.",
          "Then store credit.",
          "Personalized items are not refundable under the NS policy.",
        ],
      },
    ],
  },
  Resizing: {
    subtitle:
      "Separate policy from Not Satisfied, with item-type-specific rules.",
    sections: [
      {
        title: "Main principles",
        bullets: [
          "Ring resizing is free within the standard resizing window.",
          "Chains and bracelets follow separate logic.",
          "Resizing is not a Not Satisfied case.",
        ],
      },
    ],
  },
};

const EVENT_NAMES = ["Mother's Day 2026", "Valentine's Day 2026", "Christmas 2025"];

const EVENTS = {
  "Mother's Day 2026": {
    intro:
      "This event prompt is used to manage WISMO during the Mother's Day peak. It applies to jewelry and also includes Lime & Lou logic.",
    sections: [
      {
        title: "Core concepts",
        bullets: [
          "Green Event = the last day to order on time based on country, product, factory, shipping method and production days.",
          "Red Event = the last day a factory and shipping combination can still ship on time.",
          "Last Day of Delivery = shipped orders still at risk of not arriving in time.",
          "ETA-1 = proactive delay monitoring before ETA, paused near the final event days if needed.",
        ],
      },
      {
        title: "Jewelry Red Event logic",
        bullets: [
          "At 7:00 AM IL time on each Red Event date, Notch stops answering relevant non-shipped WISMO messages and moves them to On Hold.",
          "Tenengroup receives the list of orders that missed the last shipment and tags them as Late Red Event MDAY2026.",
          "A proactive message is sent informing the customer that the order will not be on time and offering compensation options.",
          "When the On Hold queue is reviewed, messages with the event tag are either closed as duplicate or released back to Notch with the proactive context.",
        ],
      },
      {
        title: "Last Chance and MBL",
        bullets: [
          "If shipping and factory teams agree on a one-day Last Chance option, orders stay on Hold one more day.",
          "On the last delivery day, shipped-but-not-delivered WISMO messages move to On Hold and may receive an MBL proactive message.",
          "Shipping provides a risk list of orders that may be late despite shipping on time.",
        ],
      },
    ],
  },
  "Valentine's Day 2026": {
    intro:
      "Valentine's Day follows the same operational structure as Mother's Day, with a strong focus on red event timing, proactive communication and expectation management.",
    sections: [
      {
        title: "Main structure",
        bullets: [
          "Notch pauses non-shipped WISMO event messages on Red Event dates and moves them to On Hold.",
          "Late Red Event VDAY2026 tags drive proactive messaging and later queue handling.",
          "MBL VDAY2026 tags drive last-day-delivery proactive messaging for shipped orders still at risk.",
        ],
      },
    ],
  },
  "Christmas 2025": {
    intro:
      "Christmas uses the same event backbone but adds holiday-specific alternatives such as Last Minute Pack for selected brands and markets.",
    sections: [
      {
        title: "Holiday structure",
        bullets: [
          "Red Event, MBL and ETA-1 logic are all used during the peak.",
          "On Hold handling and proactive communication follow the same operational pattern as other major events.",
          "Thought Guaranteed cases are especially common due to customer expectations and cart interpretation.",
        ],
      },
      {
        title: "Last Minute Pack",
        bullets: [
          "A stock item can be sent immediately to arrive on time.",
          "A personalized item is produced and delivered after Christmas.",
          "This acts as a fallback once standard on-time event promise can no longer be maintained.",
        ],
      },
    ],
  },
};

const CRM_SECTIONS = {
  Overview: [
    "Kustomer is the main CRM for conversations, queues, tags, dispositions and categories.",
    "Categories are auto-filled by the system based on the webform or source used by the customer.",
    "Dispositions are set manually by agents.",
    "Queues can represent a site or the team in charge.",
  ],
  Tags: [
    "Tags beginning with Z are archived.",
    "Tags do not all have the same importance.",
    "Tags can be manual, automatic, operational or event-related.",
    "Examples already identified: AI-reply, auto change address, auto change inscription, auto free gift, admin testing.",
    "Future goal: mapping tag → action, tag → owner, tag → Notch behavior.",
  ],
  Dispositions: [
    "Dispositions reflect the typology of the request.",
    "They are filled manually by agents.",
    "They help classify the business case more precisely than the category alone.",
  ],
  Categories: [
    "Categories are filled automatically based on the webform used.",
    "They are useful for routing and reporting.",
    "They should not be confused with agent-selected dispositions.",
  ],
  Queues: [
    "Queues are used either by site or by team ownership.",
    "Some queues can become event-specific holding areas.",
    "On Hold queues are especially important during peak event management.",
  ],
  Notch: [
    "Notch is the current automation and AI layer.",
    "It handles part of the standard flow.",
    "It is paused or redirected in some event scenarios, especially during Red Event and MBL handling.",
  ],
};

const QA_ITEMS = [
  {
    q: "My order is late by 2 business days. What should I do?",
    a: "Treat it as a slight delay. Apologize, provide the most accurate updated ETA based on OM and tracking, and do not offer compensation yet unless another specific flow applies.",
  },
  {
    q: "My order is more than 3 business days late. What can I offer?",
    a: "Follow the late flow. Compensation may apply depending on the brand and scenario. First check whether the case is actually Late Supplier before applying standard late compensation.",
  },
  {
    q: "My product is damaged and was delivered less than 6 months ago. What should I do?",
    a: "The order is within warranty. Ask for a picture if none was sent, confirm the issue, flag it correctly in OM and offer reorder first. Refund is not the first option.",
  },
  {
    q: "The customer is not satisfied with a personalized item. Can I refund?",
    a: "No. Under the Not Satisfied policy, personalized items are not refundable. Offer exchange first, then store credit if exchange is refused.",
  },
  {
    q: "What is the logic of Mother's Day event monitoring?",
    a: "The structure is Green Event to Red Event to On Hold to proactive delay communication to Last Day of Delivery or MBL, then queue release and reprocessing. Some orders can also go through a Last Chance one-day extension.",
  },
  {
    q: "What is the difference between category and disposition?",
    a: "Category is auto-filled by the system based on the webform or source. Disposition is manually chosen by the agent to classify the request more precisely.",
  },
];

function Box(props) {
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
      {props.children}
    </div>
  );
}

function Bullets(props) {
  return (
    <ul style={{ marginTop: 12, paddingLeft: 18, lineHeight: 1.8, color: "#4b5563" }}>
      {props.items.map(function (item) {
        return (
          <li key={item} style={{ marginBottom: 8 }}>
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default function Home() {
  const [page, setPage] = useState("Home");
  const [policy, setPolicy] = useState("WISMO");
  const [eventName, setEventName] = useState("Mother's Day 2026");
  const [query, setQuery] = useState("");

  const filteredQa = useMemo(function () {
    if (!query.trim()) return QA_ITEMS;
    const q = query.toLowerCase();
    return QA_ITEMS.filter(function (item) {
      return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    });
  }, [query]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif", background: "#f6f7fb" }}>
      <div style={{ width: 260, background: "#111827", color: "#fff", padding: 20 }}>
        <div style={{ fontSize: 28, fontWeight: 700 }}>Tenengroup</div>
        <div style={{ marginTop: 6, opacity: 0.8 }}>Customer Care Hub</div>

        <div style={{ marginTop: 24 }}>
          {MENU.map(function (item) {
            return (
              <div
                key={item}
                onClick={function () { setPage(item); }}
                style={{
                  marginTop: 10,
                  padding: 12,
                  cursor: "pointer",
                  borderRadius: 10,
                  background: page === item ? "#374151" : "transparent",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 28, padding: 14, background: "#1f2937", borderRadius: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Quick tools</div>
          {TOOLS.map(function (tool) {
            return (
              <div key={tool.name} style={{ marginTop: 8 }}>
                <a href={tool.url} target="_blank" rel="noreferrer" style={{ color: "#dbeafe", textDecoration: "underline" }}>
                  {tool.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ flex: 1, padding: 28 }}>
        {page === "Home" && (
          <div>
            <Box>
              <div style={{ display: "inline-block", background: "#eef2ff", color: "#4338ca", padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                INTERNAL WEBSITE
              </div>
              <h1 style={{ fontSize: 44, marginBottom: 10 }}>Tenengroup Customer Care Hub</h1>
              <p style={{ maxWidth: 850, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>
                A living internal website for management and support teams. Use it to browse policies, event playbooks, CRM notes, brand references and operational Q&A.
              </p>
            </Box>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 20 }}>
              <Box>
                <div style={{ fontSize: 20, fontWeight: 700 }}>What is inside</div>
                <Bullets items={[
                  "Brand directory and links",
                  "Detailed policy navigation",
                  "Event-by-event playbooks",
                  "CRM, tags, categories, dispositions and queues",
                  "Quick support Q&A",
                ]} />
              </Box>
              <Box>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Current event references</div>
                <Bullets items={EVENT_NAMES} />
              </Box>
              <Box>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Main case taxonomy</div>
                <Bullets items={CASES} />
              </Box>
            </div>
          </div>
        )}

        {page === "Brands" && (
          <div>
            <h1>Brands</h1>
            <div style={{ display: "grid", gap: 18 }}>
              {BRANDS.map(function (brand) {
                return (
                  <Box key={brand.name}>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>{brand.name}</div>
                    <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8 }}>{brand.description}</p>
                    <Bullets items={brand.notes} />
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                      {brand.links.map(function (entry) {
                        return (
                          <a key={entry[0]} href={entry[1]} target="_blank" rel="noreferrer" style={{ background: "#f3f4f6", padding: "8px 12px", borderRadius: 10 }}>
                            {entry[0]}
                          </a>
                        );
                      })}
                    </div>
                  </Box>
                );
              })}
            </div>
          </div>
        )}

        {page === "Policies" && (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
            <Box>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>Policy menu</div>
              {POLICY_NAMES.map(function (name) {
                return (
                  <div
                    key={name}
                    onClick={function () { setPolicy(name); }}
                    style={{
                      marginTop: 10,
                      padding: 12,
                      cursor: "pointer",
                      borderRadius: 10,
                      background: policy === name ? "#111827" : "#f3f4f6",
                      color: policy === name ? "#fff" : "#111827",
                    }}
                  >
                    {name}
                  </div>
                );
              })}
            </Box>

            <div>
              <Box>
                <div style={{ fontSize: 36, fontWeight: 700 }}>{policy}</div>
                <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>
                  {POLICIES[policy].subtitle}
                </p>
              </Box>

              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {POLICIES[policy].sections.map(function (section) {
                  return (
                    <Box key={section.title}>
                      <div style={{ fontSize: 22, fontWeight: 700 }}>{section.title}</div>
                      <Bullets items={section.bullets} />
                    </Box>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {page === "Events" && (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
            <Box>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>Event menu</div>
              {EVENT_NAMES.map(function (name) {
                return (
                  <div
                    key={name}
                    onClick={function () { setEventName(name); }}
                    style={{
                      marginTop: 10,
                      padding: 12,
                      cursor: "pointer",
                      borderRadius: 10,
                      background: eventName === name ? "#111827" : "#f3f4f6",
                      color: eventName === name ? "#fff" : "#111827",
                    }}
                  >
                    {name}
                  </div>
                );
              })}
            </Box>

            <div>
              <Box>
                <div style={{ fontSize: 36, fontWeight: 700 }}>{eventName}</div>
                <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>
                  {EVENTS[eventName].intro}
                </p>
              </Box>

              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {EVENTS[eventName].sections.map(function (section) {
                  return (
                    <Box key={section.title}>
                      <div style={{ fontSize: 22, fontWeight: 700 }}>{section.title}</div>
                      <Bullets items={section.bullets} />
                    </Box>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {page === "CRM" && (
          <div>
            <h1>CRM</h1>
            <div style={{ display: "grid", gap: 16 }}>
              {Object.keys(CRM_SECTIONS).map(function (name) {
                return (
                  <Box key={name}>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>{name}</div>
                    <Bullets items={CRM_SECTIONS[name]} />
                  </Box>
                );
              })}
            </div>
          </div>
        )}

        {page === "Q&A" && (
          <div>
            <h1>Q&A</h1>
            <Box>
              <input
                value={query}
                onChange={function (e) { setQuery(e.target.value); }}
                placeholder="Try: late by 2 days, damaged within 6 months, DNR, Mother's Day, category vs disposition..."
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 15,
                }}
              />
            </Box>

            <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
              {filteredQa.map(function (item) {
                return (
                  <Box key={item.q}>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>{item.q}</div>
                    <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8 }}>{item.a}</p>
                  </Box>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
