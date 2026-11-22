"use client";

import * as React from "react";

import { Markdown } from "./markdown";

const ANSWER = `## Debouncing a search input

Wait until the user **stops typing** before you fire the request. That keeps the API quiet and the results stable.

1. Keep the raw input in state
2. Derive a debounced copy with a timeout
3. Fetch only when the debounced value changes

\`\`\`tsx
function useDebounced<T>(value: T, ms = 300) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms)
    return () => clearTimeout(id)
  }, [value, ms])
  return v
}
\`\`\`

| Delay | Feels |
| --- | --- |
| 150 ms | instant |
| 300 ms | balanced |

Use \`300\` as a default and tune from there.`;

export default function MarkdownDemo() {
  const [length, setLength] = React.useState(0);

  // Stream the answer in chunks, the way an LLM response arrives.
  React.useEffect(() => {
    if (length >= ANSWER.length) {
      const reset = window.setTimeout(() => setLength(0), 2600);
      return () => window.clearTimeout(reset);
    }
    const id = window.setTimeout(() => setLength((l) => l + 6), 28);
    return () => window.clearTimeout(id);
  }, [length]);

  return (
    <div className="h-[560px] w-full max-w-2xl overflow-hidden rounded-2xl border bg-card p-6">
      <Markdown
        className={[
          "flex flex-col gap-3 text-sm leading-6 text-foreground/90",
          "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground",
          "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1",
          "[&_strong]:text-foreground [&_strong]:font-semibold",
          "[&_table]:w-full [&_table]:text-left [&_th]:border-b [&_th]:border-border [&_th]:py-1.5 [&_th]:font-medium [&_td]:border-b [&_td]:border-border/60 [&_td]:py-1.5",
        ].join(" ")}
      >
        {ANSWER.slice(0, length)}
      </Markdown>
    </div>
  );
}
