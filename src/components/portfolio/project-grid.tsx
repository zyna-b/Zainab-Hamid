"use client";

import type { Project, ProjectCategory } from '@/lib/types';
import { ProjectCard } from './project-card';
import { useState } from 'react';

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
      {/* Filter Tabs */}
      <div className="mb-12 flex flex-wrap gap-3 slide-up">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2.5 text-sm uppercase tracking-widest border transition-all duration-300 ${
            selectedCategory === "All"
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-foreground border-border hover:border-foreground"
          }`}
        >
          All
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 text-sm uppercase tracking-widest border transition-all duration-300 ${
              selectedCategory === category
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-border hover:border-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">
            No projects in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
