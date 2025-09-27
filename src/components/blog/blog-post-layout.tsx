"use client";

import { useState, useEffect, useRef } from "react";
import type { BlogDetail, BlogSummary } from "@/lib/content-service";
import { ReadNext } from "./read-next";
import { ShareButtons } from "./share-buttons";

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface BlogPostLayoutProps {
  post: BlogDetail;
  allPosts: BlogSummary[];
}

const HEADING_OFFSET = 160;

const getHeadingOffset = () => {
  if (typeof window === "undefined") return HEADING_OFFSET;
  return window.innerWidth < 1024 ? 112 : HEADING_OFFSET;
};

export function BlogPostLayout({ post, allPosts }: BlogPostLayoutProps) {
  const [tocItems, setTocItems] = useState<TableOfContentsItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const activeSectionRef = useRef<string>("");
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Extract headings from content
    const tempDiv = document.createElement("div");
  tempDiv.innerHTML = post.html;
    
  const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const items: TableOfContentsItem[] = [];
    
    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      const text = heading.textContent || "";
      const level = parseInt(heading.tagName.charAt(1));
      
      // Add ID to heading for navigation
      heading.id = id;
      
      items.push({ id, text, level });
    });
    
    setTocItems(items);
    
    // Update the content with IDs
    const updatedContent = tempDiv.innerHTML;
    const contentElement = document.querySelector('.blog-content');
    if (contentElement) {
      contentElement.innerHTML = updatedContent;
    }
  }, [post.html]);

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    
    // Use a simpler approach - wait for DOM to be ready then set up scroll tracking
    const initializeScrollTracking = () => {
      const headings = Array.from(
        document.querySelectorAll(
          ".blog-content h1[id], .blog-content h2[id], .blog-content h3[id], .blog-content h4[id], .blog-content h5[id], .blog-content h6[id]"
        )
      ) as HTMLElement[];

      if (headings.length === 0) {
        return;
      }

      const updateActiveHeading = () => {
        const headingOffset = getHeadingOffset();
        const scrollTop = window.scrollY;
        let activeId = "";

        // Find the heading that's currently in view
        for (const heading of headings) {
          const rect = heading.getBoundingClientRect();
          const headingTop = rect.top + scrollTop;
          
          // Check if heading is above the scroll position (accounting for navbar)
          if (headingTop <= scrollTop + headingOffset) {
            activeId = heading.id;
          }
        }

        // If we're at the very top and no heading is found, use first heading
        if (!activeId && headings.length > 0) {
          activeId = headings[0].id;
        }

        if (activeId && activeId !== activeSectionRef.current) {
          activeSectionRef.current = activeId;
          setActiveSection(activeId);
        }
      };

      const handleScroll = () => {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        rafId.current = requestAnimationFrame(updateActiveHeading);
      };

      // Initial update
      updateActiveHeading();
      
      // Add scroll listener
      window.addEventListener("scroll", handleScroll, { passive: true });

      cleanup = () => {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        window.removeEventListener("scroll", handleScroll);
      };
    };

    // Wait for content to be rendered, then initialize
    const timer = setTimeout(initializeScrollTracking, 500);

    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, [post.html]);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll(
        ".blog-content h1[id], .blog-content h2[id], .blog-content h3[id], .blog-content h4[id], .blog-content h5[id], .blog-content h6[id]"
      )
    );

    headings.forEach((heading) => {
      if (heading.id === activeSection) {
        heading.classList.add("active-heading");
      } else {
        heading.classList.remove("active-heading");
      }
    });
  }, [activeSection]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      activeSectionRef.current = id;
      setActiveSection(id);

      const yOffset = getHeadingOffset() - 24;
      const targetPosition =
        element.getBoundingClientRect().top + window.scrollY - yOffset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      setIsMobileTocOpen(false);
    }
  };

  const renderTocItems = () => (
    <nav className="space-y-2">
      {tocItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToHeading(item.id)}
          className={`block w-full rounded-lg py-2 pr-3 text-left text-sm transition-colors ${
            activeSection === item.id
              ? "border-l-2 border-primary bg-primary/10 font-semibold text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={{ paddingLeft: `${(item.level - 1) * 16 + 16}px` }}
        >
          {item.text}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        {/* Table of Contents Sidebar */}
        {tocItems.length > 0 && (
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Table of Contents
              </h3>
              <div className="mt-4">{renderTocItems()}</div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {tocItems.length > 0 && (
            <div className="mb-8 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileTocOpen((prev) => !prev)}
                className="flex w-full items-center justify-between text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Table of Contents
                <span className="text-xs">
                  {isMobileTocOpen ? "Hide" : "Show"}
                </span>
              </button>
              {isMobileTocOpen && <div className="mt-4">{renderTocItems()}</div>}
            </div>
          )}
          <article className="prose prose-lg max-w-none dark:prose-invert">
            {/* Blog Header */}
            <div className="not-prose mb-8">
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {post.title}
              </h1>
              <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground sm:gap-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {post.date}
                </span>
                <span className="text-muted-foreground/50">•</span>
                <span>{post.readTime} min read</span>
                <span className="text-muted-foreground/50">•</span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {post.category}
                </span>
              </div>

            </div>

            {/* Blog Content with Enhanced Styling */}
            <div 
              className="blog-content prose-headings:scroll-mt-28"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* Tags */}
            <div className="not-prose mt-12 border-t pt-8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="not-prose mt-12">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Read Next Section */}
            <ReadNext posts={allPosts} currentSlug={post.slug} />
          </article>
        </main>
      </div>
    </div>
  );
}