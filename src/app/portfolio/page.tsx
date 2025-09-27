import { PageHeader } from '@/components/shared/page-header';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ProjectGrid } from '@/components/portfolio/project-grid';
import { fetchProjects } from '@/lib/content-service';

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  return (
    <SectionWrapper>
      <PageHeader
        title="My Portfolio"
        subtitle="A selection of projects that demonstrate my skills and passion for development and AI."
      />
      <ProjectGrid projects={projects} />
    </SectionWrapper>
  );
}
