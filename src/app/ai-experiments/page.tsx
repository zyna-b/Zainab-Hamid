import { PageHeader } from '@/components/shared/page-header';
import { DemoCard } from '@/components/ai-experiments/demo-card';
import { fetchAIExperiments } from '@/lib/content-service';
import { Sparkles } from 'lucide-react';

export default async function AIExperimentsPage() {
  const experiments = await fetchAIExperiments();

  return (
    <div className="grain">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-end px-4 sm:px-8 lg:px-16 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <PageHeader
            eyebrow="Lab"
            title="AI Experiments"
            subtitle="Exploring the frontiers of artificial intelligence through interactive demos and creative explorations."
          />
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="py-20 md:py-32 px-4 sm:px-8 lg:px-16 border-t border-border">
        <div className="max-w-7xl mx-auto">
          {experiments.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-border rounded-full mb-6">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg text-muted-foreground">
                Experiments brewing. Check back soon.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {experiments.map((experiment, index) => (
                  <div
                    key={experiment.id}
                    className="slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <DemoCard experiment={experiment} />
                  </div>
                ))}
              </div>
              <div className="mt-20 text-center">
                <div className="overflow-hidden">
                  <p className="slide-up text-muted-foreground">
                    More experiments in progress. Stay curious.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 md:py-32 px-4 sm:px-8 lg:px-16 border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="overflow-hidden">
            <span className="slide-up block text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Philosophy
            </span>
          </div>
          <div className="overflow-hidden">
            <h2 className="slide-up delay-100 text-3xl sm:text-4xl md:text-5xl font-headline font-bold leading-tight">
              &ldquo;The best way to predict the future is to invent it.&rdquo;
            </h2>
          </div>
          <div className="overflow-hidden mt-6">
            <p className="slide-up delay-200 text-muted-foreground">— Alan Kay</p>
          </div>
        </div>
      </section>
    </div>
  );
}
