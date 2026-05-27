import Head from 'next/head';
import { useMemo, useState } from 'react';

const concepts = [
  {
    id: '001',
    title: 'Create Your Story Necklace',
    product: 'Totem 3D Bar Necklace in Silver Finish',
    url: 'https://www.theograce.com/products/totem-3d-bar-necklace-in-silver-finish',
    status: 'Draft v1',
    priority: 'High potential',
    tags: ['PDP', 'Personalization', 'Storytelling', 'Conversion'],
  },
];

const sides = [
  {
    title: 'Side 1 — Your name',
    subtitle: 'Classic. Personal. Timeless.',
    examples: ['Emma', 'Sarah', 'Mia', 'Olivia'],
  },
  {
    title: 'Side 2 — Your words',
    subtitle: 'A phrase that means something only to you.',
    examples: ['I Love You', 'Blessed', 'Forever', 'The One'],
  },
  {
    title: 'Side 3 — Your passion',
    subtitle: 'Your mindset, your team, your drive.',
    examples: ['We Not Me', 'Hard Work Works', 'Process. Progress. Payoff.', 'Fearless'],
  },
  {
    title: 'Side 4 — Your symbol',
    subtitle: 'A date, initials, lucky number, emoji, or memory.',
    examples: ['12.08.24', '♡', 'M + J', '11:11'],
  },
];

export default function TheoGraceDesignLab() {
  const [selected, setSelected] = useState(concepts[0]);
  const [inscriptions, setInscriptions] = useState(['Emma', 'Blessed', 'We Not Me', '11:11']);

  const previewLine = useMemo(() => inscriptions.filter(Boolean).join(' · '), [inscriptions]);

  const updateInscription = (index, value) => {
    setInscriptions((current) => current.map((item, i) => (i === index ? value : item)));
  };

  return (
    <>
      <Head>
        <title>TheoGrace Design Lab | Customer Hub</title>
      </Head>

      <main className="page">
        <section className="hero">
          <div className="eyebrow">TheoGrace Design Lab</div>
          <div className="heroGrid">
            <div>
              <h1>Product page redesign concepts for Brand Theme review.</h1>
              <p className="lead">
                A dedicated space to collect, compare, and submit TheoGrace PDP design ideas one after another.
              </p>
              <div className="actions">
                <a className="primary" href="#concept-001">View concept #001</a>
                <a className="secondary" href={selected.url} target="_blank" rel="noreferrer">Open original PDP</a>
              </div>
            </div>
            <div className="heroCard">
              <span className="badge">Current proposal</span>
              <h2>{selected.title}</h2>
              <p>{selected.product}</p>
              <div className="tagRow">
                {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="sectionHeader">
            <div>
              <div className="eyebrow">Library</div>
              <h2>Saved redesign proposals</h2>
            </div>
            <span className="count">{concepts.length} concept</span>
          </div>

          <div className="cards">
            {concepts.map((concept) => (
              <button className="conceptCard" key={concept.id} onClick={() => setSelected(concept)}>
                <div className="cardTop">
                  <span>#{concept.id}</span>
                  <strong>{concept.status}</strong>
                </div>
                <h3>{concept.title}</h3>
                <p>{concept.product}</p>
                <div className="meta">Priority: {concept.priority}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="mockup" id="concept-001">
          <div className="mockupLeft">
            <div className="imagePanel">
              <div className="necklace">
                <div className="chain"></div>
                <div className="bar bar1">{inscriptions[0] || 'NAME'}</div>
                <div className="bar bar2">{inscriptions[1] || 'WORDS'}</div>
                <div className="bar bar3">{inscriptions[2] || 'PASSION'}</div>
                <div className="bar bar4">{inscriptions[3] || 'SYMBOL'}</div>
              </div>
              <p className="previewCaption">Live story preview: {previewLine}</p>
            </div>
          </div>

          <div className="mockupRight">
            <div className="eyebrow">PDP Concept #001</div>
            <h2>Create a necklace as unique as you are</h2>
            <p className="lead small">
              Personalize up to 4 sides with names, words, dates, symbols, or meaningful phrases that define your story.
            </p>

            <div className="inputList">
              {sides.map((side, index) => (
                <label className="inputBlock" key={side.title}>
                  <span>{side.title}</span>
                  <small>{side.subtitle}</small>
                  <input
                    value={inscriptions[index]}
                    maxLength={28}
                    onChange={(event) => updateInscription(index, event.target.value)}
                    placeholder={side.examples[0]}
                  />
                  <div className="exampleRow">
                    {side.examples.map((example) => (
                      <button key={example} type="button" onClick={() => updateInscription(index, example)}>{example}</button>
                    ))}
                  </div>
                </label>
              ))}
            </div>

            <button className="addToBag">Start creating yours</button>
            <div className="trustBar">
              <span>Waterproof</span>
              <span>Hypoallergenic</span>
              <span>Gift ready</span>
            </div>
          </div>
        </section>

        <section className="storySection">
          <div>
            <div className="eyebrow">Brand angle</div>
            <h2>Don’t just engrave a name. Create a necklace that tells your story.</h2>
          </div>
          <div className="storyGrid">
            {sides.map((side, index) => (
              <article key={side.title}>
                <span>0{index + 1}</span>
                <h3>{side.title.replace('Side ' + (index + 1) + ' — ', '')}</h3>
                <p>{side.subtitle}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .page { min-height: 100vh; padding: 32px; background: #f7f3ee; color: #211915; font-family: Inter, Arial, sans-serif; }
        .hero { border-radius: 32px; padding: 44px; background: linear-gradient(135deg, #fffaf5, #eadfd5); box-shadow: 0 24px 80px rgba(65, 45, 35, 0.12); }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.16em; font-size: 12px; font-weight: 800; color: #9c7357; margin-bottom: 14px; }
        .heroGrid { display: grid; grid-template-columns: 1.5fr 0.9fr; gap: 28px; align-items: stretch; }
        h1 { font-size: clamp(38px, 6vw, 72px); line-height: 0.95; margin: 0; max-width: 900px; }
        h2 { font-size: clamp(28px, 4vw, 46px); line-height: 1; margin: 0 0 16px; }
        h3 { margin: 0 0 10px; }
        .lead { font-size: 20px; line-height: 1.55; max-width: 720px; color: #6c5c53; }
        .lead.small { font-size: 17px; }
        .actions, .tagRow, .trustBar, .exampleRow { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
        .primary, .secondary, .addToBag { border: 0; border-radius: 999px; padding: 14px 20px; font-weight: 800; text-decoration: none; cursor: pointer; }
        .primary, .addToBag { background: #211915; color: white; }
        .secondary { background: white; color: #211915; }
        .heroCard, .conceptCard, .inputBlock, .storyGrid article { background: rgba(255,255,255,0.82); border: 1px solid rgba(80,55,40,0.09); border-radius: 26px; padding: 24px; text-align: left; box-shadow: 0 16px 40px rgba(65, 45, 35, 0.08); }
        .badge, .tagRow span, .count, .trustBar span { display: inline-flex; border-radius: 999px; background: #efe4db; color: #74533c; padding: 8px 12px; font-size: 12px; font-weight: 800; }
        .section, .storySection { margin-top: 28px; }
        .sectionHeader { display: flex; justify-content: space-between; align-items: end; margin-bottom: 18px; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
        .conceptCard { cursor: pointer; width: 100%; }
        .cardTop { display: flex; justify-content: space-between; color: #9c7357; margin-bottom: 18px; }
        .meta { margin-top: 18px; color: #6c5c53; font-weight: 700; }
        .mockup { margin-top: 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: stretch; }
        .imagePanel { min-height: 720px; border-radius: 36px; background: radial-gradient(circle at 50% 35%, #fff, #eadfd5 55%, #d5c0ad); position: relative; overflow: hidden; display: grid; place-items: center; box-shadow: inset 0 0 80px rgba(255,255,255,0.6); }
        .necklace { position: relative; width: 360px; height: 480px; }
        .chain { position: absolute; left: 82px; top: 0; width: 190px; height: 280px; border: 4px solid rgba(135,113,96,0.45); border-bottom: 0; border-radius: 50% 50% 0 0; }
        .bar { position: absolute; left: 116px; top: 238px; width: 128px; height: 178px; border-radius: 16px; background: linear-gradient(90deg, #eee, #fff, #b9b9b9); box-shadow: 0 24px 45px rgba(48,36,30,0.22); display: grid; place-items: center; font-size: 11px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; writing-mode: vertical-rl; }
        .bar1 { transform: rotate(-7deg) translateX(-54px); }
        .bar2 { transform: rotate(5deg) translateX(-18px); }
        .bar3 { transform: rotate(-3deg) translateX(18px); }
        .bar4 { transform: rotate(8deg) translateX(54px); }
        .previewCaption { position: absolute; bottom: 26px; left: 26px; right: 26px; padding: 16px; border-radius: 18px; background: rgba(255,255,255,0.78); color: #6c5c53; font-weight: 700; }
        .mockupRight { border-radius: 36px; padding: 34px; background: #fffaf5; }
        .inputList { display: grid; gap: 14px; margin: 24px 0; }
        .inputBlock { display: block; padding: 18px; }
        .inputBlock span { display: block; font-weight: 900; margin-bottom: 4px; }
        .inputBlock small { display: block; color: #7b6b62; margin-bottom: 12px; }
        input { width: 100%; box-sizing: border-box; border: 1px solid #dfd0c5; border-radius: 16px; padding: 14px 16px; font-size: 16px; outline: none; }
        .exampleRow { margin-top: 10px; }
        .exampleRow button { border: 0; background: #efe4db; color: #74533c; border-radius: 999px; padding: 8px 10px; cursor: pointer; font-weight: 700; }
        .addToBag { width: 100%; font-size: 16px; margin-bottom: 14px; }
        .trustBar { justify-content: center; }
        .storySection { border-radius: 36px; padding: 36px; background: #211915; color: white; }
        .storySection h2 { max-width: 760px; }
        .storyGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 26px; }
        .storyGrid article { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.12); color: white; }
        .storyGrid article span { color: #d8b79c; font-weight: 900; }
        .storyGrid article p { color: #e3d6ca; }
        @media (max-width: 900px) { .page { padding: 16px; } .hero { padding: 26px; } .heroGrid, .mockup { grid-template-columns: 1fr; } .storyGrid { grid-template-columns: 1fr; } .imagePanel { min-height: 560px; } }
      `}</style>
    </>
  );
}
