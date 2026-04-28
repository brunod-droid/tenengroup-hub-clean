
import { useMemo, useState } from "react";

const MENU = ["Home","Training","Brands","Cases","Policies","WISMO Late Zoom","Events","CRM","Logistics","Yves Rocher","Social Policy","QA Team","OCy","AI Agents","Q&A"];

const QUICK_TOOLS = [
  { name: "Kustomer", url: "https://tenengroup.kustomerapp.com/" },
  { name: "OM / OCS", url: "https://bo.tenengroup.com/" },
  { name: "Notch", url: "https://tenengroup.app.getnotch.com/" },
  { name: "AfterShip", url: "https://www.aftership.com/" },
  { name: "Matrix", url: "http://matrix.tenengroup.com:100/Login.aspx" },
  { name: "17Track", url: "https://www.17track.net/en" }
];

const CHANNELS = [
  ["Webform","webform.jpg"],
  ["Facebook","facebook.jpg"],
  ["Instagram","instagram.jpg"],
  ["TikTok","tiktok.jpg"],
  ["Trustpilot","trustpilot.jpg"],
  ["Other Web","other.jpg"]
];

const BRANDS = [
  { id:"tg", name:"Theo Grace", short:"Premium personalized products, elegant and emotional, with Nicky Hilton as part of the brand story.", full:["Premium personalized product brand.","Elegant, stylish, refined, emotional and family-oriented.","Connects personalization with family joy, gifting and meaningful relationships."], tone:["Elegant","Premium","Emotional","Family-oriented","Stylish","Nicky Hilton association"] },
  { id:"ol", name:"Oak & Luna", short:"Modern, refined and fashion-forward personalized jewelry.", full:["Modern and refined jewelry.","Less sentimental-first and more fashion-led.","Polished, trendy, stylish and elevated."], tone:["Modern","Chic","Polished","Fashion-forward","Refined"] },
  { id:"ib", name:"Israel Blessing", short:"Jewish identity-focused personalized products.", full:["Jewish identity and symbolism.","Magen David, Chai, Israel map and Hebrew personalization.","Respectful, culturally aware and meaningful."], tone:["Respectful","Identity-driven","Symbolic","Culturally aware"] },
  { id:"ll", name:"Lime & Lou", short:"Personalized home and lifestyle products.", full:["Personalized home and lifestyle items.","Blankets, canvas, hoodies and decor-related gifts.","Warm, modern, cozy and gift-friendly."], tone:["Warm","Modern","Home-oriented","Aesthetic"] },
  { id:"myka", name:"MYKA", short:"European brand family similar to Theo Grace but without Nicky Hilton.", full:["European brand family.","Close to Theo Grace in assortment style, without Nicky Hilton association.","Elegant, accessible, commercial and localized."], tone:["Elegant","Accessible","European","Localized"] },
  { id:"yr", name:"Yves Rocher", short:"U.S. Shopify store for plant-based beauty products.", full:["Official U.S. online store for Yves Rocher.","Core categories: skincare, haircare, body care and fragrance.","Operational stack: Shopify, Gorgias, Notch/Taylor and Staci."], tone:["Botanical","Helpful","Accessible","Beauty-focused"] }
];

const CASES = [
  { id:"presales", name:"Pre-sales", short:"Questions before purchase.", full:["Product questions","Material questions","Personalization possibilities","Maximum characters or special requests","Delivery promise before purchase","Countries served","Warranty and coupon questions"] },
  { id:"change", name:"Change Order", short:"Changes after order placement.", full:["Change product","Change material","Change inscription","Change address","Change shipping method","Check order status before promising a change"] },
  { id:"wismo", name:"WISMO", short:"Where Is My Order.", full:["Tracking unclear or not updating","Late delivery","Late supplier","DNR: Delivered Not Received","Lost parcel","Label created only","Return to sender"] },
  { id:"received", name:"Item Received", short:"Problems after delivery.", full:["Damaged product","Wrong product","Wrong material","Wrong inscription","Production error","Warranty case","Not satisfied","Resizing or fit issue"] },
  { id:"account", name:"Account Issues", short:"Account, login, GDPR and loyalty support.", full:["Login issue","GDPR request","Delete data request","Loyalty points","Account information issue"] },
  { id:"other", name:"Other", short:"Miscellaneous or external requests.", full:["Newsletter unsubscribe","Collaboration request","Supplier or partnership request","Spam or unclassified contact"] }
];

const POLICIES = [
  { id:"late", name:"Late / WISMO", short:"Delay, tracking, DNR, lost parcel and shipping issue handling.", full:["Always check ETA before saying the order is late.","If today is still before ETA, the order is not late.","Under 3 business days late: apologize and provide updated ETA.","Over 3 business days late: compensation may apply depending on scenario.","Check whether it is Late Supplier before using regular late flow.","For DNR, if less than 3 business days since delivery scan, ask the customer to wait.","Always check carrier tracking before replying."], wording:"I'm really sorry for the delay. I've checked your order and here is the latest update: [ETA]. We are closely monitoring it for you.", documents:[{label:"Open WISMO full source", url:"/docs/wismo-late-policy.pdf"}] },
  { id:"supplier", name:"Late Supplier", short:"Production delay before shipment.", full:["Delayed before shipment due to production or supplier issue.","Do not automatically treat as regular delivery delay.","Check whether proactive communication was already sent.","Escalate if no clear internal update exists."], wording:"Your order is currently experiencing a production delay. Our team is already working on it and we will keep you updated as soon as we have a confirmed shipping timeline." },
  { id:"damaged", name:"Damaged", short:"Defective, broken or damaged product.", full:["Ask for a picture if none was provided.","Confirm damaged vs wrong item vs Not Satisfied.","Reorder is preferred first solution.","Refund is not first option unless policy allows it."], wording:"I'm really sorry about this. Could you please share a picture so I can resolve this for you right away? We will prioritize sending you a replacement." },
  { id:"ns", name:"Not Satisfied", short:"Customer does not like a correctly produced item.", full:["Confirm it is not damaged or production error.","Exchange first.","Store credit second.","No refund for personalized items under Not Satisfied policy."], wording:"I understand this is not exactly what you expected. We'd be happy to offer you an exchange or store credit so you can choose something you truly love." },
  { id:"resize", name:"Resizing", short:"Size and fit-related issue.", full:["Resizing is not a Not Satisfied case.","Ring resizing is usually free within the valid window.","Chains and bracelets follow separate rules.","Confirm the requested size before acting."], wording:"We can definitely help with resizing. Let me guide you through the available options based on your item." }
];

const WISMO_LATE = [
  {
    id: "check-first",
    name: "1. Check before answering",
    short: "Do not offer compensation before checking the real status.",
    full: [
      "Check the customer ETA first: if we are still before ETA, the order is not late.",
      "Check whether the root cause is regular late, Late Supplier, carrier issue, lost parcel, DNR or event-related delay.",
      "Check OM / Kustomer / tracking before answering.",
      "Check whether proactive communication was already sent.",
      "Never promise a new delivery date if it is not confirmed."
    ],
    documents: [{ label: "Open WISMO full source", url: "/docs/wismo-late-policy.pdf" }]
  },
  {
    id: "under-3",
    name: "2. Less than 3 business days late",
    short: "Apology + updated ETA. Usually no compensation.",
    full: [
      "Acknowledge the delay and apologize.",
      "Give the most accurate ETA or tracking update available.",
      "Do not automatically offer coupon, refund or free product.",
      "Reassure the customer that we are monitoring the order.",
      "Escalate only if there is a clear operational issue or VIP/sensitive context."
    ],
    wording: "I'm really sorry for the delay. I checked your order and it is currently in transit / being processed. The latest ETA is [ETA]. We are monitoring it closely and will keep you updated if anything changes.",
    documents: [{ label: "Open WISMO full source", url: "/docs/wismo-late-policy.pdf" }]
  },
  {
    id: "over-3",
    name: "3. More than 3 business days late",
    short: "Apology + ownership. Compensation may apply depending on context.",
    full: [
      "Apologize and take ownership.",
      "Give the latest confirmed status and next step.",
      "Compensation can be considered if the delay is confirmed and customer impact is meaningful.",
      "Possible commercial gesture: coupon / store credit, depending on brand and case.",
      "Shipping refund can be considered if the customer paid for expedited shipping and the promise was not met.",
      "Partial refund is rare and should follow policy / escalation logic.",
      "Free product is not a default solution. Use only if policy, retention or management approval supports it.",
      "Continue monitoring until shipment/delivery is resolved."
    ],
    wording: "I'm very sorry for the delay and I completely understand your frustration. I checked the latest status and we are following this closely. Because the delay is now beyond the expected window, we can review the best gesture for you according to our policy while we continue monitoring the delivery.",
    documents: [{ label: "Open WISMO full source", url: "/docs/wismo-late-policy.pdf" }]
  },
  {
    id: "major-delay",
    name: "4. Major delay / no reliable ETA",
    short: "Escalate. Replacement, refund or stronger gesture may be needed.",
    full: [
      "Use this when there is a major delay, no reliable ETA, lost package risk, repeated failed updates, or event promise failure.",
      "Escalate to Shipping / OCy / QA / manager depending on root cause.",
      "Replacement can be considered when the original order is unlikely to arrive or is lost.",
      "Refund can be considered when the customer cannot wait, the issue is severe, or policy allows it.",
      "Full refund is not automatic. It should follow severity, brand policy and escalation logic.",
      "If event-related, check Red Event / MBL / proactive communication rules before answering."
    ],
    wording: "I’m very sorry. At this point, the delay is no longer within the normal window, so I’m escalating this to make sure we choose the right solution. Depending on the final status, we may be able to arrange a replacement or another resolution according to our policy.",
    documents: [{ label: "Open WISMO full source", url: "/docs/wismo-late-policy.pdf" }]
  },
  {
    id: "communication",
    name: "5. Communication rules",
    short: "Empathy, ownership, clarity, next step.",
    full: [
      "Always acknowledge the customer’s frustration.",
      "Avoid defensive wording.",
      "Be transparent but do not overpromise.",
      "Give one clear next step: wait until X date, monitor, escalate, replacement review, refund review.",
      "If no compensation is offered, explain with empathy and focus on the next update.",
      "Use brand tone: Theo Grace should feel premium, warm, elegant and reassuring.",
      "Do not use internal terms like Red Event or MBL with customers."
    ],
    wording: "I completely understand this is disappointing, especially for a personalized order. I’ve checked the latest information and here is what we can do next: [next step].",
    documents: [{ label: "Open WISMO full source", url: "/docs/wismo-late-policy.pdf" }]
  }
];

const EVENTS = [
  { id:"mday", name:"Mother's Day 2026", short:"Main event playbook for jewelry and Lime & Lou.", intro:"Mother's Day is a peak event. The goal is to monitor delivery promises, stop risky automated replies, use proactive communication, and protect customer experience.", sections:[
    { title:"Core concepts", items:["Green Event = last day to order on time.","Red Event = last day to ship on time.","Last Day of Delivery = shipped orders still at risk.","ETA-1 = proactive delay monitoring before ETA."] },
    { title:"Jewelry Red Event logic", items:["At 7:00 AM IL time, Notch stops answering relevant non-shipped WISMO cases.","Messages move to On Hold for manual review.","Orders missing final shipment window can be tagged Late Red Event MDAY2026.","Proactive communication is sent to set expectations."] },
    { title:"Last Chance / MBL", items:["Last Chance means a one-day extra attempt when factory and shipping teams agree.","MBL means May Be Late.","Used for shipped orders still at risk of missing the event."] }
  ], wording:"I'm very sorry that your order may not arrive in time for Mother's Day. We are monitoring it closely and want to be fully transparent about the current delivery outlook.", documents:[{label:"Open Mother's Day full policy", url:"/docs/mothers-day-policy.pdf"}] },
  { id:"vday", name:"Valentine's Day 2026", short:"Same event backbone with strong expectation management.", intro:"Follows Green / Red / MBL event structure.", sections:[{ title:"Main structure", items:["Green Event","Red Event","On Hold routing","Late Red Event tags","MBL handling"] }], wording:"I completely understand how important timing is for this occasion." },
  { id:"xmas", name:"Christmas 2025", short:"Holiday event flow with fallback alternatives.", intro:"Uses event backbone plus holiday-specific fallback logic.", sections:[{ title:"Main structure", items:["Red Event","MBL handling","ETA-1 logic","Last Minute Pack fallback"] }], wording:"We're checking the best available option for your order." }
];

const CRM = [
  { id:"kustomer", name:"Kustomer", short:"Main CRM for Tenengroup conversations and case handling.", full:["Main CRM used for customer conversations.","Handles queues, tags, categories and dispositions.","Operational center for routing, classification and visibility."] },
  { id:"categories", name:"Categories", short:"System-filled classification from source or webform.", full:["Auto-filled by system.","Based on webform or source.","Support routing and reporting.","Not manually chosen by agents."] },
  { id:"dispositions", name:"Dispositions", short:"Manual case typing by agent.", full:["Selected manually by agents.","Define the real business case more precisely than categories.","Central for reporting accuracy and quality analysis."] },
  { id:"tags", name:"Tags", short:"Operational labels.", full:["Z tags are archived.","Tags can be manual, automatic, event-driven or AI-driven.","They should map to actions, owners and Notch behavior."] },
  { id:"notch", name:"Notch", short:"Current automation and AI layer.", full:["Handles part of standard automated flow.","Can answer simple or standard cases.","Paused or redirected during complex event scenarios."] }
];

const LOGISTICS = [
  { id:"factories", name:"Factories and production", short:"Production location and timing affect ETA.", full:["Factories are located in Israel, Thailand and Hungary.","Each product has its own production time.","Production days, factory location and destination determine delivery promise."] },
  { id:"shipping", name:"Shipping logic", short:"ETA depends on product, factory, destination and carrier.", full:["Shipping method can improve transit speed but not production speed.","Carrier checks are needed for trackable shipments.","AfterShip and 17Track support tracking investigation."] }
];

const YVES_ROCHER = [
  { id:"overview", name:"Yves Rocher Overview", short:"U.S. Shopify store for plant-based beauty products.", full:["Official U.S. online store for Yves Rocher.","Core categories: skincare, haircare, body care and fragrance.","Operational stack: Shopify, Gorgias, Notch/Taylor and Staci."] },
  { id:"shopify", name:"Shopify", short:"Order management, tags, refunds and history.", full:["Search by order ID, name or email.","Shopify tags explain operational actions.","Before BC number, some order edits may still be possible.","After BC / packing stage, edits or cancellation are usually not possible."] },
  { id:"wismo", name:"Yves Rocher WISMO", short:"Wrong address, DNR, lost, returned to sender.", full:["Wrong address reship costs $19.","DNR: allow 7 business days even if status shows delivered.","Ask customer to sign Non-Receipt form.","Returned to sender: provide free reship and ask for different address."] },
  { id:"returns", name:"Returns and Refunds", short:"30-day return process, labels and refund rules.", full:["Customers have 30 days to return items.","First offer a 100% coupon instead of refund.","If refused, issue return label.","Refund excludes $11.95 shipping fee."] }
];

const SOCIAL_POLICY = [
  { id:"comments", name:"Handling comments", short:"Sort, review, like and reply correctly.", full:["Sort comments by Newest.","Reply directly under customer comment.","Keep public responses friendly, polite, professional, short and natural."] },
  { id:"concerns", name:"Customer concerns and criticism", short:"Investigate before answering public criticism.", full:["Find customer in Kustomer or OM.","Check previous replies, shipping and delivery updates.","Public response should acknowledge, show empathy and move to DM."] },
  { id:"oal", name:"Oak & Luna public criticism protocol", short:"Approved public responses only, then hide negative comment.", full:["Public responses must remain neutral and professional.","Move immediately to private messages.","Do not explain the issue publicly.","Use approved responses only.","After approved reply, hide negative comment."] }
];

const QA_TEAM = [
  { id:"qa-role", name:"QA Team Role", short:"Handles item received, quality checks and escalations.", full:["Handles damaged, wrong item, production errors and warranty cases.","Validates damaged vs Not Satisfied vs production error.","Supports complex and unclear cases.","Recommends reorder, exchange, credit or escalation."] },
  { id:"qa-escalation", name:"When to escalate to QA", short:"Escalation rules.", full:["Unclear pictures or unclear issue.","Repeated complaints on same product.","Premium or sensitive cases.","Potential factory issue."] }
];

const OCY_TEAM = [
  { id:"role", name:"OCy Role", short:"Order cycle + ShineOn operations.", full:["Manages ShineOn order flows.","Checks product-specific rules before confirmation.","Prevents wrong personalization."] },
  { id:"shineon", name:"ShineOn Product Specifics", short:"Product rules from product name and notes.", full:["Use the product search in OCy.","Notes may include allowed characters, maximum length, automatic capitalization, emoji rules or special limitations.","If no note exists, no special rule has been documented yet."] }
];

const SHINEON_PRODUCTS = [
  { productName:"Luxury Necklace", notes:"Check chain length before confirming order. Not all lengths are adjustable." },
  { productName:"Forever Love Necklace", notes:"High volume product. Double check personalization before production." },
  { productName:"Interlocking Hearts Necklace", notes:"Two names maximum. Special characters may not be supported." },
  { productName:"Engraved Dog Tag", notes:"Font size depends on text length. Long text may be resized." },
  { productName:"Cuban Link Chain", notes:"No resizing possible after production." }
];

const AI_AGENTS = [
  { id:"dispatcher", name:"Manager / Dispatcher Agent", short:"Classifies the case and routes it to the right specialist.", full:["Detects case type: Pre-sales, Change Order, WISMO, Item Received, Account Issues or Other.","Checks urgency, brand, event context and available information.","Routes to Shipping, Factory, Refund, QA, VIP or CRM analysis agent."] },
  { id:"shipping", name:"Shipping Agent", short:"Handles WISMO, tracking, late, DNR, lost and carrier investigation.", full:["Checks OM, tracking, carrier and ETA.","Identifies DNR, lost, label created, RTS or delay.","Prepares carrier escalation when needed."] },
  { id:"qa", name:"QA / Item Received Agent", short:"Handles damaged, wrong item, not satisfied and warranty cases.", full:["Requests pictures where needed.","Identifies damaged vs not satisfied vs production error.","Recommends reorder, exchange, credit or escalation."] }
];

const COUNTRIES = ["Israel","Italy","Hungary","Ukraine","Philippines","Mexico","Thailand","Spain","Austria"];

const QUIZ = [
  ["What does WISMO mean?", "Where Is My Order."],
  ["Who do you go to if you have a question about customers?", "Customer Care team."],
  ["Give 2 KPIs from Customer Service.", "CSAT, SLA, NPS or Order Cost."],
  ["Who handles product-quality escalations?", "QA Team."],
  ["What makes a good Trustpilot reply?", "Empathy, ownership and a clear next step."]
];

const SUGGESTED_QUESTIONS = [
  "My order is late by 2 days. What should I do?",
  "The item is damaged. What is the process?",
  "Customer is not satisfied with the item.",
  "How does DNR policy work?",
  "What is a Red Event during Mother's Day?",
  "Difference between category and disposition?",
  "Yves Rocher wrong address reship?",
  "Oak & Luna negative public comment?",
  "When should I escalate to QA?",
  "What are the ShineOn product rules?"
];

function normalizeProduct(p, index) {
  const notes = p.notes || "No specific note documented.";
  return { id:"shineon-" + index, name:p.productName || "ShineOn product", short:notes.length > 180 ? notes.slice(0,180) + "..." : notes, full:[notes] };
}

function getText(item) {
  return [item.name, item.title, item.short, item.intro, item.wording, ...(item.full || []), ...(item.tone || []), ...((item.sections || []).flatMap(s => [s.title, ...(s.items || [])]))].filter(Boolean).join(" ");
}

function assistantAnswer(input) {
  const q = input.toLowerCase().trim();
  if (!q) return { title:"Ask the assistant", body:"Ask about late orders, damaged items, DNR, Red Event, Social, Yves Rocher, QA, OCy, ShineOn, tags or dispositions.", tags:[] };
  if (q.includes("late") || q.includes("delay") || q.includes("coupon") || q.includes("refund")) return { title:"WISMO Late guidance", body:"Check ETA first. Under 3 business days late: apology + ETA, usually no compensation. Over 3 business days late: compensation can be reviewed. Major delay: escalate; replacement/refund may apply depending on policy.", tags:["WISMO","Late"] };
  if (q.includes("training") || q.includes("orientation")) return { title:"Training guidance", body:"Open Training for the 20-minute presentation.", tags:["Training"] };
  if (q.includes("trustpilot") || q.includes("review")) return { title:"Trustpilot guidance", body:"A good public review response should be empathetic, personal and solution-oriented. It should show ownership and provide a clear next step.", tags:["Trustpilot"] };
  if (q.includes("shineon") || q.includes("ocy") || q.includes("product")) return { title:"OCy / ShineOn guidance", body:"Go to OCy and search the ShineOn product. Always check product-specific notes before confirming personalization.", tags:["OCy","ShineOn"] };
  if (q.includes("qa") || q.includes("quality") || q.includes("escalate")) return { title:"QA guidance", body:"Escalate unclear, repeated, sensitive or product-quality cases to QA.", tags:["QA Team"] };
  if (q.includes("social") || q.includes("facebook") || q.includes("instagram")) return { title:"Social guidance", body:"Sort by newest, reply directly under the comment, keep replies short and professional, move concerns to DM.", tags:["Social"] };
  if (q.includes("yves") || q.includes("shopify") || q.includes("gorgias")) return { title:"Yves Rocher guidance", body:"Yves Rocher uses Shopify for orders, Gorgias for tickets and Notch/Taylor for AI.", tags:["Yves Rocher","Shopify","Gorgias"] };
  if (q.includes("dnr")) return { title:"DNR guidance", body:"Tenengroup: wait 3 business days after delivery scan. Yves Rocher: allow 7 business days and ask for Non-Receipt form.", tags:["DNR","WISMO"] };
  if (q.includes("damaged") || q.includes("broken") || q.includes("defect")) return { title:"Damaged item guidance", body:"Ask for picture, confirm issue, apply warranty logic, reorder first.", tags:["Damaged"] };
  if (q.includes("red event") || q.includes("mother") || q.includes("mbl") || q.includes("last chance")) return { title:"Event guidance", body:"Use Green Event, Red Event, On Hold, proactive communication, MBL and Last Chance logic.", tags:["Event"] };
  if (q.includes("tag")) return { title:"Tags guidance", body:"Tags may be manual, automatic, event-driven or AI-driven. They should map to actions, owners and Notch behavior.", tags:["Tags","CRM"] };
  if (q.includes("disposition")) return { title:"Dispositions guidance", body:"Dispositions are selected manually by agents and define the real business case more precisely than categories.", tags:["Dispositions","CRM"] };
  return { title:"General guidance", body:"Identify the case family first, then open the matching section in the hub.", tags:["General"] };
}

function Box({ children, dark }) {
  return <div style={{ background:dark ? "#0f172a" : "#fff", color:dark ? "#fff" : "#111827", border:"1px solid #e5e7eb", borderRadius:22, padding:24, marginBottom:22, boxShadow:"0 8px 24px rgba(15,23,42,0.06)" }}>{children}</div>;
}

function Bullets({ items }) {
  return <ul style={{ lineHeight:1.8, color:"#4b5563", paddingLeft:18 }}>{(items || []).map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Pill({ children }) {
  return <span style={{ display:"inline-block", padding:"8px 12px", borderRadius:999, background:"#eef2ff", color:"#3730a3", fontWeight:700, fontSize:13, marginRight:8, marginBottom:8 }}>{children}</span>;
}

function TagChip({ text }) {
  return <Pill>{text}</Pill>;
}

function DocumentButtons({ documents }) {
  if (!documents || !documents.length) return null;
  return <div style={{ marginTop:16, display:"flex", gap:10, flexWrap:"wrap" }}>
    {documents.map((doc) => <a key={doc.url} href={doc.url} target="_blank" rel="noreferrer" style={{ display:"inline-block", padding:"10px 14px", borderRadius:12, background:"#111827", color:"#fff", textDecoration:"none", fontWeight:700 }}>{doc.label || "Open full source"}</a>)}
  </div>;
}

function Reveal({ q, a }) {
  const [open, setOpen] = useState(false);
  return <div onClick={() => setOpen(!open)} style={{ border:"1px solid #e5e7eb", borderRadius:16, padding:16, cursor:"pointer", background:"#fff", marginBottom:10 }}>
    <div style={{ fontWeight:800 }}>{q}</div>
    {open && <div style={{ marginTop:10, color:"#2563eb", fontWeight:700 }}>{a}</div>}
  </div>;
}

function SmallCard({ title, text, onClick }) {
  return <div onClick={onClick} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:18, padding:18, cursor:"pointer" }}>
    <div style={{ fontSize:22, fontWeight:700 }}>{title}</div>
    <div style={{ marginTop:10, color:"#4b5563", lineHeight:1.7 }}>{text}</div>
  </div>;
}

function ExpandableCard({ title, shortText, bullets, extraTitle, extraItems, wording, documents }) {
  const [open, setOpen] = useState(false);
  return <Box>
    <div style={{ fontSize:28, fontWeight:800 }}>{title}</div>
    <div style={{ marginTop:10, color:"#4b5563", lineHeight:1.7 }}>{shortText}</div>
    <DocumentButtons documents={documents} />
    <button onClick={() => setOpen(!open)} style={{ marginTop:14, background:"#eef2ff", color:"#3730a3", border:"none", borderRadius:10, padding:"10px 14px", cursor:"pointer", fontWeight:700 }}>{open ? "Hide details" : "Show details"}</button>
    {open && <div style={{ marginTop:18 }}>
      {bullets && <Bullets items={bullets} />}
      {extraItems && <><div style={{ fontWeight:800, marginTop:14 }}>{extraTitle}</div><Bullets items={extraItems} /></>}
      {wording && <><div style={{ fontWeight:800, marginTop:14 }}>Suggested wording</div><div style={{ marginTop:8, fontStyle:"italic", color:"#374151", lineHeight:1.7 }}>{wording}</div></>}
    </div>}
  </Box>;
}

function TrainingSlides() {
  const slides = ["intro","bruno","org","mission","wheel","cart","trustpilot","final","quiz"];
  const scrollToSlide = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:"smooth" });
  };

  return <div style={{ scrollBehavior:"smooth" }}>
    <div style={{ position:"fixed", right:24, top:"45%", zIndex:20, display:"flex", flexDirection:"column", gap:10 }}>
      {slides.map((id, i) => <button key={id} onClick={() => scrollToSlide(id)} style={{ width:44, height:44, borderRadius:"50%", border:"none", background:"#0f172a", color:"#fff", fontWeight:900, cursor:"pointer" }}>{i + 1}</button>)}
    </div>

    <section id="intro" style={{ minHeight:"100vh", padding:70, display:"flex", alignItems:"center" }}>
      <div>
        <div style={{ fontSize:20, color:"#2563eb", fontWeight:800 }}>TG ORIENTATION WEEK</div>
        <div style={{ fontSize:78, fontWeight:900, marginTop:10 }}>Customer Care</div>
        <div style={{ fontSize:42, marginTop:8 }}>20-minute overview</div>
        <div style={{ marginTop:30, fontSize:24, maxWidth:900, lineHeight:1.6, color:"#374151" }}>A friendly introduction to the Customer Care team: who we are, what we do, where customers reach us, and how we contribute to customer experience, retention and company insights.</div>
        <div style={{ marginTop:34 }}><Pill>Team</Pill><Pill>Missions</Pill><Pill>Channels</Pill><Pill>KPIs</Pill><Pill>Customer Journey</Pill><Pill>Trustpilot</Pill></div>
      </div>
    </section>

    <section id="bruno" style={{ minHeight:"100vh", padding:70, display:"flex", alignItems:"center" }}>
      <div style={{ display:"grid", gridTemplateColumns:"360px 1fr", gap:60, alignItems:"center" }}>
        <div style={{ background:"#fff", borderRadius:28, padding:20, boxShadow:"0 12px 30px rgba(15,23,42,0.12)" }}>
          <img src="/team/bruno.jpg" style={{ width:"100%", height:460, objectFit:"contain", borderRadius:22, background:"#f8fafc" }} alt="Bruno Dreyfus" />
        </div>
        <div>
          <div style={{ fontSize:56, fontWeight:900 }}>Bruno Dreyfus</div>
          <div style={{ fontSize:26, color:"#2563eb", fontWeight:800, marginTop:8 }}>Customer Service Director</div>
          <div style={{ marginTop:26, fontSize:22, lineHeight:1.8, color:"#374151" }}>47 years old · Married · 3 kids · Lives in Raanana · From France<br/>Previously CRM Consultant and worked in French ecommerce: lifestyle, jewelry, underwear and home.<br/>4.5 years at Tenengroup. Hobbies: football, friends, family. Goal: become a barbecue pro 🔥</div>
          <div style={{ marginTop:36, fontSize:30, fontWeight:900 }}>My objectives at Tenengroup</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:16, marginTop:18 }}>
            {[["🎉","Have fun"],["⚡","Efficiency matters"],["🚀","Innovate"],["💪","Do your best"]].map(([icon, text]) => <div key={text} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:18, padding:20, fontSize:22, fontWeight:800 }}><span style={{ marginRight:10 }}>{icon}</span>{text}</div>)}
          </div>
        </div>
      </div>
    </section>

    <section id="org" style={{ minHeight:"100vh", padding:70, background:"linear-gradient(rgba(2,6,23,.82), rgba(15,23,42,.88)), url('/team/world-map.jpg') center/cover no-repeat", color:"#fff" }}>
      <div style={{ fontSize:56, fontWeight:900 }}>Organization</div>
      <div style={{ fontSize:24, color:"#cbd5e1", marginTop:12 }}>Customer organization with two main pillars: Customer and Cart Optimization.</div>
      <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:26, marginTop:40 }}>
        <div>
          <div style={{ background:"rgba(255,255,255,.10)", borderRadius:24, padding:26, border:"1px solid rgba(255,255,255,.18)" }}>
            <div style={{ fontSize:28, fontWeight:900 }}>Shani Brown</div>
            <div style={{ color:"#93c5fd", fontWeight:800 }}>VP Customer</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginTop:22 }}>
            <div style={{ background:"rgba(255,255,255,.10)", borderRadius:22, padding:22 }}>
              <div style={{ fontSize:24, fontWeight:900 }}>Customer</div>
              <div style={{ marginTop:14, lineHeight:1.9, color:"#e5e7eb" }}>Bruno Dreyfus — CS Director<br/>Laurence Darmon — QA Team Leader<br/>Orly Ancel — Order Cycle Team Leader<br/>Adi Zaken — Team Leader<br/>Thijs Vandenbroucke — Team Leader<br/>Neva Zec — Trainer / Success<br/>CSR teams</div>
            </div>
            <div style={{ background:"rgba(255,255,255,.10)", borderRadius:22, padding:22 }}>
              <div style={{ fontSize:24, fontWeight:900 }}>Cart Optimization</div>
              <div style={{ marginTop:14, lineHeight:1.9, color:"#e5e7eb" }}>Marianna Kis — Project Manager<br/>Maayan Diamant — Operations<br/>Dominik Lanczi — Operations<br/>Optimization, funnel, order quality and conversion support</div>
            </div>
          </div>
        </div>
        <div style={{ background:"rgba(255,255,255,.10)", borderRadius:24, padding:26 }}>
          <div style={{ fontSize:30, fontWeight:900 }}>Global team</div>
          <div style={{ marginTop:12, color:"#cbd5e1" }}>50–100 agents around the world</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:22 }}>
            {COUNTRIES.map((c) => <div key={c} style={{ background:"rgba(255,255,255,.12)", borderRadius:12, padding:12 }}>{c}</div>)}
          </div>
        </div>
      </div>
    </section>

    <section id="mission" style={{ minHeight:"100vh", padding:70 }}>
      <div style={{ fontSize:56, fontWeight:900 }}>Missions, Channels & KPIs</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, marginTop:36 }}>
        <Box><div style={{ fontSize:32, fontWeight:900 }}>Missions</div><Bullets items={["Optimize customer experience through tone of voice, policies and service quality.","Maximize lifetime value and reduce customer churn.","Identify and implement new channels to enhance satisfaction.","Coordinate and bring insights to Shipping, Factory and Brands."]} /></Box>
        <Box><div style={{ fontSize:32, fontWeight:900 }}>Where customers reach us</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginTop:18 }}>
            {CHANNELS.map(([name,img]) => <div key={name} style={{ textAlign:"center", background:"#f8fafc", borderRadius:16, padding:14 }}><img src={"/team/" + img} style={{ height:44, objectFit:"contain" }} alt={name} /><div style={{ marginTop:8, fontWeight:800 }}>{name}</div></div>)}
          </div>
        </Box>
      </div>
      <Box><div style={{ fontSize:32, fontWeight:900 }}>Our KPIs</div><div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16, marginTop:20 }}>{[["CSAT","Goal: 4.2","Customer satisfaction after an interaction."],["SLA","Goal: 10h","How fast we respond and respect timing commitments."],["NPS","Goal: High","Customer loyalty and likelihood to recommend."],["Order Cost","Goal: Low","Efficiency and cost of resolving customer issues."]].map(([title, goal, text]) => <div key={title} style={{ background:"#f8fafc", borderRadius:18, padding:18 }}><div style={{ fontSize:26, fontWeight:900, color:"#2563eb" }}>{title}</div><div style={{ marginTop:6, fontWeight:900 }}>{goal}</div><div style={{ marginTop:10, color:"#4b5563", lineHeight:1.6 }}>{text}</div></div>)}</div></Box>
    </section>

    <section id="wheel" style={{ minHeight:"100vh", padding:70 }}>
      <div style={{ fontSize:56, fontWeight:900 }}>Customer Service Wheel</div>
      <div style={{ fontSize:24, color:"#4b5563", marginTop:12 }}>Customer questions come throughout the journey, then are handled by CS, AI, OCy and QA depending on the case.</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:14, marginTop:36 }}>{[["1","Pre-sales","Products, shipping, warranty, special requests, payment, technical issues, coupons.","CS + AI"],["2","Change Order","Address, item, inscription, shipping method.","CS"],["3","WISMO","Late supplier, late, on time, lost, DNR, returned to sender.","CS + AI + OCy"],["4","Item Received","Damaged, not satisfied, production mistake, customer mistake.","CS + QA"],["5","Other","Account issues, collaboration, spam.","CS"]].map(([num,title,text,team]) => <div key={title} style={{ border:"1px solid #e5e7eb", borderRadius:22, padding:20, background:"#fff" }}><div style={{ width:40, height:40, borderRadius:"50%", background:"#2563eb", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900 }}>{num}</div><div style={{ fontSize:22, fontWeight:900, marginTop:14 }}>{title}</div><div style={{ color:"#4b5563", lineHeight:1.6, marginTop:10 }}>{text}</div><div style={{ marginTop:14 }}><Pill>{team}</Pill></div></div>)}</div>
      <Box><div style={{ fontSize:30, fontWeight:900 }}>Proactive communication</div><Bullets items={["OOS and potential mistakes: proactive alerts before the customer complains.","Payment issues: monitoring and customer follow-up.","Late supplier, upgrade, shipping issue and ETA-1: automatic or semi-automatic campaigns."]} /></Box>
    </section>

    <section id="cart" style={{ minHeight:"100vh", padding:70 }}>
      <div style={{ fontSize:56, fontWeight:900 }}>Cart Optimization</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:36, alignItems:"center", marginTop:36 }}>
        <img src="/team/cart-optimization.jpg" style={{ width:"100%", maxHeight:520, objectFit:"contain", borderRadius:24, background:"#fff" }} alt="Cart Optimization" />
        <div><div style={{ fontSize:30, fontWeight:900 }}>Why it matters</div><Bullets items={["Cart Optimization focuses on improving conversion and order quality.","The team helps reduce friction before the order becomes a customer-care issue.","Better cart experience means fewer mistakes, fewer contacts, and higher satisfaction.","It connects customer behavior, checkout experience and operational outcomes."]} /></div>
      </div>
    </section>

    <section id="trustpilot" style={{ minHeight:"100vh", padding:70 }}>
      <div style={{ fontSize:56, fontWeight:900 }}>Trustpilot reviews</div>
      <div style={{ fontSize:24, color:"#4b5563", marginTop:12 }}>Public reviews are not only complaints — they are visible signals of trust, service quality and brand credibility.</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginTop:34 }}>{["tp1.jpg","tp2.jpg","tp3.jpg","tp4.jpg","tp5.jpg","tp6.jpg"].map((img) => <img key={img} src={"/team/" + img} style={{ width:"100%", height:220, objectFit:"contain", background:"#fff", borderRadius:18, border:"1px solid #e5e7eb" }} alt={img} />)}</div>
      <Box><div style={{ fontSize:28, fontWeight:900 }}>What a good reply should show</div><Pill>Empathy</Pill><Pill>Ownership</Pill><Pill>Clear next step</Pill><Pill>No defensive tone</Pill></Box>
    </section>

    <section id="final" style={{ minHeight:"100vh", padding:70 }}>
      <div style={{ fontSize:56, fontWeight:900 }}>Final note</div>
      <div style={{ fontSize:28, lineHeight:1.6, marginTop:24, maxWidth:1000 }}>The cooperation between our departments is a big part of our success in giving a high-quality and personal service to our customers.</div>
      <div style={{ fontSize:24, color:"#4b5563", lineHeight:1.6, marginTop:24 }}>Everything you should know about Customer Care is available in our Customer Care Hub.</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:18, marginTop:40 }}>
        <img src="/team/team1.jpg" style={{ width:"100%", height:280, objectFit:"cover", borderRadius:22 }} alt="Team 1" />
        <img src="/team/team2.jpg" style={{ width:"100%", height:280, objectFit:"cover", borderRadius:22 }} alt="Team 2" />
        <img src="/team/team3.jpg" style={{ width:"100%", height:280, objectFit:"cover", borderRadius:22 }} alt="Team 3" />
      </div>
    </section>

    <section id="quiz" style={{ minHeight:"100vh", padding:70 }}>
      <div style={{ fontSize:56, fontWeight:900 }}>Quick quiz</div>
      <div style={{ fontSize:24, color:"#4b5563", marginTop:12 }}>Click each question to reveal the answer.</div>
      <div style={{ marginTop:34, maxWidth:900 }}>{QUIZ.map(([q, a]) => <Reveal key={q} q={q} a={a} />)}</div>
    </section>
  </div>;
}

export default function Home() {
  const [page, setPage] = useState("Home");
  const [question, setQuestion] = useState("");
  const [search, setSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [logoOk, setLogoOk] = useState(true);

  const answer = useMemo(() => assistantAnswer(question), [question]);
  const shineonItems = useMemo(() => SHINEON_PRODUCTS.map(normalizeProduct), []);

  const pageData = {
    Brands: BRANDS,
    Cases: CASES,
    Policies: POLICIES,
    CRM,
    Logistics: LOGISTICS,
    "Yves Rocher": YVES_ROCHER,
    "Social Policy": SOCIAL_POLICY,
    "QA Team": QA_TEAM,
    "AI Agents": AI_AGENTS
  };

  const searchableItems = useMemo(() => {
    const eventItems = EVENTS.map((e) => ({ type:"Event", title:e.name, text:getText(e), openPage:"Events" }));
    const wismoLateSearch = WISMO_LATE.map((x) => ({ type:"WISMO Late Zoom", title:x.name, text:getText(x), openPage:"WISMO Late Zoom" }));
    const generic = Object.keys(pageData).flatMap((key) => pageData[key].map((x) => ({ type:key, title:x.name || x.title, text:getText(x), openPage:key })));
    const shineonSearch = shineonItems.map((x) => ({ type:"ShineOn Product", title:x.name, text:getText(x), openPage:"OCy" }));
    return generic.concat(eventItems).concat(wismoLateSearch).concat(shineonSearch);
  }, [shineonItems]);

  const filteredResults = useMemo(() => {
    if (!search.trim()) return searchableItems.slice(0, 10);
    const q = search.toLowerCase();
    return searchableItems.filter((item) => item.title.toLowerCase().includes(q) || item.text.toLowerCase().includes(q) || item.type.toLowerCase().includes(q));
  }, [search, searchableItems]);

  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return shineonItems;
    const q = productSearch.toLowerCase();
    return shineonItems.filter((item) => item.name.toLowerCase().includes(q) || item.short.toLowerCase().includes(q) || (item.full || []).join(" ").toLowerCase().includes(q));
  }, [productSearch, shineonItems]);

  return <div style={{ display:"flex", minHeight:"100vh", background:"#f5f7fb", fontFamily:"Arial, sans-serif" }}>
    <aside style={{ width:250, background:"#0f172a", color:"#fff", padding:20, overflowY:"auto" }}>
      <div style={{ width:64, height:64, borderRadius:14, background:"#111827", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, fontWeight:800, marginBottom:12 }}>TG</div>
      <div style={{ fontSize:22, fontWeight:800 }}>Tenengroup</div>
      <div style={{ marginTop:6, opacity:0.75 }}>Customer Care Hub</div>
      <div style={{ marginTop:28 }}>{MENU.map((m) => <div key={m} onClick={() => setPage(m)} style={{ padding:"12px 14px", borderRadius:10, cursor:"pointer", background:page === m ? "#1d4ed8" : "transparent", marginBottom:8, fontWeight:600 }}>{m}</div>)}</div>
      <div style={{ marginTop:26, borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:16 }}>
        <div style={{ fontSize:12, opacity:0.7, marginBottom:10 }}>QUICK TOOLS</div>
        {QUICK_TOOLS.map((tool) => <div key={tool.name} style={{ marginBottom:10 }}><a href={tool.url} target="_blank" rel="noreferrer" style={{ color:"#dbeafe", textDecoration:"none" }}>{tool.name}</a></div>)}
      </div>
    </aside>

    <main style={{ flex:1, padding:24 }}>
      {page === "Home" && <>
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:26, overflow:"hidden", display:"grid", gridTemplateColumns:"1.15fr 1fr", marginBottom:22 }}>
          <div style={{ background:"linear-gradient(135deg, #0f172a 0%, #111827 100%)", minHeight:340, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
            {logoOk ? <img src="/logo-hub.png" alt="Tenengroup hub logo" onError={() => setLogoOk(false)} style={{ maxWidth:"100%", maxHeight:280, objectFit:"contain", borderRadius:18 }} /> : <div style={{ color:"#fff", fontSize:26, fontWeight:800 }}>Tenengroup Customer Care Hub</div>}
          </div>
          <div style={{ padding:34, display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <div style={{ color:"#2563eb", fontWeight:700, fontSize:18 }}>Welcome to</div>
            <div style={{ fontSize:54, fontWeight:900, marginTop:6 }}>TENENGROUP</div>
            <div style={{ fontSize:32, color:"#2563eb", marginTop:6 }}>Customer Care Hub</div>
            <div style={{ marginTop:18, lineHeight:1.7, fontSize:18, color:"#374151" }}>Policies, event playbooks, CRM definitions, brand tone of voice, logistics, social handling, Yves Rocher training, QA, OCy / ShineOn and new employee orientation.</div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:16, marginBottom:22 }}>
          <SmallCard title="Training" text="20-minute CS overview" onClick={() => setPage("Training")} />
          <SmallCard title="WISMO Late Zoom" text="Late policy and compensation logic" onClick={() => setPage("WISMO Late Zoom")} />
          <SmallCard title="QA Team" text="Escalations and quality checks" onClick={() => setPage("QA Team")} />
          <SmallCard title="OCy" text="Order Cycle and ShineOn rules" onClick={() => setPage("OCy")} />
          <SmallCard title="Social Policy" text="Facebook / Instagram" onClick={() => setPage("Social Policy")} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:18 }}>
          <Box>
            <div style={{ fontSize:26, fontWeight:800, marginBottom:14 }}>Global search</div>
            <input placeholder="Search everything..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width:"100%", padding:14, borderRadius:10, border:"1px solid #d1d5db", boxSizing:"border-box" }} />
            <div style={{ marginTop:18, display:"grid", gap:12 }}>{filteredResults.map((item) => <div key={item.type + item.title} onClick={() => setPage(item.openPage)} style={{ padding:14, border:"1px solid #e5e7eb", borderRadius:12, cursor:"pointer", background:"#fafafa" }}><div style={{ fontSize:12, color:"#4f46e5", fontWeight:700 }}>{item.type}</div><div style={{ fontSize:20, fontWeight:800, marginTop:4 }}>{item.title}</div><div style={{ color:"#4b5563", lineHeight:1.6, marginTop:6 }}>{item.text.slice(0,190)}...</div></div>)}</div>
          </Box>

          <Box>
            <div style={{ fontSize:26, fontWeight:800, marginBottom:14 }}>Assistant</div>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question..." style={{ width:"100%", padding:14, borderRadius:10, border:"1px solid #d1d5db", boxSizing:"border-box" }} />
            <div style={{ marginTop:16, fontSize:22, fontWeight:800 }}>{answer.title}</div>
            <div style={{ marginTop:10, lineHeight:1.7, color:"#374151" }}>{answer.body}</div>
            <div style={{ marginTop:14 }}>{answer.tags.map((tag) => <TagChip key={tag} text={tag} />)}</div>
            <div style={{ marginTop:24, fontWeight:800 }}>Suggested questions</div>
            <div style={{ marginTop:12 }}>{SUGGESTED_QUESTIONS.map((q) => <div key={q} onClick={() => setQuestion(q)} style={{ padding:12, border:"1px solid #e5e7eb", borderRadius:12, marginBottom:10, cursor:"pointer", background:"#fff" }}>{q}</div>)}</div>
          </Box>
        </div>
      </>}

      {page === "Training" && <TrainingSlides />}

      {page === "WISMO Late Zoom" && <>
        <h1 style={{ fontSize:40 }}>WISMO Late Zoom — What do we do when an order is late?</h1>
        <Box>
          <div style={{ fontSize:26, fontWeight:800 }}>Decision logic</div>
          <Bullets items={["First: check ETA, order status, tracking and whether the delay is regular late, Late Supplier, carrier issue, lost parcel, DNR or event-related.","Compensation is not automatic. It depends on delay length, customer impact, shipping promise, brand policy and escalation logic.","Coupons, free products and refunds are not default answers. They require the right context, retention logic or approval.","Always communicate with empathy, ownership, clarity and a next step."]} />
          <DocumentButtons documents={[{ label: "Open WISMO full source", url: "/docs/wismo-late-policy.pdf" },{ label: "Open Policies source folder", url: "/docs/" }]} />
        </Box>
        {WISMO_LATE.map((x) => <ExpandableCard key={x.id} title={x.name} shortText={x.short} bullets={x.full} wording={x.wording || null} documents={x.documents || null} />)}
      </>}

      {Object.keys(pageData).includes(page) && <>
        <h1 style={{ fontSize:40 }}>{page}</h1>
        {pageData[page].map((x) => <ExpandableCard key={x.id} title={x.name || x.title} shortText={x.short} bullets={x.full} extraTitle={x.tone ? "Tone of voice" : null} extraItems={x.tone || null} wording={x.wording || null} documents={x.documents || null} />)}
      </>}

      {page === "OCy" && <>
        <h1 style={{ fontSize:40 }}>OCy / Order Cycle</h1>
        {OCY_TEAM.map((x) => <ExpandableCard key={x.id} title={x.name || x.title} shortText={x.short} bullets={x.full} />)}
        <Box>
          <div style={{ fontSize:28, fontWeight:800 }}>ShineOn Product Specifics</div>
          <div style={{ marginTop:10, color:"#4b5563", lineHeight:1.7 }}>Search product rules extracted from Product Name and Notes.</div>
          <input placeholder="Search product name or note..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} style={{ width:"100%", padding:14, borderRadius:10, border:"1px solid #d1d5db", boxSizing:"border-box", marginTop:14 }} />
        </Box>
        {filteredProducts.map((x) => <ExpandableCard key={x.id} title={x.name} shortText={x.short} bullets={x.full} />)}
      </>}

      {page === "Events" && <>
        <h1 style={{ fontSize:40 }}>Event prompts</h1>
        {EVENTS.map((e) => <Box key={e.id}><div style={{ fontSize:28, fontWeight:800 }}>{e.name}</div><div style={{ marginTop:10, color:"#4b5563", lineHeight:1.7 }}>{e.short}</div><DocumentButtons documents={e.documents} /><div style={{ marginTop:12, color:"#374151", lineHeight:1.7 }}>{e.intro}</div>{e.sections.map((section) => <div key={section.title} style={{ marginTop:20 }}><div style={{ fontWeight:800, marginBottom:8 }}>{section.title}</div><Bullets items={section.items} /></div>)}<div style={{ marginTop:18, fontWeight:800 }}>Suggested wording</div><div style={{ marginTop:8, fontStyle:"italic", color:"#374151", lineHeight:1.7 }}>{e.wording}</div></Box>)}
      </>}

      {page === "Q&A" && <>
        <h1 style={{ fontSize:40 }}>Q&A</h1>
        <Box>
          <div style={{ fontSize:24, fontWeight:800, marginBottom:12 }}>Ask the assistant</div>
          <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Example: my order is late by 2 days" style={{ width:"100%", padding:14, borderRadius:10, border:"1px solid #ccc", boxSizing:"border-box" }} />
          <div style={{ marginTop:18 }}><div style={{ fontWeight:800, fontSize:24 }}>{answer.title}</div><div style={{ marginTop:12, lineHeight:1.7 }}>{answer.body}</div><div style={{ marginTop:12 }}>{answer.tags.map((tag) => <TagChip key={tag} text={tag} />)}</div></div>
        </Box>
      </>}
    </main>
  </div>;
}
