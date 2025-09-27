import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { fetchBlogDetail, fetchBlogSummaries } from "@/lib/content-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await fetchBlogDetail(resolvedParams.slug);
  
  if (!post) {
    return {
      title: "Post Not Found | Zainab Hamid",
    };
  }
  
  return {
    title: `${post.title} | Zainab Hamid`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const [post, allPosts] = await Promise.all([
    fetchBlogDetail(resolvedParams.slug),
    fetchBlogSummaries(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="container py-12">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Button>
      </Link>

      {/* Hero Image */}
      <div className="relative mb-12 h-[400px] w-full overflow-hidden rounded-xl">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Enhanced Blog Layout */}
      <BlogPostLayout post={post} allPosts={allPosts} />
    </main>
  );
}