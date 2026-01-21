import Link from 'next/link';
import Image from 'next/image';
import { getSiteContent } from '@/lib/data-store';
import { SITE_NAME, SITE_DESCRIPTION, RESUME_LINK } from '@/lib/constants';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const site = await getSiteContent();
  const hero = site.hero ?? {
    name: SITE_NAME,
    role: SITE_DESCRIPTION,
    intro: 'I transform complex problems into elegant, scalable solutions.',
    resumeUrl: RESUME_LINK,
  };

  const heroName = hero.name || SITE_NAME;
  const heroRole = hero.role || SITE_DESCRIPTION;
  const resumeUrl = hero.resumeUrl || RESUME_LINK;

  const skills = [
    'AI Development',
    'Machine Learning',
    'Full-Stack',
    'React',
    'Next.js',
    'Python',
    'TypeScript',
    'Node.js',
    'Cloud Architecture',
    'System Design',
  ];

  const services = [
    { num: '01', title: 'AI & ML', desc: 'Intelligent systems that learn and adapt' },
    { num: '02', title: 'Web Dev', desc: 'Scalable applications built to perform' },
    { num: '03', title: 'Consulting', desc: 'Strategic guidance for digital growth' },
  ];

  return (
    <div className="grain relative">
      {/* Hero Section - Sticky Layer 1 */}
      <section className="sticky top-0 z-[10] relative min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-32 pb-8 bg-background overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full border border-foreground/5 opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-foreground/5 opacity-50" />
          <span className="absolute -right-[10vw] bottom-0 text-[40vh] font-headline font-bold text-foreground/[0.02] leading-none">
            ZH
          </span>
        </div>

        {/* Main Hero Content */}
        <div className="relative w-full max-w-[1800px] mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 sm:mb-12 overflow-hidden">
            <div className="h-px w-12 bg-foreground/60 slide-right" />
            <p className="slide-up delay-100 text-sm sm:text-base uppercase tracking-[0.25em] text-muted-foreground font-medium">
              Chief Developer & AI Engineer
            </p>
          </div>

          {/* Giant Name - Staggered Layout */}
          <div className="relative z-10">
            <div className="overflow-hidden">
              <h1 className="slide-up delay-200 font-headline text-[15vw] sm:text-[13vw] md:text-[12vw] font-bold leading-[0.8] tracking-tighter mix-blend-difference">
                ZAINAB
              </h1>
            </div>
            <div className="overflow-hidden pl-[5vw] sm:pl-[10vw]">
              <h1 className="slide-up delay-300 font-headline text-[15vw] sm:text-[13vw] md:text-[12vw] font-bold leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
                HAMID<span className="text-accent">.</span>
              </h1>
            </div>
          </div>

          {/* Tagline & Content - Grid Layout */}
          <div className="grid md:grid-cols-2 gap-12 mt-16 sm:mt-24 items-end">
            <div className="overflow-hidden max-w-xl">
              <p className="slide-up delay-400 text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Transforming complex problems into elegant concepts.
                <span className="block mt-4 text-foreground font-medium">
                  Merging aesthetics with artificial intelligence.
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 justify-end items-start sm:items-center">
              <Link 
                href="/portfolio"
                className="group slide-up delay-500 relative px-8 py-4 bg-foreground text-background overflow-hidden transition-all hover:scale-105"
              >
                <div className="absolute inset-0 w-full h-full bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative flex items-center gap-3 text-sm uppercase tracking-widest font-medium">
                  View Work
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
              
              <Link 
                href="/contact"
                className="slide-up delay-600 group flex items-center gap-3 px-8 py-4 border border-foreground/20 hover:bg-foreground/5 transition-colors"
                >
                <span className="text-sm uppercase tracking-widest font-medium">Contact Me</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in delay-800">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground vertical-rl">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-foreground/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Marquee Section - Sticky Layer 2 */}
      <section className="sticky top-0 z-[11] relative py-8 sm:py-12 md:py-16 border-y border-border overflow-hidden bg-background">
        <div className="marquee">
          <div className="marquee-content">
            {[...skills, ...skills].map((skill, i) => (
              <span 
                key={i} 
                className="flex items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-bold whitespace-nowrap"
              >
                {skill}
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-foreground rounded-full" />
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {[...skills, ...skills].map((skill, i) => (
              <span 
                key={i} 
                className="flex items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-bold whitespace-nowrap"
              >
                {skill}
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-foreground rounded-full" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview - Sticky Layer 3 */}
      <section className="sticky top-0 z-[12] relative min-h-[100svh] py-20 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16 bg-background flex items-center border-t border-border">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
            
            {/* Visual Section - Redesigned Composition */}
            <div className="relative order-2 lg:order-1 w-full max-w-[500px] mx-auto lg:max-w-none">
              <div className="relative aspect-[4/5] sm:aspect-square">
                
                {/* Background Shape */}
                <div className="absolute inset-0 bg-muted/30" />
                
                {/* Large Text Overlay */}
                <div className="absolute -top-10 -left-10 z-10 hidden sm:block">
                  <span className="text-[120px] font-headline font-bold text-foreground/5 leading-none">
                    01.
                  </span>
                </div>

                {/* Main Abstract Composition */}
                <div className="absolute inset-8 border border-foreground/10 flex items-center justify-center p-8">
                  {/* Rotating Circles */}
                  <div className="absolute top-8 right-8 w-24 h-24 border border-foreground/20 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 border border-foreground/20 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                  
                  {/* Central Card */}
                  <div className="relative z-20 w-full h-full bg-card border border-border shadow-2xl overflow-hidden group transition-all duration-500 hover:shadow-orange-500/10">
                    <div className="absolute inset-0 bg-muted">
                      <Image
                        src="/uploads/about/03aebd94-b203-4c57-b375-e7db8bd1867d.png"
                        alt="Zainab Hamid"
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3 z-10">
                       <div className="w-12 h-1 bg-foreground/30 group-hover:bg-foreground transition-colors duration-500" />
                       <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Since 2019</p>
                       <p className="font-headline text-2xl sm:text-3xl font-bold leading-tight">
                         Transforming<br />Ideas into<br />Reality
                       </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-foreground/5 -z-10" />
                <div className="absolute top-1/2 -right-8 w-16 h-px bg-foreground/20" />
                <div className="absolute bottom-1/4 -left-8 w-16 h-px bg-foreground/20" />
              </div>
            </div>

            {/* Content Section - Minimal & Bold */}
            <div className="order-1 lg:order-2 space-y-8 sm:space-y-10">
              <div className="overflow-hidden">
                <span className="slide-up block text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  ( About Me )
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="overflow-hidden">
                  <h2 className="slide-up delay-100 text-4xl sm:text-5xl md:text-6xl font-headline font-bold leading-[0.9]">
                    More than just
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <h2 className="slide-up delay-200 text-4xl sm:text-5xl md:text-6xl font-headline font-bold leading-[0.9] text-muted-foreground">
                    code & pixels.
                  </h2>
                </div>
              </div>

              <div className="overflow-hidden pt-4 border-l border-foreground/20 pl-6 sm:pl-8">
                <p className="slide-up delay-300 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                  I&apos;m a results-driven developer who bridges the gap between complex backend logic and intuitive frontend design. My approach combines technical precision with creative problem-solving to build comprehensive digital ecosystems.
                </p>
              </div>

              <div className="overflow-hidden pt-4">
                <Link 
                  href="/about"
                  className="slide-up delay-400 group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors"
                >
                  <span>Read Full Story</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section - Sticky Layer 4 */}
      <section className="sticky top-0 z-[13] relative min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16 bg-background flex items-center border-t border-border">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
            <div>
              <span className="slide-up block text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3 sm:mb-4">
                Services
              </span>
              <h2 className="slide-up delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-bold">
                What I do
              </h2>
            </div>
            <p className="slide-up delay-200 text-base sm:text-lg text-muted-foreground max-w-md lg:text-right">
              Specialized expertise delivering impactful digital solutions.
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-0">
            {services.map((service, i) => (
              <Link
                key={service.num}
                href="/services"
                className={`group block border-t border-border py-6 sm:py-8 md:py-10 slide-up delay-${(i + 3) * 100}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 sm:gap-8 lg:gap-16">
                    <span className="text-xs sm:text-sm text-muted-foreground font-mono">{service.num}</span>
                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-headline font-bold group-hover:translate-x-2 sm:group-hover:translate-x-4 transition-transform duration-500">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="hidden lg:block text-muted-foreground max-w-xs text-right">
                      {service.desc}
                    </span>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border border-foreground/20 rounded-full flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300 shrink-0">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* CTA Section - Sticky Layer 5 (Final) */}
      <section className="sticky top-0 z-[14] relative min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16 bg-background flex items-center justify-center border-t border-border">
        <div className="max-w-7xl mx-auto text-center w-full">
          <div className="overflow-hidden">
            <span className="slide-up block text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6 sm:mb-8">
              Let&apos;s collaborate
            </span>
          </div>
          <div className="overflow-hidden">
            <h2 className="slide-up delay-100 text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-headline font-bold leading-[0.9] tracking-tighter">
              Have a project<br />in mind?
            </h2>
          </div>
          <div className="overflow-hidden mt-8 sm:mt-12">
            <Link
              href="/contact"
              className="slide-up delay-300 group inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-foreground text-background text-sm sm:text-base md:text-lg uppercase tracking-widest font-medium hover:bg-foreground/90 transition-colors"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
          <div className="overflow-hidden mt-6 sm:mt-8">
            <p className="fade-in delay-500 text-sm sm:text-base text-muted-foreground">
              or drop me a line at{' '}
              <Link href="mailto:zainabhamid2468@gmail.com" className="hover-line text-foreground break-all sm:break-normal">
                zainabhamid2468@gmail.com
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
