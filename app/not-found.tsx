import Link from 'next/link'

export default function NotFound() {
  return (
    <section style={{ padding: '12rem 0 8rem', textAlign: 'center' }}>
      <div className="container">
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem, 15vw, 12rem)', fontWeight: 800, lineHeight: 1, color: 'var(--text-dim)', letterSpacing: '-0.05em', marginBottom: '1.5rem' }}>
          404
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          This page doesn't exist.
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
          Even the slowest turtle has to be somewhere. This one isn't here.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">Back to home →</Link>
          <Link href="/insights" className="btn btn-ghost">Read the blog</Link>
        </div>
      </div>
    </section>
  )
}
