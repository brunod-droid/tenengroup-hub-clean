import { useState } from 'react';

const slides = [
  {
    id: 1,
    tag: 'Opening',
    title: 'AI at Work',
    subtitle: 'How AI Removes Friction From Everyday Tasks',
    time: '3 min',
    objective: 'Set the tone: this is not a theory session, it is a practical workshop.',
    bullets: [
      'Real examples from Tenengroup operations and Customer Service',
      'Live demos, exercises, and concrete use cases',
      'Goal: leave with at least one task you can improve with AI'
    ],
    speakerNote: 'Start energetic. Tell them: today is not about AI replacing people. It is about removing boring friction from work.'
  },
  {
    id: 2,
    tag: 'Wow moment',
    title: 'You already interacted with an AI Agent this week',
    subtitle: 'The countdown emails were the first demo.',
    time: '5 min',
    objective: 'Make the audience realize they already experienced an automated AI workflow.',
    bullets: [
      'The agent read participant names and emails from a Google Sheet',
      'It searched for a useful AI/productivity insight',
      'It wrote, personalized, and sent the emails automatically',
      'No human validation: imperfections were part of the demo'
    ],
    speakerNote: 'Ask: who realized the countdown emails were fully automated? This is your first engagement moment.'
  },
  {
    id: 3,
    tag: 'Mindset',
    title: 'What people think AI is vs what AI actually does',
    subtitle: 'Less sci-fi, more daily productivity.',
    time: '4 min',
    objective: 'Break the fear and make AI feel accessible.',
    bullets: [
      'People imagine robots, replacement, and science fiction',
      'In reality, AI summarizes, writes, searches, organizes, monitors, and analyzes',
      'These are exactly the micro-tasks that slow teams down every day'
    ],
    speakerNote: 'Keep it light and funny. Mention the “copy-paste Olympics” and the 37-tab Excel file nobody wants to open.'
  },
  {
    id: 4,
    tag: 'Problem',
    title: 'The real enemy: micro-tasks',
    subtitle: 'Small tasks repeated every day become huge time losses.',
    time: '4 min',
    objective: 'Create relevance for every department.',
    bullets: [
      'Writing emails and follow-ups',
      'Cleaning Excel files and reports',
      'Searching for information in documents or tools',
      'Preparing summaries, plans, and updates',
      'Monitoring issues, reviews, trends, or competitors'
    ],
    speakerNote: 'Make people think about their own work. Ask: what is one task you repeat every week and hate doing?'
  },
  {
    id: 5,
    tag: 'Framework',
    title: 'Different AI tools for different needs',
    subtitle: 'Chat, Projects, GPTs, Agents, and Hub are not the same thing.',
    time: '6 min',
    objective: 'Clarify the AI ecosystem in simple business terms.',
    bullets: [
      'Chat: quick help, rewriting, summarizing, brainstorming',
      'Project: collaborative workspace with context and files, like ETA-1',
      'GPT: repeatable specialized assistant, like Late Supplier processing',
      'Agent: autonomous workflow, like the countdown email agent',
      'Hub: centralized knowledge and internal documentation'
    ],
    speakerNote: 'This is important. Many people confuse Projects and GPTs. Use simple metaphors: Project = workspace, GPT = specialized employee, Agent = autonomous teammate.'
  },
  {
    id: 6,
    tag: 'Demo',
    title: 'AI for customer communication',
    subtitle: 'Faster replies, better tone, more consistency.',
    time: '6 min',
    objective: 'Show how AI can improve quality, not only speed.',
    bullets: [
      'Use a real Notch customer case',
      'Show the customer message first',
      'Ask: human or AI-assisted?',
      'Reveal the AI-assisted reply and discuss tone, empathy, and clarity'
    ],
    speakerNote: 'Use the Adam Shaire sentimental locket example. It is emotional, concrete, and shows empathy.'
  },
  {
    id: 7,
    tag: 'Live demo',
    title: 'Rewrite this customer message live',
    subtitle: 'One message, many useful versions.',
    time: '6 min',
    objective: 'Make AI feel immediately usable.',
    bullets: [
      'Start with: “where is my order i wait since 2 weeks”',
      'Ask AI to make it professional',
      'Then empathetic, shorter, luxury tone, French version, escalation version',
      'Show that prompting is about guiding the output'
    ],
    speakerNote: 'Fast pace. This should feel fun and magical, but still practical.'
  },
  {
    id: 8,
    tag: 'Universal pain',
    title: 'The biggest universal pain: Excel',
    subtitle: 'Everyone has an Excel file that hurts.',
    time: '3 min',
    objective: 'Transition from communication to operational automation.',
    bullets: [
      'Cleaning data',
      'Creating formulas',
      'Building pivots and summaries',
      'Finding anomalies',
      'Repeating the same report every week'
    ],
    speakerNote: 'Pause after saying “Excel.” Let people react. This is the universal pain point.'
  },
  {
    id: 9,
    tag: 'Flagship demo',
    title: 'Late Supplier: operational expertise turned into automation',
    subtitle: 'Not coding. Clear business rules translated into instructions.',
    time: '8 min',
    objective: 'Show the strongest operational example.',
    bullets: [
      'Upload raw operational data',
      'Apply exact business rules and priorities',
      'Generate comments, summaries, owner mapping, and Excel outputs',
      'Create repeatable processing instead of manual work'
    ],
    speakerNote: 'Key sentence: this is not about replacing expertise. AI needs your expertise to automate correctly.'
  },
  {
    id: 10,
    tag: 'Exercise',
    title: 'Exercise 1: Use AI on your own Excel file',
    subtitle: 'Bring a real file. Ask for a real improvement.',
    time: '10 min',
    objective: 'Make every participant apply AI to their own work.',
    bullets: [
      'Summarize this file',
      'Find anomalies or duplicates',
      'Create formulas I need',
      'Build a KPI summary',
      'Explain this report and suggest improvements'
    ],
    speakerNote: 'Walk around. Help people convert vague requests into better prompts.'
  },
  {
    id: 11,
    tag: 'Agent mindset',
    title: 'AI Agents: from assistant to autonomous workflow',
    subtitle: 'Agents do not wait for instructions every time.',
    time: '6 min',
    objective: 'Explain what makes agents different.',
    bullets: [
      'They can run on a schedule',
      'They can search, monitor, summarize, and send updates',
      'Examples: CX monitoring, competitor tracking, review alerts, daily digests',
      'Your countdown emails were the live example'
    ],
    speakerNote: 'Make it concrete: an agent is useful when the task repeats and needs monitoring or communication.'
  },
  {
    id: 12,
    tag: 'Exercise',
    title: 'Exercise 2: Design your own AI Agent',
    subtitle: 'If you had one autonomous teammate, what would it do?',
    time: '6 min',
    objective: 'Help teams project AI into their own workflows.',
    bullets: [
      'What should it monitor?',
      'How often should it run?',
      'What source should it check?',
      'Who should it notify?',
      'What should the output look like?'
    ],
    speakerNote: 'Ask each group or department for one idea. Capture the best ones for follow-up.'
  },
  {
    id: 13,
    tag: 'Knowledge',
    title: 'The Customer Hub: AI connected to company knowledge',
    subtitle: 'AI becomes stronger when it has the right context.',
    time: '6 min',
    objective: 'Show the strategic value of the Hub.',
    bullets: [
      'Centralized processes and documentation',
      'Training resources and onboarding material',
      'Knowledge base for Customer Service and operations',
      'No-code approach: this training page itself was built with AI support'
    ],
    speakerNote: 'Show the live Hub page. Explain that the presentation is being added to the Hub as a reusable resource.'
  },
  {
    id: 14,
    tag: 'Meta demo',
    title: 'AI helped build this training',
    subtitle: 'AI is not only for execution. It helps structure thinking.',
    time: '4 min',
    objective: 'Make AI feel accessible for planning and preparation.',
    bullets: [
      'Agenda creation',
      'Slide structure',
      'Exercise design',
      'Invitation and countdown emails',
      'Hub page content'
    ],
    speakerNote: 'This is a very human moment: AI helped organize the thinking, but the business examples came from real work.'
  },
  {
    id: 15,
    tag: 'Trust',
    title: 'AI is powerful, but not magical',
    subtitle: 'We still need judgment, data protection, and common sense.',
    time: '5 min',
    objective: 'Add credibility and responsible usage.',
    bullets: [
      'AI can hallucinate or misunderstand context',
      'Bad prompts create bad outputs',
      'Customer data requires GDPR-compliant tools',
      'Human validation is still needed for sensitive decisions',
      'Use approved tools for company and customer data'
    ],
    speakerNote: 'This slide builds trust. Do not skip it.'
  },
  {
    id: 16,
    tag: 'Closing',
    title: 'Start small',
    subtitle: 'One task. One workflow. One hour saved.',
    time: '4 min',
    objective: 'Give a realistic adoption message.',
    bullets: [
      'Do not try to automate everything at once',
      'Pick one repetitive task',
      'Use AI to reduce friction',
      'Share what works with your team',
      'Small gains at scale create big impact'
    ],
    speakerNote: 'Final message: AI will not replace people, but people using AI will replace people not using AI.'
  }
];

const resources = [
  'AI Countdown Agent example',
  'Notch AI customer communication cases',
  'Late Supplier automation prompt',
  'ETA-1 project example',
  'Projects vs GPTs vs Agents guide',
  'Prompt library for email, Excel, reporting, and research',
  'GDPR and responsible AI reminders'
];

export default function AICustomerServiceTraining() {
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="fixed left-4 top-4 z-50">
        <a href="/" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
          ← Back to Hub
        </a>
      </div>
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20">
              Interactive training · Customer Service · Operations · Brands · Factory · Dev · Ecommerce
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              AI at Work
            </h1>
            <p className="mt-5 text-2xl font-semibold text-slate-200">
              How AI removes friction from everyday tasks
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A fun, practice-oriented 1-hour session based on real Tenengroup examples: AI agents, customer replies, Excel automation, shared projects, GPTs, and the Customer Hub.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#slides" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-100">
                View slides
              </a>
              <a href="#exercises" className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15">
                Jump to exercises
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">Duration</p>
            <p className="mt-2 text-3xl font-bold">60 min</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">Format</p>
            <p className="mt-2 text-3xl font-bold">Live demos</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">Goal</p>
            <p className="mt-2 text-3xl font-bold">1 task improved</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">Mindset</p>
            <p className="mt-2 text-3xl font-bold">Practical</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold">Training agenda</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AgendaItem time="0–10 min" title="AI Agent opening" text="Show the countdown email agent as a real example participants already experienced." />
            <AgendaItem time="10–20 min" title="Customer communication" text="Notch cases and live email rewriting demo." />
            <AgendaItem time="20–38 min" title="Excel automation" text="Late Supplier, ETA-1, reporting, and participant exercise." />
            <AgendaItem time="38–48 min" title="Projects, GPTs, Agents" text="Explain when to use each AI format with real Tenengroup examples." />
            <AgendaItem time="48–55 min" title="Customer Hub" text="Show how AI and company knowledge become reusable resources." />
            <AgendaItem time="55–60 min" title="Takeaways & Q&A" text="Start small: one task, one workflow, one hour saved." />
          </div>
        </div>
      </section>

      <section id="slides" className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Slide deck</p>
            <h2 className="text-3xl font-bold">Slide-by-slide training content</h2>
          </div>
          <p className="text-sm text-slate-500">Click a slide to review content and speaker notes.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="max-h-[720px] space-y-3 overflow-auto pr-2">
            {slides.map((slide) => (
              <button
                key={slide.id}
                onClick={() => setSelectedSlide(slide)}
                className={`w-full rounded-2xl p-4 text-left shadow-sm ring-1 transition ${
                  selectedSlide.id === slide.id
                    ? 'bg-slate-950 text-white ring-slate-950'
                    : 'bg-white text-slate-900 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide opacity-70">Slide {slide.id}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {slide.time}
                  </span>
                </div>
                <p className="mt-2 font-semibold">{slide.title}</p>
                <p className={`mt-1 text-sm ${selectedSlide.id === slide.id ? 'text-slate-300' : 'text-slate-500'}`}>
                  {slide.tag}
                </p>
              </button>
            ))}
          </div>

          <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                Slide {selectedSlide.id}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                {selectedSlide.tag}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                {selectedSlide.time}
              </span>
            </div>

            <h3 className="mt-6 text-4xl font-bold tracking-tight">{selectedSlide.title}</h3>
            <p className="mt-3 text-xl text-slate-600">{selectedSlide.subtitle}</p>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Objective</p>
              <p className="mt-2 text-slate-800">{selectedSlide.objective}</p>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Slide content</p>
              <ul className="mt-4 space-y-3">
                {selectedSlide.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-lg text-slate-800">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-indigo-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">Speaker note</p>
              <p className="mt-2 text-amber-950">{selectedSlide.speakerNote}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="exercises" className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <ExerciseCard
            title="Exercise 1 — Use AI on your own Excel file"
            description="Participants use a real file from their daily work and ask AI to summarize, clean, analyze, or automate part of it."
            prompts={[
              'Summarize this file and tell me the 5 most important insights.',
              'Find anomalies, duplicates, or missing data.',
              'Create formulas that would help me automate this report.',
              'Build a KPI summary for management.',
              'Explain what this report is showing in simple language.'
            ]}
          />
          <ExerciseCard
            title="Exercise 2 — Design your AI Agent"
            description="Participants imagine an agent that would run automatically for their team."
            prompts={[
              'What should the agent monitor?',
              'How often should it run?',
              'Which source should it check?',
              'Who should receive the output?',
              'What should the final email or report look like?'
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-300">Resources</p>
              <h2 className="mt-2 text-3xl font-bold">To add below the training page</h2>
              <p className="mt-4 text-slate-300">
                These resources should make the session useful after the live training and help teams reuse the examples.
              </p>
            </div>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource} className="rounded-2xl bg-white/10 px-4 py-3 text-slate-100 ring-1 ring-white/10">
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function AgendaItem({ time, title, text }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
      <p className="text-sm font-semibold text-indigo-600">{time}</p>
      <h3 className="mt-2 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function ExerciseCard({ title, description, prompts }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-slate-600">{description}</p>
      <div className="mt-6 space-y-3">
        {prompts.map((prompt) => (
          <div key={prompt} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-800 ring-1 ring-slate-200">
            “{prompt}”
          </div>
        ))}
      </div>
    </div>
  );
}
