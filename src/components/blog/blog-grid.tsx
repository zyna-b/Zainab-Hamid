import Link from "next/link";
import Image from "next/image";
import type { BlogSummary } from "@/lib/content-service";
import { ArrowUpRight } from "lucide-react";

interface BlogGridProps {
  posts: BlogSummary[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="group slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <article>
            {/* Image */}
            <div className="aspect-[16/10] overflow-hidden bg-card mb-6">
              <div className="relative w-full h-full img-mask">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="uppercase tracking-widest">{post.category}</span>
                <span>/</span>
                <span>{post.date}</span>
                <span>/</span>
                <span>{post.readTime} min</span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-headline font-semibold leading-tight group-hover:translate-x-1 transition-transform duration-300">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>

              {/* Read more */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover-line">
                  Read Article
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}