'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Experience = {
  role: string;
  company: string;
  location: string;
  date: string;
  description: string[];
};

type Skill = {
  name: string;
  category: string;
};

type Certification = {
  name: string;
  issuer: string;
  date: string;
  link?: string;
};

type AboutScrollLayoutProps = {
  name: string;
  storyHeading: string;
  storyParagraphs: string[];
  expertiseHeading: string;
  expertiseParagraphs: string[];
  closingParagraph?: string;
  experiences: Experience[];
  skills: Skill[];
  certifications: Certification[];
};

export function AboutScrollLayout({
  name,
  storyHeading,
  storyParagraphs,
  expertiseHeading,
  expertiseParagraphs,
  closingParagraph,
  experiences,
  skills,
  certifications,
}: AboutScrollLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Group skills by category
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div ref={containerRef} className="relative">
      {/* Use CSS Grid - it naturally creates the height needed for sticky to work */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] xl:grid-cols-[38%_1fr] gap-8 sm:gap-10 lg:gap-16 xl:gap-24">
        {/* Left Column - contains sticky element */}
        <div className="relative">
          {/* The actual sticky element */}
          <div className="lg:sticky lg:top-28 xl:top-32">
            <div className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] mx-auto py-4 sm:py-6 lg:py-0">
              <div className="aspect-square relative">
              {/* Abstract floating shapes with float animation */}
              <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 rounded-full bg-gradient-to-br from-muted/40 via-muted/20 to-transparent float-gentle" />
              <div className="absolute top-8 sm:top-12 -left-3 sm:-left-6 w-28 sm:w-36 md:w-40 h-28 sm:h-36 md:h-40 rounded-full border border-foreground/10 float-gentle-delayed" />
              <div className="absolute top-1/4 right-4 sm:right-8 w-3 sm:w-5 h-3 sm:h-5 rounded-full bg-foreground/30 float-gentle" />
              <div className="absolute bottom-16 sm:bottom-24 -left-2 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 border-b-2 border-r-2 border-foreground/10 rounded-br-full float-gentle-delayed" />
              
              <div className="absolute top-16 right-1/4 w-px h-24 bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent rotate-45" />
              
              <div className="absolute bottom-1/3 right-6 flex flex-col gap-2 float-gentle">
                <div className="w-2 h-2 rounded-full bg-foreground/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-foreground/15 ml-2" />
                <div className="w-1 h-1 rounded-full bg-foreground/10" />
              </div>
              
              <div className="absolute bottom-12 right-12 w-32 h-20 rounded-2xl bg-foreground/5 border border-foreground/5 float-gentle-delayed" />
              
              <div className="absolute top-1/3 left-16">
                <div className="w-6 h-px bg-foreground/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-6 bg-foreground/20" />
              </div>

              {/* Main Image Container - Redesigned to match Home */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[450px] lg:w-[400px] lg:h-[500px] bg-card border border-border shadow-2xl overflow-hidden group transition-all duration-500 hover:shadow-orange-500/10">
                  <div className="absolute inset-0 bg-muted">
                    <Image
                      src="/uploads/about/03aebd94-b203-4c57-b375-e7db8bd1867d.png"
                      alt={name}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3 z-10">
                      <div className="w-12 h-1 bg-foreground/30 group-hover:bg-foreground transition-colors duration-500" />
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Since 2022</p>
                      <h3 className="font-headline text-2xl sm:text-3xl font-bold leading-tight">
                        {name.split(' ')[0]}<br />{name.split(' ')[1]}
                      </h3>
                  </div>
                </div>
              </div>

              {/* Decorative background elements aligned to new card size */}
              <div className="absolute -z-10 top-12 -right-6 w-full h-full border border-foreground/5 rounded-lg" />
              <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full bg-foreground/5 rounded-lg" />
            </div>

            {/* Name below is removed since it's now in the card */}
            <div className="hidden lg:block text-center mt-8 xl:mt-12 opacity-0">
            </div>
          </div>
        </div>
        {/* End of sticky element */}
      </div>

        {/* Right Column - Scrolling Content */}
        <div className="py-4 sm:py-6 lg:py-0">
          {/* My Story Section */}
          <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-32 scroll-section">
            <span className="block text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-2 sm:mb-4">
              Who I Am
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline font-bold mb-4 sm:mb-6 md:mb-8">
              {storyHeading}
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {storyParagraphs.map((paragraph, index) => (
                <p
                  key={`story-${index}`}
                  className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Expertise Section */}
          <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-32 scroll-section border-t border-border pt-10 sm:pt-12 md:pt-16 lg:pt-20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-headline font-semibold mb-4 sm:mb-6">
              {expertiseHeading}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {expertiseParagraphs.map((paragraph, index) => (
                <p
                  key={`expertise-${index}`}
                  className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {closingParagraph && (
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-foreground pl-4 sm:pl-6 italic mt-6 sm:mt-8">
                {closingParagraph}
              </p>
            )}
          </section>

          {/* Experience Section */}
          <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-32 scroll-section border-t border-border pt-10 sm:pt-12 md:pt-16 lg:pt-20">
            <span className="block text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-2 sm:mb-4">
              Journey
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline font-bold mb-8 sm:mb-10 md:mb-12">
              Experience
            </h2>
            <div className="space-y-0">
              {experiences.length === 0 && (
                <p className="text-center text-muted-foreground py-8 sm:py-10">
                  Experience entries will appear here once added.
                </p>
              )}
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="group border-b border-border py-6 sm:py-8 md:py-10 lg:py-14 first:border-t"
                >
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground font-mono">
                      {exp.date}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-headline font-semibold mb-1 sm:mb-2 group-hover:translate-x-2 transition-transform duration-500">
                        {exp.role}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                        {exp.company} &mdash; {exp.location}
                      </p>
                      <ul className="space-y-2 sm:space-y-3">
                        {exp.description.map((desc, i) => (
                          <li
                            key={i}
                            className="text-sm sm:text-base text-muted-foreground leading-relaxed flex gap-2 sm:gap-3"
                          >
                            <span className="text-foreground/30 shrink-0">&mdash;</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section - Creative Grid Layout */}
          <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-32 scroll-section border-t border-border pt-10 sm:pt-12 md:pt-16 lg:pt-20">
            <span className="block text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-2 sm:mb-4">
              Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline font-bold mb-8 sm:mb-10 md:mb-12">
              Skills & Technologies
            </h2>
            
            {skills.length === 0 && (
              <p className="text-center text-muted-foreground py-8 sm:py-10">
                Skills will appear here once added.
              </p>
            )}
            
            {/* Creative Skills Display */}
            <div className="space-y-10 sm:space-y-12 md:space-y-16">
              {categories.map((category, catIndex) => (
                <div key={category} className="relative">
                  {/* Category Header with Line */}
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground/5">
                      0{catIndex + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-headline font-semibold mb-1">
                        {category}
                      </h3>
                      <div className="h-px bg-gradient-to-r from-foreground/20 to-transparent w-full" />
                    </div>
                  </div>
                  
                  {/* Skills Grid with Hover Effects */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, skillIndex) => (
                        <div
                          key={skill.name}
                          className="group relative p-3 sm:p-4 md:p-5 bg-card/50 border border-border rounded-lg hover:bg-foreground hover:border-foreground transition-all duration-500 cursor-default overflow-hidden"
                          style={{ animationDelay: `${skillIndex * 50}ms` }}
                        >
                          {/* Background accent on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Skill content */}
                          <div className="relative z-10">
                            <span className="text-xs sm:text-sm md:text-base font-medium group-hover:text-background transition-colors duration-300">
                              {skill.name}
                            </span>
                          </div>
                          
                          {/* Corner accent */}
                          <div className="absolute -bottom-1 -right-1 w-6 sm:w-8 h-6 sm:h-8 border-t border-l border-foreground/10 group-hover:border-background/20 transition-colors duration-300 rounded-tl-lg" />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Visual accent at the bottom */}
            <div className="flex items-center gap-3 sm:gap-4 mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-border/50">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-foreground/60" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-foreground/40" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-foreground/20" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Always learning, always evolving
              </p>
            </div>
          </section>

          {/* Certifications Section with Card Stacking */}
          <section className="scroll-section border-t border-border pt-10 sm:pt-12 md:pt-16 lg:pt-20">
            <span className="block text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-2 sm:mb-4">
              Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline font-bold mb-8 sm:mb-10 md:mb-12">
              Certifications
            </h2>
            <div className="relative space-y-3 sm:space-y-4">
              {certifications.length === 0 && (
                <p className="text-center text-muted-foreground py-8 sm:py-10">
                  Certifications will appear here once added.
                </p>
              )}
              {certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  className="cert-card sticky bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-lg transition-all duration-300"
                  style={{ 
                    top: `calc(100px + ${index * 8}px)`,
                    marginBottom: `${index * 6}px`
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <span className="text-[10px] sm:text-xs font-mono text-muted-foreground bg-muted px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-headline font-semibold mb-1 sm:mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {cert.issuer} &middot; {cert.date}
                      </p>
                    </div>
                    {cert.link && cert.link !== "#" && (
                      <Link
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest hover-line shrink-0 mt-2 sm:mt-0"
                      >
                        View
                        <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Spacer for stacked cards */}
            <div className="h-20 sm:h-24 md:h-32" />
          </section>
        </div>
      </div>
    </div>
  );
}
