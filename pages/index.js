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
    notes: [
      "Elegant and premium tone of voice",
      "Family-oriented emotion",
      "Nicky Hilton must remain part of the brand story",
    ],
  },
  {
    name: "Oak & Luna",
    description:
      "Modern, refined and fashion-forward personalized jewelry with a polished and trend-led tone of voice.",
    notes: [
      "Modern and polished",
      "Fashion-forward jewelry",
      "Refined and stylish positioning",
    ],
  },
  {
    name: "Israel Blessing",
    description:
      "Jewish identity-focused personalized products, culturally sensitive and symbol-driven.",
    notes: [
      "Hebrew and English personalization",
      "Jewish symbolism",
      "Respectful and culturally aware tone",
    ],
  },
  {
    name: "Lime & Lou",
    description:
      "Personalized home and lifestyle products with a warm, aesthetic and modern positioning.",
    notes: [
      "Home and lifestyle products",
      "Modern and warm positioning",
      "Production-facility logic matters",
    ],
  },
  {
    name: "MYKA",
    description:
      "European brand family close to Theo Grace in assortment style, but without any Nicky Hilton association.",
    notes: [
      "European markets",
      "Close to Theo Grace in style",
      "No Nicky Hilton association",
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
        title: "On-time and ETA logic",
        bullets: [
          "If today is still before ETA, the order is considered on time.",
          "For trackable shipments, check the courier website before replying.",
          "For non-trackable shipments, rely on OM shipping date and ETA logic.",
          "Never answer complex ETA questions using only a generic lead time.",
        ],
      },
      {
        title: "Late logic",
        bullets: [
          "Late under 3 business days: apologize and provide updated ETA.",
          "Late above 3 business days: compensation may apply depending on the brand and scenario.",
          "Always check whether the case is actually Late Supplier before using regular late logic.",
          "If paid shipping is involved and the customer insists, shipping refund may be escalated instead of the standard compensation logic.",
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
          "Reorder first",
          "Exchange when relevant",
          "Store credit if needed",
          "Refund only under policy conditions",
        ],
      },
      {
        title: "Operational notes",
        bullets: [
          "Premium items may require return before reorder.",
          "Repeat damage cases follow stricter logic.",
          "Not every damaged case becomes refundable.",
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
          "TG and MYKA generally use a 100-day window from ETA.",
          "OAL generally uses a 60-day window.",
          "Ask for enough context to understand the dissatisfaction.",
        ],
      },
      {
        title: "Resolution order",
        bullets: [
          "Exchange first",
          "Then store credit",
          "Personalized items are not refundable under the NS policy",
          "Only stock or non-personalized items may become refundable within the allowed window",
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
          "DIY and non-DIY may follow different rules.",
          "Resizing is not a Not Satisfied case.",
        ],
      },
      {
        title: "Operational notes",
        bullets: [
          "Confirm the correct size with the customer.",
          "Check whether the item must be returned first.",
          "If the requested size does not exist, move to the appropriate alternative flow.",
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
        title: "Last Chance logic",
        bullets: [
          "If shipping and factory teams agree on a one-day Last Chance option, orders stay on Hold one more day.",
          "Those orders are tagged Last Chance MDAY2026.",
          "If the order ships the next day, it is released with a 'might still be on time' message.",
          "If it does not ship, standard Red Event proactive logic applies.",
        ],
      },
      {
        title: "Last Day of Delivery / MBL",
        bullets: [
          "On the last delivery day, shipped-but-not-delivered WISMO messages move to On Hold.",
          "Shipping provides a risk list of orders that may be late despite shipping on time.",
          "Those orders can receive MBL communication and dedicated event tags.",
          "Messages are later either closed as duplicate or released back into the normal flow.",
        ],
      },
      {
        title: "Thought Guaranteed",
        bullets: [
          "Some customers believe the order is guaranteed on time because they selected the wrong shipping method, misunderstood the cart or saw a bug.",
          "If the order is already on the fastest shipping method, no further upgrade is possible.",
          "If a slower shipping method was chosen and a Green Event still exists, a shipping upgrade can be proposed.",
          "If the cart promised on-time delivery but OM shows a later ETA, route for manual review as a possible cart bug.",
        ],
      },
      {
        title: "ETA-1 and special operations",
        bullets: [
          "ETA-1 shipped and ETA-1 not shipped proactive messages continue during the event except near the final days where they are paused.",
          "Special operations may also be triggered for customs issues, missed flights, shipping bottlenecks and production incidents.",
          "These cases may use event tags and production or shipping update tags.",
        ],
      },
      {
        title: "Lime & Lou notes",
        bullets: [
          "Lime & Lou uses the same Green / Red / MBL backbone but with local production-facility logic.",
          "Production times are fixed and cannot be shortened by selecting a faster shipping method.",
          "Customer-facing wording should avoid 'supplier' and instead use production facilities, factories or warehouses.",
        ],
      },
    ],
  },
  "Valentine's Day 2026": {
    intro:
      "Valentine's Day follows the same operational structure as Mother's Day, with a strong focus on Red Event timing, proactive communication and expectation management.",
    sections: [
      {
        title: "Main structure",
        bullets: [
          "Notch pauses non-shipped WISMO event messages on Red Event dates and moves them to On Hold.",
          "Late Red Event VDAY2026 tags drive proactive messaging and later queue handling.",
          "MBL VDAY2026 tags drive last-day-delivery proactive messaging for shipped orders still at risk.",
        ],
      },
      {
        title: "Decision areas",
        bullets: [
          "Thought Guaranteed cases are handled by checking the shipping method, Green Event availability and possible cart bugs.",
          "Some customers can still be upgraded if a Green Event remains.",
          "If the order is already on the fastest method, use expectation-setting and alternative solutions instead.",
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
    "Future goal: mapping tag to action, tag to owner, tag to Notch behavior.",
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
    <ul style={{ marginTop: 12, paddingLeft: 18, lineHeight: 1.8, color: "#4b5563" }}>
      {items.map((item) => (
        <li key={item} style={{ marginBottom: 8 }}>
          {item}
        </li>
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
    if (!query.trim()) return QA_ITEMS;
    const q = query.toLowerCase();
    return QA_ITEMS.filter(
      (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif", background: "#f6f7fb" }}>
      <div style={{ width: 260, background: "#111827", color: "#fff", padding: 20 }}>
        <div style={{ fontSize: 28, fontWeight: 700 }}>Tenengroup</div>
        <div style={{ marginTop: 6, opacity: 0.8 }}>Customer Care Hub</div>

        <div style={{ marginTop: 24 }}>
          {MENU.map((item) => (
            <div
              key={item}
              onClick={() => setPage(item)}
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
          ))}
        </div>

        <div style={{ marginTop: 28, padding: 14, background: "#1f2937", borderRadius: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Quick tools</div>
          {TOOLS.map((tool) => (
            <div key={tool.name} style={{ marginTop: 8 }}>
              <a href={tool.url} target="_blank" rel="noreferrer" style={{ color: "#dbeafe", textDecoration: "underline" }}>
                {tool.name}
              </a>
            </div>
          ))}
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
              {BRANDS.map((brand) => (
                <Box key={brand.name}>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{brand.name}</div>
                  <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8 }}>{brand.description}</p>
                  <Bullets items={brand.notes} />
                </Box>
              ))}
            </div>
          </div>
        )}

        {page === "Policies" && (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
            <Box>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>Policy menu</div>
              {POLICY_NAMES.map((name) => (
                <div
                  key={name}
                  onClick={() => setPolicy(name)}
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
              ))}
            </Box>

            <div>
              <Box>
                <div style={{ fontSize: 36, fontWeight: 700 }}>{policy}</div>
                <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>
                  {POLICIES[policy].subtitle}
                </p>
              </Box>

              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {POLICIES[policy].sections.map((section) => (
                  <Box key={section.title}>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>{section.title}</div>
                    <Bullets items={section.bullets} />
                  </Box>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === "Events" && (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
            <Box>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>Event menu</div>
              {EVENT_NAMES.map((name) => (
                <div
                  key={name}
                  onClick={() => setEventName(name)}
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
              ))}
            </Box>

            <div>
              <Box>
                <div style={{ fontSize: 36, fontWeight: 700 }}>{eventName}</div>
                <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>
                  {EVENTS[eventName].intro}
                </p>
              </Box>

              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {EVENTS[eventName].sections.map((section) => (
                  <Box key={section.title}>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>{section.title}</div>
                    <Bullets items={section.bullets} />
                  </Box>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === "CRM" && (
          <div>
            <h1>CRM</h1>
            <div style={{ display: "grid", gap: 16 }}>
              {Object.keys(CRM_SECTIONS).map((name) => (
                <Box key={name}>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{name}</div>
                  <Bullets items={CRM_SECTIONS[name]} />
                </Box>
              ))}
            </div>
          </div>
        )}

        {page === "Q&A" && (
          <div>
            <h1>Q&A</h1>
            <Box>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
              {filteredQa.map((item) => (
                <Box key={item.q}>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{item.q}</div>
                  <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8 }}>{item.a}</p>
                </Box>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
