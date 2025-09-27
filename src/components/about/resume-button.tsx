import { Button } from '@/components/ui/button';
import { getSiteContent } from '@/lib/data-store';
import { RESUME_LINK } from '@/lib/constants';
import { Download } from 'lucide-react';
import Link from 'next/link';

export async function ResumeButton() {
  const site = await getSiteContent();
  const resumeUrl = site.hero?.resumeUrl || RESUME_LINK;

  return (
    <div className="text-center mt-12">
      <Button size="lg" asChild className="transition-transform hover:scale-105">
        <Link href={resumeUrl} target="_blank" download>
          <Download className="mr-2 h-5 w-5" />
          Download My Resume
        </Link>
      </Button>
    </div>
  );
}
