import { useMemo, useState } from "react";

const tools = [
  { name: "Kustomer", url: "https://tenengroup.kustomerapp.com/" },
  { name: "OM", url: "https://bo.tenengroup.com/" },
  { name: "OCS", url: "https://bo.tenengroup.com/" },
  { name: "Notch", url: "https://tenengroup.app.getnotch.com/" },
  { name: "AfterShip", url: "https://www.aftership.com/" },
  { name: "Matrix", url: "http://matrix.tenengroup.com:100/Login.aspx" },
  { name: "17Track", url: "https://www.17track.net/en" },
];

const brands = [
  {
    title: "Theo Grace",
    subtitle: "Premium personalized products",
    text: "Elegant, emotional and family-oriented. Nicky Hilton should remain part of the brand narrative whenever relevant.",
    links: [
      { label: "US Site", url: "https://www.theograce.com/" },
      { label: "UK Site", url: "https://www.theograce.co.uk/" },
    ],
  },
  {
    title: "Oak & Luna",
    subtitle: "Modern fashion jewelry",
    text: "Refined, trend-led and polished personalized jewelry for a fashionable and modern feel.",
    links: [
      { label: "Main Site", url: "https://www.oakandluna.com/" },
      { label: "FR Site", url: "https://www.oakandluna.com/fr" },
    ],
  },
  {
    title: "Israel Blessing",
    subtitle: "Jewish identity-focused products",
    text: "Culturally sensitive personalized products centered on Jewish symbolism and identity.",
    links: [{ label: "Main Site", url: "https://www.israelblessing.com/" }],
  },
  {
    title: "Lime & Lou",
    subtitle: "Personalized home & lifestyle",
    text: "Warm, aesthetic and modern personalized decor and lifestyle products.",
    links: [{ label: "Main Site", url: "https://www.limeandlou.com/" }],
  },
  {
    title: "MYKA",
    subtitle: "European brand family",
    text: "Close to Theo Grace in assortment style, but without any Nicky Hilton association.",
    links: [
      { label: "FR", url: "https://www.myka.com/fr/" },
      { label: "DE", url: "https://www.myka.com/de/" },
      { label: "ES", url: "https://www.myka.com/es/" },
      { label: "IT", url: "https://www.myka.com/it/" },
    ],
  },
];

const policies = [
  {
    id: "wismo",
    title: "Shipping & WISMO",
    intro: "Track, explain and resolve on-time, late, lost, DNR and supplier-related shipping cases.",
    bullets: [
      "Late under 3 business days: apologize and provide updated ETA.",
      "Late above 3 business days: compensation may apply.",
      "Separate logic exists for Late Supplier, Lost, DNR and Return to Sender.",
      "Always rely on OM and tracking, not on generic lead times."
    ]
  },
  {
    id: "damaged",
    title: "Damaged",
    intro: "Warranty-driven handling of damaged or defective items.",
    bullets: [
      "2-year warranty from ETA for eligible orders.",
      "Ask for a picture first if needed.",
      "Reorder is the first preferred solution.",
      "Refund only under specific policy conditions."
    ]
  },
  {
    id: "ns",
    title: "Not Satisfied",
    intro: "Customer does not like the correctly produced item.",
    bullets: [
      "Offer exchange first.",
      "Then offer store credit.",
      "Personalized items are not refundable under NS policy.",
      "First confirm it is not actually a damaged case."
    ]
  },
  {
    id: "resizing",
    title: "Resizing",
    intro: "Specific rules depending on ring, chain, bracelet, stock and brand.",
    bullets: [
      "Ring resizing is free within the standard window.",
      "Chains and bracelets follow separate logic.",
      "Resizing is not a Not Satisfied case.",
      "Apply item-specific and brand-specific rules before deciding."
    ]
  },
  {
    id: "events",
    title: "Event Policies",
    intro: "Peak-period logic for Mother's Day, Valentine's Day and Christmas.",
    bullets: [
      "Green Event = last day to order on time.",
      "Red Event = last day to ship on time.",
      "Last Day of Delivery = shipped but still at risk.",
      "ETA-1, On Hold, proactive communication and compensation are part of the event playbook."
    ]
  },
  {
    id: "crm",
    title: "CRM & Operations",
    intro: "How Kustomer, queues, categories, dispositions, tags and Notch fit together.",
    bullets: [
      "Kustomer is the main CRM.",
      "Categories are auto-filled based on webform or source.",
      "Dispositions are set manually by agents.",
      "Z-tags are archived. Notch is the current automation layer."
    ]
  },
];

const qaData = [
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
    q: "The customer wants resizing. Is this a Not Satisfied case?",
    a: "No. Resizing is handled under its own policy. Ring resizing is free within the standard window, while chains and bracelets follow different rules.",
  },
  {
    q: "Tracking shows delivered but the customer says it was not received. What do I do?",
    a: "Treat it as DNR. If it has been less than 3 business days since the delivery scan, ask the customer to wait. After that, offer reorder or refund according to DNR policy.",
  },
];

const menu = [
  { id: "home", label: "Home" },
  { id: "brands", label: "Brands" },
  { id: "policies", label: "Policies" },
  { id: "events", label: "Events" },
  { id: "crm", label: "CRM" },
  { id: "qa", label: "Q&A" },
];

function Box({ children, style }) {
  return <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", ...style }}>{children}</div>;
}

export default function Home() {
  const [page, setPage] = useState("home");
  const [policyId, setPolicyId] = useState("wismo");
  const [query, setQuery] = useState("");

  const currentPolicy = policies.find((p) => p.id === policyId) || policies[0];

  const filteredQa = useMemo(() => {
    if (!query.trim()) return qaData;
    const q = query.toLowerCase();
    return qaData.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <aside style={{ width: 260, background: "#ffffff", borderRight: "1px solid #e5e7eb", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#6b7280", fontWeight: 700 }}>Tenengroup</div>
          <div style={{ marginTop: 8, fontSize: 28, fontWeight: 700, lineHeight: 1.1 }}>Customer Care Hub</div>
          <div style={{ marginTop: 10, color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
            Internal website for policies, operations, event logic and quick support answers.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                background: page === item.id ? "#111827" : "#f3f4f6",
                color: page === item.id ? "#fff" : "#111827",
                fontWeight: 600,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Box style={{ padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Quick tools</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tools.slice(0, 5).map((tool) => (
              <a key={tool.name} href={tool.url} target="_blank" rel="noreferrer" style={{ color: "#374151", fontSize: 14, textDecoration: "underline" }}>
                {tool.name}
              </a>
            ))}
          </div>
        </Box>
      </aside>

      <main style={{ flex: 1, padding: 28 }}>
        {page === "home" && (
          <div style={{ display: "grid", gap: 20 }}>
            <Box style={{ overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr" }}>
                <div style={{ padding: 36 }}>
                  <div style={{ display: "inline-block", background: "#eef2ff", color: "#4338ca", padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
                    INTERNAL WEBSITE
                  </div>
                  <h1 style={{ marginTop: 18, marginBottom: 0, fontSize: 48, lineHeight: 1.05 }}>Tenengroup Customer Care Hub</h1>
                  <p style={{ marginTop: 16, maxWidth: 700, color: "#4b5563", fontSize: 17, lineHeight: 1.8 }}>
                    A friendly internal website for management and support teams. Browse policies, brand information, CRM notes, event playbooks and quick Q&A scenarios.
                  </p>
                  <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                    <button onClick={() => setPage("policies")} style={{ background: "#111827", color: "#fff", border: "none", padding: "12px 16px", borderRadius: 12, cursor: "pointer", fontWeight: 600 }}>
                      Browse policies
                    </button>
                    <button onClick={() => setPage("qa")} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", padding: "12px 16px", borderRadius: 12, cursor: "pointer", fontWeight: 600 }}>
                      Open Q&A
                    </button>
                  </div>
                </div>
                <div style={{ background: "linear-gradient(135deg,#111827,#334155)", color: "#fff", position: "relative", minHeight: 340, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "absolute", width: 220, height: 220, border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%" }} />
                  <div style={{ position: "absolute", width: 300, height: 300, border: "1px solid rgba(255,255,255,0.10)", borderRadius: "50%" }} />
                  <div style={{ width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 20 }}>
                    <div>
                      <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#cbd5e1" }}>Service + AI</div>
                      <div style={{ marginTop: 8, fontSize: 22, fontWeight: 700 }}>Customer Care</div>
                      <div style={{ marginTop: 4, color: "#cbd5e1" }}>in orbit</div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              <Box style={{ padding: 22 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>What is inside</div>
                <ul style={{ marginTop: 14, paddingLeft: 18, color: "#4b5563", lineHeight: 1.9 }}>
                  <li>Brand directory and links</li>
                  <li>Policy-by-policy navigation</li>
                  <li>Event strategy reference</li>
                  <li>CRM and Notch notes</li>
                  <li>Quick operational answers</li>
                </ul>
              </Box>
              <Box style={{ padding: 22 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Event reference set</div>
                <p style={{ marginTop: 14, color: "#4b5563", lineHeight: 1.8 }}>
                  Mother’s Day 2026, Valentine’s Day 2026 and Christmas 2025 are the current event template files and should be used as the basis for future annual updates.
                </p>
              </Box>
              <Box style={{ padding: 22 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Core taxonomy</div>
                <p style={{ marginTop: 14, color: "#4b5563", lineHeight: 1.8 }}>
                  Pre-sales, Change Order, WISMO, Item Received, Account Issues and Other.
                </p>
              </Box>
            </div>
          </div>
        )}

        {page === "brands" && (
          <div style={{ display: "grid", gap: 20 }}>
            <Box style={{ padding: 28 }}>
              <h2 style={{ margin: 0, fontSize: 36 }}>Brands & Sites</h2>
              <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8 }}>Quick directory of brands, positioning and links.</p>
            </Box>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Box style={{ padding: 24 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>Brand overview</div>
                <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                  {brands.map((brand) => (
                    <div key={brand.title} style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: 16 }}>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{brand.title}</div>
                      <div style={{ marginTop: 4, color: "#6b7280", fontWeight: 600 }}>{brand.subtitle}</div>
                      <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.7 }}>{brand.text}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
                        {brand.links.map((link) => (
                          <a key={link.label} href={link.url} target="_blank" rel="noreferrer" style={{ padding: "8px 10px", borderRadius: 10, background: "#f3f4f6", fontSize: 14 }}>
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Box>
              <Box style={{ padding: 24 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>All operating tools</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
                  {tools.map((tool) => (
                    <a key={tool.name} href={tool.url} target="_blank" rel="noreferrer" style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: 14, background: "#fafafa" }}>
                      <div style={{ fontWeight: 700 }}>{tool.name}</div>
                      <div style={{ marginTop: 4, color: "#6b7280", fontSize: 13 }}>Open tool</div>
                    </a>
                  ))}
                </div>
              </Box>
            </div>
          </div>
        )}

        {page === "policies" && (
          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20 }}>
            <Box style={{ padding: 16 }}>
              <div style={{ padding: 8, fontWeight: 700 }}>Policy menu</div>
              <div style={{ display: "grid", gap: 8, marginTop: 6 }}>
                {policies.map((policy) => (
                  <button
                    key={policy.id}
                    onClick={() => setPolicyId(policy.id)}
                    style={{
                      textAlign: "left",
                      border: "none",
                      borderRadius: 14,
                      padding: 14,
                      cursor: "pointer",
                      background: policyId === policy.id ? "#111827" : "#f3f4f6",
                      color: policyId === policy.id ? "#fff" : "#111827"
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>{policy.title}</div>
                    <div style={{ marginTop: 4, fontSize: 12, opacity: 0.8 }}>{policy.summary}</div>
                  </button>
                ))}
              </div>
            </Box>

            <Box style={{ padding: 28 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#6b7280", fontWeight: 700 }}>Policy</div>
              <h2 style={{ marginTop: 10, marginBottom: 0, fontSize: 38 }}>{currentPolicy.title}</h2>
              <p style={{ marginTop: 14, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>{currentPolicy.intro}</p>
              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                {currentPolicy.bullets.map((point) => (
                  <div key={point} style={{ background: "#f8fafc", borderRadius: 14, padding: 16, border: "1px solid #e5e7eb", lineHeight: 1.7 }}>
                    {point}
                  </div>
                ))}
              </div>
            </Box>
          </div>
        )}

        {page === "events" && (
          <div style={{ display: "grid", gap: 20 }}>
            <Box style={{ padding: 28 }}>
              <h2 style={{ margin: 0, fontSize: 36 }}>Event Policies</h2>
              <p style={{ marginTop: 14, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>
                Tenengroup event playbooks are built around Green Event, Red Event, Last Day of Delivery, ETA-1 logic, proactive messaging, On Hold workflows and event-specific compensation strategy.
              </p>
            </Box>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {[
                ["Mother's Day 2026", "Peak-playbook for jewelry and Lime & Lou, including proactive late communication, MBL logic and event stop/start flows."],
                ["Valentine's Day 2026", "High-volume event strategy with shipping cutoffs, Last Chance logic, proactive messaging and Thought Guaranteed handling."],
                ["Christmas 2025", "Holiday event playbook including Last Minute Pack logic, proactive event handling and peak shipping monitoring."]
              ].map(([title, desc]) => (
                <Box key={title} style={{ padding: 22 }}>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
                  <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8 }}>{desc}</p>
                </Box>
              ))}
            </div>
          </div>
        )}

        {page === "crm" && (
          <div style={{ display: "grid", gap: 20 }}>
            <Box style={{ padding: 28 }}>
              <h2 style={{ margin: 0, fontSize: 36 }}>CRM & Operations</h2>
              <p style={{ marginTop: 14, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>
                Current shared understanding of Kustomer, categories, dispositions, queues, tags and Notch based on the data provided so far.
              </p>
            </Box>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {[
                ["Kustomer", "Main CRM for conversations, queues, tags, dispositions and categories."],
                ["Categories", "Auto-filled based on webform or source used by the customer."],
                ["Dispositions", "Manual classification by agents to define the business case more precisely."],
                ["Queues", "Used either by site or by team ownership."],
                ["Tags", "Operational layer. Z-tags are archived. Tags may be manual, automatic or event-specific."],
                ["Notch", "Existing automation / AI layer used in part of the support flow and partially paused in some event scenarios."]
              ].map(([title, text]) => (
                <Box key={title} style={{ padding: 22 }}>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
                  <p style={{ marginTop: 12, color: "#4b5563", lineHeight: 1.8 }}>{text}</p>
                </Box>
              ))}
            </div>
          </div>
        )}

        {page === "qa" && (
          <div style={{ display: "grid", gap: 20 }}>
            <Box style={{ padding: 28 }}>
              <h2 style={{ margin: 0, fontSize: 36 }}>Policy Q&A</h2>
              <p style={{ marginTop: 14, color: "#4b5563", lineHeight: 1.8, fontSize: 17 }}>
                Friendly internal access point for common support questions.
              </p>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: late by 2 days, damaged within 6 months, DNR, resizing..."
                style={{
                  marginTop: 18,
                  width: "100%",
                  padding: "16px 18px",
                  borderRadius: 14,
                  border: "1px solid #d1d5db",
                  fontSize: 15
                }}
              />
            </Box>

            <div style={{ display: "grid", gap: 14 }}>
              {filteredQa.map((item) => (
                <Box key={item.q} style={{ padding: 22 }}>
                  <div style={{ color: "#6b7280", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>Question</div>
                  <div style={{ marginTop: 10, fontSize: 22, fontWeight: 700 }}>{item.q}</div>
                  <div style={{ marginTop: 14, color: "#4b5563", lineHeight: 1.8 }}>{item.a}</div>
                </Box>
              ))}
              {filteredQa.length === 0 && (
                <Box style={{ padding: 22 }}>
                  <div style={{ color: "#4b5563" }}>No matching question yet. This section can be enriched over time with your real support scenarios.</div>
                </Box>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
