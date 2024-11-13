import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import 'nes.css/css/nes.min.css';
const inter = Inter({ subsets: ['latin'] });
import Script from 'next/script';

export const metadata = {
  title: 'T31K',
  description: 'T31K - The T3 Stack',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        {/* <Mario /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="max-w-2xl mx-auto py-10 px-4">
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
            <Script
              src="http://umami-t4s8owccko00w4oo4sw0g8gc.135.181.43.114.sslip.io/script.js"
              data-website-id="95ad85b5-9d48-41d8-a64d-9cca53bbbf17"
              strategy="lazyOnload"
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
