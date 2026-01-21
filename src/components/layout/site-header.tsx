"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border" 
          : "bg-transparent"
      )}
    >
      <div className="px-4 sm:px-8 lg:px-16">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-3" 
            onClick={() => setIsOpen(false)}
          >
            <span className="font-headline text-xl lg:text-2xl font-bold tracking-tight">
              {SITE_NAME.split(' ')[0]}
              <span className="text-muted-foreground">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {NAV_ITEMS.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 hover-line",
                  pathname === item.href 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <ThemeToggle />
            
            {/* Contact Button - Desktop */}
            <Link 
              href="/contact"
              className="hidden lg:flex btn-magnetic items-center gap-2 px-6 py-3 border border-foreground text-xs uppercase tracking-widest font-medium"
            >
              <span>Contact</span>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="w-10 h-10 flex items-center justify-center">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Menu</span>
                </button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="w-full max-w-md bg-background border-l border-border p-0"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-8 border-b border-border">
                    <span className="font-headline text-xl font-bold">Menu</span>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 py-12 px-8">
                    <div className="space-y-1">
                      {NAV_ITEMS.map((item, index) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group flex items-center justify-between py-4 border-b border-border/50 transition-all duration-300",
                              pathname === item.href 
                                ? "text-foreground" 
                                : "text-muted-foreground hover:text-foreground hover:pl-4"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="text-2xl font-headline font-medium">
                              {item.title}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">
                              0{index + 1}
                            </span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-8 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
