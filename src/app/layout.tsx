import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/contexts/theme-context';

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-headline',
});

const fontBody = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Zainab Hamid | Chief Developer & AI Engineer',
  description: 'Portfolio of Zainab Hamid, a Chief Developer and AI Engineer specializing in web, mobile, software, and AI solutions.',
  keywords: "Chief Developer, AI Engineer, Web Developer, Mobile App Developer, Software Developer, Portfolio, Zainab Hamid, Artificial Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontHeadline.variable,
          fontBody.variable
        )}
      >
        <ThemeProvider>
          <div className="relative min-h-dvh bg-background">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
