import Link from "next/link";
import { ReportingNav, pageStyle, cardStyle } from "../../lib/yr-reporting/components";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16
};

const tableWrap = {
  overflowX: "auto",
  marginTop: 16
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

const thStyle = {
  textAlign: "left",
  padding: 12,
  borderBottom: "1px solid #cbd5e1",
  color: "#475569"
};

const tdStyle = {
  padding: 12,
  borderBottom: "1px solid #e5e7eb",
  verticalAlign: "top"
};

function Section({ children }) {
  return <section style={{ ...cardStyle, marginTop: 18 }}>{children}</section>;
}

function InfoBox({ children, type = "note" }) {
  const bg = type === "warning" ? "#fff7ed" : "#f0fdf4";
  const border = type === "warning" ? "#fed7aa" : "#bbf7d0";
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: 14, marginTop: 16, color: "#334155", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

function Code({ children }) {
  return (
    <pre style={{ background: "#0f172a", color: "#e5e7eb", borderRadius: 14, padding: 16, overflowX: "auto" }}>
      {children}
    </pre>
  );
}

export default function YvesRocherReportingData() {
  return (
    <main style={pageStyle}>
      <ReportingNav />

      <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-start", marginBottom: 18 }}>
        <div>
          <p style={{ color: "#15803d", fontWeight: 900, margin: 0 }}>Yves Rocher Reporting</p>
          <h1 style={{ fontSize: 42, margin: "6px 0" }}>Data — How to get Customer Service Data</h1>
          <p style={{ color: "#475569", lineHeight: 1.7, maxWidth: 980 }}>
            This page explains how to extract all required weekly data for the Yves Rocher Customer Service reports.
            Reporting weeks run from Sunday to Saturday.
          </p>
        </div>
        <Link href="/yves-rocher-reporting" style={{ background: "#0f172a", color: "#fff", padding: "12px 16px", borderRadius: 12, textDecoration: "none", fontWeight: 900 }}>
          Back to Reporting
        </Link>
      </div>

      <Section>
        <h2>Weekly data checklist</h2>
        <div style={gridStyle}>
          <div><h3>Gorgias</h3><ul><li>ticket-volume</li><li>workload</li><li>customer-experience</li><li>agents-metrics</li><li>channels-metrics</li><li>tickets raw export with Tags</li></ul></div>
          <div><h3>Shopify</h3><ul><li>orders export</li><li>only paid orders must be counted</li><li>use Paid at as the validation field</li></ul></div>
          <div><h3>Finance</h3><ul><li>agents cost</li><li>tools cost</li><li>BPO / outsourcing cost</li><li>social media CS cost if applicable</li></ul></div>
          <div><h3>Social / Trustpilot</h3><ul><li>social volume</li><li>average response time if available</li><li>Trustpilot review volume</li><li>Trustpilot average rating</li></ul></div>
        </div>
      </Section>

      <Section>
        <h2>1. Gorgias data</h2>
        <p>Gorgias is used to measure ticket volume, workload, performance, customer satisfaction, agents, channels, and contact drivers through the Tags column.</p>

        <div style={tableWrap}>
          <table style={tableStyle}>
            <thead><tr><th style={thStyle}>File</th><th style={thStyle}>Where to find it</th><th style={thStyle}>Usage</th></tr></thead>
            <tbody>
              {[
                ["ticket-volume", "Gorgias → Statistics → Support Performance → Overview", "Created tickets, replied tickets, closed tickets, ticket volume trends."],
                ["workload", "Gorgias → Statistics → Support Performance → Workload", "Open tickets, backlog, created tickets, closed tickets."],
                ["customer-experience", "Gorgias → Statistics → Customer Experience", "CSAT, first response time, resolution time."],
                ["agents-metrics", "Gorgias → Statistics → Support Performance → Agents", "Agent productivity and performance."],
                ["channels-metrics", "Gorgias → Statistics → Support Performance → Channels", "Volume and performance by channel."],
                ["tickets raw export", "Gorgias → Tickets → filter week → Export", "Ticket-level data, Tags, drivers, assignee, initial channel, CSAT by ticket."]
              ].map(([file, where, usage]) => <tr key={file}><td style={tdStyle}><b>{file}</b></td><td style={tdStyle}>{where}</td><td style={tdStyle}>{usage}</td></tr>)}
            </tbody>
          </table>
        </div>

        <InfoBox><strong>Important:</strong> the tickets raw export is required for contact drivers. It must include the <strong> Tags</strong> column.</InfoBox>

        <h3>Required fields in the tickets raw export</h3>
        <ul><li>Ticket id</li><li>Creation date / Created at</li><li>Closed date / Closed at</li><li>Tags</li><li>Initial channel</li><li>Assignee name</li><li>Survey score / CSAT score, when available</li></ul>
      </Section>

      <Section>
        <h2>2. Shopify orders data</h2>
        <p>Shopify is used to calculate orders volume, tickets per order, and cost per order.</p>
        <h3>Where to export</h3>
        <p>Go to Shopify → Orders → Export.</p>
        <h3>Required columns</h3>
        <ul><li>Name — order number / order ID</li><li>Created at — order creation date</li><li>Total — order amount</li><li>Paid at — payment validation date</li></ul>
        <InfoBox type="warning"><strong>Critical rule:</strong> only orders with a non-empty <strong>Paid at</strong> value must be counted. Unpaid orders, pending payment orders, and cancelled-before-payment orders must be excluded.</InfoBox>
        <h3>KPI logic</h3>
        <Code>{`paidOrders = orders.filter(order => order["Paid at"] && order["Paid at"].trim() !== "")
ordersCount = paidOrders.length
ticketsPerOrder = ticketsCount / ordersCount`}</Code>
      </Section>

      <Section>
        <h2>3. Finance data</h2>
        <p>Finance data is used to calculate customer service cost per ticket and cost per order.</p>
        <h3>Costs to include</h3>
        <ul><li>Internal agents cost</li><li>BPO or outsourcing cost</li><li>Gorgias and other CS tools</li><li>Aircall or phone tools, if used by CS</li><li>Social media team cost, if handled by CS</li></ul>

        <h3>Recommended file format</h3>
        <div style={tableWrap}>
          <table style={tableStyle}>
            <thead><tr><th style={thStyle}>Date</th><th style={thStyle}>Cost Type</th><th style={thStyle}>Amount</th></tr></thead>
            <tbody>
              <tr><td style={tdStyle}>2026-04-19</td><td style={tdStyle}>Agents</td><td style={tdStyle}>25000</td></tr>
              <tr><td style={tdStyle}>2026-04-19</td><td style={tdStyle}>Gorgias</td><td style={tdStyle}>2000</td></tr>
              <tr><td style={tdStyle}>2026-04-19</td><td style={tdStyle}>BPO</td><td style={tdStyle}>10000</td></tr>
            </tbody>
          </table>
        </div>

        <h3>KPI logic</h3>
        <Code>{`totalCost = sum(finance.Amount)
costPerTicket = totalCost / ticketsCount
costPerOrder = totalCost / paidOrdersCount`}</Code>
      </Section>

      <Section>
        <h2>4. Social media and Trustpilot</h2>
        <p>Social and review data gives visibility on workload outside Gorgias tickets.</p>

        <h3>Recommended file or manual format</h3>
        <div style={tableWrap}>
          <table style={tableStyle}>
            <thead><tr><th style={thStyle}>Date</th><th style={thStyle}>Channel</th><th style={thStyle}>Volume</th><th style={thStyle}>Avg Response Time</th><th style={thStyle}>Rating</th></tr></thead>
            <tbody>
              <tr><td style={tdStyle}>2026-04-19</td><td style={tdStyle}>Instagram</td><td style={tdStyle}>120</td><td style={tdStyle}>45 min</td><td style={tdStyle}>-</td></tr>
              <tr><td style={tdStyle}>2026-04-19</td><td style={tdStyle}>Trustpilot</td><td style={tdStyle}>30</td><td style={tdStyle}>-</td><td style={tdStyle}>4.3</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <h2>Final reporting output</h2>
        <p>When all files are uploaded, the reporting module should calculate:</p>
        <ul>
          <li>Tickets created</li><li>Tickets closed</li><li>Backlog</li><li>CSAT</li><li>First response time</li><li>Resolution time</li><li>Paid orders</li><li>Tickets per order</li><li>Cost per ticket</li><li>Cost per order</li><li>Top contact drivers from Tags</li><li>Top agents</li><li>Top channels</li><li>Social volume</li><li>Trustpilot rating</li>
        </ul>
      </Section>
    </main>
  );
}
