import { Card, CardContent } from '@/components/ui/card';
import { fetchSkills } from '@/lib/content-service';

export async function SkillsSection() {
  const skills = await fetchSkills();
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="space-y-12">
      <h2 className="font-headline text-3xl font-semibold text-center text-accent">Skills & Tech Stack</h2>
      {skills.length === 0 && (
        <p className="text-center text-muted-foreground">
          Add skill entries from the admin dashboard to populate this section.
        </p>
      )}
      {categories.map(category => (
        <div key={category} className="mb-10">
          <h3 className="font-headline text-2xl font-medium mb-6 text-accent border-b-2 border-accent/30 pb-2">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skills.filter(skill => skill.category === category).map((skill) => {
              return (
                <Card 
                  key={skill.name} 
                  className="text-center transition-all duration-300 bg-card/80 hover:border-primary/70 hover:bg-primary/5 hover:shadow-xl flex flex-col items-center justify-center p-0 min-h-[70px]"
                >
                  <CardContent className="p-4 flex items-center justify-center h-full">
                    <p className="text-sm font-medium leading-tight text-foreground">{skill.name}</p>
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
