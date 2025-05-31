import { SKILLS_DATA } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function SkillsSection() {
  const categories = Array.from(new Set(SKILLS_DATA.map(skill => skill.category)));

  return (
    <div className="space-y-12">
      <h2 className="font-headline text-3xl font-semibold text-center text-accent">Skills & Tech Stack</h2>
      {categories.map(category => (
        <div key={category} className="mb-10">
          <h3 className="font-headline text-2xl font-medium mb-6 text-primary/90 border-b-2 border-primary/30 pb-2">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SKILLS_DATA.filter(skill => skill.category === category).map((skill) => (
              <Card key={skill.name} className="text-center hover:shadow-md transition-shadow bg-card/80 hover:border-accent/50">
                <CardHeader className="pb-2 pt-4">
                  <skill.icon className="mx-auto h-8 w-8 text-accent mb-2" />
                </CardHeader>
                <CardContent className="p-2">
                  <p className="text-sm font-medium">{skill.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
