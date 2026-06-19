'use client';

import { CodeBlock } from '@/registry/animate-ui/primitives-animate-code-block';

const sampleCode = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`;

export default function Demo() {
  return (
    <div className="w-full max-w-lg mx-auto p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-auto text-sm">
      <CodeBlock
        code={sampleCode}
        lang="typescript"
        writing
        duration={4000}
        inView
        className="p-4"
      />
    </div>
  );
}
