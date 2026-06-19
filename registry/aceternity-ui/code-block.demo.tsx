"use client";
import { CodeBlock } from "@/registry/aceternity-ui/code-block";

const singleCode = `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4 p-6">
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <span className="text-2xl font-mono">{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}`;

const tabsCode = [
  {
    name: "counter.tsx",
    language: "tsx",
    code: singleCode,
    highlightLines: [6, 7, 8, 9],
  },
  {
    name: "styles.css",
    language: "css",
    code: `.counter {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
}

.counter button {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 1px solid #333;
  background: transparent;
  cursor: pointer;
}`,
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6">
      <CodeBlock
        language="tsx"
        filename="counter.tsx"
        code={singleCode}
        highlightLines={[6, 7, 8, 9]}
      />
      <CodeBlock
        language="tsx"
        filename="counter.tsx"
        tabs={tabsCode}
      />
    </div>
  );
}
