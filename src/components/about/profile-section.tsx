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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 items-center">
      <div className="lg:col-span-1 flex justify-center">
        <div className="relative w-full max-w-[18rem] sm:max-w-sm md:max-w-md">
          <div className="absolute -inset-1 rounded-xl bg-primary/25 blur-2xl"></div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={500}
            sizes="(max-width: 1024px) 80vw, 400px"
            className="relative z-10 h-auto w-full rounded-xl border-2 border-primary/30 object-cover shadow-xl"
            priority
          />
        </div>
      </div>
      <div className="space-y-6 text-center lg:col-span-2 lg:text-left">
        <h2 className="font-headline text-3xl font-semibold text-accent sm:text-4xl">{storyHeading}</h2>
        {storyParagraphs.map((paragraph, index) => (
          <p
            key={`story-${index}`}
            className="text-base leading-relaxed text-foreground/80 sm:text-lg lg:text-justify"
          >
            {paragraph}
          </p>
        ))}

        <h3 className="font-headline text-2xl font-semibold text-accent pt-2 sm:pt-4">{expertiseHeading}</h3>
        {expertiseParagraphs.map((paragraph, index) => (
          <p
            key={`expertise-${index}`}
            className="text-base leading-relaxed text-foreground/80 sm:text-lg lg:text-justify"
          >
            {paragraph}
          </p>
        ))}

        {closingParagraph && (
          <p className="text-base leading-relaxed text-foreground/80 sm:text-lg lg:text-justify">
            {closingParagraph}
          </p>
        )}
      </div>
    </div>
  );
}
