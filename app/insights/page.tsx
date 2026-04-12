import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { format, parseISO } from 'date-fns'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Practical writing on AI strategy and implementation for startup teams.',
}

export default function InsightsPage() {
  const posts = getAllPosts()
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.slug !== featured.slug)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__label">Insights</p>
          <h1 className="page-hero__h1">Practical writing on AI for startup teams</h1>
          <p className="page-hero__sub">
            No hype cycles. No vendor comparisons written by vendors. Just the thinking
            we would share with a founder over a coffee.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="insights__grid">
            <Link href={featured.url} className="post-card post-card--featured">
              <p className="post-card__tag">{featured.tag}</p>
              <h2 className="post-card__title">{featured.title}</h2>
              <p className="post-card__excerpt">{featured.excerpt}</p>
              <p className="post-card__meta">
                {format(parseISO(featured.date), 'MMMM yyyy')} · {featured.readTime}
              </p>
            </Link>
            {rest.map((post) => (
              <Link key={post.slug} href={post.url} className="post-card">
                <p className="post-card__tag">{post.tag}</p>
                <h2 className="post-card__title">{post.title}</h2>
                <p className="post-card__excerpt">{post.excerpt}</p>
                <p className="post-card__meta">
                  {format(parseISO(post.date), 'MMMM yyyy')} · {post.readTime}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
