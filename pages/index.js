import { useMemo, useState } from "react";

const menu = ["Home", "Brands", "Policies", "Events", "CRM", "Q&A"];

const brands = [
  {
    name: "Theo Grace",
    text: "Premium personalized products with an elegant, emotional and family-oriented positioning. Nicky Hilton must remain part of the brand narrative whenever relevant.",
    links: [
      ["US", "https://www.theograce.com/"],
      ["UK", "https://www.theograce.co.uk/"],
    ],
  },
  {
    name: "Oak & Luna",
    text: "Modern, refined and fashion-forward personalized jewelry with a polished and trend-led tone of voice.",
    links: [
      ["Main", "https://www.oakandluna.com/"],
      ["FR", "https://www.oakandluna.com/fr"],
    ],
  },
  {
    name: "Israel Blessing",
    text: "Jewish identity-focused personalized products, culturally sensitive and symbol-driven.",
    links: [["Main", "https://www.israelblessing.com/"]],
  },
  {
    name: "Lime & Lou",
    text: "Personalized home and lifestyle products with a warm, aesthetic and modern positioning.",
    links: [["Main", "https://www.limeandlou.com/"]],
  },
  {
    name: "MYKA",
    text: "European brand family close to Theo Grace in assortment style, but without any Nicky Hilton association.",
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

const policies = {
  WISMO: {
    intro:
      "WISMO covers all order-tracking and shipping-progress cases between order validation and customer delivery.",
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
          "If the order is less than 3 business days late, apologize and provide the most accurate updated ETA.",
          "If the order is more than 3 business days late, compensation may apply depending on the brand and scenario.",
          "Always check whether the case is actually a Late Supplier case before applying the standard late flow.",
          "Never answer complex ETA questions using only a generic lead time.",
        ],
      },
      {
        title: "DNR / Lost",
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
    intro:
      "Damaged cases are handled through a warranty-first logic. Refund is not the starting point.",
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
        title: "Special notes",
        bullets: [
          "Premium items may require return before reorder.",
          "Repeat damage cases follow stricter logic.",
          "Not every damaged case becomes refundable.",
        ],
      },
    ],
  },
  "Not Satisfied": {
    intro:
      "Not Satisfied applies when the item was produced correctly but the customer does not like it.",
    sections: [
      {
        title: "Main principles",
        bullets: [
          "This is not a damaged case.",
          "Typical reasons include design, font, thickness or style expectations.",
          "TG / MYKA generally use a 100-day window from ETA.",
          "OAL generally uses a 60-day window.",
        ],
      },
      {
        title: "Resolution order",
        bullets: [
          "Exchange first",
          "Then store credit",
          "No refund for personalized items under the NS policy",
          "Only non-personalized or stock items may become refundable within the allowed window",
        ],
      },
    ],
  },
  Resizing: {
    intro:
      "Resizing is a dedicated policy and should not be mixed with Not Satisfied handling.",
    sections: [
      {
        title: "Main principles",
        bullets: [
          "Ring resizing is free within the standard window.",
          "Chains and bracelets follow separate rules.",
          "DIY / non-DIY and premium / non-premium matter.",
          "If the issue is size or fit, do not classify it as Not Satisfied.",
        ],
      },
    ],
  },
};

const eventMenu = ["Mother's Day 2026", "Valentine's Day 2026", "Christmas 2025"];

const eventDetails = {
  "Mother's Day 2026": {
    intro:
      "Mother's Day 2026 is a detailed event playbook used to manage WISMO during a major peak period. It applies to jewelry and also includes Lime & Lou logic.",
    sections: [
      {
        title: "Core concepts",
        bullets: [
          "Green Event = last day to order on time based on country, product, factory, shipping method and production days.",
          "Red Event = last day a factory/shipping combination can still ship on time.",
          "Last Day of Delivery = shipped orders still at risk of not arriving in time.",
          "ETA-1 = proactive delay monitoring before ETA, paused near the final event days if needed.",
        ],
      },
      {
        title: "Jewelry red event logic",
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
          "If it does not ship, standard red event proactive logic applies.",
        ],
      },
      {
        title: "Last Day of Delivery / MBL",
        bullets: [
          "At 7:00 AM IL time on the last delivery day, Notch pauses shipped-but-not-delivered WISMO messages and moves them to On Hold.",
          "Shipping provides a risk list of orders that may be late despite shipping on time.",
          "Tenengroup tags these orders MBL MDAY2026 and sends a proactive 'might be late' communication.",
          "Messages are later either closed as duplicate or released back to Notch with the proactive context.",
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
        title: "ETA-1 and special event operations",
        bullets: [
          "ETA-1 shipped and ETA-1 not shipped proactive messages continue during the event except near the final days where they are paused to avoid conflicting with Red Event logic.",
          "Special operations may also be triggered for customs issues, missed flights, shipping bottlenecks and production incidents.",
          "These cases use dedicated tags such as Shipping update_XXX_Action / No action or Production update_XXX_Action / No action.",
        ],
      },
      {
        title: "Lime & Lou event notes",
        bullets: [
          "Lime & Lou uses the same Green / Red / MBL backbone but with local production-facility logic.",
          "Production times are fixed and cannot be shortened by selecting a faster shipping method.",
          "Customer-facing wording should avoid 'supplier' and instead use production facilities, factories or warehouses.",
          "Domestic production incidents may trigger proactive communication and dedicated production tags.",
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

const qaItems = [
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
    q: "Tracking shows delivered but the customer says it was not received. What do I do?",
    a: "Treat it as DNR. If it has been less than 3 business days since the delivery scan, ask the customer to wait. After that, offer reorder or refund according to DNR policy.",
  },
  {
    q: "What is the logic of Mother's Day event monitoring?",
    a: "The structure is Green Event → Red Event → On Hold → proactive delay communication → Last Day of Delivery / MBL → queue release and reprocessing. Some orders can also go through a Last Chance one-day extension.",
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
        <li key={item} style={{ marginBottom: 8 }}>{item}</li>
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
    if (!query.trim()) return qaItems;
    const q = query.toLowerCase();
    return qaItems.filter(
      (item) =>
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif", background: "#f6f7fb" }}>
      <div style={{ width: 260, background: "#111827", color: "#fff", padding: 20 }}>
        <div style={{ fontSize: 28, fontWeight: 700 }}>Tenengroup</div>
        <div style={{ marginTop: 6, opacity: 0.8 }}>Customer Care Hub</div>

        <div style={{ marginTop: 24 }}>
          {menu.map((item) => (
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
          {tools.map((tool) => (
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
          <>
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
                  "CRM and Notch notes",
                  "Quick support Q&A",
                ]} />
              </Box>
              <Box>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Current event references</div>
                <Bullets items={[
                  "Mother's Day 2026",
                  "Valentine's Day 2026",
                  "Christmas 2025",
                ]} />
              </Box>
              <Box>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Main case taxonomy</div>
                <Bullets items={[
                  "Pre-sales",
                  "Change Order",
                  "WISMO",
                  "Item Received",
                  "Account Issues",
                  "Other",
                ]} />
              </Box>
            </div>
          </>
        )}

        {page === "Brands" && (
          <>
            <h1>Brands</h1>
            <div style={{ display: "grid", gap: 18 }}>
              {brands.map((brand) => (
                <Box key={brand.name}>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{brand.name}</div>
                  <div style={{ marginTop: 8, color: "#6b7280", fontWeight: 600 }}>{brand.subtitle}</div>
                  <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8 }}>{brand.text}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                    {brand.links.map(([label, url]) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ background: "#f3f4f6", padding: "8px 12px", borderRadius: 10 }}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </Box>
              ))}
            </div>
          </>
        )}

        {page === "Policies" && (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
            <Box>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>Policy menu</div>
              {Object.keys(policies).map((name) => (
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
                <div style={{ fontSize: 36, fontWeight: 700 }}>{policies[policy].intro ? policy : "Policy"}</div>
                <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>
                  {policies[policy].intro}
                </p>
              </Box>

              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {policies[policy].sections.map((section) => (
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
              {eventMenu.map((name) => (
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
                  {eventDetails[eventName].intro}
                </p>
              </Box>

              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {eventDetails[eventName].sections.map((section) => (
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
          <>
            <h1>CRM</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {[
                ["Kustomer", "Main CRM for conversations, queues, tags, dispositions and categories."],
                ["Categories", "Auto-filled based on webform or source used by the customer."],
                ["Dispositions", "Manual classification by agents to define the business case more precisely."],
                ["Queues", "Used either by site or by team ownership."],
                ["Tags", "Operational layer. Z-tags are archived. Tags may be manual, automatic or event-specific."],
                ["Notch", "Existing automation / AI layer used in part of the support flow and partially paused in some event scenarios."],
              ].map(([title, text]) => (
                <Box key={title}>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
                  <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8 }}>{text}</p>
                </Box>
              ))}
            </div>
          </>
        )}

        {page === "Q&A" && (
          <>
            <h1>Q&A</h1>
            <Box>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: late by 2 days, damaged within 6 months, DNR, Mother's Day..."
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
          </>
        )}
      </div>
    </div>
  );
}
