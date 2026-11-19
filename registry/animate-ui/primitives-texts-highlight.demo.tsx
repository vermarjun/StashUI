'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { HighlightText } from '@/registry/animate-ui/primitives-texts-highlight';

export default function Demo() {
  const [run, setRun] = useState(0);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col items-center justify-center p-10">
      <p
        key={run}
        className="max-w-3xl text-center text-5xl font-semibold leading-tight tracking-tight text-foreground"
      >
        Build{' '}
        <HighlightText
          text="stunning interfaces"
          inView
          className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-2 text-white"
        />{' '}
        with smooth, composable{' '}
        <HighlightText
          text="motion primitives"
          inView
          delay={900}
          className="rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 px-2 text-white"
        />
      </p>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCcw className="size-3.5" />
        Replay
      </button>
    </div>
  );
}
