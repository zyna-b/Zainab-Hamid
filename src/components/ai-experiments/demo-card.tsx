import Image from 'next/image';
import Link from 'next/link';
import type { AIExperiment } from '@/lib/types';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface DemoCardProps {
  experiment: AIExperiment;
}

export function DemoCard({ experiment }: DemoCardProps) {
  return (
    <article className="group h-full flex flex-col">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-card mb-6">
        <div className="relative w-full h-full img-mask">
          <Image
            src={experiment.imageSrc}
            alt={experiment.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={experiment.dataAiHint}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          {experiment.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-headline font-semibold leading-tight group-hover:translate-x-1 transition-transform duration-300">
          {experiment.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {experiment.description}
        </p>

        {/* Link */}
        {experiment.interactiveLink && experiment.interactiveLink !== "#" && (
          <div className="pt-2">
            <Link
              href={experiment.interactiveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm uppercase tracking-widest hover-line"
            >
              Try Demo
              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
