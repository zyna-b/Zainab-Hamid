import { fetchProjects } from '@/lib/content-service';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown, Plus } from 'lucide-react';

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  return (
    <div className="grain relative">
      {/* Hero Section - Completely Redesigned */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-end px-4 sm:px-8 lg:px-16 pb-16 sm:pb-20 md:pb-24 pt-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large background text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="text-[40vw] font-headline font-bold text-foreground/[0.02] leading-none select-none">
              W
            </span>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-20 right-10 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 rounded-full border border-foreground/5" />
          <div className="absolute bottom-40 left-10 w-24 h-24 rounded-full bg-foreground/[0.02]" />
          {/* Grid lines */}
          <div className="absolute top-32 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Top Eyebrow Row */}
          <div className="flex items-center justify-between mb-12 sm:mb-16 md:mb-20">
            <div className="flex items-center gap-3 slide-up">
              <Plus className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Selected Works
              </span>
            </div>
            <div className="slide-up delay-100 text-right">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                2019 — Present
              </span>
            </div>
          </div>

          {/* Massive Title */}
          <div className="relative">
            <div className="overflow-hidden">
              <h1 className="slide-up delay-200 font-headline text-[18vw] sm:text-[15vw] md:text-[12vw] font-bold leading-[0.8] tracking-tighter">
                WORK
              </h1>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 right-0 sm:right-10 slide-up delay-300">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-foreground text-background flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-headline font-bold">{projects.length}</span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider">Projects</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mt-8 sm:mt-12">
            {/* Description */}
            <div className="max-w-md slide-up delay-400">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                A showcase of projects spanning 
                <span className="text-foreground"> artificial intelligence</span>, 
                <span className="text-foreground"> web development</span>, and 
                <span className="text-foreground"> digital innovation</span>.
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-4 slide-up delay-500">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Down</span>
              </div>
              <div className="w-12 h-12 border border-foreground/20 rounded-full flex items-center justify-center group hover:border-foreground/40 transition-colors">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - New Grid Layout */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-20 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 py-12 sm:py-16 md:py-20 border-b border-border slide-up ${index % 2 === 1 ? 'md:direction-rtl' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Side */}
              <div className={`relative aspect-[4/3] overflow-hidden bg-muted ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  className="object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest bg-background/90 backdrop-blur-sm px-3 py-1.5 border border-border">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1 md:items-end md:text-right' : ''}`}>
                {/* Number */}
                <span className="text-6xl sm:text-7xl md:text-8xl font-headline font-bold text-foreground/10 leading-none mb-4">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold leading-tight group-hover:translate-x-2 transition-transform duration-500">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3 sm:mt-4 max-w-md">
                  {project.description}
                </p>

                {/* Tags */}
                <div className={`flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground border-b border-foreground/20 pb-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.liveLink && project.liveLink !== "#" && (
                  <div className="mt-6 sm:mt-8">
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      className="group/link inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium"
                    >
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-foreground after:transition-all after:duration-300 group-hover/link:after:w-full">
                        View Project
                      </span>
                      <div className="w-8 h-8 border border-foreground/30 rounded-full flex items-center justify-center group-hover/link:bg-foreground group-hover/link:text-background transition-all duration-300">
                        <ArrowUpRight className="w-3 h-3 group-hover/link:rotate-45 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="overflow-hidden">
            <span className="slide-up block text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6">
              Let&apos;s Create Together
            </span>
          </div>
          <div className="overflow-hidden">
            <h2 className="slide-up delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight">
              Have a project in mind?
            </h2>
          </div>
          <div className="overflow-hidden mt-4 sm:mt-6">
            <p className="slide-up delay-200 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              I&apos;m always excited to collaborate on innovative projects.
            </p>
          </div>
          <div className="overflow-hidden mt-6 sm:mt-8 md:mt-10">
            <Link
              href="/contact"
              className="slide-up delay-300 group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background text-xs sm:text-sm uppercase tracking-widest font-medium hover:bg-foreground/90 transition-colors"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
