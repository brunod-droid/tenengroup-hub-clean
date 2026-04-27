const data = [
  {
    "id": "dispatcher",
    "name": "Manager / Dispatcher Agent",
    "type": "AI Agent",
    "short": "Classifies case and routes to right specialist.",
    "full": [
      "Detects case type.",
      "Checks urgency, brand, event context and available info.",
      "Routes to Shipping, Factory, Refund, QA, VIP or CRM analysis agent."
    ]
  },
  {
    "id": "shipping",
    "name": "Shipping Agent",
    "type": "AI Agent",
    "short": "Handles WISMO, tracking, late, DNR, lost and carrier investigation.",
    "full": [
      "Checks OM, tracking, carrier and ETA.",
      "Identifies DNR, lost, label created, RTS or delay."
    ]
  },
  {
    "id": "factory",
    "name": "Factory Agent",
    "type": "AI Agent",
    "short": "Handles special requests, production delays and factory feasibility.",
    "full": [
      "Checks if special request is possible.",
      "Understands production location and time."
    ]
  },
  {
    "id": "refund",
    "name": "Refund / Compensation Agent",
    "type": "AI Agent",
    "short": "Applies refund, credit and compensation logic.",
    "full": [
      "Checks policy before refund.",
      "Verifies reorder, exchange or credit should come first."
    ]
  },
  {
    "id": "qa",
    "name": "QA / Item Received Agent",
    "type": "AI Agent",
    "short": "Handles damaged, wrong item, not satisfied and warranty cases.",
    "full": [
      "Requests pictures.",
      "Identifies damaged vs not satisfied vs production error."
    ]
  },
  {
    "id": "queue-analysis",
    "name": "Queue / Quality Analysis Agent",
    "type": "AI Agent",
    "short": "Analyzes queues, dispositions, tags and performance.",
    "full": [
      "Monitors queue volume and aging.",
      "Checks tag and disposition quality."
    ]
  }
];
export default data;
