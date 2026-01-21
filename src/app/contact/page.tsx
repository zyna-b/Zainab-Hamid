import { PageHeader } from '@/components/shared/page-header';
import { ContactForm } from '@/components/contact/contact-form';
import { FaqSection } from '@/components/contact/faq-section';
import { SOCIAL_LINKS, EMAIL } from '@/lib/constants';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
  const socials = [
    { name: 'GitHub', href: SOCIAL_LINKS.github, icon: Github },
    { name: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: Linkedin },
    { name: 'Twitter', href: SOCIAL_LINKS.twitter, icon: Twitter },
  ].filter(s => s.href);

  return (
    <div className="grain">
      {/* Hero Section */}
      <section className="min-h-[40vh] sm:min-h-[50vh] flex items-end px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <PageHeader
            eyebrow="Contact"
            title="Let's Talk"
            subtitle="Have a project in mind? Let's create something extraordinary together."
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-8 lg:px-16 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-24">
            {/* Left - Contact Info */}
            <div className="slide-up">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6 block">
                Get in Touch
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
                Drop me a line, or just say hello.
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 md:mb-12">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Email */}
              <div className="mb-8 sm:mb-10 md:mb-12">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3 block">
                  Email
                </span>
                <Link
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-medium hover-line break-all sm:break-normal"
                >
                  {EMAIL}
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                </Link>
              </div>

              {/* Socials */}
              <div>
                <span className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-3 sm:mb-4 block">
                  Socials
                </span>
                <div className="flex gap-3 sm:gap-4">
                  {socials.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  ))}
                  <Link
                    href={`mailto:${EMAIL}`}
                    aria-label="Email"
                    className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="slide-up delay-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-8 lg:px-16 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <span className="slide-up block text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-2 sm:mb-4">
              FAQ
            </span>
            <h2 className="slide-up delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold">
              Common Questions
            </h2>
          </div>
          <FaqSection />
        </div>
      </section>
    </div>
  );
}
