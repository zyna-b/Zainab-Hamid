'use client';

import Image from 'next/image';
import { SITE_NAME } from '@/lib/constants';
import type { AboutContent } from '@/lib/data-store';
import { useEffect, useRef } from 'react';

type ProfileSectionProps = {
  about: AboutContent;
  name?: string;
};

export function ProfileSection({ about, name }: ProfileSectionProps) {
  const displayName = name || SITE_NAME;
  const storyHeading = about.storyHeading || 'My Story';
  const expertiseHeading = about.expertiseHeading || 'Expertise & Philosophy';
  const storyParagraphs = about.storyParagraphs?.length
    ? about.storyParagraphs
    : [
        `Hello! I'm ${displayName}, a Chief Developer and AI Engineer with a deep passion for creating impactful and innovative technology solutions.`,
      ];
  const expertiseParagraphs = about.expertiseParagraphs?.length
    ? about.expertiseParagraphs
    : ['My expertise lies in bridging the gap between complex technical challenges and user-friendly solutions.'];
  const closingParagraph = about.closingParagraph?.trim();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const shapes = container.querySelectorAll('.floating-shape');
      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height) / (window.innerHeight + rect.height)));
      
      shapes.forEach((shape, index) => {
        const el = shape as HTMLElement;
        const speed = 0.5 + (index * 0.15);
        const yOffset = scrollProgress * 60 * speed;
        const blur = Math.max(0, scrollProgress * 8 * (index * 0.3));
        el.style.transform = `translateY(${yOffset}px)`;
        el.style.filter = `blur(${blur}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      {/* Abstract Visual Section with Blur Effect */}
      <div ref={containerRef} className="slide-up relative">
        <div className="aspect-square w-full max-w-[480px] mx-auto relative">
          
          {/* Floating Abstract Shapes with Scroll Blur */}
          
          {/* Large soft gradient circle - back */}
          <div className="floating-shape absolute -top-8 -right-8 w-72 h-72 rounded-full bg-gradient-to-br from-muted/50 via-muted/30 to-transparent transition-all duration-300" />
          
          {/* Outlined circle */}
          <div className="floating-shape absolute top-12 -left-6 w-40 h-40 rounded-full border border-foreground/10 transition-all duration-300" />
          
          {/* Small solid accent circle */}
          <div className="floating-shape absolute top-1/4 right-8 w-5 h-5 rounded-full bg-foreground/30 transition-all duration-300" />
          
          {/* Curved arc bottom-left */}
          <div className="floating-shape absolute bottom-24 -left-4 w-24 h-24 border-b-2 border-r-2 border-foreground/10 rounded-br-full transition-all duration-300" />
          
          {/* Diagonal line */}
          <div className="floating-shape absolute top-16 right-1/4 w-px h-24 bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent rotate-45 transition-all duration-300" />
          
          {/* Floating dots cluster */}
          <div className="floating-shape absolute bottom-1/3 right-6 flex flex-col gap-2 transition-all duration-300">
            <div className="w-2 h-2 rounded-full bg-foreground/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/15 ml-2" />
            <div className="w-1 h-1 rounded-full bg-foreground/10" />
          </div>
          
          {/* Soft rectangle shape */}
          <div className="floating-shape absolute bottom-12 right-12 w-32 h-20 rounded-2xl bg-foreground/5 border border-foreground/5 transition-all duration-300" />
          
          {/* Plus/Cross accent */}
          <div className="floating-shape absolute top-1/3 left-16 transition-all duration-300">
            <div className="w-6 h-px bg-foreground/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-6 bg-foreground/20" />
          </div>

          {/* Main Logo Container - Hero Element */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-card/90 backdrop-blur-sm rounded-3xl border border-border shadow-2xl flex items-center justify-center group transition-all duration-500 hover:scale-105 hover:shadow-3xl">
              {/* Inner subtle gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-foreground/5 via-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Grid pattern inside */}
              <div className="absolute inset-4 rounded-2xl bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 z-10">
                <Image
                  src="/favicon.ico"
                  alt="Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Bottom badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-foreground text-background px-6 py-3 rounded-full shadow-xl">
              <span className="text-xs font-bold uppercase tracking-[0.15em]">Since 2022</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Content */}
      <div className="space-y-10 slide-up delay-100">
        <div>
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            Who I Am
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold mb-8">
            {storyHeading}
          </h2>
          <div className="space-y-6">
            {storyParagraphs.map((paragraph, index) => (
              <p
                key={`story-${index}`}
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-10">
          <h3 className="text-2xl sm:text-3xl font-headline font-semibold mb-6">
            {expertiseHeading}
          </h3>
          <div className="space-y-4">
            {expertiseParagraphs.map((paragraph, index) => (
              <p
                key={`expertise-${index}`}
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {closingParagraph && (
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-foreground pl-6 italic">
            {closingParagraph}
          </p>
        )}
      </div>
    </div>
  );
}
