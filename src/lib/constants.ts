import type { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Portfolio', href: '/portfolio' },
  { title: 'Services', href: '/services' },
  { title: 'Blog', href: '/blog' },
  { title: 'AI Experiments', href: '/ai-experiments' },
  { title: 'Contact', href: '/contact' },
];

export const SITE_NAME = "Zainab Hamid";
export const SITE_DESCRIPTION = "Chief Developer & AI Engineer";
export const EMAIL = "zainabhamid2468@gmail.com"; 
export const RESUME_LINK = "/uploads/resume/Resume_Zainab.pdf"; 

export const SOCIAL_LINKS = {
  github: "https://github.com/zyna-b",
  linkedin: "https://www.linkedin.com/in/zainab-hamid-187a18321/",
  twitter: null,
};

// Dynamic content (projects, blogs, etc.) now lives in JSON under src/data and is
// served through helper utilities in src/lib/content-service.ts.