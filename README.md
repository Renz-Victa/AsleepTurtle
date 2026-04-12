# AsleepTurtle — Website

AI consulting website for AsleepTurtle. Built with Next.js 14 (App Router), plain CSS, Contentlayer + MDX for the blog, React Hook Form for contact, and Resend for email delivery.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Plain CSS (globals.css) |
| Blog/Content | Contentlayer + MDX |
| Forms | React Hook Form |
| Email | Resend |
| SEO | next-seo + next-sitemap |
| Hosting | Vercel (recommended) |
| Domain/DNS | Cloudflare (recommended) |
| Analytics | Plausible (self-serve setup) |

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Then fill in your values in `.env.local`:

```
RESEND_API_KEY=re_your_key_here
SITE_URL=https://asleepturtle.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=asleepturtle.com
```

Get a free Resend API key at [resend.com](https://resend.com). The free tier (3,000 emails/month) is more than enough to start.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
asleepturtle/
├── app/
│   ├── layout.tsx          # Root layout (Nav + Footer)
│   ├── globals.css         # All styles — design tokens, components, pages
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # Custom 404
│   ├── services/
│   │   └── page.tsx        # Services page
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── insights/
│   │   ├── page.tsx        # Blog index
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post (renders MDX)
│   ├── contact/
│   │   ├── page.tsx        # Server wrapper (metadata)
│   │   └── ContactClient.tsx  # Client component with form
│   └── api/
│       └── contact/
│           └── route.ts    # POST handler — sends email via Resend
├── components/
│   ├── Nav.tsx
│   └── Footer.tsx
├── content/
│   └── posts/              # MDX blog posts — add new .mdx files here
│       ├── ai-readiness-audit.mdx
│       ├── why-first-ai-project-fails.mdx
│       ├── build-vs-buy-vs-partner.mdx
│       ├── ai-governance-at-50-employees.mdx
│       └── ai-product-brief.mdx
├── contentlayer.config.ts  # Defines Post document type
├── next.config.js          # Next.js + Contentlayer integration
├── next-sitemap.config.js  # Sitemap + robots.txt generation
└── .env.local.example      # Environment variable reference
```

---

## Writing a new blog post

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: "Your Post Title"
date: 2026-05-01
excerpt: "A one or two sentence summary shown on the blog index and in social share previews."
tag: Deep Dive        # Deep Dive | Practical Guide | Framework | Point of View
readTime: 6 min read
featured: false       # Set true for one post to span 2 columns on the index
---

Your post content in Markdown here.

## Headings work

As do **bold**, _italic_, `code`, tables, and blockquotes.

> Blockquotes get the accent border treatment.

Link to other pages like [this](/contact).
```

Contentlayer picks it up automatically on the next `npm run dev` or `npm run build`. The slug is derived from the filename — `my-new-post.mdx` becomes `/insights/my-new-post`.

---

## Deploying to Vercel

### First deploy

```bash
# Install Vercel CLI
npm i -g vercel

# From the project root
vercel
```

Follow the prompts. Vercel auto-detects Next.js.

### Add environment variables

In the Vercel dashboard → Project → Settings → Environment Variables, add:

- `RESEND_API_KEY`
- `SITE_URL` (your live domain)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

### Connect your domain

1. In Vercel → Project → Settings → Domains, add `asleepturtle.com`
2. In Cloudflare → DNS, point your domain to Vercel using the CNAME they provide
3. Vercel handles SSL automatically

After this, every `git push` to `main` triggers a new deploy.

---

## Adding Plausible analytics

1. Create an account at [plausible.io](https://plausible.io) and add your domain
2. In `app/layout.tsx`, add inside the `<head>`:

```tsx
import Script from 'next/script'

// Inside <html><body>... or in a <head> component:
<Script
  defer
  data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
  src="https://plausible.io/js/script.js"
/>
```

---

## Adding Calendly (book a call)

To embed Calendly on the contact page, add this inside `ContactClient.tsx` above or below the form:

```tsx
<div
  className="calendly-inline-widget"
  data-url="https://calendly.com/your-username/30min"
  style={{ minWidth: '320px', height: '700px' }}
/>
<Script src="https://assets.calendly.com/assets/external/widget.js" async />
```

Or simply link to your Calendly URL from the CTA buttons — no embed needed.

---

## Customisation cheatsheet

| What | Where |
|---|---|
| Colours, fonts, spacing | `app/globals.css` `:root` block |
| Nav links | `components/Nav.tsx` |
| Footer copy | `components/Footer.tsx` |
| Hero headline | `app/page.tsx` |
| Services content | `app/services/page.tsx` |
| About copy + stats | `app/about/page.tsx` |
| Blog posts | `content/posts/*.mdx` |
| Contact email recipient | `app/api/contact/route.ts` → `to:` field |
| Sitemap domain | `next-sitemap.config.js` + `SITE_URL` env var |
