import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: {
    default: 'AsleepTurtle — AI Consulting for Startups',
    template: '%s | AsleepTurtle',
  },
  description:
    'We help Series A-C startups turn AI ambition into working product. Strategy, implementation, and team enablement.',
  metadataBase: new URL(process.env.SITE_URL ?? 'https://asleepturtle.com'),
  openGraph: {
    siteName: 'AsleepTurtle',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
