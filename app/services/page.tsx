import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI Strategy, Implementation, and Team Enablement for startups and scale-ups.',
}

const services = [
  {
    id: 'strategy',
    tag: 'Engagement 01',
    title: 'AI Strategy Sprint',
    ideal: 'Best for startups that know AI matters but haven\'t found their footing.',
    what: "A focused 2–3 week engagement to audit your current state, identify your highest-value AI opportunities, and produce a prioritised roadmap your team can execute — with or without us.",
    why: "Most teams waste months evaluating the wrong things. We compress that process into a structured sprint that ends with clear decisions, not more optionality.",
    deliverables: [
      'AI readiness audit across data, team, and tooling',
      'High-value use-case shortlist with ROI framing',
      'Build / buy / partner recommendation per use-case',
      '90-day execution plan with ownership assigned',
    ],
    timing: '2–3 weeks · Fixed fee',
  },
  {
    id: 'implementation',
    tag: 'Engagement 02',
    title: 'Implementation Partnership',
    ideal: 'Best for startups with a defined use case that need hands-on help shipping it.',
    what: "Embedded advisory and build support — we work alongside your team, not in a silo. From architecture decisions and vendor selection through to production handover.",
    why: "Consultants who disappear after the deck leave you holding a prototype no one knows how to maintain. We stay through to the moment your team owns it.",
    deliverables: [
      'Architecture design and technical decision log',
      'Vendor / model evaluation and selection',
      'Prototype to production support',
      'Full documentation and team handover session',
    ],
    timing: '6–16 weeks · Retainer or milestone-based',
  },
  {
    id: 'enablement',
    tag: 'Engagement 03',
    title: 'Team Enablement',
    ideal: 'Best for startups that want to build internal AI capability, not dependency.',
    what: "Structured coaching and workshops for your engineering and product teams — how to evaluate models, design AI-native features, run evals, and make good build/buy decisions independently.",
    why: "The most durable competitive advantage isn't the AI system you ship — it's the team that knows how to keep improving it.",
    deliverables: [
      'Tailored workshop series (4–8 sessions)',
      'Evaluation and prompting reference frameworks',
      'Model comparison and selection methodology',
      'Ongoing office hours (duration dependent)',
    ],
    timing: '4–8 weeks · Fixed fee',
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__label">Services</p>
          <h1 className="page-hero__h1">Three ways we work with startups</h1>
          <p className="page-hero__sub">
            Every engagement starts with a conversation — not a proposal. We scope together
            so you're paying for what you actually need.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="services-page__intro">
            <p>
              We work with a small number of clients at any given time. That's not a sales
              line — it's how we ensure senior attention on every project. Below are the
              three engagement types we offer, though in practice most clients mix and
              match depending on where they are.
            </p>
          </div>

          {services.map((s) => (
            <div key={s.id} id={s.id} className="service-block">
              <div className="service-block__meta">
                <span className="service-block__tag">{s.tag}</span>
                <h2 className="service-block__h2">{s.title}</h2>
                <p className="service-block__ideal">{s.ideal}</p>
              </div>
              <div className="service-block__content">
                <h3>What it is</h3>
                <p>{s.what}</p>
                <h3>Why it works</h3>
                <p>{s.why}</p>
                <div className="service-block__deliverables">
                  <h4>What you get</h4>
                  <ul>
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <p className="service-block__timing">{s.timing}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="cta-banner__inner">
            <div>
              <h2>Not sure which engagement fits?</h2>
              <p>
                Most clients start with a 30-minute call. We'll tell you honestly what
                we think you need — even if it's not us.
              </p>
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
