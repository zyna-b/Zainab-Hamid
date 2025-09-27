import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, ExternalLink } from 'lucide-react';
import { fetchCertifications } from '@/lib/content-service';

export async function CertificationsSection() {
  const certifications = await fetchCertifications();

  return (
    <div className="space-y-8">
      <h2 className="font-headline text-3xl font-semibold text-center text-accent sm:text-4xl">Certifications</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {certifications.length === 0 && (
          <p className="md:col-span-2 text-center text-muted-foreground">
            Certifications will appear here after you add them in the admin dashboard.
          </p>
        )}
        {certifications.map((cert) => (
          <Card
            key={cert.name}
            className="flex flex-col justify-between bg-card/80 transition-shadow duration-300 hover:shadow-primary/20"
          >
            <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <CardTitle className="font-headline text-xl sm:text-2xl">{cert.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground sm:text-base">
                  {cert.issuer} · {cert.date}
                </CardDescription>
              </div>
            </CardHeader>
            {cert.link && cert.link !== "#" && (
              <CardContent className="mt-auto pt-0">
                <Button
                  variant="link"
                  size="sm"
                  asChild
                  className="h-auto p-0 text-accent hover:text-primary"
                >
                  <Link href={cert.link} target="_blank" rel="noopener noreferrer">
                    View Credential <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
