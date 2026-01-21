import { fetchSkills } from '@/lib/content-service';

export async function SkillsSection() {
  const skills = await fetchSkills();
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="space-y-12">
      {skills.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          Skills will appear here once added.
        </p>
      )}
      {categories.map((category, catIndex) => (
        <div
          key={category}
          className="slide-up"
          style={{ animationDelay: `${catIndex * 100}ms` }}
        >
          <h3 className="text-lg font-medium mb-6 text-muted-foreground uppercase tracking-widest">
            {category}
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills
              .filter(skill => skill.category === category)
              .map((skill) => (
                <span
                  key={skill.name}
                  className="px-4 py-2 border border-border text-sm hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 cursor-default"
                >
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
