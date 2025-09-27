'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

import {
  verifyAdminCredentials,
  createAdminSession,
  destroyAdminSession,
  assertAdminSession,
  getCurrentRequestIp,
} from '@/lib/auth';
import { getLoginRateLimitStatus, registerLoginFailure, registerLoginSuccess } from '@/lib/rate-limit';
import {
  updatePortfolioData,
  updateBlogPosts,
  getBlogPosts,
  updateSiteContent,
  type PortfolioData,
  type BlogPostContent,
  type HeroContent,
  type AboutContent,
} from '@/lib/data-store';

export type LoginFormState = {
  error?: string;
};

const MIN_LOGIN_RESPONSE_DELAY_MS = 350;

function resolveRedirectTarget(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string') {
    return '/admin';
  }
  const trimmed = value.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return '/admin';
  }
  return trimmed.length > 0 ? trimmed : '/admin';
}

function formatRetryAfterMs(ms?: number): string {
  if (!ms || ms <= 0) {
    return 'a short while';
  }
  const seconds = Math.ceil(ms / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'}`;
  }
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  }
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? '' : 's'}`;
}

async function enforceMinimumDelay(startedAt: number) {
  const elapsed = Date.now() - startedAt;
  if (elapsed >= MIN_LOGIN_RESPONSE_DELAY_MS) {
    return;
  }
  await new Promise((resolve) => setTimeout(resolve, MIN_LOGIN_RESPONSE_DELAY_MS - elapsed));
}

export async function loginAction(_prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const startedAt = Date.now();
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const redirectInput = formData.get('redirectTo');
  const redirectTarget = resolveRedirectTarget(redirectInput);

  const clientIp = await getCurrentRequestIp();
  const limiterStatus = getLoginRateLimitStatus(clientIp);

  if (!email || !password) {
    await enforceMinimumDelay(startedAt);
    return { error: 'Please provide both email and password.' };
  }

  if (limiterStatus.blocked) {
    await enforceMinimumDelay(startedAt);
    return {
      error: `Too many login attempts. Try again in ${formatRetryAfterMs(limiterStatus.retryAfterMs)}.`,
    };
  }

  const credentialsValid = verifyAdminCredentials(email, password);
  if (!credentialsValid) {
    const failureStatus = registerLoginFailure(clientIp);
    await enforceMinimumDelay(startedAt);

    if (failureStatus.blocked) {
      return {
        error: `Too many login attempts. Try again in ${formatRetryAfterMs(failureStatus.retryAfterMs)}.`,
      };
    }

    const remaining = failureStatus.remainingAttempts ?? 0;
    const attemptsMessage =
      remaining > 0
        ? `Invalid credentials. You have ${remaining} attempt${remaining === 1 ? '' : 's'} remaining before a temporary lockout.`
        : 'Invalid credentials. Please try again.';
    return { error: attemptsMessage };
  }

  registerLoginSuccess(clientIp);
  await createAdminSession();
  await enforceMinimumDelay(startedAt);
  redirect(redirectTarget);
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect('/admin/login');
}

const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  imageSrc: z.string().min(1),
  dataAiHint: z.string().optional(),
  tags: z.array(z.string()),
  liveLink: z.string().optional().nullable(),
  sourceLink: z.string().optional().nullable(),
  category: z.string().min(1),
});

const aiExperimentSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  imageSrc: z.string().min(1),
  dataAiHint: z.string().optional(),
  tags: z.array(z.string()),
  interactiveLink: z.string().optional().nullable(),
});

const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  date: z.string().min(1),
  description: z.array(z.string().min(1)),
});

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
});

const certificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().min(1),
  link: z.string().optional().nullable(),
});

const serviceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const sectionSchemas = {
  projects: projectSchema.array(),
  aiExperiments: aiExperimentSchema.array(),
  experiences: experienceSchema.array(),
  skills: skillSchema.array(),
  certifications: certificationSchema.array(),
  services: serviceSchema.array(),
  faqs: faqSchema.array(),
} satisfies Record<keyof PortfolioData, z.ZodTypeAny>;

const sectionRevalidateMap: Record<keyof PortfolioData, string[]> = {
  projects: ['/portfolio', '/admin'],
  aiExperiments: ['/ai-experiments', '/admin'],
  experiences: ['/about', '/admin'],
  skills: ['/about', '/admin'],
  certifications: ['/about', '/admin'],
  services: ['/services', '/admin'],
  faqs: ['/contact', '/admin'],
};

const sectionsWithIds: Array<keyof PortfolioData> = ['projects', 'aiExperiments', 'services'];

const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_DOCUMENT_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const DOCUMENT_EXTENSIONS = new Map<string, string>([
  ['application/pdf', '.pdf'],
  ['application/msword', '.doc'],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.docx'],
]);

export type ActionResult<T = void> = {
  success: boolean;
  message?: string;
  errors?: string[];
  data?: T;
};

async function ensureAdmin() {
  try {
    await assertAdminSession();
  } catch {
    throw new Error('UNAUTHORIZED');
  }
}

function handleZodError(error: unknown): string[] {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => issue.message);
  }
  return ['Unexpected error'];
}

export async function savePortfolioSection<S extends keyof PortfolioData>(
  section: S,
  entries: PortfolioData[S],
): Promise<ActionResult<PortfolioData[S]>> {
  try {
    await ensureAdmin();
    const schema = sectionSchemas[section];
    const parsed = schema.parse(entries) as PortfolioData[S];

    if (sectionsWithIds.includes(section)) {
      const duplicates = findDuplicateIds(parsed as Array<{ id: string }>);
      if (duplicates.length > 0) {
        return {
          success: false,
          message: 'Duplicate IDs found. Each item must have a unique id.',
          errors: duplicates.map((id) => `Duplicate id "${id}" detected.`),
        };
      }
    }

    await updatePortfolioData((data) => ({
      ...data,
      [section]: parsed,
    }));

    const paths = sectionRevalidateMap[section] ?? [];
    paths.forEach((path) => revalidatePath(path));

    return {
      success: true,
      message: `${section} saved successfully.`,
      data: parsed,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return { success: false, message: 'Unauthorized request.' };
    }
    return {
      success: false,
      message: 'Unable to save changes. Please review the errors.',
      errors: handleZodError(error),
    };
  }
}

function findDuplicateIds(items: Array<{ id: string }>): string[] {
  const seen = new Map<string, number>();
  const duplicates = new Set<string>();

  for (const item of items) {
    const key = item.id.trim();
    const count = (seen.get(key) ?? 0) + 1;
    seen.set(key, count);
    if (count > 1) {
      duplicates.add(key);
    }
  }

  return Array.from(duplicates);
}

function sanitizeFolderName(raw: string): string {
  const safe = raw.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
  return safe.length > 0 ? safe : 'general';
}

async function ensureUploadDirectory(folder: string) {
  const dir = path.join(UPLOAD_ROOT, folder);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export async function uploadImageAction(formData: FormData): Promise<ActionResult<{ url: string }>> {
  try {
    await ensureAdmin();

    const file = formData.get('file');
    if (!(file instanceof File)) {
      return { success: false, message: 'No image file provided.' };
    }

    if (!file.type.startsWith('image/')) {
      return { success: false, message: 'Only image uploads are allowed.' };
    }

    const folderInput = typeof formData.get('folder') === 'string' ? (formData.get('folder') as string) : 'general';
    const folder = sanitizeFolderName(folderInput);
    const uploadDir = await ensureUploadDirectory(folder);

    const arrayBuffer = await file.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      return { success: false, message: 'Cannot upload an empty file.' };
    }

    const originalExt = path.extname(file.name);
    const inferredExt = file.type.split('/')[1] ? `.${file.type.split('/')[1]}` : '';
    const extension = (originalExt || inferredExt || '.png').replace(/[^.a-z0-9]/gi, '').toLowerCase();
    const fileName = `${crypto.randomUUID()}${extension}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    const publicPath = path.posix.join('/uploads', folder, fileName);

    return {
      success: true,
      message: 'Image uploaded successfully.',
      data: { url: publicPath },
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return { success: false, message: 'Unauthorized request.' };
    }

    console.error('Image upload failed:', error);
    return {
      success: false,
      message: 'Failed to upload image. Please try again.',
    };
  }
}

const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, {
    message: 'Slug may only include lowercase letters, numbers, and hyphens.',
  }),
  excerpt: z.string().min(1),
  coverImage: z.string().min(1),
  date: z.string().min(1),
  category: z.string().min(1),
  readTime: z.coerce.number().int().positive(),
  tags: z.array(z.string()),
  content: z.string().min(1),
});

const heroContentSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  intro: z.string().min(1),
  summary: z.string().min(1),
  resumeUrl: z.string().min(1),
});

const aboutContentSchema = z.object({
  imageSrc: z.string().min(1),
  imageAlt: z.string().min(1),
  storyHeading: z.string().min(1),
  storyParagraphs: z.array(z.string().min(1)).min(1),
  expertiseHeading: z.string().min(1),
  expertiseParagraphs: z.array(z.string().min(1)).min(1),
  closingParagraph: z.string().optional().transform((value) => value?.trim() ?? ''),
});

export type BlogInput = z.infer<typeof blogPostSchema>;

export async function upsertBlogPost(input: BlogInput): Promise<ActionResult<BlogPostContent>> {
  try {
    await ensureAdmin();
    const parsed = blogPostSchema.parse(input);

    const posts = await getBlogPosts();
    const normalizedDate = new Date(parsed.date);
    if (Number.isNaN(normalizedDate.getTime())) {
      return {
        success: false,
        message: 'Invalid publish date. Please use a valid date string.',
      };
    }
    const isoDate = normalizedDate.toISOString().split('T')[0];

    const conflictingSlug = posts.find(
      (post) => post.slug === parsed.slug && (!parsed.id || parsed.id !== post.id),
    );
    if (conflictingSlug) {
      return {
        success: false,
        message: `Slug "${parsed.slug}" is already in use. Choose a unique slug.`,
      };
    }

    const cleanedTags = Array.from(new Set(parsed.tags.map((tag) => tag.trim()).filter(Boolean)));

    let updatedPost: BlogPostContent;
    if (parsed.id) {
      const index = posts.findIndex((post) => post.id === parsed.id);
      if (index === -1) {
        return { success: false, message: 'Blog post not found.' };
      }
      updatedPost = {
        ...posts[index],
        ...parsed,
        tags: cleanedTags,
        date: isoDate,
      };
      posts[index] = updatedPost;
    } else {
      updatedPost = {
        ...parsed,
        id: crypto.randomUUID(),
        tags: cleanedTags,
        date: isoDate,
      };
      posts.unshift(updatedPost);
    }

    await updateBlogPosts(() => posts);
    revalidatePath('/blog');
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/admin');

    return {
      success: true,
      message: parsed.id ? 'Blog post updated.' : 'Blog post created.',
      data: updatedPost,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return { success: false, message: 'Unauthorized request.' };
    }
    return {
      success: false,
      message: 'Unable to save blog post.',
      errors: handleZodError(error),
    };
  }
}

export async function deleteBlogPost(postId: string): Promise<ActionResult<{ id: string }>> {
  try {
    await ensureAdmin();
    const posts = await getBlogPosts();
    const index = posts.findIndex((post) => post.id === postId);
    if (index === -1) {
      return { success: false, message: 'Blog post not found.' };
    }

    const [removed] = posts.splice(index, 1);
    await updateBlogPosts(() => posts);
    revalidatePath('/blog');
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/admin');

    return { success: true, message: 'Blog post deleted.', data: { id: removed.id } };
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return { success: false, message: 'Unauthorized request.' };
    }
    return {
      success: false,
      message: 'Unable to delete blog post.',
      errors: handleZodError(error),
    };
  }
}

export async function saveHeroContent(input: HeroContent): Promise<ActionResult<HeroContent>> {
  try {
    await ensureAdmin();
    const parsed = heroContentSchema.parse(input);

    await updateSiteContent((content) => ({
      ...content,
      hero: parsed,
    }));

    revalidatePath('/');
    revalidatePath('/about');

    return {
      success: true,
      message: 'Hero content updated.',
      data: parsed,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return { success: false, message: 'Unauthorized request.' };
    }

    return {
      success: false,
      message: 'Unable to update hero content.',
      errors: handleZodError(error),
    };
  }
}

export async function saveAboutContent(input: AboutContent): Promise<ActionResult<AboutContent>> {
  try {
    await ensureAdmin();

    const prepared: AboutContent = {
      imageSrc: input.imageSrc.trim(),
      imageAlt: input.imageAlt.trim() || 'About portrait',
      storyHeading: input.storyHeading.trim(),
      storyParagraphs: input.storyParagraphs.map((paragraph) => paragraph.trim()).filter(Boolean),
      expertiseHeading: input.expertiseHeading.trim(),
      expertiseParagraphs: input.expertiseParagraphs.map((paragraph) => paragraph.trim()).filter(Boolean),
      closingParagraph: input.closingParagraph ? input.closingParagraph.trim() : '',
    };

    const parsed = aboutContentSchema.parse(prepared);

    await updateSiteContent((content) => ({
      ...content,
      about: parsed,
    }));

    revalidatePath('/about');

    return {
      success: true,
      message: 'About content updated.',
      data: parsed,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return { success: false, message: 'Unauthorized request.' };
    }

    return {
      success: false,
      message: 'Unable to update about content.',
      errors: handleZodError(error),
    };
  }
}

export async function uploadDocumentAction(formData: FormData): Promise<ActionResult<{ url: string }>> {
  try {
    await ensureAdmin();

    const file = formData.get('file');
    if (!(file instanceof File)) {
      return { success: false, message: 'No document provided.' };
    }

    const mimeType = file.type || '';
    if (!ALLOWED_DOCUMENT_TYPES.has(mimeType)) {
      return { success: false, message: 'Only PDF or Word documents are allowed.' };
    }

    const folderInput = typeof formData.get('folder') === 'string' ? (formData.get('folder') as string) : 'documents';
    const folder = sanitizeFolderName(folderInput);
    const uploadDir = await ensureUploadDirectory(folder);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.byteLength === 0) {
      return { success: false, message: 'Cannot upload an empty document.' };
    }

    const originalExt = path.extname(file.name).toLowerCase();
    const mappedExt = DOCUMENT_EXTENSIONS.get(mimeType) ?? '';
    const sanitizedOriginal = /^[.a-z0-9]+$/.test(originalExt) ? originalExt : '';
    const extension = (mappedExt || sanitizedOriginal || '.pdf').replace(/[^.a-z0-9]/gi, '');
    const fileName = `${crypto.randomUUID()}${extension}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    const publicPath = path.posix.join('/uploads', folder, fileName);

    return {
      success: true,
      message: 'Document uploaded successfully.',
      data: { url: publicPath },
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return { success: false, message: 'Unauthorized request.' };
    }

    console.error('Document upload failed:', error);
    return {
      success: false,
      message: 'Failed to upload document. Please try again.',
    };
  }
}
