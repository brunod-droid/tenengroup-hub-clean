import { useMemo, useState } from 'react';

const slides = [
  {
    id: 1,
    type: 'speech',
    section: 'Opening',
    eyebrow: 'AI at Work',
    title: 'How AI removes friction from everyday work',
    subtitle: 'A practical session for Brands, Factory, Operations, Dev, Ecommerce and Customer Service.',
    time: '3 min',
    keyMessage: 'Today, all examples are done with ChatGPT Enterprise only.',
    bullets: [
      'Why? We handle customer and company data.',
      'GDPR matters: do not paste sensitive data into random AI tools.',
      'Enterprise workspace = safer collaboration and controlled usage.',
      'Goal: one concrete AI use case you can try tomorrow.'
    ],
    speakerNote: 'Start with the data protection point. Make it clear that this is not about testing random AI websites with customer data. The safe default is ChatGPT Enterprise.'
  },
  {
    id: 2,
    type: 'agentContextQuiz',
    section: 'AI Agent',
    eyebrow: 'Warm-up',
    title: 'You already experienced an AI Agent',
    subtitle: 'The countdown emails before this training were part of the demo.',
    time: '5 min',
    context: [
      'Before the session, an AI Agent sent countdown emails automatically.',
      'It used a Google Sheet with names and emails.',
      'It wrote the message, personalized it and sent it without manual validation.',
      'The goal was to show what an autonomous workflow feels like in real life.'
    ],
    screenshotLabel: 'Placeholder: screenshot of the ChatGPT Agent + your prompt',
    promptExcerpt: 'Every day until the training, read the Google Sheet, write one short countdown email, personalize it and send it automatically.',
    question: 'What did the AI Agent actually do?',
    options: [
      'Only drafted a text that Bruno copied manually',
      'Read a Google Sheet, wrote personalized emails and sent them automatically',
      'Only corrected spelling mistakes',
      'Only created this presentation'
    ],
    answer: 'Read a Google Sheet, wrote personalized emails and sent them automatically',
    revealTitle: 'Exactly. This was the first live demo.',
    revealText: 'Agents are useful when a task repeats, needs information, creates an output and can run on a schedule.',
    speakerNote: 'Give context first because some people may not have noticed the emails. Then ask feedback: Did you read them? Did you notice it was automated? Would this be useful in your job?'
  },
  {
    id: 3,
    type: 'flow',
    section: 'Agent example',
    eyebrow: 'Live example',
    title: 'How the countdown agent worked',
    subtitle: 'Simple workflow. Real business value.',
    time: '4 min',
    steps: ['Schedule', 'Google Sheet', 'Search insight', 'Write email', 'Personalize', 'Send'],
    keyMessage: 'Later today, we will practice designing your own AI Agent. No worry: it starts with workflow thinking, not technical skills.',
    applications: [
      'Send yourself daily reminders',
      'Google search and summarize results',
      'Monitor competitors',
      'Send CX alerts',
      'Prepare daily digests',
      'Follow operational risks'
    ],
    speakerNote: 'Conclusion: AI agents can email others, but also email you as an assistant. Examples: reminder, benchmark, daily monitoring, customer reviews, delivery issues.'
  },
  {
    id: 4,
    type: 'speech',
    section: 'Mindset',
    eyebrow: 'Reality check',
    title: 'AI is less sci-fi than people think',
    subtitle: 'Most of the value comes from boring tasks done faster.',
    time: '4 min',
    keyMessage: 'AI is great at the tasks that slow us down every day.',
    bullets: ['Summarize', 'Write', 'Search', 'Compare', 'Organize', 'Monitor', 'Translate', 'Explain'],
    speakerNote: 'Make it funny: AI is not a robot taking your chair. It is the intern who loves Excel, summaries and repetitive tasks.'
  },
  {
    id: 5,
    type: 'businessCasePoll',
    section: 'Participation',
    eyebrow: 'Choose your pain',
    title: 'Where do you lose the most time?',
    subtitle: 'Vote by hand. Each answer connects to a concrete business case.',
    time: '6 min',
    cases: [
      { team: 'Brand', pain: 'Customer feedback', demo: 'Summarize reviews and product comments' },
      { team: 'Factory', pain: 'Operational delays', demo: 'Detect blockers and missing data' },
      { team: 'Operations', pain: 'Weekly reports', demo: 'Clean, compare and summarize files' },
      { team: 'Dev', pain: 'Requirements', demo: 'Turn notes into specs and action items' },
      { team: 'CS', pain: 'Tickets and replies', demo: 'Improve answers and analyze drivers' },
      { team: 'Ecommerce', pain: 'Trends and performance', demo: 'Summarize KPIs and market signals' }
    ],
    speakerNote: 'You do not need 6 full demos live. These are 6 mini-business cases. Use the poll to decide where to spend more time during the hands-on part.'
  },
  {
    id: 6,
    type: 'toolNavigator',
    section: 'Framework',
    eyebrow: 'Choose the right AI format',
    title: 'Chat, Project, GPT, Agent or Hub?',
    subtitle: 'This is the key map: different business needs require different AI setups.',
    time: '8 min',
    tools: [
      { name: 'Chat', need: 'Quick help once', simple: 'Ask, rewrite, summarize, explain', cs: 'Rewrite a customer email', other: 'Brand: rewrite campaign text / Dev: explain an error', targetSlide: 8 },
      { name: 'Project', need: 'Shared work with context', simple: 'Files + chats + team context', cs: 'ETA-1 campaign project', other: 'Operations: launch follow-up / Factory: issue investigation', targetSlide: 3 },
      { name: 'GPT', need: 'Repeatable expert', simple: 'Same rules, same output, every time', cs: 'Late Supplier processor', other: 'Weekly Business Assistant for any team', targetSlide: 11 },
      { name: 'Agent', need: 'Autonomous workflow', simple: 'Runs on schedule, searches and sends', cs: 'Countdown emails / CX digest', other: 'Brand: competitor monitor / Ops: daily risk alert', targetSlide: 14 },
      { name: 'Hub', need: 'Company knowledge', simple: 'Knowledge organized and reusable', cs: 'Customer Hub training page', other: 'Any team: SOP / FAQ / onboarding page', targetSlide: 15 }
    ],
    speakerNote: 'This slide must be very clear. Project = workspace. GPT = specialized repeatable assistant. Agent = autonomous recurring workflow. Hub = reusable company knowledge. Click a card to jump to the related demo.'
  },
  {
    id: 7,
    type: 'quiz',
    section: 'GPT example',
    eyebrow: 'Tool choice',
    title: 'What should become a GPT?',
    subtitle: 'A GPT is best for a stable, repeatable process.',
    time: '5 min',
    question: 'Which example is the best candidate for a GPT?',
    options: [
      'A one-time brainstorm for a campaign name',
      'A temporary discussion about one issue',
      'A Weekly Business Assistant that always reads a report, finds anomalies, summarizes KPIs and drafts actions',
      'A monitor that searches the web daily and emails alerts'
    ],
    answer: 'A Weekly Business Assistant that always reads a report, finds anomalies, summarizes KPIs and drafts actions',
    revealTitle: 'Correct: repeatable process = GPT.',
    revealText: 'Late Supplier is the advanced CS example. But every department can imagine its own GPT: weekly report assistant, anomaly checker, campaign summary assistant, specification writer, or KPI explainer.',
    speakerNote: 'Do not make this only about Late Supplier. Present Late Supplier as the advanced version, then make it universal with Weekly Business Assistant.'
  },
  {
    id: 8,
    type: 'notchCase',
    section: 'Demo 1',
    eyebrow: 'Customer communication',
    title: 'AI can improve customer communication',
    subtitle: 'Faster replies, better tone, stronger consistency.',
    time: '6 min',
    customerMessage: 'Adam Shaire: Thank you Sam for all that you are doing. Please stress to the production department how deeply sentimental Tana’s locket is and why I am so concerned with the unexpected delay. Please push for clarity on the definitive new arrival date.',
    aiAnswer: 'Hi Adam, thank you so much for your heartfelt message and for trusting us with something so meaningful. I completely understand how important and sentimental Tana’s locket is to you. I have personally communicated your concerns and gratitude to our production team and stressed how much this locket means to you. As soon as I have a definitive update on the new arrival date, I will let you know right away.',
    learnings: ['Empathy', 'Clear ownership', 'Professional tone', 'Faster response', 'Human validation remains important'],
    speakerNote: 'Do not switch platform. Show the case directly here. Ask: would you know this was AI-assisted? Then explain that AI can improve quality, not just speed.'
  },
  {
    id: 9,
    type: 'interactiveDemo',
    section: 'Demo 2',
    eyebrow: 'Live email demo',
    title: 'One message. Five useful versions.',
    subtitle: 'This is how easy AI assistance can be.',
    time: '6 min',
    originalText: 'where is my order i wait since 2 weeks no answer this is unacceptable',
    transformations: [
      { label: 'Professional', text: 'I am sorry for the delay and I understand your frustration. I will check your order status and get back to you with a clear update as soon as possible.' },
      { label: 'Empathetic', text: 'I completely understand how disappointing it is to wait without a clear update. Let me look into this right away and make sure you receive a precise answer.' },
      { label: 'Luxury tone', text: 'Thank you for your patience. I am truly sorry for the wait and will personally review your order to provide you with a clear and reassuring update.' },
      { label: 'Short', text: 'I am sorry for the delay. I will check your order now and send you an update as quickly as possible.' },
      { label: 'French', text: 'Je suis desole pour ce delai et je comprends votre frustration. Je vais verifier votre commande et revenir vers vous rapidement avec une reponse claire.' }
    ],
    speakerNote: 'Click each tone and show that the same input can become different outputs depending on the business need.'
  },
  {
    id: 10,
    type: 'speech',
    section: 'Excel',
    eyebrow: 'Universal pain',
    title: 'Everyone has an Excel file that hurts',
    subtitle: 'The 37-tab file. The mystery formula. The weekly copy-paste ritual.',
    time: '3 min',
    keyMessage: 'Excel is often where AI creates the fastest visible value.',
    bullets: ['Clean data', 'Create formulas', 'Detect anomalies', 'Summarize KPIs', 'Build reports', 'Explain what changed'],
    speakerNote: 'Pause after the title. People will recognize themselves immediately.'
  },
  {
    id: 11,
    type: 'excelGpt',
    section: 'Demo 3',
    eyebrow: 'Excel + GPT',
    title: 'Late Supplier: complex rules, simple execution',
    subtitle: 'The wow moment: AI can follow detailed operational logic when the rules are clear.',
    time: '8 min',
    complexity: [
      'Remove TG seller rows',
      'Deduplicate by ID',
      'Parse dates and calculate delays',
      'Apply 12 classification rules in exact priority order',
      'Create comments, pivot summary and owner mapping',
      'Export Excel and CSV files'
    ],
    promptBox: 'You are my data processor. Run the Late Supplier pipeline exactly as specified. Do not ask questions. Execute the steps verbatim.',
    keyMessage: 'This is not coding. This is business expertise translated into instructions that AI can execute repeatedly.',
    speakerNote: 'Show the big prompt/rules to make people understand the complexity. Explain that a GPT is ideal when the process is stable and repeatable.'
  },
  {
    id: 12,
    type: 'exercise',
    section: 'Exercise',
    eyebrow: 'Hands-on',
    title: 'Exercise: improve one real Excel file',
    subtitle: 'Use your own file. Ask AI to go one step further.',
    time: '10 min',
    challenge: 'Open an Excel or report file you use and ask AI to identify improvements and automation opportunities.',
    cards: [
      { title: 'Clean', text: 'Find duplicates, blank cells, inconsistent values and suspicious rows.' },
      { title: 'Explain', text: 'Explain formulas, columns, logic and what the file is really showing.' },
      { title: 'Improve', text: 'Suggest better formulas, concatenations, flags or calculated columns.' },
      { title: 'Analyze', text: 'Find anomalies, trends, risks and priority actions.' },
      { title: 'Automate', text: 'Identify tasks that can become a repeatable GPT or workflow.' },
      { title: 'Communicate', text: 'Draft a short management summary or action email from the file.' }
    ],
    promptBox: 'Analyze this file. Identify duplicates, blank cells and inconsistent values. Explain why they matter. Suggest formulas or concatenations to improve the file. Then propose 3 automation opportunities and a short management summary.',
    speakerNote: 'This is the most important hands-on moment. Help people formulate their first useful prompt and push them to ask for one step further, not just a summary.'
  },
  {
    id: 13,
    type: 'quiz',
    section: 'Prompting',
    eyebrow: 'Better prompts',
    title: 'Which prompt is better?',
    subtitle: 'Good outputs come from clear instructions.',
    time: '4 min',
    question: 'Which prompt will usually produce a better result?',
    options: ['Analyze this file', 'Make something useful', 'Summarize this file, identify anomalies, explain the main KPIs, and suggest 3 actions', 'Do AI on this'],
    answer: 'Summarize this file, identify anomalies, explain the main KPIs, and suggest 3 actions',
    revealTitle: 'Better prompt = clearer mission.',
    revealText: 'AI works better when you give context, objective, output format and constraints. You do not need technical skills, just clarity.',
    speakerNote: 'This is a practical teaching moment. Keep it short and memorable.'
  },
  {
    id: 14,
    type: 'agentBuilder',
    section: 'Agents',
    eyebrow: 'Exercise',
    title: 'Design your own AI Agent',
    subtitle: 'Even without paid access, everyone can design the workflow.',
    time: '7 min',
    note: 'Some people may not have access to create agents. That is OK: today we practice the logic first. The company-safe implementation should remain in the approved enterprise environment.',
    fields: ['Trigger: when should it run?', 'Sources: what should it check?', 'Task: what should it do?', 'Output: what should it send?', 'Audience: who should receive it?'],
    examples: ['Daily review monitor for brand reputation', 'Weekly factory risk summary', 'Competitor promotion tracker', 'Customer complaint escalation detector', 'Ecommerce trend digest'],
    speakerNote: 'Do not depend on everyone having paid access. The exercise is to design the agent. Mention that tools like ChatGPT tasks/agents, Zapier, Make or n8n exist, but sensitive data should stay in approved company tools.'
  },
  {
    id: 15,
    type: 'hubBuild',
    section: 'Customer Hub',
    eyebrow: 'Live build',
    title: 'Build a Hub category in 5 minutes',
    subtitle: 'Someone gives a department document. We turn it into a useful Hub page live.',
    time: '8 min',
    steps: ['Receive a document from one department', 'Ask AI to summarize and structure it', 'Create a new main menu category', 'Design the page with sections and actions', 'Publish it as reusable knowledge'],
    examples: ['Factory SOP', 'Brand FAQ', 'Operations process', 'Dev documentation', 'Customer Service policy'],
    keyMessage: 'AI becomes more powerful when it is connected to company knowledge and turned into reusable resources.',
    speakerNote: 'This is the Hub exercise. Ask someone before the training to give you a real department document. Build the category live.'
  },
  {
    id: 16,
    type: 'speech',
    section: 'Meta',
    eyebrow: 'Behind the scenes',
    title: 'AI helped build this training',
    subtitle: 'Agenda, slides, exercises, emails and Hub content were created with AI assistance.',
    time: '4 min',
    keyMessage: 'AI does not replace thinking. It accelerates structure, preparation and execution.',
    bullets: ['Brainstorming the agenda', 'Structuring the slides', 'Creating exercises', 'Writing countdown emails', 'Preparing the Hub page'],
    speakerNote: 'This is important for non-technical people. It shows that AI can help with planning, not only automation.'
  },
  {
    id: 17,
    type: 'quiz',
    section: 'Responsible AI',
    eyebrow: 'Safety',
    title: 'What should we never forget?',
    subtitle: 'AI is useful, but not magical.',
    time: '5 min',
    question: 'What is the most important rule when using AI with business or customer data?',
    options: ['Trust every answer immediately', 'Use any free tool with any data', 'Use approved enterprise tools and keep human judgment for sensitive decisions', 'Avoid AI completely'],
    answer: 'Use approved enterprise tools and keep human judgment for sensitive decisions',
    revealTitle: 'Correct. AI needs responsibility.',
    revealText: 'AI can hallucinate, misunderstand context or expose sensitive information if used incorrectly. Use GDPR-compliant tools and validate important outputs.',
    speakerNote: 'Keep it serious but not scary. Responsible usage makes adoption possible.'
  },
  {
    id: 18,
    type: 'closing',
    section: 'Closing',
    eyebrow: 'Takeaway',
    title: 'Start small',
    subtitle: 'One task. One workflow. One hour saved.',
    time: '3 min',
    keyMessage: 'Small productivity gains repeated across teams can create major impact.',
    bullets: ['Pick one repetitive task', 'Give AI clear context', 'Test the output', 'Improve the prompt', 'Share what works'],
    finalQuote: 'AI will not replace people. But people using AI will replace people not using AI.',
    speakerNote: 'End with a practical challenge: by next week, try AI on one real task and share the result.'
  },
  {
    id: 19,
    type: 'whatsNext',
    section: 'What next',
    eyebrow: 'After the session',
    title: 'What should you try next?',
    subtitle: 'Choose the right AI format and copy one prompt.',
    time: '5 min',
    nextSteps: [
      { need: 'I need quick help', tool: 'Chat', prompt: 'Rewrite this email to be clear, professional and warm. Keep it short and suggest a better subject line.' },
      { need: 'We work on a shared topic', tool: 'Project', prompt: 'Create a project summary, list open questions, decisions and next actions from these files and chats.' },
      { need: 'I repeat the same process', tool: 'GPT', prompt: 'Act as my weekly report assistant. Always check duplicates, blanks, anomalies, KPIs and draft a management summary.' },
      { need: 'I need monitoring', tool: 'Agent', prompt: 'Design an agent that checks this topic daily and sends a short email with risks, opportunities and links.' },
      { need: 'I need reusable knowledge', tool: 'Hub', prompt: 'Turn this document into a Hub page with overview, process steps, FAQs, risks and owner actions.' }
    ],
    speakerNote: 'This replaces the old prompt library. It is clearer because each prompt is connected to Chat, Project, GPT, Agent or Hub.'
  }
];

const colors = {
  bg: '#07111f', panel: '#0f1f33', panel2: '#132945', text: '#ffffff', muted: '#b8c7d9', cyan: '#67e8f9', cyanDark: '#0e7490', yellow: '#facc15', white: '#ffffff', darkText: '#0f172a', green: '#bbf7d0', red: '#fee2e2'
};

const styles = {
  page: { minHeight: '100vh', background: `radial-gradient(circle at 20% 0%, #164e63 0, transparent 36%), linear-gradient(135deg, ${colors.bg}, #020617)`, color: colors.text, fontFamily: 'Inter, Arial, Helvetica, sans-serif' },
  topBar: { position: 'sticky', top: 0, zIndex: 20, background: 'rgba(7, 17, 31, 0.94)', borderBottom: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' },
  topInner: { maxWidth: 1440, margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
  label: { fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, color: colors.cyan, margin: 0 },
  small: { fontSize: 14, color: colors.muted, margin: '5px 0 0' },
  navButton: { border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '10px 16px', borderRadius: 14, fontWeight: 800, cursor: 'pointer' },
  navButtonPrimary: { border: 'none', background: colors.cyan, color: colors.darkText, padding: '10px 18px', borderRadius: 14, fontWeight: 900, cursor: 'pointer' },
  layout: { maxWidth: 1440, minHeight: 'calc(100vh - 68px)', margin: '0 auto', padding: 24, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 20 },
  slideCard: { minHeight: 700, borderRadius: 34, padding: 44, background: 'linear-gradient(145deg, rgba(15,31,51,0.98), rgba(19,41,69,0.96))', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 24px 80px rgba(0,0,0,0.35)', overflow: 'hidden' },
  side: { display: 'flex', flexDirection: 'column', gap: 16 },
  sideCard: { borderRadius: 24, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', padding: 18 },
  title: { fontSize: 'clamp(40px, 5.4vw, 74px)', lineHeight: 1.02, margin: '18px 0 0', fontWeight: 950, letterSpacing: -2, maxWidth: 1100 },
  subtitle: { fontSize: 'clamp(20px, 2.1vw, 31px)', lineHeight: 1.25, color: colors.muted, margin: '20px 0 0', maxWidth: 1040 },
  bigBox: { borderRadius: 28, padding: 28, background: colors.cyan, color: colors.darkText, boxShadow: '0 18px 48px rgba(0,0,0,0.25)' },
  whiteBox: { borderRadius: 28, padding: 26, background: colors.white, color: colors.darkText, boxShadow: '0 18px 48px rgba(0,0,0,0.25)' },
  glassBox: { borderRadius: 26, padding: 22, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.12)' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 38 },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginTop: 32 },
  chip: { borderRadius: 18, padding: '18px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 24, fontWeight: 900 }
};

export default function AICustomerServiceTraining() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState({});
  const [selectedTransformation, setSelectedTransformation] = useState(0);
  const currentSlide = slides[currentIndex];
  const progress = useMemo(() => Math.round(((currentIndex + 1) / slides.length) * 100), [currentIndex]);
  const goToSlide = (id) => setCurrentIndex(Math.max(0, slides.findIndex((s) => s.id === id)));
  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, slides.length - 1));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const toggleReveal = (id) => setRevealed((s) => ({ ...s, [id]: !s[id] }));

  return (
    <main style={styles.page}>
      <div style={styles.topBar}>
        <div style={styles.topInner}>
          <div><p style={styles.label}>Tenengroup AI Training</p><p style={styles.small}>Slide {currentSlide.id} / {slides.length} - {currentSlide.section} - {currentSlide.time}</p></div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, maxWidth: 460 }}><div style={{ height: 9, flex: 1, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.14)' }}><div style={{ width: `${progress}%`, height: '100%', background: colors.cyan, borderRadius: 999 }} /></div><span style={{ color: colors.cyan, fontWeight: 900 }}>{progress}%</span></div>
          <div style={{ display: 'flex', gap: 10 }}><button onClick={goPrev} disabled={currentIndex === 0} style={{ ...styles.navButton, opacity: currentIndex === 0 ? 0.45 : 1 }}>Previous</button><button onClick={goNext} disabled={currentIndex === slides.length - 1} style={{ ...styles.navButtonPrimary, opacity: currentIndex === slides.length - 1 ? 0.45 : 1 }}>Next</button></div>
        </div>
      </div>
      <section style={styles.layout}>
        <div style={styles.slideCard}><SlideRenderer slide={currentSlide} revealed={revealed[currentSlide.id]} onReveal={() => toggleReveal(currentSlide.id)} selectedTransformation={selectedTransformation} setSelectedTransformation={setSelectedTransformation} goToSlide={goToSlide} /></div>
        <aside style={styles.side}>
          <div style={styles.sideCard}><p style={styles.label}>Speaker note</p><p style={{ ...styles.small, fontSize: 16, lineHeight: 1.6 }}>{currentSlide.speakerNote}</p></div>
          <div style={styles.sideCard}><p style={styles.label}>Deck map</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 16 }}>{slides.map((slide, index) => <button key={slide.id} onClick={() => setCurrentIndex(index)} title={slide.title} style={{ border: 'none', borderRadius: 12, padding: '10px 0', fontWeight: 900, cursor: 'pointer', background: index === currentIndex ? colors.cyan : 'rgba(255,255,255,0.11)', color: index === currentIndex ? colors.darkText : colors.text }}>{slide.id}</button>)}</div></div>
          <div style={styles.sideCard}><p style={styles.label}>Rhythm</p><RhythmItem label="Speech" value="Short" /><RhythmItem label="Quiz" value="Reveal" /><RhythmItem label="Demo" value="Concrete" /><RhythmItem label="Exercise" value="Practice" /></div>
        </aside>
      </section>
    </main>
  );
}

function SlideRenderer(props) {
  const { slide } = props;
  if (slide.type === 'quiz') return <QuizSlide {...props} />;
  if (slide.type === 'agentContextQuiz') return <AgentContextQuiz {...props} />;
  if (slide.type === 'flow') return <FlowSlide {...props} />;
  if (slide.type === 'businessCasePoll') return <BusinessCasePoll {...props} />;
  if (slide.type === 'toolNavigator') return <ToolNavigator {...props} />;
  if (slide.type === 'notchCase') return <NotchCase {...props} />;
  if (slide.type === 'interactiveDemo') return <InteractiveDemoSlide {...props} />;
  if (slide.type === 'excelGpt') return <ExcelGptSlide {...props} />;
  if (slide.type === 'exercise') return <ExerciseSlide {...props} />;
  if (slide.type === 'agentBuilder') return <AgentBuilderSlide {...props} />;
  if (slide.type === 'hubBuild') return <HubBuildSlide {...props} />;
  if (slide.type === 'closing') return <ClosingSlide {...props} />;
  if (slide.type === 'whatsNext') return <WhatsNextSlide {...props} />;
  return <SpeechSlide {...props} />;
}

function SlideHeader({ slide }) { return <div><p style={styles.label}>{slide.eyebrow}</p><h1 style={styles.title}>{slide.title}</h1>{slide.subtitle && <p style={styles.subtitle}>{slide.subtitle}</p>}</div>; }

function SpeechSlide({ slide }) { return <div style={{ minHeight: 680, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}><SlideHeader slide={slide} /><div style={styles.grid2}>{slide.keyMessage && <div style={styles.bigBox}><p style={{ margin: 0, fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 2 }}>Key message</p><p style={{ margin: '16px 0 0', fontSize: 32, lineHeight: 1.1, fontWeight: 950 }}>{slide.keyMessage}</p></div>}<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>{slide.bullets?.map((b) => <div key={b} style={styles.chip}>{b}</div>)}</div></div></div>; }

function AgentContextQuiz({ slide, revealed, onReveal }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 28 }}><div style={styles.whiteBox}><p style={{ fontSize: 26, fontWeight: 950, marginTop: 0 }}>Context</p>{slide.context.map((c) => <p key={c} style={{ fontSize: 19, lineHeight: 1.35, fontWeight: 750 }}>• {c}</p>)}<div style={{ borderRadius: 18, background: '#e0f2fe', padding: 18, marginTop: 16 }}><p style={{ margin: 0, fontWeight: 950, color: colors.cyanDark }}>Prompt excerpt</p><p style={{ margin: '8px 0 0', fontWeight: 800 }}>{slide.promptExcerpt}</p></div></div><div style={{ ...styles.glassBox, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 300 }}><p style={{ fontSize: 28, fontWeight: 950, color: colors.cyan }}>{slide.screenshotLabel}</p></div></div><QuizContent slide={slide} revealed={revealed} onReveal={onReveal} compact /></div>; }

function QuizSlide({ slide, revealed, onReveal }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><QuizContent slide={slide} revealed={revealed} onReveal={onReveal} /></div>; }
function QuizContent({ slide, revealed, onReveal, compact }) { return <div style={{ ...styles.whiteBox, marginTop: compact ? 20 : 34 }}><p style={{ fontSize: compact ? 24 : 32, fontWeight: 950, margin: 0 }}>{slide.question}</p><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>{slide.options.map((o) => <div key={o} style={{ borderRadius: 20, padding: 18, border: revealed && o === slide.answer ? '3px solid #16a34a' : '2px solid #e2e8f0', background: revealed && o === slide.answer ? colors.green : '#f8fafc', color: '#0f172a', fontSize: 19, fontWeight: 900, lineHeight: 1.25 }}>{o}</div>)}</div><button onClick={onReveal} style={{ marginTop: 22, border: 'none', borderRadius: 18, background: '#0f172a', color: 'white', padding: '14px 24px', fontSize: 19, fontWeight: 950, cursor: 'pointer' }}>{revealed ? 'Hide answer' : 'Reveal answer'}</button>{revealed && <div style={{ marginTop: 18, borderRadius: 24, background: colors.green, padding: 20 }}><p style={{ fontSize: 24, fontWeight: 950, margin: 0 }}>{slide.revealTitle}</p><p style={{ fontSize: 19, lineHeight: 1.4, margin: '8px 0 0' }}>{slide.revealText}</p></div>}</div>; }

function FlowSlide({ slide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={styles.grid3}>{slide.steps.map((s, i) => <div key={s} style={styles.whiteBox}><p style={{ margin: 0, fontSize: 13, fontWeight: 950, color: colors.cyanDark, textTransform: 'uppercase', letterSpacing: 2 }}>Step {i + 1}</p><p style={{ margin: '14px 0 0', fontSize: 30, lineHeight: 1.1, fontWeight: 950 }}>{s}</p></div>)}</div><div style={{ ...styles.bigBox, marginTop: 22 }}><p style={{ margin: 0, fontSize: 28, lineHeight: 1.15, fontWeight: 950 }}>{slide.keyMessage}</p></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 18 }}>{slide.applications.map((a) => <div key={a} style={{ ...styles.glassBox, fontSize: 20, fontWeight: 900 }}>{a}</div>)}</div></div>; }

function BusinessCasePoll({ slide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={styles.grid3}>{slide.cases.map((c) => <div key={c.team} style={styles.whiteBox}><p style={{ fontSize: 30, fontWeight: 950, margin: 0 }}>{c.team}</p><p style={{ color: '#64748b', fontWeight: 900, marginBottom: 4 }}>Pain</p><p style={{ fontSize: 22, fontWeight: 950, marginTop: 0 }}>{c.pain}</p><p style={{ color: '#64748b', fontWeight: 900, marginBottom: 4 }}>Mini case</p><p style={{ fontSize: 18, fontWeight: 800, color: colors.cyanDark, marginTop: 0 }}>{c.demo}</p></div>)}</div><p style={{ marginTop: 24, textAlign: 'center', color: colors.cyan, fontSize: 24, fontWeight: 950 }}>Vote by hand. We will prioritize the most relevant cases during the exercise.</p></div>; }

function ToolNavigator({ slide, goToSlide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 12, marginTop: 28 }}>{slide.tools.map((t) => <button key={t.name} onClick={() => goToSlide(t.targetSlide)} style={{ ...styles.whiteBox, padding: 18, textAlign: 'left', border: 'none', cursor: 'pointer', minHeight: 330 }}><p style={{ fontSize: 32, fontWeight: 950, margin: 0 }}>{t.name}</p><p style={{ color: '#64748b', fontWeight: 900, margin: '16px 0 4px' }}>Need</p><p style={{ fontSize: 21, fontWeight: 950, margin: 0 }}>{t.need}</p><p style={{ color: '#64748b', fontWeight: 900, margin: '16px 0 4px' }}>Simple</p><p style={{ fontSize: 16, fontWeight: 850, margin: 0 }}>{t.simple}</p><p style={{ color: '#64748b', fontWeight: 900, margin: '16px 0 4px' }}>Examples</p><p style={{ fontSize: 15, fontWeight: 850, color: colors.cyanDark, margin: 0 }}>{t.cs}<br />{t.other}</p></button>)}</div><p style={{ marginTop: 18, fontSize: 20, color: colors.cyan, fontWeight: 900 }}>Click a card to jump to the related demo.</p></div>; }

function NotchCase({ slide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={styles.grid2}><div style={{ ...styles.whiteBox, background: '#fef3c7' }}><p style={{ ...styles.label, color: '#92400e' }}>Customer message</p><p style={{ fontSize: 25, lineHeight: 1.28, fontWeight: 900 }}>{slide.customerMessage}</p></div><div style={styles.whiteBox}><p style={{ ...styles.label, color: colors.cyanDark }}>AI-assisted answer</p><p style={{ fontSize: 23, lineHeight: 1.32, fontWeight: 850 }}>{slide.aiAnswer}</p></div></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 22 }}>{slide.learnings.map((l) => <div key={l} style={{ ...styles.bigBox, padding: 16, fontSize: 20, fontWeight: 950, textAlign: 'center' }}>{l}</div>)}</div></div>; }

function InteractiveDemoSlide({ slide, selectedTransformation, setSelectedTransformation }) { const current = slide.transformations[selectedTransformation]; return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 24, marginTop: 34 }}><div style={{ ...styles.whiteBox, background: colors.red, color: '#7f1d1d' }}><p style={{ margin: 0, fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 2 }}>Original customer message</p><p style={{ margin: '22px 0 0', fontSize: 38, lineHeight: 1.1, fontWeight: 950 }}>"{slide.originalText}"</p></div><div style={styles.whiteBox}><div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>{slide.transformations.map((item, index) => <button key={item.label} onClick={() => setSelectedTransformation(index)} style={{ border: 'none', borderRadius: 14, padding: '12px 15px', fontWeight: 950, cursor: 'pointer', background: selectedTransformation === index ? colors.cyan : '#e2e8f0', color: colors.darkText }}>{item.label}</button>)}</div><div style={{ marginTop: 28, borderRadius: 24, background: colors.bg, padding: 28, color: colors.white }}><p style={styles.label}>{current.label} version</p><p style={{ margin: '18px 0 0', fontSize: 30, lineHeight: 1.18, fontWeight: 950 }}>"{current.text}"</p></div></div></div></div>; }

function ExcelGptSlide({ slide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={styles.grid2}><div style={styles.whiteBox}><p style={{ ...styles.label, color: colors.cyanDark }}>Rules complexity</p>{slide.complexity.map((c) => <p key={c} style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.25 }}>• {c}</p>)}</div><div style={styles.bigBox}><p style={{ fontSize: 15, fontWeight: 950, letterSpacing: 2, textTransform: 'uppercase', marginTop: 0 }}>Prompt</p><p style={{ fontSize: 28, lineHeight: 1.16, fontWeight: 950 }}>"{slide.promptBox}"</p></div></div><div style={{ ...styles.glassBox, marginTop: 20 }}><p style={{ fontSize: 26, fontWeight: 950, margin: 0 }}>{slide.keyMessage}</p></div></div>; }

function ExerciseSlide({ slide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={{ ...styles.bigBox, marginTop: 24 }}><p style={{ margin: 0, fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 2 }}>Challenge</p><p style={{ margin: '10px 0 0', fontSize: 29, fontWeight: 950 }}>{slide.challenge}</p></div><div style={styles.grid3}>{slide.cards.map((card) => <div key={card.title} style={{ ...styles.whiteBox, padding: 20 }}><p style={{ margin: 0, fontSize: 25, fontWeight: 950 }}>{card.title}</p><p style={{ margin: '10px 0 0', fontSize: 17, lineHeight: 1.38, color: '#334155', fontWeight: 750 }}>{card.text}</p></div>)}</div><div style={{ ...styles.glassBox, marginTop: 20, fontSize: 21, fontWeight: 900 }}>Prompt to try: "{slide.promptBox}"</div></div>; }

function AgentBuilderSlide({ slide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={{ ...styles.bigBox, marginTop: 22 }}><p style={{ margin: 0, fontSize: 23, fontWeight: 950 }}>{slide.note}</p></div><div style={styles.grid2}><div style={styles.whiteBox}><p style={{ ...styles.label, color: colors.cyanDark }}>Agent recipe</p>{slide.fields.map((f) => <div key={f} style={{ borderRadius: 16, background: '#f1f5f9', padding: 13, marginTop: 10, fontSize: 19, fontWeight: 950 }}>{f}</div>)}</div><div style={styles.glassBox}><p style={styles.label}>Examples</p>{slide.examples.map((e) => <div key={e} style={{ ...styles.chip, fontSize: 19, marginTop: 10 }}>{e}</div>)}</div></div></div>; }

function HubBuildSlide({ slide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={styles.grid2}><div style={styles.whiteBox}><p style={{ ...styles.label, color: colors.cyanDark }}>5-minute live build</p>{slide.steps.map((s, i) => <p key={s} style={{ fontSize: 22, fontWeight: 950 }}>{i + 1}. {s}</p>)}</div><div style={styles.glassBox}><p style={styles.label}>Possible documents</p>{slide.examples.map((e) => <div key={e} style={{ ...styles.chip, fontSize: 22, marginTop: 12 }}>{e}</div>)}</div></div><div style={{ ...styles.bigBox, marginTop: 20 }}><p style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>{slide.keyMessage}</p></div></div>; }

function ClosingSlide({ slide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 30 }}>{slide.bullets.map((b) => <div key={b} style={{ ...styles.whiteBox, padding: 18, textAlign: 'center', fontSize: 22, fontWeight: 950 }}>{b}</div>)}</div><div style={{ ...styles.bigBox, marginTop: 34, textAlign: 'center', padding: 42 }}><p style={{ margin: 0, fontSize: 42, lineHeight: 1.08, fontWeight: 950 }}>{slide.finalQuote}</p></div></div>; }

function WhatsNextSlide({ slide }) { return <div style={{ minHeight: 680 }}><SlideHeader slide={slide} /><div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 30 }}>{slide.nextSteps.map((s) => <div key={s.tool} style={{ ...styles.whiteBox, padding: 18 }}><p style={{ fontSize: 30, margin: 0, fontWeight: 950 }}>{s.tool}</p><p style={{ color: '#64748b', fontWeight: 900, marginBottom: 4 }}>Need</p><p style={{ fontSize: 18, fontWeight: 900 }}>{s.need}</p><p style={{ color: '#64748b', fontWeight: 900, marginBottom: 4 }}>Prompt</p><p style={{ fontSize: 14, lineHeight: 1.35, fontWeight: 750, color: colors.cyanDark }}>"{s.prompt}"</p></div>)}</div></div>; }

function RhythmItem({ label, value }) { return <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderRadius: 16, background: 'rgba(255,255,255,0.09)', padding: '11px 14px', marginTop: 10 }}><span style={{ fontWeight: 900 }}>{label}</span><span style={{ color: colors.muted }}>{value}</span></div>; }
