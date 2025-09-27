'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import type { ChangeEvent } from 'react';
import { ImageUploader } from '@/components/admin/image-uploader';
import { DocumentUploader } from '@/components/admin/document-uploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { savePortfolioSection, upsertBlogPost, deleteBlogPost, logoutAction, saveHeroContent, saveAboutContent } from './actions';
import type { PortfolioData, BlogPostContent, HeroContent, AboutContent } from '@/lib/data-store';
import { cn } from '@/lib/utils';

const portfolioTabs = [
  { key: 'projects', label: 'Projects' },
  { key: 'aiExperiments', label: 'AI Experiments' },
  { key: 'experiences', label: 'Experience' },
  { key: 'skills', label: 'Skills' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'services', label: 'Services' },
  { key: 'faqs', label: 'FAQs' },
] as const;

const additionalTabs = [
  { key: 'blogs', label: 'Blogs' },
  { key: 'siteSettings', label: 'Site Settings' },
] as const;

const tabsOrder = [...portfolioTabs, ...additionalTabs] as const;

type AdminTabKey = (typeof tabsOrder)[number]['key'];
type PortfolioSectionKey = (typeof portfolioTabs)[number]['key'];

const portfolioTabKeys: PortfolioSectionKey[] = portfolioTabs.map((tab) => tab.key);

type PortfolioSectionConfig = {
  [K in PortfolioSectionKey]: {
    title: string;
    description: string;
    data: PortfolioData[K];
  };
};

const paragraphsToTextarea = (paragraphs: string[]) => paragraphs.join('\n\n');

const textareaToParagraphs = (value: string) =>
  value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

type AdminDashboardProps = {
  portfolio: PortfolioData;
  blogs: BlogPostContent[];
  hero: HeroContent;
  about: AboutContent;
};

type JsonEditorProps<S extends PortfolioSectionKey> = {
  section: S;
  title: string;
  description: string;
  data: PortfolioData[S];
  onSaved: (data: PortfolioData[S]) => void;
};

function AdminJsonEditor<S extends PortfolioSectionKey>({ section, title, description, data, onSaved }: JsonEditorProps<S>) {
  const [value, setValue] = useState(() => JSON.stringify(data, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    setValue(JSON.stringify(data, null, 2));
  }, [data]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const supportsUploads = section === 'projects' || section === 'aiExperiments' || section === 'services';

  const handleSave = () => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      toast({
        title: 'Invalid JSON',
        description: 'Please fix the JSON before saving.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const result = await savePortfolioSection(section, parsed as PortfolioData[S]);
      if (result.success && result.data) {
        onSaved(result.data);
        setValue(JSON.stringify(result.data, null, 2));
        toast({
          title: `${title} updated`,
          description: 'Changes saved successfully.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Save failed',
          description: result.message ?? 'Please review your input and try again.',
          variant: 'destructive',
        });
        if (result.errors?.length) {
          setError(result.errors.join('\n'));
        }
      }
    });
  };

  const handleReset = () => {
    setValue(JSON.stringify(data, null, 2));
    setError(null);
  };

  return (
    <Card className="shadow-sm border-border/60">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {supportsUploads && (
          <div className="space-y-2">
            <ImageUploader
              folder={section}
              onUpload={(url) => {
                setLastUploadedUrl(url);
                if (typeof navigator !== 'undefined' && navigator.clipboard) {
                  navigator.clipboard.writeText(url).catch(() => undefined);
                }
              }}
              description="Upload an image to generate a URL you can paste into the JSON below."
            />
            {lastUploadedUrl && (
              <p className="text-xs text-muted-foreground">
                Last uploaded image URL (copied to clipboard):{' '}
                <code className="font-mono">{lastUploadedUrl}</code>
              </p>
            )}
          </div>
        )}
        <Textarea
          value={value}
          onChange={handleChange}
          className="font-mono text-sm h-[320px]"
          spellCheck={false}
        />
        {error && (
          <p className="text-sm text-destructive whitespace-pre-wrap border border-destructive/30 rounded-md p-3 bg-destructive/5">
            {error}
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleReset} disabled={isPending}>
            Reset
          </Button>
          <Button type="button" onClick={handleSave} disabled={isPending}>
            {isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

type BlogFormState = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: string;
  readTime: string;
  tags: string;
  content: string;
};

function toFormState(post: BlogPostContent): BlogFormState {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    date: post.date,
    category: post.category,
    readTime: String(post.readTime),
    tags: post.tags.join(', '),
    content: post.content,
  };
}

function createEmptyPost(): BlogFormState {
  const today = new Date().toISOString().split('T')[0];
  return {
    title: '',
    slug: '',
    excerpt: '',
    coverImage: '/images/placeholder.png',
    date: today,
    category: '',
    readTime: '5',
    tags: '',
    content: '# New blog post\n\nStart writing your story here…',
  };
}

type BlogManagerProps = {
  initialPosts: BlogPostContent[];
  onUpdate(posts: BlogPostContent[]): void;
};

function BlogManager({ initialPosts, onUpdate }: BlogManagerProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [formState, setFormState] = useState<BlogFormState>(() =>
    initialPosts.length > 0 ? toFormState(initialPosts[0]) : createEmptyPost(),
  );
  const [isPending, startTransition] = useTransition();

  const handleFieldChange = (field: keyof BlogFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleInputChange(field, event.target.value);
    };

  useEffect(() => {
    setPosts(initialPosts);
    if (initialPosts.length > 0) {
      setFormState(toFormState(initialPosts[0]));
    }
  }, [initialPosts]);

  const handleSelect = (post: BlogPostContent) => {
    setFormState(toFormState(post));
  };

  const handleInputChange = (field: keyof BlogFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const trimmedTitle = formState.title.trim();
    const trimmedSlug = formState.slug.trim();
    if (!trimmedTitle || !trimmedSlug) {
      toast({
        title: 'Missing required fields',
        description: 'Title and slug are required before saving.',
        variant: 'destructive',
      });
      return;
    }

    const tagsArray = formState.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const readTime = Number.isNaN(Number.parseInt(formState.readTime, 10))
      ? 1
      : Math.max(1, Number.parseInt(formState.readTime, 10));

    const payload = {
      id: formState.id,
      title: trimmedTitle,
      slug: trimmedSlug,
      excerpt: formState.excerpt.trim(),
      coverImage: formState.coverImage.trim(),
      date: formState.date,
      category: formState.category.trim(),
      readTime,
      tags: tagsArray,
      content: formState.content,
    };

    startTransition(async () => {
      const result = await upsertBlogPost(payload);
      if (result.success && result.data) {
        const updater = (prev: BlogPostContent[]) => {
          const index = prev.findIndex((post) => post.id === result.data!.id);
          if (index >= 0) {
            const next = [...prev];
            next[index] = result.data!;
            return next;
          }
          return [result.data!, ...prev];
        };

        setPosts((prev) => {
          const next = updater(prev);
          Promise.resolve().then(() => onUpdate(next));
          return next;
        });
        setFormState(toFormState(result.data));
        toast({
          title: result.message ?? 'Blog post saved',
          description: 'Your blog post is now live on the site.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Save failed',
          description: result.message ?? 'Check your input and try again.',
          variant: 'destructive',
        });
      }
    });
  };

  const handleDelete = () => {
    if (!formState.id) {
      toast({ title: 'Nothing to delete', description: 'Select an existing post first.' });
      return;
    }

    startTransition(async () => {
      const result = await deleteBlogPost(formState.id!);
      if (result.success && result.data) {
        setPosts((prev) => {
          const next = prev.filter((post) => post.id !== result.data!.id);
          Promise.resolve().then(() => onUpdate(next));
          return next;
        });
        setFormState(createEmptyPost());
        toast({
          title: 'Blog post deleted',
          description: 'The post has been removed.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Delete failed',
          description: result.message ?? 'Unable to delete this post.',
          variant: 'destructive',
        });
      }
    });
  };

  const selectedId = formState.id;

  return (
    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle>Existing posts</CardTitle>
          <CardDescription>Select a post to edit or create a new one.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setFormState(createEmptyPost())}
              disabled={isPending}
            >
              New post
            </Button>
          </div>
          <ScrollArea className="h-[360px]">
            <div className="space-y-1 p-2">
              {posts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => handleSelect(post)}
                  className={cn(
                    'w-full text-left rounded-md border border-transparent px-3 py-2 transition-colors',
                    selectedId === post.id
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'hover:bg-muted'
                  )}
                  disabled={isPending}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium line-clamp-1">{post.title}</span>
                    <Badge variant="outline">{post.readTime} min</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </button>
              ))}
              {posts.length === 0 && (
                <p className="px-3 py-6 text-sm text-muted-foreground text-center">
                  No blog posts yet. Create your first article.
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle>{formState.id ? 'Edit blog post' : 'Create blog post'}</CardTitle>
          <CardDescription>
            Write Markdown in the content area. Tags are comma separated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formState.title}
                onChange={handleFieldChange('title')}
                placeholder="Enter a compelling title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formState.slug}
                onChange={handleFieldChange('slug')}
                placeholder="my-awesome-blog"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formState.excerpt}
              onChange={handleFieldChange('excerpt')}
              rows={3}
              placeholder="Short summary for the listing grid"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover image</Label>
              <ImageUploader
                id="coverImageUpload"
                folder="blog"
                value={formState.coverImage}
                onUpload={(url) => handleInputChange('coverImage', url)}
                description="Upload a new cover image or provide a URL below."
              />
              <Input
                id="coverImage"
                value={formState.coverImage}
                onChange={handleFieldChange('coverImage')}
                placeholder="/uploads/blog/your-image.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Publish date</Label>
              <Input
                id="date"
                type="date"
                value={formState.date}
                onChange={handleFieldChange('date')}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formState.category}
                onChange={handleFieldChange('category')}
                placeholder="AI, Web Development, ..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="readTime">Read time (minutes)</Label>
              <Input
                id="readTime"
                type="number"
                min={1}
                value={formState.readTime}
                onChange={handleFieldChange('readTime')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formState.tags}
              onChange={handleFieldChange('tags')}
              placeholder="ai, machine learning, research"
            />
            <p className="text-xs text-muted-foreground">
              Separate tags with commas. They improve search and filtering.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea
              id="content"
              value={formState.content}
              onChange={handleFieldChange('content')}
              className="font-mono text-sm h-[280px]"
              spellCheck
            />
          </div>

          <div className="flex flex-wrap justify-between gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleDelete} disabled={isPending || !formState.id}>
              Delete post
            </Button>
            <Button type="button" onClick={handleSave} disabled={isPending}>
              {isPending ? 'Saving…' : 'Save post'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type HeroManagerProps = {
  initialHero: HeroContent;
  onSaved(hero: HeroContent): void;
};

type HeroFormState = HeroContent;

function HeroManager({ initialHero, onSaved }: HeroManagerProps) {
  const [formState, setFormState] = useState<HeroFormState>(initialHero);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string[] | null>(null);

  useEffect(() => {
    setFormState(initialHero);
    setErrors(null);
  }, [initialHero]);

  const handleFieldChange = <K extends keyof HeroFormState>(field: K) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormState((prev) => ({ ...prev, [field]: value }));
    };

  const handleResumeUpload = (url: string) => {
    setFormState((prev) => ({ ...prev, resumeUrl: url }));
  };

  const handleReset = () => {
    setFormState(initialHero);
    setErrors(null);
  };

  const handleSave = () => {
    const payload: HeroContent = {
      name: formState.name.trim(),
      role: formState.role.trim(),
      intro: formState.intro.trim(),
      summary: formState.summary.trim(),
      resumeUrl: formState.resumeUrl.trim(),
    };

    if (!payload.name || !payload.role || !payload.intro || !payload.summary || !payload.resumeUrl) {
      const validationErrors = ['All hero fields and a resume link are required.'];
      setErrors(validationErrors);
      toast({
        title: 'Missing fields',
        description: validationErrors[0],
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const result = await saveHeroContent(payload);
      if (result.success && result.data) {
        setErrors(null);
        onSaved(result.data);
        setFormState(result.data);
        toast({
          title: 'Hero updated',
          description: 'Home page hero content refreshed successfully.',
          variant: 'success',
        });
      } else {
        const validationErrors = result.errors ?? null;
        setErrors(validationErrors);
        toast({
          title: 'Save failed',
          description: result.message ?? 'Please review the fields and try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-border/60 shadow-sm lg:col-span-2">
        <CardHeader>
          <CardTitle>Hero content</CardTitle>
          <CardDescription>Manage the headline, highlighted role, and introductory text on the home page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hero-name">Your name</Label>
              <Input
                id="hero-name"
                value={formState.name}
                onChange={handleFieldChange('name')}
                placeholder="Zainab Hamid"
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-role">Highlighted role</Label>
              <Input
                id="hero-role"
                value={formState.role}
                onChange={handleFieldChange('role')}
                placeholder="Chief Developer & AI Engineer"
                disabled={isPending}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-intro">Intro sentence (after the highlight)</Label>
            <Textarea
              id="hero-intro"
              value={formState.intro}
              onChange={handleFieldChange('intro')}
              rows={3}
              placeholder="I transform complex problems into elegant, scalable solutions."
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-summary">Supporting paragraph</Label>
            <Textarea
              id="hero-summary"
              value={formState.summary}
              onChange={handleFieldChange('summary')}
              rows={4}
              placeholder="Welcome visitors to your portfolio and describe your mission."
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label>Resume document</Label>
            <DocumentUploader
              folder="resume"
              value={formState.resumeUrl}
              onUpload={handleResumeUpload}
              description="Upload a PDF or Word document. The generated URL will be used by the Download Resume button."
            />
            <Input
              id="hero-resume-url"
              value={formState.resumeUrl}
              onChange={handleFieldChange('resumeUrl')}
              placeholder="/uploads/resume/zainab-hamid-resume.pdf"
              disabled={isPending}
            />
          </div>

          {errors && errors.length > 0 && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <ul className="list-disc space-y-1 pl-4">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleReset} disabled={isPending}>
              Reset
            </Button>
            <Button type="button" onClick={handleSave} disabled={isPending}>
              {isPending ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type AboutManagerProps = {
  initialAbout: AboutContent;
  onSaved(about: AboutContent): void;
};

function toAboutFormState(about: AboutContent) {
  return {
    imageSrc: about.imageSrc,
    imageAlt: about.imageAlt,
    storyHeading: about.storyHeading,
    expertiseHeading: about.expertiseHeading,
    closingParagraph: about.closingParagraph ?? '',
    storyText: paragraphsToTextarea(about.storyParagraphs),
    expertiseText: paragraphsToTextarea(about.expertiseParagraphs),
  };
}

type AboutFormState = ReturnType<typeof toAboutFormState>;

function AboutManager({ initialAbout, onSaved }: AboutManagerProps) {
  const [formState, setFormState] = useState<AboutFormState>(() => toAboutFormState(initialAbout));
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string[] | null>(null);

  useEffect(() => {
    setFormState(toAboutFormState(initialAbout));
    setErrors(null);
  }, [initialAbout]);

  const handleFieldChange = (field: keyof AboutFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormState((prev) => ({ ...prev, [field]: value }));
    };

  const handleImageUpload = (url: string) => {
    setFormState((prev) => ({ ...prev, imageSrc: url }));
  };

  const handleReset = () => {
    setFormState(toAboutFormState(initialAbout));
    setErrors(null);
  };

  const handleSave = () => {
    const storyParagraphs = textareaToParagraphs(formState.storyText);
    const expertiseParagraphs = textareaToParagraphs(formState.expertiseText);

    const requiredErrors: string[] = [];

    const payload: AboutContent = {
      imageSrc: formState.imageSrc.trim(),
      imageAlt: formState.imageAlt.trim(),
      storyHeading: formState.storyHeading.trim(),
      storyParagraphs,
      expertiseHeading: formState.expertiseHeading.trim(),
      expertiseParagraphs,
      closingParagraph: formState.closingParagraph.trim(),
    };

    if (!payload.imageSrc) {
      requiredErrors.push('An image path is required.');
    }
    if (!payload.imageAlt) {
      requiredErrors.push('Image alt text is required.');
    }
    if (!payload.storyHeading) {
      requiredErrors.push('Story heading is required.');
    }
    if (!payload.expertiseHeading) {
      requiredErrors.push('Expertise heading is required.');
    }
    if (payload.storyParagraphs.length === 0) {
      requiredErrors.push('Provide at least one story paragraph.');
    }
    if (payload.expertiseParagraphs.length === 0) {
      requiredErrors.push('Provide at least one expertise paragraph.');
    }

    if (requiredErrors.length > 0) {
      setErrors(requiredErrors);
      toast({
        title: 'Missing fields',
        description: requiredErrors[0],
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const result = await saveAboutContent(payload);
      if (result.success && result.data) {
        setErrors(null);
        setFormState(toAboutFormState(result.data));
        onSaved(result.data);
        toast({
          title: 'About updated',
          description: 'About me section refreshed successfully.',
          variant: 'success',
        });
      } else {
        const validationErrors = result.errors ?? null;
        setErrors(validationErrors);
        toast({
          title: 'Save failed',
          description: result.message ?? 'Please review the fields and try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="grid gap-6">
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle>About section</CardTitle>
          <CardDescription>
            Update the about page hero image and biography text shown under “My Story” and “Expertise & Philosophy”.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="about-image">Portrait image</Label>
              <ImageUploader
                id="about-image"
                folder="about"
                value={formState.imageSrc}
                onUpload={handleImageUpload}
                description="Upload a portrait image or provide a path below."
              />
              <Input
                value={formState.imageSrc}
                onChange={handleFieldChange('imageSrc')}
                placeholder="/images/zainab-side.png"
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-image-alt">Image alt text</Label>
              <Input
                id="about-image-alt"
                value={formState.imageAlt}
                onChange={handleFieldChange('imageAlt')}
                placeholder="Professional portrait of Zainab Hamid"
                disabled={isPending}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-story-heading">Story heading</Label>
            <Input
              id="about-story-heading"
              value={formState.storyHeading}
              onChange={handleFieldChange('storyHeading')}
              placeholder="My Story"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-story">Story paragraphs</Label>
            <Textarea
              id="about-story"
              value={formState.storyText}
              onChange={handleFieldChange('storyText')}
              rows={6}
              placeholder={"Separate paragraphs with a blank line."}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">Separate paragraphs with a blank line to control spacing.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-expertise-heading">Expertise heading</Label>
            <Input
              id="about-expertise-heading"
              value={formState.expertiseHeading}
              onChange={handleFieldChange('expertiseHeading')}
              placeholder="Expertise & Philosophy"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-expertise">Expertise paragraphs</Label>
            <Textarea
              id="about-expertise"
              value={formState.expertiseText}
              onChange={handleFieldChange('expertiseText')}
              rows={6}
              placeholder={"Separate paragraphs with a blank line."}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-closing">Closing paragraph (optional)</Label>
            <Textarea
              id="about-closing"
              value={formState.closingParagraph}
              onChange={handleFieldChange('closingParagraph')}
              rows={3}
              placeholder="Add an optional closing call-to-action."
              disabled={isPending}
            />
          </div>

          {errors && errors.length > 0 && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <ul className="list-disc space-y-1 pl-4">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleReset} disabled={isPending}>
              Reset
            </Button>
            <Button type="button" onClick={handleSave} disabled={isPending}>
              {isPending ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminDashboard({ portfolio, blogs, hero, about }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTabKey>('projects');
  const [currentPortfolio, setCurrentPortfolio] = useState(portfolio);
  const [currentBlogs, setCurrentBlogs] = useState(blogs);
  const [currentHero, setCurrentHero] = useState(hero);
  const [currentAbout, setCurrentAbout] = useState(about);

  useEffect(() => {
    setCurrentHero(hero);
    setCurrentAbout(about);
  }, [hero, about]);

  const portfolioSections = useMemo(() => {
    return {
      projects: {
        title: 'Projects',
        description: 'Update projects shown on the public portfolio page.',
        data: currentPortfolio.projects,
      },
      aiExperiments: {
        title: 'AI Experiments',
        description: 'Manage interactive AI experiment cards.',
        data: currentPortfolio.aiExperiments,
      },
      experiences: {
        title: 'Professional experience',
        description: 'Highlight roles and responsibilities.',
        data: currentPortfolio.experiences,
      },
      skills: {
        title: 'Skills & tech stack',
        description: 'Categorized skills displayed on the about page.',
        data: currentPortfolio.skills,
      },
      certifications: {
        title: 'Certifications',
        description: 'Certifications and achievements.',
        data: currentPortfolio.certifications,
      },
      services: {
        title: 'Services',
        description: 'Services listed on the services page (icon keys map to lucide icons).',
        data: currentPortfolio.services,
      },
      faqs: {
        title: 'Frequently asked questions',
        description: 'Questions and answers shown on the contact page.',
        data: currentPortfolio.faqs,
      },
    } satisfies PortfolioSectionConfig;
  }, [currentPortfolio]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-headline">Admin dashboard</h1>
          <p className="text-muted-foreground">
            Update portfolio sections, manage AI experiments, and publish blog posts. Changes sync to the public site instantly.
          </p>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="outline">
            Sign out
          </Button>
        </form>
      </div>

  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AdminTabKey)}>
        <TabsList className="flex-wrap justify-start">
          {tabsOrder.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key} className="capitalize">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {portfolioTabKeys.map((key) => {
          const section = portfolioSections[key];
          return (
            <TabsContent key={key} value={key} className="mt-6">
              <AdminJsonEditor
                section={key}
                title={section.title}
                description={section.description}
                data={section.data}
                onSaved={(updated) =>
                  setCurrentPortfolio((prev) => ({
                    ...prev,
                    [key]: updated,
                  }))
                }
              />
            </TabsContent>
          );
        })}

        <TabsContent value="blogs" className="mt-6">
          <BlogManager
            initialPosts={currentBlogs}
            onUpdate={(next) => {
              setCurrentBlogs(next);
            }}
          />
        </TabsContent>

        <TabsContent value="siteSettings" className="mt-6">
          <div className="space-y-6">
            <HeroManager
              initialHero={currentHero}
              onSaved={(updated) => {
                setCurrentHero(updated);
              }}
            />
            <AboutManager
              initialAbout={currentAbout}
              onSaved={(updated) => {
                setCurrentAbout(updated);
              }}
            />
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <Card className="bg-muted/30 border-border/60">
        <CardHeader>
          <CardTitle>Quick tips</CardTitle>
          <CardDescription>
            Helpful reminders for keeping your content organized and high performing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Keep project and experiment IDs unique to avoid layout issues.
            </li>
            <li>
              Blog slugs should match the URL you want to share (kebab-case works best).
            </li>
            <li>
              Icons for services accept keys from the mapping in <code>src/lib/icon-map.ts</code>.
            </li>
            <li>
              After saving, the related public pages are revalidated automatically.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
