'use client';

import { SplittingText } from '@/registry/animate-ui/primitives-texts-splitting';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full p-10">
      <SplittingText
        text="Animate every character"
        type="chars"
        inView
        className="text-3xl font-bold"
      />
      <SplittingText
        text="Reveal words one by one"
        type="words"
        inView
        delay={200}
        className="text-2xl text-neutral-600 dark:text-neutral-300"
      />
      <SplittingText
        text={['Line one appears first', 'Then line two follows', 'Finally line three']}
        type="lines"
        inView
        delay={400}
        className="text-lg text-neutral-500 text-center"
      />
    </div>
  );
}
