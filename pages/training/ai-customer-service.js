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
    keyMessage: 'AI is not a magic tool. It is a practical assistant for small repetitive tasks.',
    bullets: ['Real Tenengroup examples', 'Live demos', 'Exercises with your own files', 'One concrete idea to use tomorrow'],
    speakerNote: 'Start with energy. Explain that the goal is not to become AI experts. The goal is to identify where AI can save time in daily work.',
  },
  {
    id: 2,
    type: 'quiz',
    section: 'Quiz',
    eyebrow: 'Warm-up',
    title: 'Which one was already done by an AI Agent?',
    subtitle: 'Before we even started the training...',
    time: '4 min',
    question: 'What did the AI Agent do before this session?',
    options: [
      'Only drafted the invitation text',
      'Read a Google Sheet, personalized emails, searched information and sent messages automatically',
      'Only corrected spelling mistakes',
      'Only created slides',
    ],
    answer: 'Read a Google Sheet, personalized emails, searched information and sent messages automatically',
    revealTitle: 'Exactly. You already experienced an AI Agent.',
    revealText: 'The countdown emails were the first live demo: scheduled, personalized, automatically written and sent. Even imperfections were part of the experiment.',
    speakerNote: 'Ask people to raise hands before revealing the answer. This creates immediate engagement.',
  },
  {
    id: 3,
    type: 'flow',
    section: 'Agent example',
    eyebrow: 'Live example',
    title: 'The countdown email agent',
    subtitle: 'A simple autonomous workflow people can understand immediately.',
    time: '5 min',
    steps: ['Google Sheet', 'Names + emails', 'AI searches one useful insight', 'AI writes the email', 'AI personalizes it', 'Email is sent automatically'],
    keyMessage: 'An Agent is useful when a task repeats, uses information, and needs an output.',
    speakerNote: 'Show the Google Sheet and one email. Do not over-explain the technology. Focus on the workflow.',
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
    speakerNote: 'Make it funny: AI is not a robot taking your chair. It is the intern who loves Excel, summaries and repetitive tasks.',
  },
  {
    id: 5,
    type: 'poll',
    section: 'Participation',
    eyebrow: 'Quick poll',
    title: 'Where do you lose the most time?',
    subtitle: 'Pick the pain that hurts most in your daily work.',
    time: '5 min',
    pollOptions: ['Excel / reports', 'Emails / writing', 'Searching information', 'Planning / follow-up', 'Meetings / summaries', 'Monitoring issues'],
    speakerNote: 'Ask people to vote by hand. Then connect their answers to the next sections.',
  },
  {
    id: 6,
    type: 'toolkit',
    section: 'Framework',
    eyebrow: 'Choose the right AI format',
    title: 'Chat, Project, GPT, Agent or Hub?',
    subtitle: 'Different needs require different AI setups.',
    time: '6 min',
    tools: [
      { name: 'Chat', use: 'Quick help', example: 'Rewrite an email' },
      { name: 'Project', use: 'Shared context', example: 'ETA-1 campaign' },
      { name: 'GPT', use: 'Repeatable expert', example: 'Late Supplier processor' },
      { name: 'Agent', use: 'Autonomous workflow', example: 'Countdown emails' },
      { name: 'Hub', use: 'Company knowledge', example: 'Customer Hub' },
    ],
    speakerNote: 'Use simple metaphors: Chat = quick helper. Project = workspace. GPT = specialized employee. Agent = autonomous teammate. Hub = library + assistant.',
  },
  {
    id: 7,
    type: 'quiz',
    section: 'Quiz',
    eyebrow: 'Tool choice',
    title: 'What should become a GPT?',
    subtitle: 'Choose the best AI setup for the task.',
    time: '4 min',
    question: 'Which task is the best candidate for a GPT?',
    options: ['A one-time brainstorm', 'A temporary project discussion', 'A repeatable Late Supplier process with stable rules', 'A live competitor monitor that sends daily alerts'],
    answer: 'A repeatable Late Supplier process with stable rules',
    revealTitle: 'Correct: stable process = GPT.',
    revealText: 'A GPT is best when the task has stable instructions and should behave the same way every time. A daily monitor is better as an Agent.',
    speakerNote: 'This slide helps people understand Projects vs GPTs vs Agents with a real operational example.',
  },
  {
    id: 8,
    type: 'demo',
    section: 'Customer communication',
    eyebrow: 'Demo 1',
    title: 'AI can improve customer communication',
    subtitle: 'Faster replies, better tone, stronger consistency.',
    time: '6 min',
    demoGoal: 'Show a real Notch case and ask: human or AI-assisted?',
    bullets: ['Show the customer message', 'Reveal the AI-assisted answer', 'Discuss empathy, clarity and speed', 'Explain where human judgment still matters'],
    promptBox: 'Rewrite this answer to be empathetic, concise, professional and adapted to a sentimental customer case.',
    speakerNote: 'Use the Adam Shaire locket example. It shows emotion, not just automation.',
  },
  {
    id: 9,
    type: 'interactiveDemo',
    section: 'Live demo',
    eyebrow: 'Demo 2',
    title: 'One message. Five useful versions.',
    subtitle: 'This is how easy AI assistance can be.',
    time: '6 min',
    originalText: 'where is my order i wait since 2 weeks no answer this is unacceptable',
    transformations: [
      { label: 'Professional', text: 'I am sorry for the delay and I understand your frustration. I will check your order status and get back to you with a clear update as soon as possible.' },
      { label: 'Empathetic', text: 'I completely understand how disappointing it is to wait without a clear update. Let me look into this right away and make sure you receive a precise answer.' },
      { label: 'Luxury tone', text: 'Thank you for your patience. I am truly sorry for the wait and will personally review your order to provide you with a clear and reassuring update.' },
      { label: 'Short', text: 'I am sorry for the delay. I will check your order now and send you an update as quickly as possible.' },
      { label: 'French', text: 'Je suis desole pour ce delai et je comprends votre frustration. Je vais verifier votre commande et revenir vers vous rapidement avec une reponse claire.' },
    ],
    speakerNote: 'Click each tone and show that the same input can become different outputs depending on the business need.',
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
    speakerNote: 'Pause after the title. People will recognize themselves immediately.',
  },
  {
    id: 11,
    type: 'demo',
    section: 'Excel automation',
    eyebrow: 'Flagship example',
    title: 'Late Supplier: from business rules to automation',
    subtitle: 'Operational expertise translated into clear AI instructions.',
    time: '8 min',
    demoGoal: 'Show that AI can process files when the rules are clear.',
    bullets: ['Upload raw operational data', 'Apply exact classification rules', 'Generate comments and summaries', 'Create Excel output and CSV exports', 'Reduce manual work and errors'],
    promptBox: 'You are my data processor. Run the Late Supplier pipeline exactly as specified. Do not ask questions. Execute the steps verbatim.',
    speakerNote: 'Key message: this is not coding. This is Bruno operational expertise structured so AI can execute it.',
  },
  {
    id: 12,
    type: 'exercise',
    section: 'Exercise',
    eyebrow: 'Hands-on',
    title: 'Exercise: improve one real Excel file',
    subtitle: 'Use your own file. Pick one concrete improvement.',
    time: '10 min',
    challenge: 'Open an Excel or report file you use and ask AI to help with one improvement.',
    cards: [
      { title: 'Brand', text: 'Summarize customer feedback, campaign results or product comments.' },
      { title: 'Factory', text: 'Detect late orders, anomalies, missing data or production blockers.' },
      { title: 'Operations', text: 'Clean reports, compare files, create weekly summaries.' },
      { title: 'Dev', text: 'Document a process, explain errors, summarize requirements.' },
      { title: 'Customer Service', text: 'Analyze ticket drivers, SLA, refunds, complaints or macros.' },
      { title: 'Ecommerce', text: 'Summarize performance, trends, reviews or conversion issues.' },
    ],
    promptBox: 'Analyze this file. Tell me what it contains, what looks unusual, and suggest 3 ways to automate or improve this report.',
    speakerNote: 'This is the most important hands-on moment. Help people formulate their first useful prompt.',
  },
  {
    id: 13,
    type: 'quiz',
    section: 'Quiz',
    eyebrow: 'Prompting',
    title: 'Which prompt is better?',
    subtitle: 'Good outputs come from clear instructions.',
    time: '4 min',
    question: 'Which prompt will usually produce a better result?',
    options: ['Analyze this file', 'Make something useful', 'Summarize this file, identify anomalies, explain the main KPIs, and suggest 3 actions', 'Do AI on this'],
    answer: 'Summarize this file, identify anomalies, explain the main KPIs, and suggest 3 actions',
    revealTitle: 'Better prompt = clearer mission.',
    revealText: 'AI works better when you give context, objective, output format and constraints. You do not need technical skills, just clarity.',
    speakerNote: 'This is a practical teaching moment. Keep it short and memorable.',
  },
  {
    id: 14,
    type: 'agentBuilder',
    section: 'Agents',
    eyebrow: 'Exercise',
    title: 'Design your own AI Agent',
    subtitle: 'If you had one autonomous teammate, what should it do?',
    time: '7 min',
    fields: ['Trigger: when should it run?', 'Sources: what should it check?', 'Task: what should it do?', 'Output: what should it send?', 'Audience: who should receive it?'],
    examples: ['Daily review monitor for brand reputation', 'Weekly factory risk summary', 'Competitor promotion tracker', 'Customer complaint escalation detector', 'Ecommerce trend digest'],
    speakerNote: 'Ask people to design one agent in pairs. No technical details. Just workflow thinking.',
  },
  {
    id: 15,
    type: 'hub',
    section: 'Customer Hub',
    eyebrow: 'Knowledge',
    title: 'AI becomes stronger with company knowledge',
    subtitle: 'The Customer Hub turns processes and training into reusable knowledge.',
    time: '6 min',
    blocks: [
      { title: 'For onboarding', text: 'New people can find processes faster.' },
      { title: 'For support', text: 'Teams can search SOPs and policies.' },
      { title: 'For training', text: 'This presentation becomes a reusable resource.' },
      { title: 'For scale', text: 'Knowledge stops living only in people heads.' },
    ],
    speakerNote: 'Show the live Hub page. Mention that the page itself was built with AI support and will be improved after the session.',
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
    speakerNote: 'This is important for non-technical people. It shows that AI can help with planning, not only automation.',
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
    options: ['Trust every answer immediately', 'Use any free tool with any data', 'Use approved tools and keep human judgment for sensitive decisions', 'Avoid AI completely'],
    answer: 'Use approved tools and keep human judgment for sensitive decisions',
    revealTitle: 'Correct. AI needs responsibility.',
    revealText: 'AI can hallucinate, misunderstand context or expose sensitive information if used incorrectly. Use GDPR-compliant tools and validate important outputs.',
    speakerNote: 'Keep it serious but not scary. Responsible usage makes adoption possible.',
  },
  {
    id: 18,
    type: 'closing',
    section: 'Closing',
    eyebrow: 'Takeaway',
    title: 'Start small',
    subtitle: 'One task. One workflow. One hour saved.',
    time: '4 min',
    keyMessage: 'Small productivity gains repeated across teams can create major impact.',
    bullets: ['Pick one repetitive task', 'Give AI clear context', 'Test the output', 'Improve the prompt', 'Share what works'],
    finalQuote: 'AI will not replace people. But people using AI will replace people not using AI.',
    speakerNote: 'End with a practical challenge: by next week, try AI on one real task and share the result.',
  },
];

const promptLibrary = [
  { title: 'Email', prompt: 'Rewrite this email to be clear, professional and warm. Keep it short and suggest a better subject line.' },
  { title: 'Excel', prompt: 'Analyze this file. Identify the main KPIs, anomalies, missing data and 3 actions I should take.' },
  { title: 'Planning', prompt: 'Turn this objective into a simple action plan with owners, priorities and deadlines.' },
  { title: 'Knowledge base', prompt: 'Summarize this document into a short SOP with steps, risks and FAQs.' },
  { title: 'Agent idea', prompt: 'Design an AI Agent that monitors this topic daily and sends a short actionable email summary.' },
];

const colors = {
  bg: '#07111f',
  panel: '#0f1f33',
  panel2: '#132945',
  text: '#ffffff',
  muted: '#b8c7d9',
  cyan: '#67e8f9',
  cyanDark: '#0e7490',
  yellow: '#facc15',
  white: '#ffffff',
  darkText: '#0f172a',
  green: '#bbf7d0',
  red: '#fee2e2',
};

const styles = {
  page: {
    minHeight: '100vh',
    background: `radial-gradient(circle at 20% 0%, #164e63 0, transparent 36%), linear-gradient(135deg, ${colors.bg}, #020617)`,
    color: colors.text,
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
  },
  topBar: {
    position: 'sticky',
    top: 0,
    zIndex: 20,
    background: 'rgba(7, 17, 31, 0.94)',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(10px)',
  },
  topInner: {
    maxWidth: 1440,
    margin: '0 auto',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: colors.cyan,
    margin: 0,
  },
  small: {
    fontSize: 14,
    color: colors.muted,
    margin: '5px 0 0',
  },
  navButton: {
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: 14,
    fontWeight: 800,
    cursor: 'pointer',
  },
  navButtonPrimary: {
    border: 'none',
    background: colors.cyan,
    color: colors.darkText,
    padding: '10px 18px',
    borderRadius: 14,
    fontWeight: 900,
    cursor: 'pointer',
  },
  layout: {
    maxWidth: 1440,
    minHeight: 'calc(100vh - 68px)',
    margin: '0 auto',
    padding: 24,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 320px',
    gap: 20,
  },
  slideCard: {
    minHeight: 700,
    borderRadius: 34,
    padding: 48,
    background: 'linear-gradient(145deg, rgba(15,31,51,0.98), rgba(19,41,69,0.96))',
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
  },
  side: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  sideCard: {
    borderRadius: 24,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    padding: 18,
  },
  title: {
    fontSize: 'clamp(44px, 6vw, 80px)',
    lineHeight: 1.02,
    margin: '18px 0 0',
    fontWeight: 950,
    letterSpacing: -2,
    maxWidth: 1100,
  },
  subtitle: {
    fontSize: 'clamp(22px, 2.3vw, 34px)',
    lineHeight: 1.25,
    color: colors.muted,
    margin: '22px 0 0',
    maxWidth: 1040,
  },
  bigBox: {
    borderRadius: 28,
    padding: 28,
    background: colors.cyan,
    color: colors.darkText,
    boxShadow: '0 18px 48px rgba(0,0,0,0.25)',
  },
  whiteBox: {
    borderRadius: 28,
    padding: 28,
    background: colors.white,
    color: colors.darkText,
    boxShadow: '0 18px 48px rgba(0,0,0,0.25)',
  },
  glassBox: {
    borderRadius: 26,
    padding: 24,
    background: 'rgba(255,255,255,0.09)',
    border: '1px solid rgba(255,255,255,0.12)',
  },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 44 },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 36 },
  grid5: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginTop: 36 },
  chip: {
    borderRadius: 18,
    padding: '18px 20px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.12)',
    fontSize: 26,
    fontWeight: 900,
  },
  footerSection: { maxWidth: 1440, margin: '0 auto', padding: '0 24px 44px' },
};

export default function AICustomerServiceTraining() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState({});
  const [selectedTransformation, setSelectedTransformation] = useState(0);
  const currentSlide = slides[currentIndex];
  const progress = useMemo(() => Math.round(((currentIndex + 1) / slides.length) * 100), [currentIndex]);

  const goNext = () => setCurrentIndex((index) => Math.min(index + 1, slides.length - 1));
  const goPrev = () => setCurrentIndex((index) => Math.max(index - 1, 0));
  const toggleReveal = (id) => setRevealed((state) => ({ ...state, [id]: !state[id] }));

  return (
    <main style={styles.page}>
      <div style={styles.topBar}>
        <div style={styles.topInner}>
          <div>
            <p style={styles.label}>Tenengroup AI Training</p>
            <p style={styles.small}>Slide {currentSlide.id} / {slides.length} - {currentSlide.section} - {currentSlide.time}</p>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, maxWidth: 460 }}>
            <div style={{ height: 9, flex: 1, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.14)' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: colors.cyan, borderRadius: 999 }} />
            </div>
            <span style={{ color: colors.cyan, fontWeight: 900 }}>{progress}%</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={goPrev} disabled={currentIndex === 0} style={{ ...styles.navButton, opacity: currentIndex === 0 ? 0.45 : 1 }}>Previous</button>
            <button onClick={goNext} disabled={currentIndex === slides.length - 1} style={{ ...styles.navButtonPrimary, opacity: currentIndex === slides.length - 1 ? 0.45 : 1 }}>Next</button>
          </div>
        </div>
      </div>

      <section style={styles.layout}>
        <div style={styles.slideCard}>
          <SlideRenderer
            slide={currentSlide}
            revealed={revealed[currentSlide.id]}
            onReveal={() => toggleReveal(currentSlide.id)}
            selectedTransformation={selectedTransformation}
            setSelectedTransformation={setSelectedTransformation}
          />
        </div>

        <aside style={styles.side}>
          <div style={styles.sideCard}>
            <p style={styles.label}>Speaker note</p>
            <p style={{ ...styles.small, fontSize: 16, lineHeight: 1.6 }}>{currentSlide.speakerNote}</p>
          </div>

          <div style={styles.sideCard}>
            <p style={styles.label}>Deck map</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 16 }}>
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(index)}
                  title={slide.title}
                  style={{
                    border: 'none',
                    borderRadius: 12,
                    padding: '10px 0',
                    fontWeight: 900,
                    cursor: 'pointer',
                    background: index === currentIndex ? colors.cyan : 'rgba(255,255,255,0.11)',
                    color: index === currentIndex ? colors.darkText : colors.text,
                  }}
                >
                  {slide.id}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.sideCard}>
            <p style={styles.label}>Session rhythm</p>
            <RhythmItem label="Speech" value="Short" />
            <RhythmItem label="Quiz" value="Reveal" />
            <RhythmItem label="Demo" value="Concrete" />
            <RhythmItem label="Exercise" value="Practice" />
          </div>
        </aside>
      </section>

      <section style={styles.footerSection}>
        <div style={{ ...styles.glassBox, padding: 34 }}>
          <p style={styles.label}>Prompt library</p>
          <h2 style={{ fontSize: 42, lineHeight: 1.1, margin: '14px 0 10px', fontWeight: 950 }}>Copy/paste prompts for after the session</h2>
          <p style={{ ...styles.small, fontSize: 18 }}>These prompts make the training useful after the live session. Each team can adapt them to its own daily work.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginTop: 26 }}>
            {promptLibrary.map((item) => (
              <div key={item.title} style={{ ...styles.whiteBox, padding: 20 }}>
                <p style={{ fontSize: 21, margin: 0, fontWeight: 950 }}>{item.title}</p>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: '#334155', margin: '14px 0 0' }}>"{item.prompt}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SlideRenderer({ slide, revealed, onReveal, selectedTransformation, setSelectedTransformation }) {
  if (slide.type === 'quiz') return <QuizSlide slide={slide} revealed={revealed} onReveal={onReveal} />;
  if (slide.type === 'flow') return <FlowSlide slide={slide} />;
  if (slide.type === 'poll') return <PollSlide slide={slide} />;
  if (slide.type === 'toolkit') return <ToolkitSlide slide={slide} />;
  if (slide.type === 'demo') return <DemoSlide slide={slide} />;
  if (slide.type === 'interactiveDemo') return <InteractiveDemoSlide slide={slide} selected={selectedTransformation} setSelected={setSelectedTransformation} />;
  if (slide.type === 'exercise') return <ExerciseSlide slide={slide} />;
  if (slide.type === 'agentBuilder') return <AgentBuilderSlide slide={slide} />;
  if (slide.type === 'hub') return <HubSlide slide={slide} />;
  if (slide.type === 'closing') return <ClosingSlide slide={slide} />;
  return <SpeechSlide slide={slide} />;
}

function SlideHeader({ slide }) {
  return (
    <div>
      <p style={styles.label}>{slide.eyebrow}</p>
      <h1 style={styles.title}>{slide.title}</h1>
      {slide.subtitle && <p style={styles.subtitle}>{slide.subtitle}</p>}
    </div>
  );
}

function SpeechSlide({ slide }) {
  return (
    <div style={{ minHeight: 680, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <SlideHeader slide={slide} />
      <div style={styles.grid2}>
        {slide.keyMessage && (
          <div style={styles.bigBox}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 2 }}>Key message</p>
            <p style={{ margin: '16px 0 0', fontSize: 34, lineHeight: 1.1, fontWeight: 950 }}>{slide.keyMessage}</p>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {slide.bullets?.map((bullet) => <div key={bullet} style={styles.chip}>{bullet}</div>)}
        </div>
      </div>
    </div>
  );
}

function QuizSlide({ slide, revealed, onReveal }) {
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={{ ...styles.whiteBox, marginTop: 34 }}>
        <p style={{ fontSize: 32, fontWeight: 950, margin: 0 }}>{slide.question}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
          {slide.options.map((option) => (
            <div key={option} style={{
              borderRadius: 20,
              padding: 22,
              border: revealed && option === slide.answer ? '3px solid #16a34a' : '2px solid #e2e8f0',
              background: revealed && option === slide.answer ? colors.green : '#f8fafc',
              color: '#0f172a',
              fontSize: 22,
              fontWeight: 900,
              lineHeight: 1.25,
            }}>
              {option}
            </div>
          ))}
        </div>
        <button onClick={onReveal} style={{ marginTop: 28, border: 'none', borderRadius: 18, background: '#0f172a', color: 'white', padding: '16px 26px', fontSize: 21, fontWeight: 950, cursor: 'pointer' }}>
          {revealed ? 'Hide answer' : 'Reveal answer'}
        </button>
        {revealed && (
          <div style={{ marginTop: 22, borderRadius: 24, background: colors.green, padding: 24 }}>
            <p style={{ fontSize: 28, fontWeight: 950, margin: 0 }}>{slide.revealTitle}</p>
            <p style={{ fontSize: 21, lineHeight: 1.45, margin: '8px 0 0' }}>{slide.revealText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FlowSlide({ slide }) {
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={styles.grid3}>
        {slide.steps.map((step, index) => (
          <div key={step} style={styles.whiteBox}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 950, color: colors.cyanDark, textTransform: 'uppercase', letterSpacing: 2 }}>Step {index + 1}</p>
            <p style={{ margin: '14px 0 0', fontSize: 32, lineHeight: 1.1, fontWeight: 950 }}>{step}</p>
          </div>
        ))}
      </div>
      <div style={{ ...styles.bigBox, marginTop: 28 }}>
        <p style={{ margin: 0, fontSize: 34, lineHeight: 1.1, fontWeight: 950 }}>{slide.keyMessage}</p>
      </div>
    </div>
  );
}

function PollSlide({ slide }) {
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={styles.grid3}>
        {slide.pollOptions.map((option) => <div key={option} style={{ ...styles.glassBox, fontSize: 32, textAlign: 'center', fontWeight: 950 }}>{option}</div>)}
      </div>
      <p style={{ marginTop: 34, textAlign: 'center', color: colors.cyan, fontSize: 28, fontWeight: 950 }}>Vote by hand. We will use the answers to choose the most relevant demos.</p>
    </div>
  );
}

function ToolkitSlide({ slide }) {
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={styles.grid5}>
        {slide.tools.map((tool) => (
          <div key={tool.name} style={{ ...styles.whiteBox, padding: 20 }}>
            <p style={{ fontSize: 32, fontWeight: 950, margin: 0 }}>{tool.name}</p>
            <p style={{ fontSize: 15, fontWeight: 900, color: '#64748b', margin: '20px 0 4px' }}>Best for</p>
            <p style={{ fontSize: 24, fontWeight: 950, margin: 0 }}>{tool.use}</p>
            <p style={{ fontSize: 15, fontWeight: 900, color: '#64748b', margin: '20px 0 4px' }}>Example</p>
            <p style={{ fontSize: 20, fontWeight: 900, color: colors.cyanDark, margin: 0 }}>{tool.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoSlide({ slide }) {
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={styles.grid2}>
        <div style={styles.whiteBox}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 950, color: colors.cyanDark, textTransform: 'uppercase', letterSpacing: 2 }}>Demo goal</p>
          <p style={{ margin: '18px 0 0', fontSize: 34, lineHeight: 1.1, fontWeight: 950 }}>{slide.demoGoal}</p>
          {slide.promptBox && <div style={{ marginTop: 28, borderRadius: 18, background: '#f1f5f9', padding: 20, fontSize: 18, fontWeight: 800, color: '#334155' }}>"{slide.promptBox}"</div>}
        </div>
        <div style={{ display: 'grid', gap: 14 }}>
          {slide.bullets.map((bullet) => <div key={bullet} style={styles.chip}>{bullet}</div>)}
        </div>
      </div>
    </div>
  );
}

function InteractiveDemoSlide({ slide, selected, setSelected }) {
  const current = slide.transformations[selected];
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 24, marginTop: 34 }}>
        <div style={{ ...styles.whiteBox, background: colors.red, color: '#7f1d1d' }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 2 }}>Original customer message</p>
          <p style={{ margin: '22px 0 0', fontSize: 40, lineHeight: 1.1, fontWeight: 950 }}>"{slide.originalText}"</p>
        </div>
        <div style={styles.whiteBox}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {slide.transformations.map((item, index) => (
              <button key={item.label} onClick={() => setSelected(index)} style={{ border: 'none', borderRadius: 14, padding: '12px 15px', fontWeight: 950, cursor: 'pointer', background: selected === index ? colors.cyan : '#e2e8f0', color: colors.darkText }}>
                {item.label}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 28, borderRadius: 24, background: colors.bg, padding: 28, color: colors.white }}>
            <p style={{ ...styles.label, margin: 0 }}>{current.label} version</p>
            <p style={{ margin: '18px 0 0', fontSize: 32, lineHeight: 1.18, fontWeight: 950 }}>"{current.text}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExerciseSlide({ slide }) {
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={{ ...styles.bigBox, marginTop: 30 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: 2 }}>Challenge</p>
        <p style={{ margin: '12px 0 0', fontSize: 34, fontWeight: 950 }}>{slide.challenge}</p>
      </div>
      <div style={styles.grid3}>
        {slide.cards.map((card) => (
          <div key={card.title} style={{ ...styles.whiteBox, padding: 22 }}>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>{card.title}</p>
            <p style={{ margin: '12px 0 0', fontSize: 18, lineHeight: 1.45, color: '#334155', fontWeight: 750 }}>{card.text}</p>
          </div>
        ))}
      </div>
      <div style={{ ...styles.glassBox, marginTop: 24, fontSize: 24, fontWeight: 900 }}>Prompt to try: "{slide.promptBox}"</div>
    </div>
  );
}

function AgentBuilderSlide({ slide }) {
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={styles.grid2}>
        <div style={styles.whiteBox}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 950, color: colors.cyanDark, textTransform: 'uppercase', letterSpacing: 2 }}>Agent recipe</p>
          <div style={{ display: 'grid', gap: 12, marginTop: 20 }}>
            {slide.fields.map((field) => <div key={field} style={{ borderRadius: 18, background: '#f1f5f9', padding: 18, fontSize: 22, fontWeight: 950 }}>{field}</div>)}
          </div>
        </div>
        <div style={styles.glassBox}>
          <p style={styles.label}>Examples</p>
          <div style={{ display: 'grid', gap: 14, marginTop: 20 }}>
            {slide.examples.map((example) => <div key={example} style={styles.chip}>{example}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function HubSlide({ slide }) {
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 40 }}>
        {slide.blocks.map((block) => (
          <div key={block.title} style={styles.whiteBox}>
            <p style={{ margin: 0, fontSize: 34, fontWeight: 950 }}>{block.title}</p>
            <p style={{ margin: '14px 0 0', fontSize: 22, lineHeight: 1.35, color: '#334155', fontWeight: 750 }}>{block.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClosingSlide({ slide }) {
  return (
    <div style={{ minHeight: 680 }}>
      <SlideHeader slide={slide} />
      <div style={styles.grid5}>
        {slide.bullets.map((bullet) => <div key={bullet} style={{ ...styles.whiteBox, padding: 20, textAlign: 'center', fontSize: 24, fontWeight: 950 }}>{bullet}</div>)}
      </div>
      <div style={{ ...styles.bigBox, marginTop: 34, textAlign: 'center', padding: 42 }}>
        <p style={{ margin: 0, fontSize: 46, lineHeight: 1.08, fontWeight: 950 }}>{slide.finalQuote}</p>
      </div>
    </div>
  );
}

function RhythmItem({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderRadius: 16, background: 'rgba(255,255,255,0.09)', padding: '11px 14px', marginTop: 10 }}>
      <span style={{ fontWeight: 900 }}>{label}</span>
      <span style={{ color: colors.muted }}>{value}</span>
    </div>
  );
}
