"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function BlogHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    
    if (activeCategory && activeCategory !== "All") {
      params.set("category", activeCategory);
    }
    
    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ""}`);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const params = new URLSearchParams(searchParams);
    
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    
    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="mb-12">
      <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Thoughts, insights, and perspectives on AI, technology, and web development.
      </p>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form onSubmit={handleSearch} className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <div className="flex flex-wrap gap-2">
          {["All", "AI", "Web Development", "Technology"].map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}