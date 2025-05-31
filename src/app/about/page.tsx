import { PageHeader } from '@/components/shared/page-header';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ProfileSection } from '@/components/about/profile-section';
import { SkillsSection } from '@/components/about/skills-section';
import { CertificationsSection } from '@/components/about/certifications-section';
import { ResumeButton } from '@/components/about/resume-button';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <>
      <SectionWrapper>
        <PageHeader
          title="About Me"
          subtitle="My journey, expertise, and the story behind my passion for technology."
        />
        <ProfileSection />
      </SectionWrapper>

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
