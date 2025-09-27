import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

import type {
  Project,
  AIExperiment,
  Experience,
  Skill,
  Certification,
  FAQ,
} from './types';
import type { ServiceIconKey } from './icon-map.js';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');
const SITE_FILE = path.join(DATA_DIR, 'site.json');

export type ServiceEntry = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconKey | string;
};

export type PortfolioData = {
  projects: Project[];
  aiExperiments: AIExperiment[];
  experiences: Experience[];
  skills: Skill[];
  certifications: Certification[];
  services: ServiceEntry[];
  faqs: FAQ[];
};

export type BlogPostContent = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: string;
  readTime: number;
  tags: string[];
  content: string;
};

export type HeroContent = {
  name: string;
  role: string;
  intro: string;
  summary: string;
  resumeUrl: string;
};

export type AboutContent = {
  imageSrc: string;
  imageAlt: string;
  storyHeading: string;
  storyParagraphs: string[];
  expertiseHeading: string;
  expertiseParagraphs: string[];
  closingParagraph: string;
};

export type SiteContent = {
  hero: HeroContent;
  about: AboutContent;
};

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDataDir();

  try {
    const file = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(file) as T;
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeJsonFile(filePath, fallback);
      return fallback;
    }
    console.error(`Failed to read JSON file at ${filePath}:`, error);
    return fallback;
  }
}

async function writeJsonFile(filePath: string, data: unknown) {
  await ensureDataDir();
  const formatted = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, `${formatted}\n`, 'utf-8');
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const fallback: PortfolioData = {
    projects: [],
    aiExperiments: [],
    experiences: [],
    skills: [],
    certifications: [],
    services: [],
    faqs: [],
  };

  return readJsonFile<PortfolioData>(PORTFOLIO_FILE, fallback);
}

export async function updatePortfolioData(updater: (data: PortfolioData) => PortfolioData | Promise<PortfolioData>) {
  const data = await getPortfolioData();
  const nextData = await updater(structuredClone(data));
  await writeJsonFile(PORTFOLIO_FILE, nextData);
}

export async function getBlogPosts(): Promise<BlogPostContent[]> {
  return readJsonFile<BlogPostContent[]>(BLOGS_FILE, []);
}

export async function updateBlogPosts(updater: (posts: BlogPostContent[]) => BlogPostContent[] | Promise<BlogPostContent[]>) {
  const posts = await getBlogPosts();
  const nextPosts = await updater(structuredClone(posts));
  await writeJsonFile(BLOGS_FILE, nextPosts);
}

export async function getSiteContent(): Promise<SiteContent> {
  const fallback: SiteContent = {
    hero: {
      name: 'Zainab Hamid',
      role: 'Chief Developer & AI Engineer',
      intro: 'I transform complex problems into elegant, scalable solutions.',
      summary: 'Welcome to my digital space where I showcase my journey, projects, and expertise in the world of technology.',
      resumeUrl: '/placeholder-resume.pdf',
    },
    about: {
      imageSrc: '/images/zainab-side.png',
      imageAlt: 'Professional portrait of Zainab Hamid',
      storyHeading: 'My Story',
      storyParagraphs: [
        "Hello! I'm Zainab Hamid, a Chief Developer and AI Engineer with a deep passion for creating impactful and innovative technology solutions. I specialize in building all types of web apps, mobile apps, software, and work extensively in Artificial Intelligence. My journey into tech was driven by a fascination with how software can solve real-world problems and enhance human experiences.",
        "Over the years, I've honed my skills across various domains, from crafting intelligent algorithms for AI applications to building seamless user interfaces for web and mobile platforms. I thrive in dynamic environments where I can continuously learn and apply new technologies to build cutting-edge products.",
      ],
      expertiseHeading: 'Expertise & Philosophy',
      expertiseParagraphs: [
        "My expertise lies in bridging the gap between complex technical challenges and user-friendly solutions. I believe in writing clean, efficient, and maintainable code, and I'm committed to best practices in software development. Whether it's developing a sophisticated AI model or a pixel-perfect front-end, I approach every project with dedication and a keen eye for detail.",
        "I'm always excited to collaborate on projects that push the boundaries of technology and create lasting value. Let's build something amazing together!",
      ],
      closingParagraph: '',
    },
  };

  return readJsonFile<SiteContent>(SITE_FILE, fallback);
}

export async function updateSiteContent(updater: (content: SiteContent) => SiteContent | Promise<SiteContent>) {
  const content = await getSiteContent();
  const next = await updater(structuredClone(content));
  await writeJsonFile(SITE_FILE, next);
}