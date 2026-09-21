import Link from 'next/link';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import 'nes.css/css/nes.min.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://t31k.com'),
  title: {
    default: 'T31K — Timon Wong',
    template: '%s — T31K',
  },
  description:
    'Timon Wong, known online as T31K, is an indie hacker and solopreneur running a portfolio of SaaS products — over 30 apps shipped in 2 years, including Dreamchanted, a viral AI image generator acquired by Danny Postma.',
  openGraph: {
    title: 'T31K — Timon Wong',
    description:
      'Timon Wong, known online as T31K, is an indie hacker and solopreneur running a portfolio of SaaS products — over 30 apps shipped in 2 years, including Dreamchanted, a viral AI image generator acquired by Danny Postma.',
    url: 'https://t31k.com',
    siteName: 'T31K',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    site: '@t31kx',
    creator: '@t31kx',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://t31k.com/#timon-wong',
  name: 'Timon Wong',
  alternateName: ['T31K', 'Tim'],
  url: 'https://t31k.com',
  image: 'https://t31k.com/me.png',
  jobTitle: 'Indie Hacker & Solopreneur',
  description:
    'Timon Wong, known online as T31K, is an indie hacker and solopreneur. He runs a business with a portfolio of SaaS products, having built and shipped over 30 apps in the past 2 years, including Dreamchanted, a viral AI image generator acquired by Danny Postma. He is very active on X and an avid writer on Medium, covering indie hacking and software engineering.',
  birthPlace: { '@type': 'Place', name: 'Kuala Lumpur, Malaysia' },
  homeLocation: { '@type': 'Place', name: 'Singapore' },
  sameAs: ['https://x.com/t31kx', 'https://github.com/t31k', 'https://medium.com/@t31k'],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of London' },
  knowsAbout: ['Indie hacking', 'SaaS', 'SEO', 'Generative engine optimization (GEO)', 'AI consumer apps', 'Software engineering'],
  mainEntityOfPage: 'https://t31k.com/about',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'T31K',
  alternateName: 'Timon Wong',
  url: 'https://t31k.com',
  publisher: { '@id': 'https://t31k.com/#timon-wong' },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 `}
      >
        {/* <Mario /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="mx-auto py-10 px-4">
            <header className="hidden">
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                </nav>
              </div>
            </header>
            <main className="flex flex-col py-24 justify-center items-center">{children}</main>
          </div>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          src="https://stats.kaleidoscopical.com/script.js"
          data-website-id="b4bdd435-9d8f-4c8e-9809-1638eb4d787f"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
