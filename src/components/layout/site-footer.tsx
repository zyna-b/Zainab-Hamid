import Link from 'next/link';
import { Github, Linkedin, Mail, Code } from 'lucide-react'; // Added Mail
import { SITE_NAME, SOCIAL_LINKS, EMAIL } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2 mb-2">
              <Code className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              AI & Full-Stack Developer passionate about building innovative solutions.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            {SOCIAL_LINKS.github && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {SOCIAL_LINKS.linkedin && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {/* Twitter link is removed via SOCIAL_LINKS.twitter being null */}
            {/* Add Email icon here */}
            <Button variant="ghost" size="icon" asChild>
              <Link href={`mailto:${EMAIL}`} aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
            <p>
              <Link href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors">
                {EMAIL}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
