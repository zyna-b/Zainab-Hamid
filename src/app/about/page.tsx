import { PageHeader } from '@/components/shared/page-header';
import { AboutScrollLayout } from '@/components/about/about-scroll-layout';
import { ResumeButton } from '@/components/about/resume-button';
import { getSiteContent } from '@/lib/data-store';
import { fetchExperiences, fetchSkills, fetchCertifications } from '@/lib/content-service';
import { SITE_NAME } from '@/lib/constants';

export default async function AboutPage() {
  const site = await getSiteContent();
  const about = site.about;
  const displayName = site.hero?.name ?? SITE_NAME;

  // Fetch all content
  const experiences = await fetchExperiences();
  const skills = await fetchSkills();
  const certifications = await fetchCertifications();

  // Prepare about content with defaults
  const storyHeading = about.storyHeading || 'My Story';
  const expertiseHeading = about.expertiseHeading || 'Expertise & Philosophy';
  const storyParagraphs = about.storyParagraphs?.length
    ? about.storyParagraphs
    : [
        `Hello! I'm ${displayName}, a Chief Developer and AI Engineer with a deep passion for creating impactful and innovative technology solutions.`,
      ];
  const expertiseParagraphs = about.expertiseParagraphs?.length
    ? about.expertiseParagraphs
    : ['My expertise lies in bridging the gap between complex technical challenges and user-friendly solutions.'];
  const closingParagraph = about.closingParagraph?.trim();

  return (
    <div className="grain">
      {/* Hero Section */}
      <section className="min-h-[40vh] sm:min-h-[50vh] flex items-end px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto w-full">
          <PageHeader
            eyebrow="About"
            title="The story behind the code"
            subtitle="A passionate developer on a mission to build technology that makes a difference."
          />
        </div>
      </section>

      {/* Scrolling Content Section */}
      <section className="px-4 sm:px-8 lg:px-16 border-t border-border py-10 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <AboutScrollLayout
            name={displayName}
            storyHeading={storyHeading}
            storyParagraphs={storyParagraphs}
            expertiseHeading={expertiseHeading}
            expertiseParagraphs={expertiseParagraphs}
            closingParagraph={closingParagraph}
            experiences={experiences}
            skills={skills}
            certifications={certifications}
          />
        </div>
      </section>

      {/* Resume CTA */}
      <section className="py-12 sm:py-20 md:py-32 px-4 sm:px-8 lg:px-16 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="overflow-hidden">
            <h2 className="slide-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-bold leading-[0.9]">
              Want to know more?
            </h2>
          </div>
          <div className="overflow-hidden mt-4 sm:mt-6 md:mt-8">
            <p className="slide-up delay-100 text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Download my resume for a complete overview of my experience and qualifications.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 md:mt-12">
            <ResumeButton />
          </div>
        </div>
      </section>
    </div>
  );
}
