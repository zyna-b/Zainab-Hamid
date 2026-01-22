import { getSiteContent } from '@/lib/data-store';
import { RESUME_LINK } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';

export async function ResumeButton() {
  const site = await getSiteContent();
  const resumeUrl = site.hero?.resumeUrl || RESUME_LINK;

  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      download="Resume_Zainab_Hamid.pdf"
      className="slide-up delay-200 btn-magnetic inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest font-medium hover:gap-4 transition-all duration-500"
    >
      Download Resume
      <ArrowUpRight className="w-4 h-4" />
    </a>
  );
}
