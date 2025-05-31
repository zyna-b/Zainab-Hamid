import Image from 'next/image';
import { SITE_NAME } from '@/lib/constants';

export function ProfileSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
      <div className="md:col-span-1 flex justify-center">
        <Image
          src="https://placehold.co/400x500.png"
          alt={`${SITE_NAME} - Professional Portrait`}
          width={400}
          height={500}
          className="rounded-lg shadow-xl object-cover border-2 border-primary/30"
          data-ai-hint="professional woman"
        />
      </div>
      <div className="md:col-span-2 space-y-6">
        <h2 className="font-headline text-3xl font-semibold text-accent">My Story</h2>
        <p className="text-lg leading-relaxed text-foreground/90">
          Hello! I&apos;m {SITE_NAME}, a Chief Developer and AI Engineer with a deep passion for creating impactful and innovative technology solutions. I specialize in building all types of web apps, mobile apps, software, and work extensively in Artificial Intelligence. My journey into tech was driven by a fascination with how software can solve real-world problems and enhance human experiences.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Over the years, I&apos;ve honed my skills across various domains, from crafting intelligent algorithms for AI applications to building seamless user interfaces for web and mobile platforms. I thrive in dynamic environments where I can continuously learn and apply new technologies to build cutting-edge products.
        </p>
        <h3 className="font-headline text-2xl font-semibold text-accent pt-4">Expertise & Philosophy</h3>
        <p className="text-foreground/80 leading-relaxed">
          My expertise lies in bridging the gap between complex technical challenges and user-friendly solutions. I believe in writing clean, efficient, and maintainable code, and I&apos;m committed to best practices in software development. Whether it&apos;s developing a sophisticated AI model or a pixel-perfect front-end, I approach every project with dedication and a keen eye for detail.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          I&apos;m always excited to collaborate on projects that push the boundaries of technology and create lasting value. Let&apos;s build something amazing together!
        </p>
      </div>
    </div>
  );
}
