import Link from 'next/link';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import 'nes.css/css/nes.min.css';
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
        className={`antialiased relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 `}
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
          </div>
        </ThemeProvider>
        <Script
          src="https://umami.t31k.cloud/script.js"
          data-website-id="b4bdd435-9d8f-4c8e-9809-1638eb4d787f"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
