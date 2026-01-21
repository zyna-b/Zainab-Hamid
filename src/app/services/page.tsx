import { fetchServices } from '@/lib/content-service';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export default async function ServicesPage() {
  const services = await fetchServices();

  const processSteps = [
    { num: '01', title: 'Discover', desc: 'Understanding your vision, goals, and the problem we\'re solving together.' },
    { num: '02', title: 'Design', desc: 'Crafting thoughtful solutions that balance aesthetics with functionality.' },
    { num: '03', title: 'Deliver', desc: 'Building and shipping with precision, iteration, and attention to detail.' },
  ];

  return (
    <div className="grain relative">
      {/* Hero Section - Sticky Layer 1 */}
      <section className="sticky top-0 z-[10] relative min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 bg-background">
        <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
          {/* Eyebrow */}
          <div className="mb-4 sm:mb-6">
            <p className="slide-up text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-medium">
              Services
            </p>
          </div>

          {/* Giant Title */}
          <div>
            <h1 className="slide-up delay-100 font-headline text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw] font-bold leading-[0.9] tracking-tighter">
              What<br />
              <span className="text-muted-foreground">I Do</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mt-6 sm:mt-8 max-w-xl">
            <p className="slide-up delay-200 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Transforming ideas into 
              <span className="text-foreground font-medium"> digital experiences </span>
              through strategic thinking and technical excellence.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-8 sm:gap-12 mt-8 sm:mt-12">
            <div className="slide-up delay-300">
              <p className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold">{services.length}</p>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mt-1">Services</p>
            </div>
            <div className="slide-up delay-400">
              <p className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold">3</p>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mt-1">Step Process</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center gap-3 sm:gap-4 fade-in delay-700">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border border-foreground/30 rounded-full flex items-center justify-center">
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
            Scroll to explore
          </span>
        </div>
      </section>

      {/* Services List - Regular scrollable section */}
      <section className="relative z-[11] bg-background border-t border-border py-16 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            <div>
              <span className="slide-up block text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-2 sm:mb-4">
                Expertise
              </span>
              <h2 className="slide-up delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold">
                Services
              </h2>
            </div>
            <p className="slide-up delay-200 text-base sm:text-lg text-muted-foreground max-w-md lg:text-right">
              Specialized solutions tailored to your unique needs.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <p className="text-base sm:text-lg text-muted-foreground">Services coming soon.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {services.map((service, i) => (
                <div
                  key={service.id}
                  className="group border-t border-border py-6 sm:py-10 md:py-14 slide-up"
                  style={{ animationDelay: `${(i + 3) * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 sm:gap-6 md:gap-12">
                    {/* Number */}
                    <span className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-muted-foreground/20 w-16 md:w-20 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-headline font-semibold mb-2 sm:mb-4 group-hover:translate-x-2 transition-transform duration-500">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                        {service.description}
                      </p>
                      {service.features && service.features.length > 0 && (
                        <ul className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                          {service.features?.map((feature, j) => (
                            <li
                              key={j}
                              className="text-[10px] sm:text-xs uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 border border-border bg-card/50"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    {/* Arrow */}
                    <div className="hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-foreground/20 rounded-full group-hover:bg-foreground group-hover:text-background transition-all duration-300 shrink-0">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-border" />
            </div>
          )}
        </div>
      </section>

      {/* Process Section - Regular scrollable section */}
      <section className="relative z-[12] bg-background border-t border-border py-16 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            <div>
              <span className="slide-up block text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-2 sm:mb-4">
                Approach
              </span>
              <h2 className="slide-up delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold">
                How I Work
              </h2>
            </div>
            <p className="slide-up delay-200 text-base sm:text-lg text-muted-foreground max-w-md lg:text-right">
              A streamlined process for exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {processSteps.map((step, i) => (
              <div 
                key={step.num} 
                className="group slide-up p-5 sm:p-6 md:p-8 border border-border hover:border-foreground/30 transition-colors duration-500" 
                style={{ animationDelay: `${(i + 3) * 100}ms` }}
              >
                <span className="text-5xl sm:text-6xl md:text-7xl font-headline font-bold text-muted-foreground/20 group-hover:text-muted-foreground/40 transition-colors duration-500">
                  {step.num}
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-headline font-semibold mt-3 sm:mt-4 mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-[13] min-h-[70vh] sm:min-h-screen bg-background border-t border-border flex items-center justify-center px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <span className="slide-up block text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6 md:mb-8">
              Let&apos;s Collaborate
            </span>
          </div>
          <div>
            <h2 className="slide-up delay-100 text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] font-headline font-bold leading-[0.9] tracking-tighter">
              Ready to<br />start?
            </h2>
          </div>
          <div className="mt-4 sm:mt-6 md:mt-8">
            <p className="slide-up delay-200 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Let&apos;s bring your vision to life with innovative solutions.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 md:mt-12">
            <Link
              href="/contact"
              className="slide-up delay-300 group inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-foreground text-background text-xs sm:text-sm uppercase tracking-widest font-medium hover:bg-foreground/90 transition-colors"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
