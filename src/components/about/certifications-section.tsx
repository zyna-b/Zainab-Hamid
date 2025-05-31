import { CERTIFICATIONS_DATA } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, ExternalLink } from 'lucide-react';

export function CertificationsSection() {
  return (
    <div className="space-y-8">
      <h2 className="font-headline text-3xl font-semibold text-center text-accent">Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATIONS_DATA.map((cert) => (
          <Card key={cert.name} className="flex flex-col bg-card/80 transition-shadow">
            <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
              <Award className="h-8 w-8 text-primary mt-1" />
              <div>
                <CardTitle className="font-headline text-xl">{cert.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {cert.issuer} - {cert.date}
                </CardDescription>
              </div>
            </CardHeader>
            {cert.link && cert.link !== "#" && (
            <CardContent className="pt-0 mt-auto">
                <Button variant="link" size="sm" asChild className="p-0 h-auto text-accent hover:text-primary">
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
