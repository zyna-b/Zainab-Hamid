import { PageHeader } from '@/components/shared/page-header';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ContactForm } from '@/components/contact/contact-form';
import { FaqSection } from '@/components/contact/faq-section';
import { SOCIAL_LINKS, EMAIL } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';


export default function ContactPage() {
  return (
    <>
      <SectionWrapper className="pb-12 md:pb-16">
        <PageHeader
          title="Contact Me"
          subtitle="Let's connect! Whether you have a project idea, a question, or just want to chat, feel free to reach out."
        />
        <ContactForm />
      </SectionWrapper>
      
      <SectionWrapper className="py-12 md:py-16 bg-background/95">
        <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-headline text-2xl font-semibold text-accent mb-6">Connect via Social Media or Email</h3>
            <p className="text-muted-foreground mb-6">
                You can also find me on these platforms or send me an email directly.
            </p>
            <div className="flex justify-center space-x-4 mb-6">
                {SOCIAL_LINKS.github && (
                <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-primary/50">
                    <Link href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-6 w-6" />
                    </Link>
                </Button>
                )}
                {SOCIAL_LINKS.linkedin && (
                <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-primary/50">
                    <Link href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-6 w-6" />
                    </Link>
                </Button>
                )}
                {SOCIAL_LINKS.twitter && (
                <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-primary/50">
                    <Link href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-6 w-6" />
                    </Link>
                </Button>
                )}
                 <Button variant="outline" size="icon" asChild className="hover:bg-accent/20 hover:border-primary/50">
                    <Link href={`mailto:${EMAIL}`} aria-label="Email">
                    <Mail className="h-6 w-6" />
                    </Link>
                </Button>
            </div>
        </div>
      </SectionWrapper>
      
      <Separator className="my-0" />

      <SectionWrapper className="pt-12 md:pt-16">
        <FaqSection />
      </SectionWrapper>
    </>
  );
}
