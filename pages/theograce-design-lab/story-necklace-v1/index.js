import { useState } from "react";

const examples = {
  name: ["Emma", "Sarah", "Mia", "Olivia"],
  words: ["I Love You", "Blessed", "The One", "Forever"],
  passion: ["We Not Me", "Hard Work Works", "Process. Progress. Payoff.", "Fearless"],
  symbol: ["12.08.24", "Heart", "M + J", "11:11"]
};

function InspirationPill({ text, onClick }) {
  return (
    <button
      onClick={() => onClick(text)}
      style={{
        border: "1px solid #eadfce",
        background: "#fff",
        color: "#4b4035",
        borderRadius: 999,
        padding: "8px 11px",
        fontWeight: 800,
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}

function EngravingInput({ number, title, description, value, setValue, ideas }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #efe4d6",
      borderRadius: 22,
      padding: 18,
      boxShadow: "0 12px 35px rgba(30,30,30,.05)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#111827",
          color: "#d6b16a",
          display: "grid",
          placeItems: "center",
          fontWeight: 950
        }}>
          {number}
        </div>
        <div>
          <div style={{ fontWeight: 950, color: "#111827" }}>{title}</div>
          <div style={{ color: "#7b7167", fontSize: 13 }}>{description}</div>
        </div>
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your engraving"
        maxLength={28}
        style={{
          width: "100%",
          marginTop: 14,
          padding: "13px 14px",
          border: "1px solid #e5ddd3",
          borderRadius: 14,
          fontWeight: 800,
          fontSize: 15,
          boxSizing: "border-box"
        }}
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {ideas.map((idea) => (
          <InspirationPill key={idea} text={idea} onClick={setValue} />
        ))}
      </div>
    </div>
  );
}

function NecklacePreview({ sides }) {
  return (
    <div style={{
      position: "relative",
      minHeight: 560,
      borderRadius: 34,
      background: "radial-gradient(circle at 50% 15%, #fff 0%, #f7efe4 34%, #d9c7af 100%)",
      overflow: "hidden",
      border: "1px solid #eadfce",
      boxShadow: "0 30px 90px rgba(38,31,25,.16)"
    }}>
      <div style={{
        position: "absolute",
        top: 38,
        left: "50%",
        transform: "translateX(-50%)",
        width: 220,
        height: 220,
        border: "3px solid rgba(181,149,95,.35)",
        borderRadius: "50%"
      }} />

      <div style={{
        position: "absolute",
        top: 170,
        left: "50%",
        transform: "translateX(-50%)",
        width: 82,
        height: 270,
        borderRadius: 18,
        background: "linear-gradient(90deg, #d6d8dc 0%, #f8fafc 35%, #b9bdc4 65%, #f2f4f7 100%)",
        border: "1px solid #aeb4bc",
        boxShadow: "inset 0 0 18px rgba(255,255,255,.8), 0 18px 55px rgba(17,24,39,.22)"
      }}>
        <div style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          textAlign: "center",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: 1.4,
          fontWeight: 950,
          color: "#4b5563",
          textTransform: "uppercase",
          fontSize: 13
        }}>
          {sides.name || "YOUR NAME"}
        </div>
      </div>

      <div style={{
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 24,
        background: "rgba(255,255,255,.78)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,.8)",
        borderRadius: 24,
        padding: 18
      }}>
        <div style={{ fontWeight: 950, color: "#111827", marginBottom: 10 }}>
          Your 4-sided story
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            ["Name", sides.name || "Emma"],
            ["Words", sides.words || "I Love You"],
            ["Passion", sides.passion || "We Not Me"],
            ["Symbol", sides.symbol || "11:11"]
          ].map(([label, value]) => (
            <div key={label} style={{
              padding: 12,
              borderRadius: 16,
              background: "#fff",
              border: "1px solid #eee5da"
            }}>
              <div style={{ color: "#8a5d1d", fontSize: 11, fontWeight: 950, textTransform: "uppercase" }}>{label}</div>
              <div style={{ fontWeight: 900, color: "#111827", marginTop: 4 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StoryNecklaceConcept() {
  const [sides, setSides] = useState({
    name: "Emma",
    words: "I Love You",
    passion: "We Not Me",
    symbol: "11:11"
  });

  const update = (key) => (value) => setSides((prev) => ({ ...prev, [key]: value }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fbf7f1 0%, #ffffff 48%, #eee7dc 100%)",
      color: "#111827"
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 20px 110px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "center", marginBottom: 20 }}>
          <button
            onClick={() => { window.location.href = "/theograce-design-lab"; }}
            style={{
              border: "1px solid #e5ded3",
              background: "#fff",
              borderRadius: 999,
              padding: "10px 14px",
              fontWeight: 900,
              cursor: "pointer"
            }}
          >
            Back to Design Lab
          </button>

          <div style={{
            borderRadius: 999,
            padding: "8px 12px",
            background: "#111827",
            color: "#d6b16a",
            fontWeight: 950,
            fontSize: 12
          }}>
            Product Page Redesign #001
          </div>
        </div>

        <section style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
          alignItems: "center"
        }}>
          <div>
            <div style={{ color: "#8a5d1d", fontWeight: 950, letterSpacing: 1.4, textTransform: "uppercase" }}>
              TheoGrace - Totem 3D Bar Necklace
            </div>
            <h1 style={{
              fontSize: 64,
              lineHeight: .96,
              letterSpacing: -2,
              margin: "12px 0 16px"
            }}>
              Create a necklace as unique as you are.
            </h1>
            <p style={{ fontSize: 19, color: "#5b6470", lineHeight: 1.65, maxWidth: 620 }}>
              Personalize up to 4 sides with a name, a word, a passion and a symbol.
              One necklace. Four sides. Your story.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <button style={{
                border: "none",
                background: "#111827",
                color: "#fff",
                borderRadius: 16,
                padding: "15px 20px",
                fontWeight: 950,
                cursor: "pointer",
                boxShadow: "0 14px 35px rgba(17,24,39,.25)"
              }}>
                Start creating yours
              </button>
              <button style={{
                border: "1px solid #d8c8b3",
                background: "#fff",
                color: "#111827",
                borderRadius: 16,
                padding: "15px 20px",
                fontWeight: 950,
                cursor: "pointer"
              }}>
                View engraving ideas
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 26, maxWidth: 620 }}>
              {["4 engravings", "Gift ready", "Personal meaning"].map((item) => (
                <div key={item} style={{
                  background: "#fff",
                  border: "1px solid #eee5da",
                  borderRadius: 18,
                  padding: 14,
                  fontWeight: 900,
                  color: "#4b4035"
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <NecklacePreview sides={sides} />
        </section>

        <section style={{
          marginTop: 34,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20
        }}>
          <div>
            <h2 style={{ fontSize: 38, margin: "0 0 10px" }}>
              Four sides of your story
            </h2>
            <p style={{ color: "#667085", lineHeight: 1.6 }}>
              The page should guide the customer from simple personalization to emotional self-expression.
              Not just a name necklace - a wearable identity piece.
            </p>

            <div style={{
              marginTop: 18,
              padding: 22,
              borderRadius: 26,
              background: "#111827",
              color: "#fff"
            }}>
              <div style={{ color: "#d6b16a", fontWeight: 950, marginBottom: 10 }}>
                Brand Theme message
              </div>
              <div style={{ fontSize: 24, fontWeight: 950, lineHeight: 1.25 }}>
                Your name, your words, your passion, your memories - engraved on one timeless piece.
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <EngravingInput number="1" title="Your name" description="Classic, personal, timeless." value={sides.name} setValue={update("name")} ideas={examples.name} />
            <EngravingInput number="2" title="Your words" description="A phrase that means something only to you." value={sides.words} setValue={update("words")} ideas={examples.words} />
            <EngravingInput number="3" title="Your passion" description="Your mindset, team spirit, drive or identity." value={sides.passion} setValue={update("passion")} ideas={examples.passion} />
            <EngravingInput number="4" title="Your symbol" description="A date, emoji, initials, lucky number or memory." value={sides.symbol} setValue={update("symbol")} ideas={examples.symbol} />
          </div>
        </section>

        <section style={{
          marginTop: 34,
          borderRadius: 32,
          background: "#fff",
          border: "1px solid #eee5da",
          padding: 28,
          boxShadow: "0 20px 70px rgba(31,41,51,.08)"
        }}>
          <div style={{ color: "#8a5d1d", fontWeight: 950, textTransform: "uppercase", letterSpacing: 1 }}>
            Proposed PDP flow
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 14,
            marginTop: 16
          }}>
            {["Hero with 4-side concept", "Live engraving preview", "Inspiration categories", "Storytelling section", "Reviews and trust", "Sticky Add to Cart"].map((step, i) => (
              <div key={step} style={{
                padding: 16,
                borderRadius: 20,
                background: "#faf7f2",
                border: "1px solid #eee5da"
              }}>
                <div style={{ color: "#8a5d1d", fontWeight: 950 }}>0{i + 1}</div>
                <div style={{ fontWeight: 950, marginTop: 8 }}>{step}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(255,255,255,.92)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #eee5da",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "center",
        zIndex: 20
      }}>
        <div style={{
          width: "100%",
          maxWidth: 1180,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12
        }}>
          <div>
            <div style={{ fontWeight: 950 }}>Totem 3D Bar Necklace - Silver Finish</div>
            <div style={{ color: "#667085", fontSize: 13 }}>Concept mockup for Brand Theme review</div>
          </div>
          <button style={{
            border: "none",
            background: "#111827",
            color: "#fff",
            borderRadius: 14,
            padding: "13px 18px",
            fontWeight: 950,
            cursor: "pointer"
          }}>
            Add to Bag - $95
          </button>
        </div>
      </div>
    </div>
  );
}
