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
      { label: 'Professional', text: 'I’m sorry for the delay and I understand your frustration. I’ll check your order status and get back to you with a clear update as soon as possible.' },
      { label: 'Empathetic', text: 'I completely understand how disappointing it is to wait without a clear update. Let me look into this right away and make sure you receive a precise answer.' },
      { label: 'Luxury tone', text: 'Thank you for your patience. I’m truly sorry for the wait and will personally review your order to provide you with a clear and reassuring update.' },
      { label: 'Short', text: 'I’m sorry for the delay. I’ll check your order now and send you an update as quickly as possible.' },
      { label: 'French', text: 'Je suis désolé pour ce délai et je comprends votre frustration. Je vais vérifier votre commande et revenir vers vous rapidement avec une réponse claire.' },
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
    speakerNote: 'Key message: this is not coding. This is Bruno’s operational expertise structured so AI can execute it.',
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
    revealText: 'AI works better when you give context, objective, output format and constraints. You do not need technical skills — just clarity.',
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
    examples: [
      'Daily review monitor for brand reputation',
      'Weekly factory risk summary',
      'Competitor promotion tracker',
      'Customer complaint escalation detector',
      'Ecommerce trend digest',
    ],
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
      { title: 'For scale', text: 'Knowledge stops living only in people’s heads.' },
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
  {
    title: 'Email',
    prompt: 'Rewrite this email to be clear, professional and warm. Keep it short and suggest a better subject line.',
  },
  {
    title: 'Excel',
    prompt: 'Analyze this file. Identify the main KPIs, anomalies, missing data and 3 actions I should take.',
  },
  {
    title: 'Planning',
    prompt: 'Turn this objective into a simple action plan with owners, priorities and deadlines.',
  },
  {
    title: 'Knowledge base',
    prompt: 'Summarize this document into a short SOP with steps, risks and FAQs.',
  },
  {
    title: 'Agent idea',
    prompt: 'Design an AI Agent that monitors this topic daily and sends a short actionable email summary.',
  },
];

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
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Tenengroup AI Training</p>
            <p className="text-sm text-slate-300">Slide {currentSlide.id} / {slides.length} · {currentSlide.section} · {currentSlide.time}</p>
          </div>
          <div className="hidden flex-1 items-center gap-3 md:flex">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-cyan-300 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm font-semibold text-cyan-200">{progress}%</span>
          </div>
          <div className="flex gap-2">
            <button onClick={goPrev} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/15 disabled:opacity-40" disabled={currentIndex === 0}>Previous</button>
            <button onClick={goNext} className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-200 disabled:opacity-40" disabled={currentIndex === slides.length - 1}>Next</button>
          </div>
        </div>
      </div>

      <section className="mx-auto grid min-h-[calc(100vh-70px)] max-w-7xl grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-[1fr_330px]">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl md:p-12">
          <SlideRenderer
            slide={currentSlide}
            revealed={revealed[currentSlide.id]}
            onReveal={() => toggleReveal(currentSlide.id)}
            selectedTransformation={selectedTransformation}
            setSelectedTransformation={setSelectedTransformation}
          />
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Speaker note</p>
            <p className="mt-3 text-base leading-7 text-slate-200">{currentSlide.speakerNote}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Deck map</p>
            <div className="mt-4 grid max-h-[420px] grid-cols-3 gap-2 overflow-auto pr-1">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-xl px-3 py-2 text-sm font-bold transition ${index === currentIndex ? 'bg-cyan-300 text-slate-950' : 'bg-white/10 text-slate-300 hover:bg-white/15'}`}
                  title={slide.title}
                >
                  {slide.id}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Session rhythm</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <RhythmItem label="Speech" value="Short explanation" />
              <RhythmItem label="Quiz" value="Click to reveal" />
              <RhythmItem label="Demo" value="Real business case" />
              <RhythmItem label="Exercise" value="Participants apply it" />
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Prompt library</p>
              <h2 className="mt-2 text-4xl font-black">Copy/paste prompts for after the session</h2>
            </div>
            <p className="max-w-xl text-slate-300">These prompts make the training useful after the live session. Each team can adapt them to its own daily work.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {promptLibrary.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-5 text-slate-950 shadow-xl">
                <p className="text-lg font-black">{item.title}</p>
                <p className="mt-4 text-sm leading-6 text-slate-700">“{item.prompt}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SlideRenderer({ slide, revealed, onReveal, selectedTransformation, setSelectedTransformation }) {
  if (slide.type === 'quiz') {
    return <QuizSlide slide={slide} revealed={revealed} onReveal={onReveal} />;
  }
  if (slide.type === 'flow') {
    return <FlowSlide slide={slide} />;
  }
  if (slide.type === 'poll') {
    return <PollSlide slide={slide} />;
  }
  if (slide.type === 'toolkit') {
    return <ToolkitSlide slide={slide} />;
  }
  if (slide.type === 'demo') {
    return <DemoSlide slide={slide} />;
  }
  if (slide.type === 'interactiveDemo') {
    return <InteractiveDemoSlide slide={slide} selected={selectedTransformation} setSelected={setSelectedTransformation} />;
  }
  if (slide.type === 'exercise') {
    return <ExerciseSlide slide={slide} />;
  }
  if (slide.type === 'agentBuilder') {
    return <AgentBuilderSlide slide={slide} />;
  }
  if (slide.type === 'hub') {
    return <HubSlide slide={slide} />;
  }
  if (slide.type === 'closing') {
    return <ClosingSlide slide={slide} />;
  }
  return <SpeechSlide slide={slide} />;
}

function SlideHeader({ slide }) {
  return (
    <div>
      <p className="text-base font-bold uppercase tracking-[0.25em] text-cyan-300">{slide.eyebrow}</p>
      <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">{slide.title}</h1>
      {slide.subtitle && <p className="mt-6 max-w-4xl text-2xl leading-9 text-slate-300 md:text-3xl">{slide.subtitle}</p>}
    </div>
  );
}

function SpeechSlide({ slide }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        {slide.keyMessage && (
          <div className="rounded-3xl bg-cyan-300 p-8 text-slate-950 shadow-xl">
            <p className="text-sm font-black uppercase tracking-wide">Key message</p>
            <p className="mt-4 text-3xl font-black leading-tight">{slide.keyMessage}</p>
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {slide.bullets?.map((bullet) => (
            <div key={bullet} className="rounded-3xl bg-white/10 p-6 text-2xl font-bold text-white ring-1 ring-white/10">
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuizSlide({ slide, revealed, onReveal }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-8 rounded-3xl bg-white p-8 text-slate-950 shadow-2xl">
        <p className="text-3xl font-black">{slide.question}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {slide.options.map((option) => (
            <div key={option} className={`rounded-2xl border-2 p-5 text-xl font-bold ${revealed && option === slide.answer ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-slate-50'}`}>
              {option}
            </div>
          ))}
        </div>
        <button onClick={onReveal} className="mt-8 rounded-2xl bg-slate-950 px-8 py-4 text-xl font-black text-white hover:bg-slate-800">
          {revealed ? 'Hide answer' : 'Reveal answer'}
        </button>
        {revealed && (
          <div className="mt-6 rounded-3xl bg-emerald-100 p-6 text-emerald-950">
            <p className="text-2xl font-black">{slide.revealTitle}</p>
            <p className="mt-2 text-xl leading-8">{slide.revealText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FlowSlide({ slide }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {slide.steps.map((step, index) => (
          <div key={step} className="rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
            <p className="text-sm font-black uppercase tracking-wide text-cyan-700">Step {index + 1}</p>
            <p className="mt-4 text-3xl font-black leading-tight">{step}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-3xl bg-cyan-300 p-8 text-slate-950">
        <p className="text-3xl font-black">{slide.keyMessage}</p>
      </div>
    </div>
  );
}

function PollSlide({ slide }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {slide.pollOptions.map((option) => (
          <div key={option} className="rounded-3xl bg-white/10 p-8 text-center text-3xl font-black ring-1 ring-white/10">
            {option}
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-2xl font-bold text-cyan-200">Vote by hand. We will use the answers to choose the most relevant demos.</p>
    </div>
  );
}

function ToolkitSlide({ slide }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-10 grid gap-4 lg:grid-cols-5">
        {slide.tools.map((tool) => (
          <div key={tool.name} className="rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
            <p className="text-3xl font-black">{tool.name}</p>
            <p className="mt-4 text-lg font-bold text-slate-600">Best for</p>
            <p className="text-2xl font-black">{tool.use}</p>
            <p className="mt-4 text-lg font-bold text-slate-600">Example</p>
            <p className="text-xl font-bold text-cyan-700">{tool.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoSlide({ slide }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl bg-white p-8 text-slate-950 shadow-xl">
          <p className="text-sm font-black uppercase tracking-wide text-cyan-700">Demo goal</p>
          <p className="mt-4 text-3xl font-black leading-tight">{slide.demoGoal}</p>
          {slide.promptBox && (
            <div className="mt-8 rounded-2xl bg-slate-100 p-5 text-lg font-semibold text-slate-800">
              “{slide.promptBox}”
            </div>
          )}
        </div>
        <div className="grid gap-4">
          {slide.bullets.map((bullet) => (
            <div key={bullet} className="rounded-3xl bg-white/10 p-6 text-2xl font-bold ring-1 ring-white/10">
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveDemoSlide({ slide, selected, setSelected }) {
  const current = slide.transformations[selected];
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-red-100 p-8 text-red-950 shadow-xl">
          <p className="text-sm font-black uppercase tracking-wide">Original customer message</p>
          <p className="mt-5 text-4xl font-black leading-tight">“{slide.originalText}”</p>
        </div>
        <div className="rounded-3xl bg-white p-8 text-slate-950 shadow-xl">
          <div className="flex flex-wrap gap-2">
            {slide.transformations.map((item, index) => (
              <button key={item.label} onClick={() => setSelected(index)} className={`rounded-xl px-4 py-3 text-sm font-black ${selected === index ? 'bg-cyan-300 text-slate-950' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white">
            <p className="text-sm font-black uppercase tracking-wide text-cyan-300">{current.label} version</p>
            <p className="mt-5 text-3xl font-black leading-tight">“{current.text}”</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExerciseSlide({ slide }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-8 rounded-3xl bg-cyan-300 p-8 text-slate-950 shadow-xl">
        <p className="text-sm font-black uppercase tracking-wide">Challenge</p>
        <p className="mt-3 text-3xl font-black">{slide.challenge}</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slide.cards.map((card) => (
          <div key={card.title} className="rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
            <p className="text-2xl font-black">{card.title}</p>
            <p className="mt-3 text-lg font-semibold leading-7 text-slate-700">{card.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-white/10 p-6 text-2xl font-bold ring-1 ring-white/10">Prompt to try: “{slide.promptBox}”</div>
    </div>
  );
}

function AgentBuilderSlide({ slide }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl bg-white p-8 text-slate-950 shadow-xl">
          <p className="text-sm font-black uppercase tracking-wide text-cyan-700">Agent recipe</p>
          <div className="mt-5 space-y-3">
            {slide.fields.map((field) => (
              <div key={field} className="rounded-2xl bg-slate-100 p-4 text-xl font-black">{field}</div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/10">
          <p className="text-sm font-black uppercase tracking-wide text-cyan-300">Examples</p>
          <div className="mt-5 space-y-4">
            {slide.examples.map((example) => (
              <div key={example} className="rounded-2xl bg-white/10 p-5 text-2xl font-bold">{example}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HubSlide({ slide }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {slide.blocks.map((block) => (
          <div key={block.title} className="rounded-3xl bg-white p-8 text-slate-950 shadow-xl">
            <p className="text-3xl font-black">{block.title}</p>
            <p className="mt-4 text-xl font-semibold leading-8 text-slate-700">{block.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClosingSlide({ slide }) {
  return (
    <div className="flex min-h-[680px] flex-col justify-between">
      <SlideHeader slide={slide} />
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {slide.bullets.map((bullet) => (
          <div key={bullet} className="rounded-3xl bg-white p-6 text-center text-2xl font-black text-slate-950 shadow-xl">
            {bullet}
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-3xl bg-cyan-300 p-10 text-center text-slate-950 shadow-xl">
        <p className="text-4xl font-black leading-tight md:text-5xl">{slide.finalQuote}</p>
      </div>
    </div>
  );
}

function RhythmItem({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3">
      <span className="font-bold text-white">{label}</span>
      <span>{value}</span>
    </div>
  );
}
