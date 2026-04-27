import { useMemo, useState } from "react";

const MENU = ["Home", "Training"];

function Box({ children }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 16,
      padding: 20,
      marginBottom: 20
    }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState("Home");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb" }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: 220, background: "#0f172a", color: "#fff", padding: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800 }}>Tenengroup</div>

        <div style={{ marginTop: 20 }}>
          {MENU.map(m => (
            <div
              key={m}
              onClick={() => setPage(m)}
              style={{
                padding: 10,
                cursor: "pointer",
                background: page === m ? "#1d4ed8" : "transparent",
                borderRadius: 8,
                marginBottom: 8
              }}
            >
              {m}
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: 30 }}>

        {page === "Home" && (
          <>
            <h1>Tenengroup Customer Care Hub</h1>
            <p>Welcome to the internal hub.</p>
          </>
        )}

        {page === "Training" && (
          <>
            <h1>Customer Care — 20 min overview</h1>

            {/* BRUNO */}
            <Box>
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                
                <img 
                  src="/team/bruno.jpg"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />

                <div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>
                    Bruno Dreyfus — CS Director
                  </div>

                  <div style={{ marginTop: 10 }}>
                    • 4.5 years at Tenengroup<br/>
                    • CRM & Ecommerce background<br/>
                    • France → Israel<br/>
                    • Married, 3 kids<br/>
                    • BBQ 🔥
                  </div>
                </div>
              </div>
            </Box>

            {/* WORLD */}
            <Box>
              <div style={{ fontSize: 22, fontWeight: 800 }}>
                Our Global Team
              </div>

              <div style={{ marginTop: 10 }}>
                🇮🇱 Israel<br/>
                🇮🇹 Italy<br/>
                🇭🇺 Hungary<br/>
                🇺🇦 Ukraine<br/>
                🇵🇭 Philippines<br/>
                🇲🇽 Mexico<br/>
                🇹🇭 Thailand<br/>
                🇪🇸 Spain<br/>
                🇦🇹 Austria
              </div>

              <div style={{ marginTop: 10 }}>
                👥 50–100 agents<br/>
                🌍 Global coverage<br/>
              </div>
            </Box>

            {/* PHOTOS */}
            <Box>
              <div style={{ fontSize: 22, fontWeight: 800 }}>
                Life at Customer Care
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginTop: 15
              }}>
                <img src="/team/team1.jpg" style={{ width: "100%", borderRadius: 10 }} />
                <img src="/team/team2.jpg" style={{ width: "100%", borderRadius: 10 }} />
                <img src="/team/team3.jpg" style={{ width: "100%", borderRadius: 10 }} />
              </div>
            </Box>

            {/* QUIZ */}
            <Box>
              <div style={{ fontSize: 22, fontWeight: 800 }}>
                Quick Quiz
              </div>

              <div style={{ marginTop: 10 }}>
                What is WISMO?<br/>
                → Where Is My Order
              </div>

              <div style={{ marginTop: 10 }}>
                Why is Customer Care important?<br/>
                → Customer experience + retention
              </div>
            </Box>

          </>
        )}

      </main>
    </div>
  );
}
