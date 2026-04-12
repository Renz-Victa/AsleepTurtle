import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tag: string
  readTime: string
  featured: boolean
  url: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const { data } = matter(raw)

      return {
        slug,
        url: `/insights/${slug}`,
        title: data.title as string,
        date: (data.date instanceof Date ? data.date.toISOString() : data.date) as string,
        excerpt: data.excerpt as string,
        tag: data.tag as string,
        readTime: data.readTime as string,
        featured: Boolean(data.featured),
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    url: `/insights/${slug}`,
    title: data.title as string,
    date: (data.date instanceof Date ? data.date.toISOString() : data.date) as string,
    excerpt: data.excerpt as string,
    tag: data.tag as string,
    readTime: data.readTime as string,
    featured: Boolean(data.featured),
    content,
  }
}
