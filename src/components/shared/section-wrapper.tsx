import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  fullWidth?: boolean;
}

export function SectionWrapper({ children, className, as: Component = 'section', fullWidth = false, ...props }: SectionWrapperProps) {
  return (
    <Component 
      className={cn(
        'py-20 md:py-32',
        fullWidth ? 'w-full' : 'px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto',
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}
