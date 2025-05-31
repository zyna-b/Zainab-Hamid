import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from "@/components/ui/toaster";

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins', // This CSS variable is used in tailwind.config.ts
});

export const metadata: Metadata = {
  title: 'Zainab Hamid | AI & Full-Stack Developer',
  description: 'Portfolio of Zainab Hamid, an AI Developer, full-stack developer, mobile app developer, and software developer.',
  keywords: "AI Developer, Full-Stack Developer, Mobile App Developer, Software Developer, Portfolio, Zainab Hamid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Standard Next.js font optimization handles link preconnects */}
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased dark', // Ensure font-sans is primary
          fontPoppins.variable // Applies the --font-poppins CSS variable to the body
        )}
      >
        <div className="relative flex min-h-dvh flex-col bg-background">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
