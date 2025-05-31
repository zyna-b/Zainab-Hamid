import { EXPERIENCE_DATA } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  return (
    <div className="space-y-10">
      <h2 className="font-headline text-3xl font-semibold text-center text-accent">Professional Experience</h2>
      <div className="space-y-6">
        {EXPERIENCE_DATA.map((exp, index) => (
          <Card key={index} className="bg-card/90 transition-shadow duration-300 hover:shadow-primary/10">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
                <div className="mb-3 sm:mb-0 flex-shrink-0 flex items-center">
                  <div className="p-3 bg-primary/10 rounded-md mr-4 inline-block">
                    <Briefcase className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-xl md:text-2xl">{exp.role}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {exp.company} | {exp.location}
                    </CardDescription>
                  </div>
                </div>
                <CardDescription className="text-sm text-muted-foreground/90 sm:ml-auto sm:text-right pt-1">
                  {exp.date}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 sm:pl-[calc(1.5rem_+_3rem)]"> {/* Adjusted padding to align with text part of header */}
              <ul className="list-disc space-y-1.5 text-sm text-foreground/80 pl-5 leading-relaxed">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
