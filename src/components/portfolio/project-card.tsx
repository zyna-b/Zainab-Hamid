import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-card mb-6">
        <div className="relative w-full h-full img-mask">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={project.dataAiHint}
          />
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {project.category}
          </span>
          <span className="text-muted-foreground/30">/</span>
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-headline font-semibold leading-tight group-hover:translate-x-1 transition-transform duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2">
          {project.liveLink && project.liveLink !== "#" && (
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm uppercase tracking-widest hover-line"
            >
              View Project
              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          )}
          {project.sourceLink && project.sourceLink !== "#" && (
            <Link
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
              Source
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
