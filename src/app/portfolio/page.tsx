import { PageHeader } from '@/components/shared/page-header';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { PROJECTS_DATA } from '@/lib/constants';

export default function PortfolioPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="My Portfolio"
        subtitle="A selection of projects that demonstrate my skills and passion for development and AI."
      />
      <ProjectGrid projects={PROJECTS_DATA} />
    </SectionWrapper>
  );
}
