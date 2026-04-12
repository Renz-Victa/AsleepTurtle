import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story and beliefs behind AsleepTurtle.',
}

const beliefs = [
  {
    num: '01',
    title: 'The best AI system is the one that ships',
    body: "Perfect architecture that never reaches users creates zero value. We bias toward working software over elegant diagrams.",
  },
  {
    num: '02',
    title: 'Your team should own what we build',
    body: "We document obsessively and train as we go. Handover isn't an afterthought — it's baked into every engagement from day one.",
  },
  {
    num: '03',
    title: 'Honest scoping beats optimistic proposals',
    body: "We'd rather tell you an engagement will take twelve weeks than win the project with a six-week estimate and disappoint you.",
  },
  {
    num: '04',
    title: 'Startups need different thinking, not smaller enterprise thinking',
    body: "The governance frameworks and nine-month timelines that work at large firms will kill a startup. We think from your constraints, not ours.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__label">About</p>
          <h1 className="page-hero__h1">Built by practitioners, not advisors</h1>
          <p className="page-hero__sub">
            We've worked inside fast-moving companies. We know what AI adoption actually looks like
            when the board deck meets engineering reality.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="about__body">
            <div className="about__text">
              <h2>The story behind the name</h2>
              <p>
                AsleepTurtle started from a simple observation: most AI consulting is either too
                slow (large firms) or too shallow (freelancers). Startups need something in between
                — senior practitioners who think at speed.
              </p>
              <p>
                The name is a reminder that even the slowest-moving things get there eventually,
                as long as they don't stop. We help startups keep moving — methodically, without
                wasted steps.
              </p>
              <p>
                We work with a deliberately small roster of clients at any one time. Not because
                we can't grow — because quality of engagement matters more than volume. When you
                work with AsleepTurtle, you get direct access to senior thinking on every call,
                every deliverable, every decision.
              </p>

              <div className="about__beliefs">
                <h3>What we believe</h3>
                {beliefs.map((b) => (
                  <div key={b.num} className="belief-item">
                    <span className="belief-item__num">{b.num}</span>
                    <div>
                      <h4>{b.title}</h4>
                      <p>{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about__sidebar">
              <div className="about__sidebar-card">
                <h4>By the numbers</h4>
                <div className="sidebar-stat">
                  <p className="sidebar-stat__num">A–C</p>
                  <p className="sidebar-stat__label">Series focus</p>
                </div>
                <div className="sidebar-stat">
                  <p className="sidebar-stat__num">3</p>
                  <p className="sidebar-stat__label">Max active clients at once</p>
                </div>
                <div className="sidebar-stat">
                  <p className="sidebar-stat__num">NL</p>
                  <p className="sidebar-stat__label">Based in Rotterdam, working globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner__inner">
            <div>
              <h2>Let's have a real conversation.</h2>
              <p>No pitch. Just 30 minutes to understand your situation and whether we can help.</p>
            </div>
            <Link href="/contact" className="btn btn-primary" style={{ flexShrink: 0 }}>
              Book a call →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
