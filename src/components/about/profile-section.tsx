import Image from 'next/image';
import { SITE_NAME } from '@/lib/constants';
import type { AboutContent } from '@/lib/data-store';

type ProfileSectionProps = {
  about: AboutContent;
  name?: string;
};

export function ProfileSection({ about, name }: ProfileSectionProps) {
  const displayName = name || SITE_NAME;
  const imageSrc = about.imageSrc || '/images/zainab-side.png';
  const imageAlt = about.imageAlt || `${displayName} - Professional Portrait`;
  const storyHeading = about.storyHeading || 'My Story';
  const expertiseHeading = about.expertiseHeading || 'Expertise & Philosophy';
  const storyParagraphs = about.storyParagraphs?.length
    ? about.storyParagraphs
    : [
        `Hello! I'm ${displayName}, a Chief Developer and AI Engineer with a deep passion for creating impactful and innovative technology solutions.`,
      ];
  const expertiseParagraphs = about.expertiseParagraphs?.length
    ? about.expertiseParagraphs
    : ['My expertise lies in bridging the gap between complex technical challenges and user-friendly solutions.'];
  const closingParagraph = about.closingParagraph?.trim();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
      <div className="md:col-span-1 flex justify-center">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-primary/30 blur-xl"></div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={500}
            className="rounded-lg shadow-xl object-cover border-2 border-primary/30 relative z-10"
          />
        </div>
      </div>
      <div className="md:col-span-2 space-y-6">
        <h2 className="font-headline text-3xl font-semibold text-accent">{storyHeading}</h2>
        {storyParagraphs.map((paragraph, index) => (
          <p key={`story-${index}`} className="text-foreground/80 leading-relaxed text-justify">
            {paragraph}
          </p>
        ))}

        <h3 className="font-headline text-2xl font-semibold text-accent pt-4">{expertiseHeading}</h3>
        {expertiseParagraphs.map((paragraph, index) => (
          <p key={`expertise-${index}`} className="text-foreground/80 leading-relaxed text-justify">
            {paragraph}
          </p>
        ))}

        {closingParagraph && (
          <p className="text-foreground/80 leading-relaxed text-justify">{closingParagraph}</p>
        )}
      </div>
    </div>
  );
}
