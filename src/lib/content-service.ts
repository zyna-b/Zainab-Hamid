import { marked } from 'marked';

import type { Project, AIExperiment, Experience, Skill, Certification, FAQ, Service } from './types';
import { resolveServiceIcon, type ServiceIconKey } from './icon-map';
import {
  getPortfolioData,
  updatePortfolioData,
  getBlogPosts,
  updateBlogPosts,
  type PortfolioData,
  type BlogPostContent,
  getSiteContent,
  updateSiteContent,
  type SiteContent,
} from './data-store';

export async function fetchProjects(): Promise<Project[]> {
  const data = await getPortfolioData();
  return data.projects;
}

export async function fetchAIExperiments(): Promise<AIExperiment[]> {
  const data = await getPortfolioData();
  return data.aiExperiments;
}

export async function fetchExperiences(): Promise<Experience[]> {
  const data = await getPortfolioData();
  return data.experiences;
}

export async function fetchSkills(): Promise<Skill[]> {
  const data = await getPortfolioData();
  return data.skills;
}

export async function fetchCertifications(): Promise<Certification[]> {
  const data = await getPortfolioData();
  return data.certifications;
}

export async function fetchFaqs(): Promise<FAQ[]> {
  const data = await getPortfolioData();
  return data.faqs;
}

export async function fetchServices(): Promise<Service[]> {
  const data = await getPortfolioData();
  return data.services.map((service) => ({
    ...service,
    icon: resolveServiceIcon(service.icon as ServiceIconKey),
  }));
}

export async function updatePortfolio(updater: (data: PortfolioData) => PortfolioData | Promise<PortfolioData>) {
  await updatePortfolioData(updater);
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  publishedAt: string;
  category: string;
  readTime: number;
  tags: string[];
};

export type BlogDetail = BlogSummary & {
  content: string;
  html: string;
};

function toSummary(post: BlogPostContent): BlogSummary {
  const publishedAt = post.date ?? new Date().toISOString();
  const displayDate = dateFormatter.format(new Date(publishedAt));

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    date: displayDate,
    publishedAt,
    category: post.category,
    readTime: post.readTime,
    tags: post.tags,
  };
}

async function toDetail(post: BlogPostContent): Promise<BlogDetail> {
  const summary = toSummary(post);
  return {
    ...summary,
    content: post.content ?? '',
    html: await marked.parse(post.content ?? ''),
  };
}

export async function fetchBlogSummaries(): Promise<BlogSummary[]> {
  const posts = await getBlogPosts();
  return posts
    .map(toSummary)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function fetchBlogDetail(slug: string): Promise<BlogDetail | null> {
  const posts = await getBlogPosts();
  const match = posts.find((post) => post.slug === slug);
  return match ? await toDetail(match) : null;
}

export async function fetchBlogPage(page: number, pageSize: number) {
  const posts = await fetchBlogSummaries();
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    posts: posts.slice(start, end),
    total,
    totalPages,
    currentPage,
    pageSize,
  };
}

export async function saveBlogPosts(updater: (posts: BlogPostContent[]) => BlogPostContent[] | Promise<BlogPostContent[]>) {
  await updateBlogPosts(updater);
}

export async function fetchSiteContent(): Promise<SiteContent> {
  return getSiteContent();
}

export async function saveSiteContent(updater: (content: SiteContent) => SiteContent | Promise<SiteContent>) {
  await updateSiteContent(updater);
}
