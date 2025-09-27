import { PageHeader } from '@/components/shared/page-header';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ProfileSection } from '@/components/about/profile-section';
import { ExperienceSection } from '@/components/about/experience-section';
import { SkillsSection } from '@/components/about/skills-section';
import { CertificationsSection } from '@/components/about/certifications-section';
import { ResumeButton } from '@/components/about/resume-button';
import { Separator } from '@/components/ui/separator';
import { getSiteContent } from '@/lib/data-store';
import { SITE_NAME } from '@/lib/constants';

export default async function AboutPage() {
  const site = await getSiteContent();
  const about = site.about;
  const displayName = site.hero?.name ?? SITE_NAME;

  return (
    <>
      <SectionWrapper>
        <PageHeader
          title="About Me"
          subtitle="My journey, expertise, and the story behind my passion for technology."
        />
        <ProfileSection about={about} name={displayName} />
      </SectionWrapper>

      <SectionWrapper className="bg-background/90">
        <ExperienceSection />
      </SectionWrapper>
      
      <Separator className="my-0" />

      <SectionWrapper className="bg-background/95">
        <SkillsSection />
      </SectionWrapper>
      
      <Separator className="my-0" />

      <SectionWrapper>
        <CertificationsSection />
        <ResumeButton />
      </SectionWrapper>
    </>
  );
}
