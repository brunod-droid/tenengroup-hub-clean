const qaTeam = [
  {
    id: "qa-role",
    name: "QA Team Role",
    type: "QA Team",
    short: "Handles item received, quality checks and escalations.",
    full: [
      "Handles damaged, wrong item, production errors and warranty cases.",
      "Validates if issue is damaged vs Not Satisfied vs production error.",
      "Supports complex and unclear cases.",
      "Recommends reorder, exchange, credit or escalation."
    ]
  },
  {
    id: "qa-escalation",
    name: "When to escalate to QA",
    type: "QA Team",
    short: "Escalation rules",
    full: [
      "Unclear pictures or unclear issue",
      "Repeated complaints on same product",
      "Premium or sensitive cases",
      "Potential factory issue"
    ]
  }
];

export default qaTeam;
