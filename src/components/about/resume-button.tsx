import { Button } from '@/components/ui/button';
import { RESUME_LINK } from '@/lib/constants';
import { Download } from 'lucide-react';
import Link from 'next/link';

export function ResumeButton() {
  return (
    <div className="text-center mt-12">
      <Button size="lg" asChild className="transition-transform hover:scale-105">
        <Link href={RESUME_LINK} target="_blank" download>
          <Download className="mr-2 h-5 w-5" />
          Download My Resume
        </Link>
      </Button>
    </div>
  );
}
