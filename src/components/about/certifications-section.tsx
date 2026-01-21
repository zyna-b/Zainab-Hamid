import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { fetchCertifications } from '@/lib/content-service';

export async function CertificationsSection() {
  const certifications = await fetchCertifications();

  return (
    <div className="space-y-0">
      {certifications.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          Certifications will appear here once added.
        </p>
      )}
      {certifications.map((cert, index) => (
        <div
          key={cert.name}
          className="group border-b border-border py-8 first:border-t slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-headline font-semibold mb-2 group-hover:translate-x-2 transition-transform duration-500">
                {cert.name}
              </h3>
              <p className="text-muted-foreground">
                {cert.issuer} &middot; {cert.date}
              </p>
            </div>
            {cert.link && cert.link !== "#" && (
              <Link
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-sm uppercase tracking-widest hover-line shrink-0"
              >
                View
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
