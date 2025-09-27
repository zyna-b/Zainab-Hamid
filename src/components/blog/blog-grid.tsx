import Link from "next/link";
import Image from "next/image";
import type { BlogSummary } from "@/lib/content-service";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";

interface BlogGridProps {
  posts: BlogSummary[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {post.category}
              </Badge>
            </div>
            <h3 className="mb-2 text-xl font-bold tracking-tight">{post.title}</h3>
            <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}