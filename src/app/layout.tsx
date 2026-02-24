import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { NavbarWrapper } from '@/components/layout/NavbarWrapper';
import { ToastProvider } from '@/contexts/ToastContext';
import { SessionProviderWrapper } from '@/components/auth/SessionProviderWrapper';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Government Exam Prep Platform',
  description: 'Practice MCQs, track progress, and ace your exams.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

import { ForcePasswordChange } from '@/components/auth/ForcePasswordChange';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SessionProviderWrapper>
          <ToastProvider>
            <ForcePasswordChange />
            {/*
                         * NavbarWrapper hides navbar on /login, /signup, /admin pages.
                         * The navbar itself is a server component — always renders on server,
                         * no hydration mismatch, no disappearing.
                        */}
            <NavbarWrapper>
              <Navbar />
            </NavbarWrapper>

            {/*
                         * Main content area.
                         * padding-top is NOT needed because Navbar is sticky (not fixed).
                         * sticky navbar stays in flow — no content overlap.
                        */}
            <main id="main-content">
              {children}
            </main>
          </ToastProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
