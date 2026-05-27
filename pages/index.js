import Head from 'next/head';

const modules = [
  {
    title: 'Customer Care Hub',
    description: 'Main workspace for customer service tools, training, documentation and operational dashboards.',
    href: '#customer-care',
    status: 'Active',
    accent: 'Core hub',
  },
  {
    title: 'TheoGrace Design Lab',
    description: 'Product page redesign concepts prepared for Brand Theme review, starting with the Totem 3D Bar Necklace.',
    href: '/theograce-design-lab',
    status: 'Draft v1',
    accent: 'New',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Customer Hub</title>
        <meta name="description" content="Customer service hub" />
      </Head>

      <main className="min-h-screen bg-[#f7f3ed] text-[#2b2118]">
        <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <div className="rounded-[32px] border border-[#eadfce] bg-white/80 p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9b6b43]">Tenen Group</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Customer Hub</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6f6256] md:text-lg">
              Central place for customer service resources, training, tools and brand projects. Yves Rocher has been moved to a separate hub.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {modules.map((module) => (
              <a
                key={module.title}
                href={module.href}
                className="group rounded-[28px] border border-[#eadfce] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-[#f1e6d8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5637]">
                    {module.accent}
                  </span>
                  <span className="text-sm text-[#9b6b43]">{module.status}</span>
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{module.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#6f6256]">{module.description}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-[#2b2118] group-hover:underline">
                  Open →
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
