import { useState } from "react";

const menu = ["Home","Brands","Policies","Events","CRM","Q&A"];

export default function Home() {
  const [page, setPage] = useState("Home");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>

      {/* SIDEBAR */}
      <div style={{ width: 240, background: "#111", color: "#fff", padding: 20 }}>
        <h2>Tenengroup</h2>
        <p style={{ fontSize: 12, opacity: 0.7 }}>Customer Care Hub</p>

        {menu.map((item) => (
          <div
            key={item}
            onClick={() => setPage(item)}
            style={{
              marginTop: 15,
              padding: 10,
              cursor: "pointer",
              background: page === item ? "#333" : "transparent",
              borderRadius: 6
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 30 }}>

        {page === "Home" && (
          <>
            <h1>Tenengroup Customer Care Hub</h1>
            <p>This is your internal customer care reference.</p>
          </>
        )}

        {page === "Brands" && (
          <>
            <h1>Brands</h1>

            <h3>Theo Grace</h3>
            <p>Nicky Hilton co-owned brand. Elegant personalized products.</p>

            <h3>Oak & Luna</h3>
            <p>Modern and fashion jewelry.</p>

            <h3>MYKA</h3>
            <p>European version without Nicky Hilton.</p>

            <h3>Lime & Lou</h3>
            <p>Personalized home products.</p>

            <h3>Israel Blessing</h3>
            <p>Jewish identity products.</p>
          </>
        )}

        {page === "Policies" && (
          <>
            <h1>Policies</h1>

            <h2>WISMO</h2>
            <ul>
              <li>Under 3 days late → apology + ETA</li>
              <li>Over 3 days → compensation possible</li>
              <li>DNR → wait 3 days then act</li>
            </ul>

            <h2>Damaged</h2>
            <ul>
              <li>2 year warranty</li>
              <li>Ask for picture</li>
              <li>Reorder first</li>
            </ul>

            <h2>Not Satisfied</h2>
            <ul>
              <li>Exchange first</li>
              <li>Store credit</li>
              <li>No refund personalized</li>
            </ul>
          </>
        )}

        {page === "Events" && (
          <>
            <h1>Mother's Day 2026</h1>

            <h2>Core Logic</h2>
            <ul>
              <li>Green Event = last day to order</li>
              <li>Red Event = last day to ship</li>
              <li>MBL = risk of late delivery</li>
            </ul>

            <h2>Operations</h2>
            <ul>
              <li>Notch stops answering → orders go On Hold</li>
              <li>Orders tagged Late Red Event</li>
              <li>Proactive message sent to customer</li>
              <li>Queue reviewed manually</li>
            </ul>

            <h2>Last Chance</h2>
            <ul>
              <li>Orders may stay 1 more day</li>
              <li>If shipped → OK</li>
              <li>If not → late process</li>
            </ul>

            <h2>MBL (Last Delivery Day)</h2>
            <ul>
              <li>Orders at risk tagged</li>
              <li>Proactive message sent</li>
            </ul>
          </>
        )}

        {page === "CRM" && (
          <>
            <h1>CRM</h1>

            <ul>
              <li>Kustomer = main CRM</li>
              <li>Categories = auto</li>
              <li>Dispositions = manual</li>
              <li>Tags = operational</li>
              <li>Z tags = archived</li>
              <li>Notch = AI layer</li>
            </ul>
          </>
        )}

        {page === "Q&A" && (
          <>
            <h1>Q&A</h1>

            <p><b>Order late 2 days?</b><br/>Apology + ETA</p>

            <p><b>Damaged?</b><br/>Ask for picture + reorder</p>

            <p><b>DNR?</b><br/>Wait 3 days then act</p>

            <p><b>Not satisfied?</b><br/>Exchange or credit</p>
          </>
        )}

      </div>
    </div>
  );
}
