const data = [
  {
    "id": "wismo",
    "name": "Late / WISMO",
    "type": "Policy",
    "short": "Delay, tracking, DNR, lost parcel and shipping issue handling.",
    "full": [
      "Always check ETA before saying late.",
      "Under 3 business days late: apologize and provide ETA.",
      "Over 3 business days late: compensation may apply.",
      "Check Late Supplier before regular late flow.",
      "DNR: wait 3 business days after delivery scan before acting."
    ],
    "wording": "I am sorry for the delay. I checked your order and here is the latest update: [ETA]. We are closely monitoring it for you.",
    "documents": [
      {
        "label": "Open full Shipping & WISMO policy",
        "url": "/docs/policy-shipping-wismo.docx"
      }
    ]
  },
  {
    "id": "late-supplier",
    "name": "Late Supplier",
    "type": "Policy",
    "short": "Production delay before shipment.",
    "full": [
      "Production/supplier delay before shipment.",
      "Do not treat automatically as regular delivery delay.",
      "Check proactive communication and factory/supply update."
    ],
    "wording": "Your order is experiencing a production delay. Our team is working on it and we will update you once we have a confirmed shipping timeline."
  },
  {
    "id": "damaged",
    "name": "Damaged",
    "type": "Policy",
    "short": "Defective, broken or damaged product.",
    "full": [
      "Ask for picture.",
      "Confirm damaged vs wrong item vs Not Satisfied.",
      "Reorder is first solution.",
      "Refund is not first option."
    ],
    "wording": "I am sorry about this. Please share a picture so I can resolve this right away. We will prioritize sending a replacement.",
    "documents": [
      {
        "label": "Open full Damaged policy",
        "url": "/docs/policy-damaged.docx"
      }
    ]
  },
  {
    "id": "not-satisfied",
    "name": "Not Satisfied",
    "type": "Policy",
    "short": "Customer does not like a correctly produced item.",
    "full": [
      "Confirm not damaged or production error.",
      "Exchange first.",
      "Store credit second.",
      "No refund for personalized items."
    ],
    "wording": "I understand this is not exactly what you expected. We can offer an exchange or store credit so you can choose something you love.",
    "documents": [
      {
        "label": "Open full Not Satisfied policy",
        "url": "/docs/policy-not-satisfied.docx"
      }
    ]
  },
  {
    "id": "resizing",
    "name": "Resizing",
    "type": "Policy",
    "short": "Size and fit-related issue.",
    "full": [
      "Not a Not Satisfied case.",
      "Ring resizing usually free within valid window.",
      "Chains and bracelets follow separate rules."
    ],
    "wording": "We can help with resizing. Let me guide you through the available options based on your item.",
    "documents": [
      {
        "label": "Open full Resizing policy",
        "url": "/docs/policy-resizing.docx"
      }
    ]
  }
];
export default data;
