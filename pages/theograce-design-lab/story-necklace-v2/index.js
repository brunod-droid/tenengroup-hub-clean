import { useState } from "react";

const gold = "#d79a2b";
const dark = "#111111";
const border = "#eee5da";

export default function StoryNecklaceV2() {
  const [metal, setMetal] = useState("Gold");
  const [length, setLength] = useState('18"');
  const [stones, setStones] = useState("4");

  return (
    <div style={{ minHeight:"100vh", background:"#fff", color:dark, fontFamily:"Arial, sans-serif" }}>
      <TopBar />
      <Header />

      <main style={{ maxWidth:1500, margin:"0 auto", padding:"22px 28px 48px" }}>
        <div style={{ color:"#777", fontSize:14, marginBottom:18 }}>
          Home&nbsp;&nbsp;/&nbsp;&nbsp;Necklaces&nbsp;&nbsp;/&nbsp;&nbsp;<b style={{ color:dark }}>Vertical Bar Necklace</b>
        </div>

        <section style={{
          display:"grid",
          gridTemplateColumns:"138px 1.08fr .92fr",
          gap:22,
          alignItems:"start"
        }}>
          <Gallery />
          <ProductVisual />
          <ProductPanel metal={metal} setMetal={setMetal} length={length} setLength={setLength} stones={stones} setStones={setStones} />
        </section>

        <FourSidedReview />
        <TrustBar />
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <div style={{
      height:32,
      background:"#f4eee5",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      gap:36,
      fontSize:13,
      letterSpacing:.5,
      color:"#1f1f1f",
      fontWeight:700
    }}>
      <span>FREE SHIPPING OVER $75</span>
      <span>|</span>
      <span>60-DAY RETURNS</span>
      <span>|</span>
      <span>LIFETIME GUARANTEE ♡</span>
    </div>
  );
}

function Header() {
  return (
    <header style={{
      height:92,
      borderBottom:"1px solid #ececec",
      display:"grid",
      gridTemplateColumns:"260px 1fr 260px",
      alignItems:"center",
      padding:"0 34px",
      background:"#fff"
    }}>
      <div style={{ fontFamily:"Georgia, serif", fontSize:30, letterSpacing:6 }}>
        THEO <span style={{ color:gold }}>♥</span> GRACE
      </div>

      <nav style={{
        display:"flex",
        justifyContent:"center",
        gap:46,
        fontSize:14,
        letterSpacing:.7,
        fontWeight:700
      }}>
        {["BEST SELLERS", "NECKLACES", "BRACELETS", "RINGS", "GIFTS", "COLLECTIONS"].map((item) => (
          <div key={item} style={{
            padding:"35px 0 28px",
            borderBottom:item === "NECKLACES" ? "3px solid #111" : "3px solid transparent"
          }}>
            {item}
          </div>
        ))}
      </nav>

      <div style={{ display:"flex", justifyContent:"flex-end", gap:24, fontSize:26 }}>
        <span>⌕</span><span>♙</span><span>♡</span><span>▢</span>
      </div>
    </header>
  );
}

function Gallery() {
  return (
    <div style={{ display:"grid", gap:14 }}>
      {["Pendant", "Model", "Angle", "Gift box", "▶\\nVIDEO"].map((item, idx) => (
        <div key={idx} style={{
          height:112,
          borderRadius:10,
          border:idx === 0 ? `2px solid ${gold}` : "1px solid #e7e1d8",
          background:idx === 4 ? "linear-gradient(135deg,#f5f5f5,#ffffff)" : "linear-gradient(135deg,#fff,#eadfce)",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          color:idx === 4 ? "#222" : "#8a5d1d",
          fontSize:idx === 4 ? 14 : 12,
          whiteSpace:"pre-line",
          fontWeight:800,
          boxShadow:idx === 0 ? "0 10px 25px rgba(215,154,43,.12)" : "none"
        }}>
          {idx === 4 ? item : <MiniNecklace />}
        </div>
      ))}
    </div>
  );
}

function ProductVisual() {
  return (
    <div style={{
      height:650,
      borderRadius:10,
      background:"radial-gradient(circle at 45% 25%, #fff8ec 0%, #f4e4cb 36%, #fbf7f0 72%)",
      position:"relative",
      overflow:"hidden"
    }}>
      <div style={{
        position:"absolute",
        inset:0,
        background:"linear-gradient(135deg, rgba(255,255,255,.78), rgba(255,255,255,0) 52%)"
      }} />

      <div style={{
        position:"absolute",
        top:-26,
        left:"50%",
        transform:"translateX(-50%)",
        width:250,
        height:250,
        border:"7px solid rgba(210,155,50,.45)",
        borderBottom:"none",
        borderRadius:"50% 50% 0 0"
      }} />

      <PendantLarge />

      <div style={{
        position:"absolute",
        right:22,
        top:22,
        width:48,
        height:48,
        borderRadius:"50%",
        background:"#fff",
        display:"grid",
        placeItems:"center",
        fontSize:23,
        boxShadow:"0 8px 25px rgba(0,0,0,.08)"
      }}>
        ⌕
      </div>

      <div style={{
        position:"absolute",
        right:24,
        bottom:22,
        padding:"10px 18px",
        borderRadius:999,
        background:"#fff",
        fontWeight:700,
        boxShadow:"0 8px 25px rgba(0,0,0,.08)"
      }}>
        ⌕&nbsp;&nbsp;Click to zoom
      </div>
    </div>
  );
}

function PendantLarge() {
  const names = [["#1263ad", "Michael"], ["#d63d78", "Sophia"], ["#3f9b2d", "Emma"], ["#eee", "Daniel"]];

  return (
    <div style={{
      position:"absolute",
      top:150,
      left:"50%",
      transform:"translateX(-50%) rotate(-9deg)",
      width:112,
      height:390,
      borderRadius:18,
      background:"linear-gradient(90deg,#b77819 0%,#f9d883 20%,#ffe9a9 48%,#d39a33 100%)",
      border:"2px solid #a66b12",
      boxShadow:"0 28px 60px rgba(80,50,12,.28), inset 0 0 18px rgba(255,255,255,.55)",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"space-around",
      padding:"28px 0"
    }}>
      {names.map(([color, name]) => (
        <div key={name} style={{ display:"grid", justifyItems:"center", gap:8 }}>
          <span style={{
            width:18,
            height:18,
            borderRadius:"50%",
            background:color,
            border:"2px solid rgba(95,60,10,.35)",
            boxShadow:"inset 0 2px 4px rgba(255,255,255,.65)"
          }} />
          <span style={{ fontFamily:"Georgia, serif", fontSize:17 }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

function ProductPanel({ metal, setMetal, length, setLength, stones, setStones }) {
  return (
    <aside style={{ padding:"14px 0 0 20px" }}>
      <h1 style={{ fontFamily:"Georgia, serif", fontSize:46, lineHeight:1.05, fontWeight:400, margin:"8px 0 16px" }}>
        Vertical Bar Necklace
      </h1>

      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
        <span style={{ color:gold, fontSize:26, letterSpacing:1 }}>★★★★★</span>
        <b>4.8</b>
        <span>(1,532 reviews)</span>
      </div>

      <p style={{ fontSize:18, margin:"0 0 28px", color:"#333" }}>
        A timeless piece with room for what matters most.
      </p>

      <div style={{ display:"flex", gap:36, marginBottom:34, fontWeight:700 }}>
        <span>♧ Waterproof</span>
        <span>▱ Lifetime Guarantee</span>
        <span>♡ Handcrafted</span>
      </div>

      <OptionGroup label="Metal" options={["Gold", "Silver", "Rose Gold"]} value={metal} setValue={setMetal} />
      <OptionGroup label="Length" options={['16"', '18"', '20"', '22"']} value={length} setValue={setLength} />
      <OptionGroup label="Number of Names / Stones" options={["1", "2", "3", "4", "5", "6"]} value={stones} setValue={setStones} />

      <div style={{ fontFamily:"Georgia, serif", fontSize:42, marginTop:24 }}>$89.00</div>

      <button style={{
        width:"100%",
        height:58,
        marginTop:12,
        borderRadius:6,
        border:"none",
        background:"linear-gradient(90deg,#111,#1b1b1b)",
        color:"#fff",
        fontSize:19,
        fontWeight:800,
        cursor:"pointer"
      }}>
        Add to Cart
      </button>

      <div style={{ display:"flex", gap:34, marginTop:18, color:"#555", fontWeight:700 }}>
        <span>▱ Free shipping over $75</span>
        <span>↻ 60-day returns</span>
      </div>
    </aside>
  );
}

function OptionGroup({ label, options, value, setValue }) {
  return (
    <div style={{ marginBottom:22 }}>
      <div style={{ marginBottom:10, color:"#333", fontSize:15 }}>{label}</div>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        {options.map((option) => (
          <button key={option} onClick={() => setValue(option)} style={{
            minWidth:label.includes("Number") ? 72 : 110,
            height:48,
            borderRadius:5,
            border:option === value ? `2px solid ${gold}` : "1px solid #ddd",
            background:"#fff",
            color:"#111",
            fontSize:15,
            cursor:"pointer"
          }}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function FourSidedReview() {
  const sides = [
    { title:"SIDE 1 (Front)", text:"Michael  Sophia  Emma  Daniel", front:true },
    { title:"SIDE 2 (Right)", text:"Always with you  ♥" },
    { title:"SIDE 3 (Back)", text:"Forever & Always" },
    { title:"SIDE 4 (Left)", text:"Love, Mom" }
  ];

  return (
    <section style={{ marginTop:32, borderRadius:12, background:"#fbf9f6", border:`1px solid ${border}`, padding:"22px 18px 18px" }}>
      <div style={{ display:"flex", gap:28, alignItems:"center", marginBottom:20 }}>
        <h2 style={{ fontFamily:"Georgia, serif", fontWeight:700, margin:0, fontSize:24 }}>
          ♢&nbsp;&nbsp;4-SIDED REVIEW
        </h2>
        <span style={{ color:"#777" }}>Review how your engraving will appear on each side of the necklace.</span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14 }}>
        {sides.map((side, idx) => (
          <div key={side.title} style={{
            background:"#fff",
            borderRadius:8,
            minHeight:145,
            padding:18,
            textAlign:"center",
            position:"relative",
            border:"1px solid #f1ece5"
          }}>
            <div style={{ fontWeight:800, marginBottom:22 }}>{side.title}</div>
            <BarPreview text={side.text} front={side.front} />
            {idx < 3 && <div style={{ position:"absolute", right:-25, top:"50%", transform:"translateY(-50%)", fontSize:44, color:"#888", zIndex:2 }}>↷</div>}
          </div>
        ))}
      </div>

      <div style={{ textAlign:"center", color:"#777", marginTop:16 }}>
        ⓘ &nbsp; Font shown is for preview only. Final engraving may vary slightly.
      </div>
    </section>
  );
}

function BarPreview({ text, front }) {
  return (
    <div style={{
      height:52,
      borderRadius:8,
      margin:"0 auto",
      maxWidth:290,
      background:"linear-gradient(180deg,#ffe19b,#d9962e)",
      border:"2px solid #a96b14",
      boxShadow:"0 8px 22px rgba(90,54,10,.18), inset 0 0 10px rgba(255,255,255,.55)",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      gap:16,
      fontFamily:"Georgia, serif",
      fontSize:front ? 13 : 23,
      color:"#3e2a0b"
    }}>
      {front ? (
        <>
          {["#1263ad", "#d63d78", "#3f9b2d", "#eee"].map((c, i) => (
            <span key={i} style={{ display:"grid", justifyItems:"center", gap:2 }}>
              <span style={{ width:13, height:13, borderRadius:"50%", background:c, border:"1px solid #6b4610" }} />
              <span>{["Michael", "Sophia", "Emma", "Daniel"][i]}</span>
            </span>
          ))}
        </>
      ) : text}
    </div>
  );
}

function TrustBar() {
  return (
    <section style={{
      marginTop:18,
      background:"#faf7f2",
      borderRadius:10,
      display:"grid",
      gridTemplateColumns:"repeat(3, 1fr)",
      padding:"24px 54px",
      gap:30
    }}>
      <TrustItem icon="♧" title="WATEDPROOF" text="Wear it every day. Shower, swim, sweat." />
      <TrustItem icon="▱" title="LIFETIME GUARANTEE" text="We've got you covered for life." />
      <TrustItem icon="♡" title="HANDCRAFTED WITH LOVE" text="Made for your moments. Made to last." />
    </section>
  );
}

function TrustItem({ icon, title, text }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"50px 1fr", gap:12, alignItems:"center" }}>
      <div style={{ fontSize:42 }}>{icon}</div>
      <div>
        <div style={{ fontWeight:900, marginBottom:6 }}>{title}</div>
        <div style={{ color:"#444", lineHeight:1.45 }}>{text}</div>
      </div>
    </div>
  );
}

function MiniNecklace() {
  return (
    <div style={{
      width:28,
      height:86,
      borderRadius:6,
      background:"linear-gradient(90deg,#d2a64a,#ffe6a8,#bb8b2e)",
      border:"1px solid #9d6816"
    }} />
  );
}
