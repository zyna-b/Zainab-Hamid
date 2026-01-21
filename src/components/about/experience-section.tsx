import { fetchExperiences } from '@/lib/content-service';

export async function ExperienceSection() {
  const experiences = await fetchExperiences();

  return (
    <div className="space-y-0">
      {experiences.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          Experience entries will appear here once added.
        </p>
      )}
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="group border-b border-border py-10 md:py-14 first:border-t slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
            {/* Number */}
            <span className="text-sm text-muted-foreground font-mono w-16 shrink-0">
              {exp.date}
            </span>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-headline font-semibold mb-2 group-hover:translate-x-2 transition-transform duration-500">
                {exp.role}
              </h3>
              <p className="text-muted-foreground mb-6">
                {exp.company} &mdash; {exp.location}
              </p>
              <ul className="space-y-3">
                {exp.description.map((desc, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground leading-relaxed flex gap-3"
                  >
                    <span className="text-foreground/30 shrink-0">&mdash;</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
