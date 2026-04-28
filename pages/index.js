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
  <div style={{ scrollBehavior: "smooth" }}>

    <div style={{
      position: "fixed",
      right: 24,
      top: "45%",
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }}>
      {["intro","bruno","org","mission","wheel","cart","trustpilot","final","quiz"].map((id, i) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: "#0f172a",
            color: "#fff",
            fontWeight: 900,
            cursor: "pointer"
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>

    <section id="intro" style={{ minHeight: "100vh", padding: 70, display: "flex", alignItems: "center" }}>
      <div>
        <div style={{ fontSize: 20, color: "#2563eb", fontWeight: 800 }}>TG ORIENTATION WEEK</div>
        <div style={{ fontSize: 78, fontWeight: 900, marginTop: 10 }}>Customer Care</div>
        <div style={{ fontSize: 42, marginTop: 8 }}>20-minute overview</div>
        <div style={{ marginTop: 30, fontSize: 24, maxWidth: 900, lineHeight: 1.6, color: "#374151" }}>
          A friendly introduction to the Customer Care team: who we are, what we do, where customers reach us,
          and how we contribute to customer experience, retention and company insights.
        </div>
        <div style={{ marginTop: 34 }}>
          <Pill>Team</Pill>
          <Pill>Mission</Pill>
          <Pill>Channels</Pill>
          <Pill>KPIs</Pill>
          <Pill>Customer Journey</Pill>
          <Pill>Trustpilot</Pill>
        </div>
      </div>
    </section>

    <section id="bruno" style={{ minHeight: "100vh", padding: 70, display: "flex", alignItems: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 60, alignItems: "center" }}>
        <div style={{
          background: "#fff",
          borderRadius: 28,
          padding: 20,
          boxShadow: "0 12px 30px rgba(15,23,42,0.12)"
        }}>
          <img
            src="/team/bruno.jpg"
            style={{
              width: "100%",
              height: 460,
              objectFit: "contain",
              borderRadius: 22,
              background: "#f8fafc"
            }}
          />
        </div>

        <div>
          <div style={{ fontSize: 56, fontWeight: 900 }}>Bruno Dreyfus</div>
          <div style={{ fontSize: 26, color: "#2563eb", fontWeight: 800, marginTop: 8 }}>
            Customer Service Director
          </div>

          <div style={{ marginTop: 26, fontSize: 22, lineHeight: 1.8, color: "#374151" }}>
            47 years old · Married · 3 kids · Lives in Raanana · From France<br/>
            Previously CRM Consultant and worked in French ecommerce: lifestyle, jewelry, underwear and home.<br/>
            4.5 years at Tenengroup. Hobbies: football, friends, family. Goal: become a barbecue pro 🔥
          </div>

          <div style={{ marginTop: 36, fontSize: 30, fontWeight: 900 }}>My objectives at Tenengroup</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 18 }}>
            {[
              ["🎉", "Have fun"],
              ["⚡", "Efficiency matters"],
              ["🚀", "Innovate"],
              ["💪", "Do your best"]
            ].map(([icon, text]) => (
              <div key={text} style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                padding: 20,
                fontSize: 22,
                fontWeight: 800
              }}>
                <span style={{ marginRight: 10 }}>{icon}</span>{text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="org" style={{
      minHeight: "100vh",
      padding: 70,
      background: "radial-gradient(circle at 20% 25%, rgba(37,99,235,.35), transparent 18%), radial-gradient(circle at 70% 45%, rgba(34,197,94,.28), transparent 18%), linear-gradient(135deg,#020617,#0f172a)",
      color: "#fff"
    }}>
      <div style={{ fontSize: 56, fontWeight: 900 }}>Organization</div>
      <div style={{ fontSize: 24, color: "#cbd5e1", marginTop: 12 }}>
        Customer organization with two main pillars: Customer and Cart Optimization.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 26, marginTop: 40 }}>
        <div>
          <div style={{
            background: "rgba(255,255,255,.08)",
            borderRadius: 24,
            padding: 26,
            border: "1px solid rgba(255,255,255,.15)"
          }}>
            <div style={{ fontSize: 28, fontWeight: 900 }}>Shani Brown</div>
            <div style={{ color: "#93c5fd", fontWeight: 800 }}>VP Customer</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 22 }}>
            <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 22, padding: 22 }}>
              <div style={{ fontSize: 24, fontWeight: 900 }}>Customer</div>
              <div style={{ marginTop: 14, lineHeight: 1.9, color: "#e5e7eb" }}>
                Bruno Dreyfus — CS Director<br/>
                Laurence Darmon — QA Team Leader<br/>
                Orly Ancel — Order Cycle Team Leader<br/>
                Adi Zaken — Team Leader<br/>
                Thijs Vandenbroucke — Team Leader<br/>
                Neva Zec — Success<br/>
                CSR teams
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 22, padding: 22 }}>
              <div style={{ fontSize: 24, fontWeight: 900 }}>Cart Optimization</div>
              <div style={{ marginTop: 14, lineHeight: 1.9, color: "#e5e7eb" }}>
                Marianna Kis — Project Manager<br/>
                Maayan Diamant — Operations<br/>
                Dominik Lanczi — Operations<br/>
                Optimization, funnel, order quality and conversion support
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 24, padding: 26 }}>
          <div style={{ fontSize: 30, fontWeight: 900 }}>Global team</div>
          <div style={{ marginTop: 12, color: "#cbd5e1" }}>50–100 agents around the world</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
            {["Israel","Italy","Hungary","Ukraine","Philippines","Mexico","Thailand","Spain","Austria"].map(c => (
              <div key={c} style={{ background: "rgba(255,255,255,.1)", borderRadius: 12, padding: 12 }}>{c}</div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="mission" style={{ minHeight: "100vh", padding: 70 }}>
      <div style={{ fontSize: 56, fontWeight: 900 }}>Mission, channels & KPIs</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 36 }}>
        <Box>
          <div style={{ fontSize: 32, fontWeight: 900 }}>Mission</div>
          <Bullets items={[
            "Optimize customer experience through tone of voice, policies and service quality.",
            "Maximize lifetime value and reduce customer churn.",
            "Identify and implement new channels to enhance satisfaction.",
            "Coordinate and bring insights to Shipping, Factory and Brands."
          ]} />
        </Box>

        <Box>
          <div style={{ fontSize: 32, fontWeight: 900 }}>Where customers reach us</div>
          <Bullets items={[
            "Webform and emails",
            "Social media: Facebook and Instagram",
            "Trustpilot",
            "Other public platforms: Reddit, BBB, complaint websites"
          ]} />
        </Box>
      </div>

      <Box>
        <div style={{ fontSize: 32, fontWeight: 900 }}>Our KPIs</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 20 }}>
          {[
            ["CSAT", "Customer satisfaction after an interaction."],
            ["SLA", "How fast we respond and respect timing commitments."],
            ["NPS", "Customer loyalty and likelihood to recommend."],
            ["Order Cost", "Efficiency and cost of resolving customer issues."]
          ].map(([title, text]) => (
            <div key={title} style={{ background: "#f8fafc", borderRadius: 18, padding: 18 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#2563eb" }}>{title}</div>
              <div style={{ marginTop: 10, color: "#4b5563", lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </Box>
    </section>

    <section id="wheel" style={{ minHeight: "100vh", padding: 70 }}>
      <div style={{ fontSize: 56, fontWeight: 900 }}>Customer Service Wheel</div>
      <div style={{ fontSize: 24, color: "#4b5563", marginTop: 12 }}>
        Customer questions come throughout the journey, then are handled by CS, AI, OCy and QA depending on the case.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginTop: 36 }}>
        {[
          ["1", "Questions", "Products, shipping, warranty, special requests, payment, technical issues, coupons."],
          ["2", "Change Order", "Address, item, inscription, shipping method."],
          ["3", "WISMO", "Late supplier, late, on time, lost, DNR, returned to sender."],
          ["4", "Item Received", "Damaged, not satisfied, production mistake, customer mistake."],
          ["5", "Other", "Account issues, collaboration, spam."]
        ].map(([num, title, text]) => (
          <div key={title} style={{ border: "1px solid #e5e7eb", borderRadius: 22, padding: 20, background: "#fff" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{num}</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 14 }}>{title}</div>
            <div style={{ color: "#4b5563", lineHeight: 1.6, marginTop: 10 }}>{text}</div>
          </div>
        ))}
      </div>

      <Box>
        <div style={{ fontSize: 30, fontWeight: 900 }}>Handled by</div>
        <div style={{ marginTop: 14 }}>
          <Pill>CS — Customer Service</Pill>
          <Pill>AI — Notch & Internal AI</Pill>
          <Pill>OCy — Order Cycle</Pill>
          <Pill>QA — Quality & Escalations</Pill>
        </div>
      </Box>

      <Box>
        <div style={{ fontSize: 30, fontWeight: 900 }}>Proactive communication</div>
        <Bullets items={[
          "OOS and potential mistakes: proactive alerts before the customer complains.",
          "Payment issues: monitoring and customer follow-up.",
          "Late supplier, upgrade, shipping issue and ETA-1: automatic or semi-automatic campaigns."
        ]} />
      </Box>
    </section>

    <section id="cart" style={{ minHeight: "100vh", padding: 70 }}>
      <div style={{ fontSize: 56, fontWeight: 900 }}>Cart Optimization</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center", marginTop: 36 }}>
        <img src="/team/cart-optimization.jpg" style={{ width: "100%", maxHeight: 520, objectFit: "contain", borderRadius: 24, background: "#fff" }} />
        <div>
          <div style={{ fontSize: 30, fontWeight: 900 }}>Why it matters</div>
          <Bullets items={[
            "Cart Optimization focuses on improving conversion and order quality.",
            "The team helps reduce friction before the order becomes a customer-care issue.",
            "Better cart experience means fewer mistakes, fewer contacts, and higher satisfaction.",
            "It connects customer behavior, checkout experience and operational outcomes."
          ]} />
        </div>
      </div>
    </section>

    <section id="trustpilot" style={{ minHeight: "100vh", padding: 70 }}>
      <div style={{ fontSize: 56, fontWeight: 900 }}>Trustpilot reviews</div>
      <div style={{ fontSize: 24, color: "#4b5563", marginTop: 12 }}>
        Public reviews are not only complaints — they are visible signals of trust, service quality and brand credibility.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 34 }}>
        {["tp1.jpg","tp2.jpg","tp3.jpg","tp4.jpg","tp5.jpg","tp6.jpg"].map(img => (
          <img key={img} src={"/team/" + img} style={{ width: "100%", height: 220, objectFit: "contain", background: "#fff", borderRadius: 18, border: "1px solid #e5e7eb" }} />
        ))}
      </div>

      <Box>
        <div style={{ fontSize: 28, fontWeight: 900 }}>What a good reply should show</div>
        <Pill>Empathy</Pill>
        <Pill>Ownership</Pill>
        <Pill>Clear next step</Pill>
        <Pill>No defensive tone</Pill>
      </Box>
    </section>

    <section id="final" style={{ minHeight: "100vh", padding: 70 }}>
      <div style={{ fontSize: 56, fontWeight: 900 }}>Final note</div>
      <div style={{ fontSize: 28, lineHeight: 1.6, marginTop: 24, maxWidth: 1000 }}>
        The cooperation between our departments is a big part of our success in giving a high-quality and personal service to our customers.
      </div>
      <div style={{ fontSize: 24, color: "#4b5563", lineHeight: 1.6, marginTop: 24 }}>
        Everything you should know about Customer Care is available in our Customer Care Hub.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 40 }}>
        <img src="/team/team1.jpg" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 22 }} />
        <img src="/team/team2.jpg" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 22 }} />
        <img src="/team/team3.jpg" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 22 }} />
      </div>
    </section>

    <section id="quiz" style={{ minHeight: "100vh", padding: 70 }}>
      <div style={{ fontSize: 56, fontWeight: 900 }}>Quick quiz</div>
      <div style={{ fontSize: 24, color: "#4b5563", marginTop: 12 }}>Click each question to reveal the answer.</div>

      <div style={{ marginTop: 34, maxWidth: 900 }}>
        {QUIZ.map(([q, a]) => <Reveal key={q} q={q} a={a} />)}
      </div>
    </section>

  </div>
)}
      </main>
    </div>
  );
}
