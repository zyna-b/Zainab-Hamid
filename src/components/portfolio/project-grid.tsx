"use client";

import type { Project, ProjectCategory } from '@/lib/types';
import { ProjectCard } from './project-card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectGridProps {
  projects: Project[];
}

const CATEGORIES: ProjectCategory[] = ["AI", "Web", "Mobile", "Software"];

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <Button
          variant={selectedCategory === "All" ? "default" : "outline"}
          onClick={() => setSelectedCategory("All")}
          className="transition-all"
        >
          All Projects
        </Button>
        {CATEGORIES.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="transition-all"
          >
            {category}
          </Button>
        ))}
      </div>
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-10">No projects found for this category.</p>
      )}
    </div>
  );
}
