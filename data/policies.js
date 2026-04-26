export const POLICIES = [
  {
    id: 'wismo',
    name: 'Late / WISMO',
    short: 'Delay, tracking, DNR, lost parcel and shipping issue handling.',
    full: [
      'Always check ETA before saying the order is late.',
      'If today is still before ETA, the order is not late.',
      'Under 3 business days late: apologize and provide updated ETA.',
      'Over 3 business days late: compensation may apply depending on scenario.',
      'Always check whether it is Late Supplier before using regular late flow.',
      'For DNR, if less than 3 business days since delivery scan, ask the customer to wait.',
      'After the waiting period, reorder or refund may be considered depending on policy.',
      'Always check carrier tracking before replying.'
    ],
    wording: "I'm really sorry for the delay. I've checked your order and here is the latest update: [ETA]. We are closely monitoring it for you."
  },
  {
    id: 'late-supplier',
    name: 'Late Supplier',
    short: 'Production delay before shipment.',
    full: [
      'Late Supplier means the order is delayed before shipment due to production or supplier issue.',
      'Do not automatically treat it as a regular delivery delay.',
      'Check whether proactive communication was already sent.',
      'Check whether supply, factory or production team already gave an update.',
      'If no clear internal update exists, escalate before giving a strong promise.'
    ],
    wording: 'Your order is currently experiencing a production delay. Our team is already working on it and we will keep you updated as soon as we have a confirmed shipping timeline.'
  },
  {
    id: 'damaged',
    name: 'Damaged',
    short: 'Defective, broken or damaged product.',
    full: ['Ask for a picture if none was provided.', 'Confirm whether this is damaged, wrong item or Not Satisfied.', 'Reorder is the preferred first solution.', 'Refund is not the first option.', 'Warranty applies from ETA according to policy.', 'Premium or repeat cases may require stricter handling.'],
    wording: "I'm really sorry about this. Could you please share a picture so I can resolve this for you right away? We will prioritize sending you a replacement."
  },
  {
    id: 'not-satisfied',
    name: 'Not Satisfied',
    short: 'Customer does not like a correctly produced item.',
    full: ['First confirm the case is not actually damaged or production error.', 'Exchange first.', 'Store credit second.', 'No refund for personalized items under Not Satisfied policy.', 'Timing windows may differ by brand.', 'Ask for enough context to understand why the customer is dissatisfied.'],
    wording: "I understand this is not exactly what you expected. We'd be happy to offer you an exchange or store credit so you can choose something you truly love."
  },
  {
    id: 'resizing',
    name: 'Resizing',
    short: 'Size and fit-related issue.',
    full: ['Resizing is not a Not Satisfied case.', 'Ring resizing is usually free within the valid window.', 'Chains and bracelets follow separate rules.', 'Confirm the requested size before acting.', 'Check whether a return is required before replacement or adjustment.'],
    wording: 'We can definitely help with resizing. Let me guide you through the available options based on your item.'
  },
  {
    id: 'change-order',
    name: 'Change Order',
    short: 'Customer wants to change an existing order.',
    full: ['Check order status before promising a change.', 'If order is already in production or shipped, change may not be possible.', 'Possible changes: inscription, material, product, address, shipping method.', 'If special request is outside standard options, factory validation may be needed.'],
    wording: "I'll check whether your order can still be updated. Because personalized items move quickly into production, changes are only possible before a certain stage."
  }
];
