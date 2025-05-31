import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
  label?: string;
};

export type ProjectCategory = "AI" | "Web" | "Mobile" | "Software";

export type Project = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  dataAiHint?: string;
  tags: string[];
  liveLink?: string;
  sourceLink?: string;
  category: ProjectCategory;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Skill = {
  name: string;
  category: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  link?: string;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  date: string;
  description: string[];
};

export type FAQ = {
  question: string;
  answer: string;
};

export type AIExperiment = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  dataAiHint?: string;
  tags: string[];
  interactiveLink?: string;
};
