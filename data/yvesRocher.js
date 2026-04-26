export const YVES_ROCHER = [
  {
    id: 'brand-overview',
    title: 'Brand overview',
    short: 'French botanical beauty brand in the U.S. market.',
    full: [
      'Official U.S. site: yvesrocherusa.com.',
      'French cosmetics brand specializing in plant-based beauty products.',
      'Main product categories: skincare, haircare, body care and fragrance.',
      'Key customer motivations: botanical ingredients, eco-conscious positioning and accessible beauty.'
    ]
  },
  {
    id: 'shopify',
    title: 'Shopify operations',
    short: 'Search orders and understand operational tags.',
    full: [
      'Search by order ID, customer name or email.',
      'Order ID format example: #1870.',
      'Shopify tags explain why the order was returned, what needs refunding and whether refund is partial, full or shipping-only.',
      'Order history shows tracking link, order status, address, customer name and other key information.'
    ]
  },
  {
    id: 'gorgias',
    title: 'Gorgias operations',
    short: 'Yves Rocher ticket system with folders, notes, close and snooze.',
    full: [
      'Find tickets in folders such as social, chat and tasks.',
      'Use internal notes for internal communication.',
      'Close conversation when resolved.',
      'Snooze ticket when follow-up is needed later.',
      'Use the timeline to find other conversations and number of orders for the customer.',
      'Notifications show mentions and internal follow-ups.',
      'Notch appears as Taylor in this workflow.'
    ]
  },
  {
    id: 'subscriptions',
    title: 'Subscribe & Save / Ordergroove',
    short: 'Auto-replenishment subscription logic.',
    full: [
      'Subscribe & Save means products ship automatically on a regular schedule.',
      'Customers manage subscriptions from My Account > My Subscriptions.',
      'Before each shipment, an email reminder is sent with a cancellation link.',
      'Shipping rules are the same as regular orders: free over $89, $11.95 under $89.',
      'First subscription order return follows regular return policy and is free.',
      'Recurring subscription returns have a $7 return fee deducted; tag RETURN REFUND -7$.',
      'Subscriptions are cancelled in Ordergroove, not directly in Shopify.'
    ]
  },
  {
    id: 'coupons-loyalty',
    title: 'Coupons and loyalty',
    short: 'Coupon creation and Beauty Circle loyalty rules.',
    full: [
      'Check daily promotions before starting work by adding items to cart.',
      'If promotions, subscriptions or coupons do not work, inform achiad.h@yvesrocher.us.',
      'For a coupon instead of return: create Shopify discount code return-[customer name].',
      'Coupon should be fixed amount equal to the paid value of the products the customer wanted to return.',
      'Coupon validity: 6 months.',
      'Beauty Circle: customers earn 1 point per $1 spent.',
      'Points are redeemed in increments of 100; 100 points = $5 reward.',
      'Points expire after 6 months without transaction; can be extended by up to 2 months if requested.'
    ]
  },
  {
    id: 'damaged-allergy',
    title: 'Damaged and allergic reaction',
    short: 'Damaged items are reshipped; allergic reaction requires detailed questionnaire.',
    full: [
      'Ask for photo of damaged item.',
      'Damaged items do not need to be returned.',
      'Send replacement for free.',
      'Duplicate order, select items, apply 100% custom discount and confirm shipping details.',
      'Add tag: Reship - Damaged Item.',
      'For subscription orders, duplication is not possible; create a new order and copy all information.',
      'Marketing / influencer orders should not be reshipped for damage.',
      'Allergic reactions require a questionnaire: date, first reaction, usage duration, reapplication, symptoms, duration, doctor consultation and hospitalization.'
    ]
  },
  {
    id: 'returns-ns',
    title: 'Returns / Not Satisfied',
    short: '30-day return window; offer coupon first then refund after return.',
    full: [
      'Customer must return the product even if used.',
      'Customers have 30 days to return items.',
      'First offer 100% coupon valid for 6 months and customer keeps the product.',
      'If customer refuses, issue a return label.',
      'Always choose the cheapest UPS method, not USPS.',
      'Refund only after tracking confirms the item is shipped back and warehouse processes refund.',
      'Refund excludes the $11.95 shipping fee.',
      'Refund based on actual price paid, not full price, especially for promotions like 1+1.',
      'Do not restock. Do not notify customer when processing refund.'
    ]
  },
  {
    id: 'wismo',
    title: 'Yves Rocher WISMO',
    short: 'Wrong address, DNR and Returned to Sender.',
    full: [
      'Wrong address: reshipment costs $19. Create or duplicate new order with correct address and send invoice for $19.',
      'Wrong address tags: Reship, Reship - Wrong address.',
      'DNR: allow 7 business days after delivered status before action.',
      'Ask customer to sign Non-Receipt of merch form.',
      'If address is correct and confirmed with photo: reship costs $19.',
      'If FedEx delivered to wrong location or no proof of delivery: free reship, ask for different address, send order details to Bonnie.',
      'DNR tags: Reship, Reship - DNR.',
      'Returned to Sender: provide free reship and ask for a different address or warn next shipment will not be refundable.',
      'RTS tags: Reship, Reship - Returned to sender.'
    ]
  },
  {
    id: 'changes-before-shipping',
    title: 'Changes before shipping',
    short: 'BC number determines whether edits or cancellations are possible.',
    full: [
      'Always check for BC number on Shopify order page.',
      'Before BC number: order can be edited in Shopify and items can be removed.',
      'Before BC number: contact Staci Americas and always email NJ3CS.',
      'After BC number / order in PAK: cancellation or edits are not possible.',
      'Customer message: due to speed of fulfillment, once order is placed and payment processed, order details cannot be changed.',
      'Alternative: customer can use return policy and request return label after delivery.'
    ]
  },
  {
    id: 'shopify-tags',
    title: 'Yves Rocher Shopify tags',
    short: 'Operational tags for reship, refund, returns and missing items.',
    full: [
      'DNR: Reship - DNR.',
      'Lost: reship - lost in transit.',
      'Wrong address: Reship - Wrong address.',
      'Returned to sender: Reship - returned to sender.',
      'Damaged: Reship - damaged item.',
      'Refund damaged: FULL REFUND DAMAGED.',
      'Not returned / coupon accepted: 100% coupon.',
      'Return label sent: Return Label Sent.',
      'Subscription return: Return Label Sent - Subscription.',
      'Item returned: Returned by customer.',
      'Missing item: Reship - Missing item.'
    ]
  },
  {
    id: 'b2b-catalog',
    title: 'B2B and catalog',
    short: 'B2B requires Roi; catalog requests have customer service options.',
    full: [
      'For B2B orders, always ask Roi for instructions and assign the ticket to Roi.',
      'Catalog requests: customers can email customerservices@mail.yvesrocherusa.com, call 1-800-321-3434 or order online.'
    ]
  }
];
