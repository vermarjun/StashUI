'use client';

import {
  RotatingTextContainer,
  RotatingText,
} from '@/registry/animate-ui/primitives-texts-rotating';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full p-10">
      <div className="flex items-center gap-3 text-3xl font-bold">
        <span className="text-foreground">Design</span>
        <RotatingTextContainer
          text={['faster', 'smarter', 'together', 'beautifully']}
          duration={2000}
          className="text-primary min-w-[10ch]"
        >
          <RotatingText />
        </RotatingTextContainer>
      </div>

      <div className="flex items-center gap-3 text-xl text-muted-foreground">
        <span>Built for</span>
        <RotatingTextContainer
          text={['React', 'Next.js', 'Vite', 'Remix']}
          duration={1800}
          delay={400}
          className="min-w-[6ch]"
        >
          <RotatingText className="font-semibold text-foreground" />
        </RotatingTextContainer>
      </div>
    </div>
  );
}
