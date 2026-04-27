const data = [
  {
    "id": "mday",
    "name": "Mother's Day 2026",
    "type": "Event",
    "short": "Main event playbook for jewelry and Lime & Lou.",
    "intro": "Peak event to monitor delivery promises, stop risky automated replies, use proactive communication and protect customer experience.",
    "sections": [
      {
        "title": "Core concepts",
        "items": [
          "Green Event = last day to order on time.",
          "Red Event = last day to ship on time.",
          "Last Day of Delivery = shipped orders still at risk.",
          "ETA-1 = proactive delay monitoring before ETA."
        ]
      },
      {
        "title": "Jewelry Red Event logic",
        "items": [
          "At 7:00 AM IL time on relevant Red Event dates, Notch stops answering relevant non-shipped WISMO cases.",
          "Messages move to On Hold for manual review.",
          "Orders missing final shipment window can be tagged Late Red Event MDAY2026.",
          "Proactive communication is sent to set expectations."
        ]
      },
      {
        "title": "Last Chance",
        "items": [
          "One-day extra attempt when factory and shipping teams agree.",
          "Orders stay On Hold one more day.",
          "If not shipped, standard Red Event proactive late logic applies."
        ]
      },
      {
        "title": "MBL / Last Day of Delivery",
        "items": [
          "MBL means May Be Late.",
          "Used for shipped orders still at risk.",
          "Customers receive proactive communication when needed."
        ]
      },
      {
        "title": "Thought Guaranteed",
        "items": [
          "Customer believed delivery was guaranteed.",
          "Causes: wrong shipping chosen, misunderstanding, cart bug, promise mismatch.",
          "Check fastest shipping and upgrade possibilities."
        ]
      },
      {
        "title": "Lime & Lou specifics",
        "items": [
          "Same Green / Red / MBL backbone can apply.",
          "Production speed is fixed and cannot simply be solved with faster shipping.",
          "Use production facility, warehouse or factory wording, not supplier."
        ]
      }
    ],
    "wording": "I am very sorry that your order may not arrive in time for Mother’s Day. We are monitoring it closely and want to be fully transparent about the current delivery outlook.",
    "documents": [
      {
        "label": "Open full Mother’s Day event policy",
        "url": "/docs/event-prompt-md2026.docx"
      }
    ]
  },
  {
    "id": "vday",
    "name": "Valentine's Day 2026",
    "type": "Event",
    "short": "Same event backbone with strong expectation management.",
    "intro": "Follows Green / Red / MBL event structure, with special attention to expectations and gift timing.",
    "sections": [
      {
        "title": "Main structure",
        "items": [
          "Green Event",
          "Red Event",
          "On Hold routing",
          "Late Red Event tags",
          "MBL handling"
        ]
      }
    ],
    "wording": "I understand how important timing is for this occasion. I reviewed the status and here is the most accurate update.",
    "documents": [
      {
        "label": "Open full Valentine’s Day event policy",
        "url": "/docs/event-prompt-vd2026.docx"
      }
    ]
  },
  {
    "id": "xmas",
    "name": "Christmas 2025",
    "type": "Event",
    "short": "Holiday event flow with fallback alternatives.",
    "intro": "Uses event backbone plus holiday-specific fallback logic such as Last Minute Pack.",
    "sections": [
      {
        "title": "Main structure",
        "items": [
          "Red Event",
          "MBL handling",
          "ETA-1 logic",
          "Last Minute Pack fallback"
        ]
      },
      {
        "title": "Last Minute Pack",
        "items": [
          "Stock item can be sent immediately to arrive on time.",
          "Personalized item is produced and delivered after Christmas."
        ]
      }
    ],
    "wording": "We are checking the best available option for your order and will guide you toward the fastest or most suitable solution.",
    "documents": [
      {
        "label": "Open full Christmas event policy",
        "url": "/docs/event-prompt-xmas2025.docx"
      }
    ]
  }
];
export default data;
