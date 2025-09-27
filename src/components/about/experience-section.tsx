import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { fetchExperiences } from '@/lib/content-service';

export async function ExperienceSection() {
  const experiences = await fetchExperiences();

  return (
    <div className="space-y-10">
      <h2 className="font-headline text-3xl font-semibold text-center text-accent sm:text-4xl">
        Professional Experience
      </h2>
      <div className="space-y-6">
        {experiences.length === 0 && (
          <p className="text-center text-muted-foreground">
            Experience entries will appear here once you add them in the admin dashboard.
          </p>
        )}
        {experiences.map((exp, index) => (
          <Card
            key={index}
            className="overflow-hidden bg-card/90 transition-shadow duration-300 hover:shadow-primary/20"
          >
            <CardHeader className="gap-4 pb-3 sm:pb-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                  <div className="flex items-center justify-center rounded-lg bg-primary/10 p-3 shadow-sm">
                    <Briefcase className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-center sm:text-left">
                    <CardTitle className="font-headline text-xl sm:text-2xl">
                      {exp.role}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground sm:text-base">
                      {exp.company} | {exp.location}
                    </CardDescription>
                  </div>
                </div>
                <CardDescription className="text-sm font-medium text-muted-foreground/90 text-center sm:text-right">
                  {exp.date}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0 sm:pt-2">
              <ul className="list-disc space-y-2 text-sm text-foreground/80 sm:text-base">
                {exp.description.map((desc, i) => (
                  <li key={i} className="ml-5">{desc}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
