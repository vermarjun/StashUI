'use client';

import { HighlightText } from '@/registry/animate-ui/primitives-texts-highlight';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full p-10">
      <p className="text-2xl font-semibold leading-relaxed text-center max-w-xl">
        Build{' '}
        <HighlightText
          text="stunning interfaces"
          inView
          style={{
            backgroundImage: 'linear-gradient(120deg, hsl(var(--primary)/0.25) 0%, hsl(var(--primary)/0.25) 100%)',
          }}
        />{' '}
        with smooth, composable{' '}
        <HighlightText
          text="animation primitives"
          inView
          delay={600}
          style={{
            backgroundImage: 'linear-gradient(120deg, hsl(var(--primary)/0.2) 0%, hsl(var(--primary)/0.2) 100%)',
          }}
        />{' '}
        that work anywhere.
      </p>
    </div>
  );
}
