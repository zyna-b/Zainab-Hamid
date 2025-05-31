import { SKILLS_DATA } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SkillsSection() {
  const categories = Array.from(new Set(SKILLS_DATA.map(skill => skill.category)));

  return (
    <div className="space-y-12">
      <h2 className="font-headline text-3xl font-semibold text-center text-accent">Skills & Tech Stack</h2>
      {categories.map(category => (
        <div key={category} className="mb-10">
          <h3 className="font-headline text-2xl font-medium mb-6 text-accent border-b-2 border-accent/30 pb-2">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {SKILLS_DATA.filter(skill => skill.category === category).map((skill) => {
              const IconComponent = skill.icon;
              return (
                <Card 
                  key={skill.name} 
                  className="text-center transition-all duration-300 bg-card/80 hover:border-primary/50 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-start p-4"
                >
                  <CardHeader className="p-0 mb-2 flex-shrink-0">
                    <IconComponent className="mx-auto h-10 w-10" />
                  </CardHeader>
                  <CardContent className="p-0 flex-grow flex items-center">
                    <p className="text-sm font-medium leading-tight">{skill.name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

    