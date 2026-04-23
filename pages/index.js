import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1>Tenengroup Customer Care Hub</h1>

      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("policies")}>Policies</button>
        <button onClick={() => setPage("qa")}>Q&A</button>
      </div>

      {page === "home" && (
        <div>
          <h2>Welcome</h2>
          <p>This is your internal customer care hub.</p>
        </div>
      )}

      {page === "policies" && (
        <div>
          <h2>Policies</h2>
          <ul>
            <li>Late under 3 business days: apology + updated ETA</li>
            <li>Late over 3 business days: compensation may apply</li>
            <li>Damaged: ask for picture + reorder first</li>
            <li>Not satisfied: exchange or store credit</li>
          </ul>
        </div>
      )}

      {page === "qa" && (
        <div>
          <h2>Quick Q&A</h2>
          <p><strong>Order late by 2 days?</strong> Apologize and provide ETA.</p>
          <p><strong>Damaged item?</strong> Ask for picture and offer reorder.</p>
          <p><strong>DNR?</strong> Wait 3 business days, then act.</p>
        </div>
      )}
    </div>
  );
}
