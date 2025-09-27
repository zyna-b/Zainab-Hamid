import Image from "next/image";
import Link from "next/link";
import type { BlogSummary } from "@/lib/content-service";

interface ReadNextProps {
  posts: BlogSummary[];
  currentSlug: string;
}

export function ReadNext({ posts, currentSlug }: ReadNextProps) {
  const otherPosts = posts.filter((post) => post.slug !== currentSlug);
  const suggestedPosts = otherPosts.slice(0, 3);

  return (
    <section className="mt-20 pt-12 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Read next</h2>
        <span className="text-sm text-muted-foreground">
          {otherPosts.length > 0
            ? `${otherPosts.length} other ${otherPosts.length === 1 ? "article" : "articles"} available`
            : "No more articles yet"}
        </span>
      </div>

      {suggestedPosts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-muted bg-muted/30 p-10 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            No additional posts are available right now.
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            Check back soon for more stories from the portfolio.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {suggestedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                  {post.category}
                </span>
              </div>
              <div className="space-y-3 p-5">
                <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-primary">
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}