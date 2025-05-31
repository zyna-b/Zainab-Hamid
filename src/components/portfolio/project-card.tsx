import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-out hover:border-primary/30">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={project.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-3">
        <CardTitle className="font-headline text-xl text-primary">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm leading-relaxed min-h-[4.5rem] line-clamp-3">{project.description}</CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-accent/20 text-accent-foreground hover:bg-accent/40">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 border-t mt-auto">
        <div className="flex w-full justify-start space-x-3">
          {project.liveLink && project.liveLink !== "#" && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.sourceLink && project.sourceLink !== "#" && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Source Code
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
