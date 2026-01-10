'use client';

import { TypingText, TypingTextCursor } from '@/registry/animate-ui/primitives-texts-typing';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full p-10">
      <div className="text-2xl font-mono font-semibold">
        <TypingText
          text="Hello, World!"
          inView
          duration={80}
        >
          <TypingTextCursor />
        </TypingText>
      </div>

      <div className="text-xl font-mono text-neutral-600 dark:text-neutral-300">
        <TypingText
          text={['Building beautiful UIs...', 'With smooth animations...', 'Using Animate UI!']}
          inView
          duration={60}
          loop
          holdDelay={1500}
        >
          <TypingTextCursor />
        </TypingText>
      </div>
    </div>
  );
}
