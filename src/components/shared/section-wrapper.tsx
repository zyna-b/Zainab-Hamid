import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function SectionWrapper({ children, className, as: Component = 'section', ...props }: SectionWrapperProps) {
  return (
    <Component className={cn('container py-16 md:py-24 animate-fade-in', className)} {...props}>
      {children}
    </Component>
  );
}
