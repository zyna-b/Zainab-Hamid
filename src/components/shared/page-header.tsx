import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  eyebrow?: string;
}

export function PageHeader({ title, subtitle, className, titleClassName, subtitleClassName, eyebrow }: PageHeaderProps) {
  return (
    <div className={cn('mb-10 sm:mb-12 md:mb-16 lg:mb-24', className)}>
      {eyebrow && (
        <div className="overflow-hidden mb-3 sm:mb-4 md:mb-6">
          <span className="slide-up block text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-medium">
            {eyebrow}
          </span>
        </div>
      )}
      <div className="overflow-hidden">
        <h1 className={cn(
          'slide-up delay-100 font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tighter',
          titleClassName
        )}>
          {title}
        </h1>
      </div>
      {subtitle && (
        <div className="overflow-hidden mt-4 sm:mt-6 md:mt-8">
          <p className={cn(
            'slide-up delay-200 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed',
            subtitleClassName
          )}>
            {subtitle}
          </p>
        </div>
      )}
      {/* Animated Line */}
      <div className="mt-8 sm:mt-10 md:mt-12 overflow-hidden">
        <div className="line-grow delay-400 h-[1px] bg-border w-full max-w-xs sm:max-w-sm md:max-w-md" />
      </div>
    </div>
  );
}
