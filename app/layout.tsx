import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@/components/analytics';
import { ModeToggle } from '@/components/mode-toggle';
import 'nes.css/css/nes.min.css';
const inter = Inter({ subsets: ['latin'] });
import Mario from '@/components/Mario';
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
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
