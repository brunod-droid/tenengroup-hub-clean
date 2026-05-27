export default function TheoGraceDesignLab() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fbf7f1 0%, #ffffff 45%, #f1eee9 100%)",
      color: "#1f2933",
      padding: 32
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <button
          onClick={() => { window.location.href = "/"; }}
          style={{
            border: "1px solid #e5ded3",
            background: "#fff",
            borderRadius: 999,
            padding: "10px 14px",
            fontWeight: 900,
            cursor: "pointer",
            marginBottom: 22
          }}
        >
          Back to Hub
        </button>

        <div style={{
          borderRadius: 32,
          background: "#111827",
          color: "#fff",
          padding: 36,
          boxShadow: "0 24px 80px rgba(17,24,39,.18)"
        }}>
          <div style={{ color: "#d6b16a", fontWeight: 950, letterSpacing: 1.2, textTransform: "uppercase" }}>
            TheoGrace Brand Theme Lab
          </div>
          <h1 style={{ fontSize: 48, lineHeight: 1.02, margin: "10px 0" }}>
            Product page redesign concepts
          </h1>
          <p style={{ maxWidth: 760, color: "#d1d5db", fontSize: 18, lineHeight: 1.6 }}>
            A visual archive of PDP redesign proposals to submit, compare and improve before Brand Theme review.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          marginTop: 28
        }}>
          <div style={{
            background: "#fff",
            border: "1px solid #eee5da",
            borderRadius: 28,
            padding: 24,
            boxShadow: "0 18px 50px rgba(31,41,51,.08)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
              marginBottom: 16
            }}>
              <div style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "#111827",
                color: "#d6b16a",
                display: "grid",
                placeItems: "center",
                fontWeight: 950
              }}>
                #001
              </div>
              <div style={{
                padding: "7px 10px",
                borderRadius: 999,
                background: "#f8efe0",
                color: "#8a5d1d",
                fontWeight: 900,
                fontSize: 12
              }}>
                Draft v1
              </div>
            </div>

            <h2 style={{ margin: "0 0 8px", fontSize: 28 }}>Create Your Story Necklace</h2>
            <p style={{ color: "#667085", lineHeight: 1.55 }}>
              4-sided personalization concept for Totem 3D Bar Necklace.
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "18px 0" }}>
              {["PDP", "Personalization", "Storytelling", "Conversion"].map((tag) => (
                <span key={tag} style={{
                  padding: "7px 10px",
                  borderRadius: 999,
                  background: "#f5f5f4",
                  fontWeight: 800,
                  fontSize: 12
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => { window.location.href = "/theograce-design-lab/story-necklace-v1"; }}
              style={{
                width: "100%",
                border: "none",
                background: "#111827",
                color: "#fff",
                borderRadius: 16,
                padding: "14px 16px",
                fontWeight: 950,
                cursor: "pointer"
              }}
            >
              Open screen concept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
