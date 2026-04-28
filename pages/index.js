import { useMemo, useState } from "react";

const MENU = ["Home", "Training"];

const TEAM = [
  { name: "Shani Brown", role: "VP Customer", color: "#2563eb" },
  { name: "Bruno Dreyfus", role: "CS Director", color: "#7c3aed" },
  { name: "Laurence Darmon", role: "QA Team Leader", color: "#059669" },
  { name: "Orly Ancel", role: "Order Cycle Team Leader", color: "#ea580c" },
  { name: "Marianna Kis", role: "Project Manager", color: "#db2777" },
  { name: "Maayan Diamant", role: "Operations", color: "#0891b2" },
  { name: "Adi Zaken", role: "Team Leader", color: "#4f46e5" },
  { name: "Thijs Vandenbroucke", role: "Team Leader", color: "#9333ea" },
  { name: "Neva Zec", role: "Success", color: "#16a34a" },
  { name: "Dominik Lanczi", role: "Operations", color: "#dc2626" },
];

const COUNTRIES = [
  "Israel", "Italy", "Hungary", "Ukraine", "Philippines", "Mexico", "Thailand", "Spain", "Austria"
];

const QUIZ = [
  ["What does WISMO mean?", "Where Is My Order."],
  ["Why is Customer Care important?", "It protects customer experience, retention and brand reputation."],
  ["Name one public feedback channel.", "Trustpilot, Facebook, Instagram, Reddit, BBB or review websites."],
  ["Who handles product-quality escalations?", "QA Team."],
  ["What makes a good Trustpilot reply?", "Empathy, ownership and a clear next step."],
];

function Box({ children, dark }) {
  return (
    <div style={{
      background: dark ? "#0f172a" : "#fff",
      color: dark ? "#fff" : "#111827",
      border: "1px solid #e5e7eb",
      borderRadius: 22,
      padding: 24,
      marginBottom: 22,
      boxShadow: "0 8px 24px rgba(15,23,42,0.06)"
    }}>
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "8px 12px",
      borderRadius: 999,
      background: "#eef2ff",
      color: "#3730a3",
      fontWeight: 700,
      fontSize: 13,
      marginRight: 8,
      marginBottom: 8
    }}>
      {children}
    </span>
  );
}

function Reveal({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{
      border: "1px solid #e5e7eb",
      borderRadius: 16,
      padding: 16,
      cursor: "pointer",
      background: "#fff",
      marginBottom: 10
    }}>
      <div style={{ fontWeight: 800 }}>{q}</div>
      {open && <div style={{ marginTop: 10, color: "#2563eb", fontWeight: 700 }}>{a}</div>}
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState("Home");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb", fontFamily: "Arial, sans-serif" }}>
      <aside style={{ width: 250, background: "#0f172a", color: "#fff", padding: 22 }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: "#111827", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 26 }}>
          TG
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, marginTop: 14 }}>Tenengroup</div>
        <div style={{ opacity: 0.75, marginTop: 4 }}>Customer Care Hub</div>

        <div style={{ marginTop: 28 }}>
          {MENU.map((m) => (
            <div key={m} onClick={() => setPage(m)} style={{
              padding: "12px 14px",
              borderRadius: 12,
              cursor: "pointer",
              background: page === m ? "#2563eb" : "transparent",
              marginBottom: 8,
              fontWeight: 700
            }}>
              {m}
            </div>
          ))}
        </div>
      </aside>

      <main style={{ flex: 1, padding: 28 }}>
        {page === "Home" && (
          <>
            <Box dark>
              <div style={{ fontSize: 16, color: "#93c5fd", fontWeight: 800 }}>WELCOME TO</div>
              <div style={{ fontSize: 54, fontWeight: 900, marginTop: 6 }}>Customer Care Hub</div>
              <div style={{ fontSize: 22, marginTop: 14, color: "#e5e7eb", maxWidth: 900, lineHeight: 1.6 }}>
                Your internal guide to understand Customer Care, teams, mission, customer channels and how we support Tenengroup’s growth.
              </div>
            </Box>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <Box>
                <div style={{ fontSize: 24, fontWeight: 900 }}>Training</div>
                <p>20-minute orientation for new employees.</p>
                <button onClick={() => setPage("Training")} style={{ padding: "12px 16px", border: 0, borderRadius: 12, background: "#2563eb", color: "#fff", fontWeight: 800 }}>
                  Open Training
                </button>
              </Box>
              <Box>
                <div style={{ fontSize: 24, fontWeight: 900 }}>Global Team</div>
                <p>50–100 agents across multiple countries.</p>
              </Box>
              <Box>
                <div style={{ fontSize: 24, fontWeight: 900 }}>Mission</div>
                <p>Customer experience, retention, insights and brand trust.</p>
              </Box>
            </div>
          </>
        )}

        {page === "Training" && (
          <>
            <Box dark>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 28, alignItems: "center" }}>
                <div>
                  <div style={{ color: "#93c5fd", fontWeight: 800 }}>TG ORIENTATION WEEK</div>
                  <h1 style={{ fontSize: 52, margin: "10px 0" }}>Customer Care in 20 minutes</h1>
                  <p style={{ fontSize: 20, lineHeight: 1.6, color: "#e5e7eb" }}>
                    A friendly overview of who we are, what we do, where customers reach us, and why Customer Care matters to the whole company.
                  </p>
                  <Pill>Customer Experience</Pill>
                  <Pill>Brand Trust</Pill>
                  <Pill>Retention</Pill>
                  <Pill>Insights</Pill>
                </div>
                <img src="/team/team1.jpg" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 24 }} />
              </div>
            </Box>

            <Box>
              <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 22, alignItems: "center" }}>
                <img src="/team/bruno.jpg" style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <div style={{ fontSize: 30, fontWeight: 900 }}>Bruno Dreyfus</div>
                  <div style={{ fontSize: 18, color: "#2563eb", fontWeight: 800 }}>Customer Service Director</div>
                  <div style={{ marginTop: 14, lineHeight: 1.8, color: "#374151" }}>
                    47 years old · Married · 3 kids · Lives in Raanana · From France<br/>
                    Previously CRM Consultant and worked in French ecommerce: lifestyle, jewelry, underwear and home.<br/>
                    4.5 years at Tenengroup. Hobbies: football, friends, family. Goal: become a barbecue pro 🔥
                  </div>
                </div>
              </div>
            </Box>

            <Box>
              <div style={{ fontSize: 30, fontWeight: 900 }}>Leadership & Key Functions</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginTop: 18 }}>
                {TEAM.map((p) => (
                  <div key={p.name} style={{ border: "1px solid #e5e7eb", borderRadius: 18, padding: 16, background: "#fafafa" }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: p.color,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      marginBottom: 10
                    }}>
                      {p.name.split(" ").map(x => x[0]).join("").slice(0,2)}
                    </div>
                    <div style={{ fontWeight: 900 }}>{p.name}</div>
                    <div style={{ color: "#4b5563", fontSize: 14, marginTop: 4 }}>{p.role}</div>
                  </div>
                ))}
              </div>
            </Box>

            <Box dark>
              <div style={{ fontSize: 30, fontWeight: 900 }}>Our Global Team</div>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 22, marginTop: 18 }}>
                <div style={{
                  minHeight: 260,
                  borderRadius: 20,
                  background: "radial-gradient(circle at 20% 30%, #2563eb 0 8px, transparent 9px), radial-gradient(circle at 48% 35%, #22c55e 0 8px, transparent 9px), radial-gradient(circle at 72% 50%, #f97316 0 8px, transparent 9px), radial-gradient(circle at 82% 65%, #a855f7 0 8px, transparent 9px), linear-gradient(135deg,#020617,#1e293b)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  position: "relative",
                  overflow: "hidden",
                  padding: 24
                }}>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>Worldwide presence</div>
                  <div style={{ marginTop: 12, color: "#cbd5e1" }}>
                    Our team supports customers across regions, languages and time zones.
                  </div>
                </div>

                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {COUNTRIES.map((c) => (
                      <div key={c} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 12 }}>
                        {c}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 18, lineHeight: 1.8, color: "#e5e7eb" }}>
                    👥 50–100 agents<br/>
                    🌍 9+ countries<br/>
                    💬 Multi-language support<br/>
                    🕐 Global coverage
                  </div>
                </div>
              </div>
            </Box>

            <Box>
              <div style={{ fontSize: 30, fontWeight: 900 }}>Life at Customer Care</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 18 }}>
                <img src="/team/team1.jpg" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 20 }} />
                <img src="/team/team2.jpg" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 20 }} />
                <img src="/team/team3.jpg" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 20 }} />
              </div>
              <p style={{ color: "#4b5563", lineHeight: 1.7, marginTop: 16 }}>
                Behind the tools, policies and KPIs, Customer Care is a human team. Collaboration, energy and ownership make the difference.
              </p>
            </Box>

            <Box>
              <div style={{ fontSize: 30, fontWeight: 900 }}>Mission</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 18 }}>
                {[
                  ["Customer Experience", "Optimize tone of voice, policy and service quality."],
                  ["Lifetime Value", "Maximize retention and reduce customer churn."],
                  ["New Channels", "Identify ways to improve customer satisfaction."],
                  ["Company Insights", "Bring insights to Shipping, Factory and Brands."]
                ].map(([title, text]) => (
                  <div key={title} style={{ background: "#f8fafc", borderRadius: 18, padding: 18 }}>
                    <div style={{ fontWeight: 900, fontSize: 18 }}>{title}</div>
                    <div style={{ marginTop: 8, color: "#4b5563", lineHeight: 1.6 }}>{text}</div>
                  </div>
                ))}
              </div>
            </Box>

            <Box>
              <div style={{ fontSize: 30, fontWeight: 900 }}>Customer Service Wheel</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 18 }}>
                {[
                  ["Pre-sales", "Products, shipping, warranty, special requests, payment, technical issues, coupons."],
                  ["Change Order", "Address, item, inscription, shipping method."],
                  ["WISMO", "Where Is My Order: late supplier, late, on time, lost, DNR, returned to sender."],
                  ["Item Received", "Damaged, not satisfied, production mistake, customer mistake."],
                  ["Proactive", "OOS, payment, potential mistake, ETA-1, shipping issue."],
                  ["Bad Reviews", "Trustpilot, social media, Reddit, BBB and other public platforms."]
                ].map(([title, text]) => (
                  <div key={title} style={{ border: "1px solid #e5e7eb", borderRadius: 18, padding: 18 }}>
                    <div style={{ color: "#2563eb", fontWeight: 900 }}>{title}</div>
                    <div style={{ marginTop: 8, color: "#4b5563", lineHeight: 1.6 }}>{text}</div>
                  </div>
                ))}
              </div>
            </Box>

            <Box>
              <div style={{ fontSize: 30, fontWeight: 900 }}>Trustpilot examples</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
                <div style={{ background: "#ecfdf5", border: "1px solid #bbf7d0", borderRadius: 18, padding: 18 }}>
                  <div style={{ fontWeight: 900, color: "#166534" }}>Good response</div>
                  <p style={{ lineHeight: 1.7 }}>
                    “We’re sorry for the delay and understand how frustrating this is. We checked your order and will follow up with the latest ETA / solution.”
                  </p>
                  <Pill>Empathy</Pill><Pill>Ownership</Pill><Pill>Next step</Pill>
                </div>
                <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 18, padding: 18 }}>
                  <div style={{ fontWeight: 900, color: "#9f1239" }}>Weak response</div>
                  <p style={{ lineHeight: 1.7 }}>
                    “Please contact support.” No ownership, no context, no reassurance, no solution.
                  </p>
                  <Pill>Too generic</Pill><Pill>No action</Pill>
                </div>
              </div>
            </Box>

            <Box>
              <div style={{ fontSize: 30, fontWeight: 900 }}>Quick Quiz</div>
              <div style={{ marginTop: 16 }}>
                {QUIZ.map(([q, a]) => <Reveal key={q} q={q} a={a} />)}
              </div>
            </Box>
          </>
        )}
      </main>
    </div>
  );
}
