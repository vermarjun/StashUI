'use client';

import { CodeBlock } from '@/registry/animate-ui/primitives-animate-code-block';

const sampleCode = `import { useState } from 'react';

export function Counter({ start = 0 }: { start?: number }) {
  const [count, setCount] = useState(start);

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Clicked {count} times
    </button>
  );
}`;

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-white/10 border-b px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-neutral-400 text-xs">counter.tsx</span>
        </div>
        <CodeBlock
          code={sampleCode}
          lang="tsx"
          theme="dark"
          themes={{ light: 'github-light', dark: 'github-dark' }}
          writing
          duration={6000}
          delay={300}
          inView
          className="h-[340px] overflow-auto p-5 font-mono text-[15px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!text-[15px] [&_pre]:!leading-7"
        />
      </div>
    </div>
  );
}
