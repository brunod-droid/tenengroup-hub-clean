import { useEffect, useState } from "react";

export default function SupplierInfo() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("/data/suppliers.json")
      .then(res => res.json())
      .then(data => setSuppliers(data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 900 }}>Supplier Info</h1>

      <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Transfer</th>
            <th>Master</th>
            <th>Active</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map((s, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td>{s.ID}</td>
              <td>{s.SupName}</td>
              <td>{s.EnableTransfer ? "✅" : "❌"}</td>
              <td>{s.Master ? "✅" : "❌"}</td>
              <td>{s.Active ? "🟢" : "🔴"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
