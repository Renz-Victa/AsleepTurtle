'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="nav__inner">
            <Link href="/" className="nav__logo">Asleep<span>Turtle</span></Link>

            <ul className="nav__links">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ color: pathname.startsWith(href) ? 'var(--text)' : undefined }}>
                    {label}
                  </Link>
                </li>
              ))}
              <li><Link href="/contact" className="nav__cta">Book a call</Link></li>
            </ul>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="nav__burger"
              style={{ display: 'none', background: 'none', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', padding: '8px 10px', color: 'var(--text)', fontSize: '16px', lineHeight: 1 }}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div style={{ position: 'fixed', inset: '68px 0 0 0', background: 'var(--bg)', zIndex: 90, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '2rem var(--gutter)' }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: pathname.startsWith(href) ? 'var(--accent)' : 'var(--text)', padding: '1rem 0', borderBottom: '1px solid var(--border)', letterSpacing: '-0.02em' }}>
              {label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '2rem', justifyContent: 'center' }}>
            Book a free strategy call →
          </Link>
        </div>
      )}

      <style>{`@media (max-width: 900px) { .nav__burger { display: flex !important; align-items: center; } }`}</style>
    </>
  )
}
