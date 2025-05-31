import { PageHeader } from '@/components/shared/page-header';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { DemoCard } from '@/components/ai-experiments/demo-card';
import { AI_EXPERIMENTS_DATA } from '@/lib/constants';

export default function AIExperimentsPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="AI Experiments Lab"
        subtitle="Explore interactive demos and visual showcases of my work in Artificial Intelligence."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {AI_EXPERIMENTS_DATA.map((experiment, index) => (
           <div key={experiment.id} className="animate-slide-in-up" style={{animationDelay: `${index * 100}ms`}}>
            <DemoCard experiment={experiment} />
          </div>
        ))}
      </div>
       <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          More exciting AI experiments coming soon. Stay tuned!
        </p>
      </div>
    </SectionWrapper>
  );
}
