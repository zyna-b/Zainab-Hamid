import { Metadata } from "next";
import Link from "next/link";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogGrid } from "@/components/blog/blog-grid";
import { fetchBlogSummaries } from "@/lib/content-service";
import type { BlogSummary } from "@/lib/content-service";

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

  // Handle URLSearchParams / ReadonlyURLSearchParams instances from the router.
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
    <main className="container py-12 md:py-16 lg:py-20">
      <BlogHeader />
      <BlogGrid posts={paginatedPosts} />
      {paginatedPosts.length === 0 && (
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium">No articles found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </p>
        </div>
      )}
      {filteredPosts.length > PAGE_SIZE && (
        <nav className="mt-12 flex items-center justify-center gap-3" aria-label="Blog pagination">
          <Link
            aria-label="Previous page"
            href={createPageHref(Math.max(1, currentPage - 1))}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              currentPage === 1
                ? "cursor-not-allowed border-border text-muted-foreground"
                : "border-primary/30 text-primary hover:bg-primary/10"
            }`}
            aria-disabled={currentPage === 1}
          >
            Previous
          </Link>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            aria-label="Next page"
            href={createPageHref(Math.min(totalPages, currentPage + 1))}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              currentPage === totalPages
                ? "cursor-not-allowed border-border text-muted-foreground"
                : "border-primary/30 text-primary hover:bg-primary/10"
            }`}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </Link>
        </nav>
      )}
    </main>
  );
}