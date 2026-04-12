import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import type { Metadata } from 'next'
import remarkGfm from 'remark-gfm'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  }
}

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', margin: '2.5rem 0 1rem', color: 'var(--text)' }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, margin: '2rem 0 0.75rem', color: 'var(--text)' }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '1.25rem', color: 'var(--text-muted)' }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1.5rem', margin: '2rem 0', fontStyle: 'italic', color: 'var(--text)', fontSize: '1.05rem' }} {...props} />
  ),
  hr: () => (
    <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2.5rem 0' }} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code style={{ fontFamily: 'var(--font-body)', fontSize: '13px', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px', color: 'var(--accent)' }} {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem', overflow: 'auto', fontSize: '13px', marginBottom: '1.5rem', lineHeight: 1.6 }} {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontSize: '14px' }} {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th style={{ textAlign: 'left' as const, padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' as const }} {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '13px', verticalAlign: 'top' as const }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }} {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ fontWeight: 600, color: 'var(--text)' }} {...props} />
  ),
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <section style={{ padding: '9rem 0 4rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <Link href="/insights" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            ← Insights
          </Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid rgba(184,255,60,0.25)', padding: '4px 12px', borderRadius: '100px' }}>
              {post.tag}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
              {format(parseISO(post.date), 'MMMM d, yyyy')} · {post.readTime}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.5rem', color: 'var(--text)' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: '56ch' }}>
            {post.excerpt}
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <MDXRemote
            source={post.content}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </section>

      <section style={{ padding: '0 0 4rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>
                Want to talk through how this applies to your company?
              </p>
              <p style={{ fontSize: '13px', margin: 0 }}>30 minutes, no pitch. Just an honest conversation.</p>
            </div>
            <Link href="/contact" className="btn btn-primary" style={{ flexShrink: 0 }}>Book a call →</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border)', padding: '4rem 0' }}>
          <div className="container">
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2rem' }}>More from Insights</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
              {related.map((r) => (
                <Link key={r.slug} href={r.url} className="post-card">
                  <p className="post-card__tag">{r.tag}</p>
                  <h2 className="post-card__title">{r.title}</h2>
                  <p className="post-card__excerpt">{r.excerpt}</p>
                  <p className="post-card__meta">{format(parseISO(r.date), 'MMMM yyyy')} · {r.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
