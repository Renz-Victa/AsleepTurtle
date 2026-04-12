'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormData = {
  name: string
  email: string
  company: string
  stage: string
  challenge: string
}

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong — please email us directly at hello@asleepturtle.com')
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__label">Contact</p>
          <h1 className="page-hero__h1">Start a conversation</h1>
          <p className="page-hero__sub">
            No pitch, no obligation. A 30-minute call to understand your situation
            and whether we can help.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="contact__grid">
            <div className="contact__info">
              <h2>What to expect</h2>
              <p>
                We read every submission carefully before getting back to you — usually
                within one business day. The goal of the first call is simple: understand
                where you are, where you want to get to, and whether we are the right fit.
              </p>
              <div className="contact__detail"><h4>Response time</h4><p>Within 1 business day</p></div>
              <div className="contact__detail"><h4>First call format</h4><p>30 minutes, video or phone</p></div>
              <div className="contact__detail"><h4>Location</h4><p>Based in Rotterdam, NL. Working globally.</p></div>
              <div className="contact__detail"><h4>Email</h4><p>hello@asleepturtle.com</p></div>
            </div>

            <div className="contact__form">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '0.75rem' }}>Got it — thanks.</h3>
                  <p style={{ fontSize: '14px' }}>We will be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {serverError && (
                    <div style={{ background: 'rgba(226,75,74,0.1)', border: '1px solid rgba(226,75,74,0.3)', borderRadius: '6px', padding: '12px 16px', marginBottom: '1.5rem', fontSize: '13px', color: '#E24B4A' }}>
                      {serverError}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="name">Your name</label>
                    <input id="name" type="text" placeholder="Alex Chen" {...register('name', { required: 'Name is required' })} />
                    {errors.name && <p style={{ fontSize: '12px', color: '#E24B4A', marginTop: '0.4rem' }}>{errors.name.message}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Work email</label>
                    <input id="email" type="email" placeholder="alex@yourcompany.com" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} />
                    {errors.email && <p style={{ fontSize: '12px', color: '#E24B4A', marginTop: '0.4rem' }}>{errors.email.message}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input id="company" type="text" placeholder="Acme Inc." {...register('company', { required: 'Company is required' })} />
                    {errors.company && <p style={{ fontSize: '12px', color: '#E24B4A', marginTop: '0.4rem' }}>{errors.company.message}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="stage">Company stage</label>
                    <select id="stage" {...register('stage')}>
                      <option value="">Select stage</option>
                      <option value="pre-seed">Pre-seed</option>
                      <option value="seed">Seed</option>
                      <option value="series-a">Series A</option>
                      <option value="series-b">Series B</option>
                      <option value="series-c">Series C+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="challenge">What is the main challenge?</label>
                    <textarea id="challenge" placeholder="Tell us briefly where you are with AI and what you are trying to figure out..." {...register('challenge', { required: 'Please share a bit about your challenge' })} />
                    {errors.challenge && <p style={{ fontSize: '12px', color: '#E24B4A', marginTop: '0.4rem' }}>{errors.challenge.message}</p>}
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : 'Send message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
