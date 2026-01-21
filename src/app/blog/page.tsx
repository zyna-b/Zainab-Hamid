import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { BlogGrid } from "@/components/blog/blog-grid";
import { fetchBlogSummaries } from "@/lib/content-service";
import type { BlogSummary } from "@/lib/content-service";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Zainab Hamid",
  description: "Read my latest articles on AI, technology, and web development.",
};

const PAGE_SIZE = 10;

type BlogSearchParams = Record<string, string | string[] | undefined>;

function normalizeSearchParams(value: BlogSearchParams | URLSearchParams | undefined): BlogSearchParams {
  if (!value) {
    return {};
  }

  if (typeof (value as URLSearchParams).forEach === "function") {
    const params = value as URLSearchParams;
    const result: BlogSearchParams = {};
    params.forEach((paramValue, key) => {
      const existing = result[key];
      if (existing === undefined) {
        result[key] = paramValue;
      } else if (Array.isArray(existing)) {
        existing.push(paramValue);
      } else {
        result[key] = [existing, paramValue];
      }
    });
    return result;
  }

  return value as BlogSearchParams;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<BlogSearchParams | URLSearchParams>;
}) {
  const rawParams = searchParams ? (await searchParams) : undefined;
  const params = normalizeSearchParams(rawParams);
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const rawCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;

  const query = rawQuery?.trim() ?? "";
  const category = rawCategory?.trim() ?? "";
  const page = Number.parseInt(rawPage ?? "1", 10);

  const allPosts: BlogSummary[] = await fetchBlogSummaries();

  const filteredPosts = allPosts.filter((post) => {
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

    const matchesCategory = !category || post.category.toLowerCase() === category.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Number.isFinite(page) && page > 0 ? Math.min(page, totalPages) : 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);

  const createPageHref = (pageNumber: number) => {
    const search = new URLSearchParams();
    if (query) search.set("q", query);
    if (category) search.set("category", category);
    if (pageNumber > 1) search.set("page", pageNumber.toString());
    const queryString = search.toString();
    return queryString ? `/blog?${queryString}` : "/blog";
  };

  return (
    <div className="grain">
      {/* Hero Section */}
      <section className="min-h-[40vh] sm:min-h-[50vh] flex items-end px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <PageHeader
            eyebrow="Blog"
            title="Thoughts & Insights"
            subtitle="Writing about AI, technology, design, and the craft of building digital products."
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-8 lg:px-16 border-t border-border">
        <div className="max-w-7xl mx-auto">
          {paginatedPosts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <h3 className="text-xl sm:text-2xl font-headline font-semibold mb-2 sm:mb-3">No articles found</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {query || category
                  ? "Try adjusting your search or filter."
                  : "Articles coming soon. Stay tuned."}
              </p>
            </div>
          ) : (
            <BlogGrid posts={paginatedPosts} />
          )}

          {/* Pagination */}
          {filteredPosts.length > PAGE_SIZE && (
            <nav className="mt-12 sm:mt-16 md:mt-20 flex items-center justify-center gap-4 sm:gap-6" aria-label="Blog pagination">
              <Link
                aria-label="Previous page"
                href={createPageHref(Math.max(1, currentPage - 1))}
                className={`group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 ${
                  currentPage === 1
                    ? "cursor-not-allowed text-muted-foreground/50"
                    : "hover-line"
                }`}
                aria-disabled={currentPage === 1}
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Previous
              </Link>

              <span className="text-xs sm:text-sm text-muted-foreground font-mono">
                {currentPage} / {totalPages}
              </span>

              <Link
                aria-label="Next page"
                href={createPageHref(Math.min(totalPages, currentPage + 1))}
                className={`group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 ${
                  currentPage === totalPages
                    ? "cursor-not-allowed text-muted-foreground/50"
                    : "hover-line"
                }`}
                aria-disabled={currentPage === totalPages}
              >
                Next
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}