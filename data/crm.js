const data = [
  {
    "id": "kustomer",
    "name": "Kustomer",
    "type": "CRM",
    "short": "Main CRM for Tenengroup conversations and case handling.",
    "full": [
      "Main CRM for customer conversations.",
      "Handles queues, tags, categories and dispositions."
    ]
  },
  {
    "id": "categories",
    "name": "Categories",
    "type": "CRM",
    "short": "System-filled classification from source or webform.",
    "full": [
      "Auto-filled by system.",
      "Based on webform or source.",
      "Supports routing and reporting."
    ]
  },
  {
    "id": "dispositions",
    "name": "Dispositions",
    "type": "CRM",
    "short": "Manual case typing by agent.",
    "full": [
      "Selected manually by agents.",
      "Define real business case more precisely than categories.",
      "Central for reporting and quality analysis."
    ]
  },
  {
    "id": "tags",
    "name": "Tags",
    "type": "CRM",
    "short": "Operational labels with multiple levels of importance.",
    "full": [
      "Tags beginning with Z are archived.",
      "Can be manual, automatic, event-driven or AI-driven.",
      "Should map to actions, owners and Notch behavior.",
      "Examples: AI reply, auto change address, auto change inscription, auto free gift, admin testing, Late Red Event, Last Chance, MBL."
    ]
  },
  {
    "id": "queues",
    "name": "Queues",
    "type": "CRM",
    "short": "Routing by site or team ownership.",
    "full": [
      "Can represent site or team ownership.",
      "On Hold queues are critical during events.",
      "Support workload distribution and escalation."
    ]
  },
  {
    "id": "notch",
    "name": "Notch",
    "type": "CRM",
    "short": "Current automation and AI layer for Tenengroup.",
    "full": [
      "Handles part of automated flow.",
      "Can answer simple cases.",
      "Paused or redirected during complex event scenarios such as Red Event and MBL."
    ]
  }
];
export default data;
