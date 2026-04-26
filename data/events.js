export const EVENTS = [
  {
    id: 'mday',
    name: "Mother's Day 2026",
    short: 'Main event playbook for jewelry and Lime & Lou.',
    intro: "Mother's Day is a peak event. The goal is to monitor delivery promises, stop risky automated replies, use proactive communication, and protect customer experience.",
    sections: [
      { title: 'Core concepts', items: ['Green Event = last day to order on time.', 'Red Event = last day to ship on time.', 'Last Day of Delivery = shipped orders still at risk.', 'ETA-1 = proactive delay monitoring before ETA.'] },
      { title: 'Jewelry Red Event logic', items: ['At 7:00 AM IL time on relevant Red Event dates, Notch stops answering relevant non-shipped WISMO cases.', 'Messages move to On Hold for manual review.', 'Orders missing the final shipment window can be tagged Late Red Event MDAY2026.', 'Proactive communication is sent to set expectations.', 'Messages are later closed as duplicates or released back to normal flow.'] },
      { title: 'Last Chance', items: ['Last Chance means a one-day extra attempt when factory and shipping teams agree.', 'Orders stay On Hold for one more day.', 'If shipped next day, message can say it might still arrive on time.', 'If not shipped, standard Red Event proactive late logic applies.'] },
      { title: 'MBL / Last Day of Delivery', items: ['MBL means May Be Late.', 'Used for shipped orders still at risk of missing the event.', 'Shipping team may provide a risk list.', 'Customers receive proactive communication when needed.'] },
      { title: 'Thought Guaranteed', items: ['Customer believed delivery was guaranteed.', 'Possible causes: wrong shipping chosen, misunderstanding, cart bug, or promise mismatch.', 'Check whether the fastest shipping was selected.', 'If slower shipping was chosen and Green Event still exists, upgrade may help.', 'If cart promised on-time but OM shows later ETA, route for manual review.'] },
      { title: 'Lime & Lou specifics', items: ['Same Green / Red / MBL backbone can apply.', 'Production speed is fixed and cannot simply be solved with faster shipping.', 'Use wording like production facility, warehouse or factory, not supplier.'] },
      { title: 'Agent actions', items: ['Check Green vs Red timing.', 'Check if proactive message already sent.', 'Check if order is Last Chance, MBL or Thought Guaranteed.', 'Use correct queue and event tags.', 'Avoid promising delivery if Red Event was missed.'] }
    ],
    wording: "I'm very sorry that your order may not arrive in time for Mother's Day. We are monitoring it closely and want to be fully transparent about the current delivery outlook."
  },
  {
    id: 'vday',
    name: "Valentine's Day 2026",
    short: 'Same event backbone with strong expectation management.',
    intro: "Valentine's Day follows the same Green / Red / MBL event structure, with special attention to expectations and gift timing.",
    sections: [
      { title: 'Main structure', items: ['Green Event', 'Red Event', 'On Hold routing', 'Late Red Event tags', 'MBL handling'] },
      { title: 'Decision points', items: ['Was the customer promised on-time delivery?', 'Is the order before or after Red Event?', 'Does a shipping upgrade still help?', 'Should proactive communication be sent?'] }
    ],
    wording: "I completely understand how important timing is for this occasion. I've reviewed the current status and here is the most accurate update we can share with you right now."
  },
  {
    id: 'xmas',
    name: 'Christmas 2025',
    short: 'Holiday event flow with fallback alternatives.',
    intro: 'Christmas uses the event backbone plus holiday-specific fallback logic such as Last Minute Pack.',
    sections: [
      { title: 'Main structure', items: ['Red Event', 'MBL handling', 'ETA-1 logic', 'Last Minute Pack fallback'] },
      { title: 'Last Minute Pack', items: ['A stock item can be sent immediately to arrive on time.', 'A personalized item is produced and delivered after Christmas.', 'This is used when the standard on-time promise can no longer be maintained.'] }
    ],
    wording: "I'm sorry for the inconvenience. We're checking the best available option for your order and will guide you toward the fastest or most suitable solution."
  }
];
