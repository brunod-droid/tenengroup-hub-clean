function Gpt({ s, setModalImage }) {
  return (
    <>
      <div style={styles.twoCols}>
        <div>
          <Bullets s={s} />

          {s.image && (
            <div
              onClick={() => setModalImage(s.image)}
              style={{
                marginTop: 20,
                cursor: "pointer",
              }}
            >
              <img
                src={s.image}
                alt="Guidelines"
                style={{
                  width: "100%",
                  borderRadius: 20,
                  border: "3px solid #67e8f9",
                  maxHeight: 260,
                  objectFit: "cover",
                }}
              />

              <p
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: "#67e8f9",
                  fontWeight: 900,
                }}
              >
                Click to open full Guidelines
              </p>
            </div>
          )}
        </div>

        <div style={styles.highlight}>
          <div style={styles.kickerDark}>
            Operational expertise
          </div>

          <p style={styles.bigText}>
            {s.text}
          </p>

          <div
            style={{
              marginTop: 24,
              background: "rgba(255,255,255,.25)",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              “AI is not magic.
              <br />
              It follows business logic.”
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
