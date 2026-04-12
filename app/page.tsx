import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AsleepTurtle — AI Consulting for Startups',
}

const services = [
  {
    num: '01',
    title: 'AI Strategy Sprint',
    desc: 'A focused 2–3 week engagement to audit your current state and produce a prioritised roadmap your team can execute.',
    href: '/services#strategy',
  },
  {
    num: '02',
    title: 'Implementation Partnership',
    desc: 'Embedded advisory and hands-on build support, working alongside your team from scoping through to production.',
    href: '/services#implementation',
  },
  {
    num: '03',
    title: 'Team Enablement',
    desc: 'Coaching and workshops that build lasting internal AI capability — so you stop depending on consultants.',
    href: '/services#enablement',
  },
]

const whyItems = [
  {
    num: '01',
    title: 'Senior access, always',
    body: "You work with us directly — not a junior team that read about AI last month. Every call, every deliverable.",
  },
  {
    num: '02',
    title: 'Outcome-focused, not effort-billed',
    body: "We scope by what gets shipped, not hours logged. If it doesn't move your roadmap forward, we don't bill for it.",
  },
  {
    num: '03',
    title: 'No lock-in by design',
    body: "We build your team's capability alongside anything we build for you. The goal is to make ourselves unnecessary.",
  },
  {
    num: '04',
    title: 'Startup-native thinking',
    body: "We've operated inside fast-moving companies. We know that the right solution is the one that ships — not the perfect one.",
  },
]

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <div className="hero__eyebrow">AI Consulting for Startups</div>
          <h1 className="hero__h1">
            Turn AI ambition into <em>working product.</em>
          </h1>
          <p className="hero__sub">
            Strategy, implementation, and team enablement for Series A–C companies
            moving faster than their AI roadmap.
          </p>
          <div className="hero__actions">
            <Link href="/contact" className="btn btn-primary">
              Book a free strategy call →
            </Link>
            <Link href="/services" className="btn btn-ghost">
              See how we work
            </Link>
          </div>
          <div className="hero__scroll">Scroll to explore</div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="problem">
        <div className="container">
          <div className="problem__grid">
            <div>
              <p className="problem__label">The problem</p>
              <h2 className="problem__h2">
                The hard part isn't believing in AI.
              </h2>
            </div>
            <div className="problem__text">
              <p>
                Most startups know AI is important. The hard part is knowing where to start,
                what to build in-house, what to buy, and how to avoid the six-month detour
                that ends with a model no one uses.
              </p>
              <p>
                We've seen that detour. We help you skip it.
              </p>
              <blockquote className="problem__quote">
                We're not here to impress your board. We're here to help your team ship.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Strip ── */}
      <section>
        <div className="container">
          <p className="problem__label">What we do</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, maxWidth: '20ch' }}>
            Three ways we work together
          </h2>
          <div className="services-strip__grid">
            {services.map((s) => (
              <Link href={s.href} key={s.num} className="service-card">
                <p className="service-card__num">{s.num}</p>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <span className="service-card__arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="why">
        <div className="container">
          <div className="why__header">
            <h2 className="why__h2">Why founders choose AsleepTurtle</h2>
            <p className="why__sub">
              We work with a small number of clients at a time. That's by design.
            </p>
          </div>
          <div className="why__list">
            {whyItems.map((item) => (
              <div key={item.num} className="why__item">
                <p className="why__item-num">{item.num}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="testimonial">
        <div className="container">
          <div className="testimonial__inner">
            <p className="testimonial__quote">
              "They restructured how we thought about the problem entirely — and cut our evaluation
              timeline from weeks to days."
            </p>
            <p className="testimonial__attr">CTO · Series B SaaS · Amsterdam</p>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div>
              <h2>Not sure if you need a consultant?</h2>
              <p>Let's talk for 30 minutes. No pitch — just an honest conversation about where you are.</p>
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
