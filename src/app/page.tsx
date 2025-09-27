import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Brain, Code, Briefcase } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import Image from 'next/image';
import { getSiteContent } from '@/lib/data-store';
import { SITE_NAME, SITE_DESCRIPTION, RESUME_LINK } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const site = await getSiteContent();
  const hero = site.hero ?? {
    name: SITE_NAME,
    role: SITE_DESCRIPTION,
    intro: 'I transform complex problems into elegant, scalable solutions.',
    summary: 'Welcome to my digital space where I showcase my journey, projects, and expertise in the world of technology.',
    resumeUrl: RESUME_LINK,
  };

  const heroName = hero.name || SITE_NAME;
  const heroRole = hero.role || SITE_DESCRIPTION;
  const heroIntro = hero.intro || 'I transform complex problems into elegant, scalable solutions.';
  const heroSummary = hero.summary || 'Welcome to my digital space where I showcase my journey, projects, and expertise in the world of technology.';
  const resumeUrl = hero.resumeUrl || RESUME_LINK;

  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-up space-y-6">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
              Hi, I&apos;m {heroName}
            </h1>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed">
              A passionate <span className="text-accent font-semibold">{heroRole}</span>. {heroIntro}
            </p>
            <p className="text-muted-foreground">
              {heroSummary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="transition-transform hover:scale-105">
                <Link href="/portfolio">
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="transition-transform hover:scale-105">
                <Link href={resumeUrl} target="_blank" download>
                  Download Resume
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center relative z-10 animate-fade-in animation-delay-300 bg-transparent">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-primary/30 blur-xl"></div>
              <Image
                src="/images/zainab.jpg"
                alt="Zainab Hamid"
                width={500}
                height={500}
                className="rounded-full shadow-2xl border-4 border-primary/50 object-cover relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Highlights Section */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-4">Explore My World</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover more about my skills, the services I offer, and my passion for AI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Brain className="h-10 w-10 text-primary mb-4" />,
              title: 'AI & Machine Learning',
              description: 'Dive into my AI projects and experiments, showcasing innovative solutions and cutting-edge technology.',
              link: '/ai-experiments',
              linkLabel: 'Explore AI',
            },
            {
              icon: <Code className="h-10 w-10 text-primary mb-4" />,
              title: 'Development Expertise',
              description: 'Learn about my skills in full-stack web and mobile development, and the services I provide.',
              link: '/services',
              linkLabel: 'See Services',
            },
            {
              icon: <Briefcase className="h-10 w-10 text-primary mb-4" />,
              title: 'My Journey & Portfolio',
              description: 'Get to know me better, explore my career background, and view a curated selection of my projects.',
              link: '/about',
              linkLabel: 'Read More',
            },
          ].map((item, index) => (
            <Card key={item.title} className="transition-shadow duration-300 animate-slide-in-up" style={{animationDelay: `${index * 150}ms`}}>
              <CardHeader className="items-center">
                {item.icon}
                <CardTitle className="font-headline text-2xl text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <CardDescription>{item.description}</CardDescription>
                <Button variant="link" asChild className="text-primary hover:text-accent">
                  <Link href={item.link}>
                    {item.linkLabel} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
