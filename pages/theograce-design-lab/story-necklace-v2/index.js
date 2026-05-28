export default function StoryNecklaceV2() {
  return (
    <div style={{
      minHeight:"100vh",
      background:"#f8f4ee",
      padding:40,
      fontFamily:"Arial"
    }}>
      <div style={{
        maxWidth:1400,
        margin:"0 auto"
      }}>
        <button
          onClick={() => {
            window.location.href = "/theograce-design-lab";
          }}
          style={{
            border:"1px solid #e7dccd",
            background:"#fff",
            borderRadius:999,
            padding:"10px 14px",
            fontWeight:900,
            cursor:"pointer",
            marginBottom:20
          }}
        >
          Back to Design Lab
        </button>

        <div style={{
          display:"grid",
          gridTemplateColumns:"1.1fr .9fr",
          gap:28
        }}>
          <div style={{
            background:"linear-gradient(135deg,#fff 0%,#f2e6d2 100%)",
            borderRadius:32,
            padding:40,
            minHeight:760,
            position:"relative",
            border:"1px solid #eadfce"
          }}>
            <div style={{
              position:"absolute",
              top:70,
              left:"50%",
              transform:"translateX(-50%)",
              width:240,
              height:240,
              borderRadius:"50%",
              border:"4px solid rgba(193,149,69,.25)"
            }} />

            <div style={{
              position:"absolute",
              top:220,
              left:"50%",
              transform:"translateX(-50%)",
              width:96,
              height:380,
              borderRadius:24,
              background:"linear-gradient(90deg,#d2a64a 0%,#f8e6a7 50%,#bb8b2e 100%)",
              boxShadow:"0 24px 70px rgba(0,0,0,.18)"
            }}>
              <div style={{
                writingMode:"vertical-rl",
                transform:"rotate(180deg)",
                height:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                fontWeight:900,
                color:"#5d4718",
                letterSpacing:1.2,
                fontSize:18
              }}>
                MICHAEL • SOPHIA • EMMA • DANIEL
              </div>
            </div>
          </div>

          <div style={{
            background:"#fff",
            borderRadius:32,
            padding:34,
            border:"1px solid #eadfce"
          }}>
            <div style={{
              display:"inline-flex",
              background:"#f6eddf",
              color:"#8a5d1d",
              padding:"8px 12px",
              borderRadius:999,
              fontWeight:900,
              fontSize:12
            }}>
              BEST SELLER
            </div>

            <h1 style={{
              fontSize:58,
              lineHeight:.95,
              margin:"16px 0"
            }}>
              Vertical Bar Necklace
            </h1>

            <div style={{
              display:"flex",
              gap:10,
              alignItems:"center",
              fontWeight:700,
              marginBottom:20
            }}>
              <div style={{ color:"#d29b2d", fontSize:22 }}>★★★★★</div>
              <div>4.8 (1,532 reviews)</div>
            </div>

            <p style={{
              color:"#5d5d5d",
              lineHeight:1.7,
              fontSize:18
            }}>
              A timeless piece with room for what matters most.
            </p>

            <div style={{
              display:"flex",
              gap:14,
              margin:"26px 0",
              color:"#4f4f4f",
              fontWeight:700,
              flexWrap:"wrap"
            }}>
              <div>Waterproof</div>
              <div>Lifetime Guarantee</div>
              <div>Handcrafted with Love</div>
            </div>

            <div style={{
              fontSize:56,
              marginTop:34,
              fontWeight:300
            }}>
              $89.00
            </div>

            <button style={{
              width:"100%",
              marginTop:26,
              border:"none",
              borderRadius:18,
              background:"#111827",
              color:"#fff",
              padding:"22px",
              fontSize:24,
              fontWeight:900,
              cursor:"pointer"
            }}>
              ADD TO CART
            </button>
          </div>
        </div>

        <div style={{
          marginTop:34,
          background:"#fff",
          borderRadius:34,
          border:"1px solid #eadfce",
          padding:30
        }}>
          <div style={{
            fontWeight:900,
            fontSize:34,
            marginBottom:24
          }}>
            4-SIDED REVIEW
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(4,1fr)",
            gap:18
          }}>
            {[
              "MICHAEL • SOPHIA • EMMA • DANIEL",
              "Always with you ♥",
              "Forever & Always",
              "Love, Mom"
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  background:"#faf7f2",
                  border:"1px solid #eee5da",
                  borderRadius:24,
                  padding:24,
                  minHeight:280
                }}
              >
                <div style={{
                  display:"flex",
                  justifyContent:"center"
                }}>
                  <div style={{
                    width:74,
                    height:180,
                    borderRadius:18,
                    background:"linear-gradient(90deg,#d2a64a 0%,#f8e6a7 50%,#bb8b2e 100%)",
                    boxShadow:"0 12px 30px rgba(0,0,0,.14)",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    padding:14
                  }}>
                    <div style={{
                      writingMode:"vertical-rl",
                      transform:"rotate(180deg)",
                      textAlign:"center",
                      fontWeight:900,
                      color:"#5d4718",
                      lineHeight:1.5
                    }}>
                      {text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
