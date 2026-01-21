import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { SITE_NAME, SOCIAL_LINKS, EMAIL, NAV_ITEMS } from '@/lib/constants';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub' },
    { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${EMAIL}`, icon: Mail, label: 'Email' },
  ].filter(link => link.href);

  return (
    <footer className="border-t border-border">
      <div className="px-4 sm:px-8 lg:px-16">
        {/* Main Footer */}
        <div className="py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            {/* Left - Brand */}
            <div className="sm:col-span-2 lg:col-span-5 space-y-4 sm:space-y-6 md:space-y-8">
              <Link href="/" className="inline-block">
                <span className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  {SITE_NAME.split(' ')[0]}
                  <span className="text-muted-foreground">.</span>
                </span>
              </Link>
              
              <p className="text-base sm:text-lg text-muted-foreground max-w-sm leading-relaxed">
                Chief Developer & AI Engineer building digital experiences that matter.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href!}
                    target={social.label !== 'Email' ? '_blank' : undefined}
                    rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="group w-10 h-10 sm:w-12 sm:h-12 border border-border flex items-center justify-center transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground"
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Middle - Navigation */}
            <div className="lg:col-span-3">
              <h4 className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6 md:mb-8">
                Navigation
              </h4>
              <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                {NAV_ITEMS.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm sm:text-base text-foreground hover-line transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Contact */}
            <div className="sm:col-span-2 lg:col-span-4">
              <h4 className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6 md:mb-8">
                Get in Touch
              </h4>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Have a project in mind? Let&apos;s create something great together.
                </p>
                <Link
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-2 text-base sm:text-lg font-medium hover-line break-all sm:break-normal"
                >
                  {EMAIL}
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
                </Link>
                
                <div className="pt-2 sm:pt-4">
                  <Link 
                    href="/contact"
                    className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-3 sm:py-4 bg-foreground text-background text-xs sm:text-sm uppercase tracking-widest font-medium hover:bg-foreground/90 transition-colors"
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 sm:py-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © {currentYear} {SITE_NAME}
            </p>
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-muted-foreground">
              <Link 
                href="/admin/login" 
                className="hover:text-foreground transition-colors duration-300"
              >
                Admin
              </Link>
              <span>Built with Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
