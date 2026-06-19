"use client";
import { CodeBlock } from "@/registry/cult-ui/code-block";

const installCode = `npm install motion lucide-react`;

const usageCode = `import { CodeBlock } from "@/components/code-block";

export default function Page() {
  return (
    <CodeBlock
      tabs={[
        { label: "install", code: "npm install motion", language: "bash" },
        { label: "usage", code: "import { CodeBlock } from './code-block'", language: "ts" },
      ]}
    />
  );
}`;

const hookCode = `import { useState, useCallback } from "react";

export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  }, [timeout]);

  return { copied, copy };
}`;

export default function Demo() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CodeBlock code={installCode} language="bash" />
      <CodeBlock
        tabs={[
          { label: "usage.tsx", code: usageCode, language: "tsx" },
          { label: "hook.ts", code: hookCode, language: "ts" },
        ]}
      />
    </div>
  );
}
