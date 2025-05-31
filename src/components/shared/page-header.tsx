import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function PageHeader({ title, subtitle, className, titleClassName, subtitleClassName }: PageHeaderProps) {
  return (
    <div className={cn('text-center mb-12 md:mb-16 animate-slide-in-up', className)}>
      <h1 className={cn('font-headline text-4xl md:text-5xl font-bold text-primary mb-3', titleClassName)}>
        {title}
      </h1>
      {subtitle && (
        <p className={cn('text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto', subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
