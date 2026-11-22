"use client";

import { AppWindowIcon, CodeIcon, TerminalIcon } from "lucide-react";
import {
  SandboxCodeEditor,
  SandboxConsole,
  SandboxFileExplorer,
  SandboxLayout,
  SandboxPreview,
  SandboxProvider,
  SandboxTabs,
  SandboxTabsContent,
  SandboxTabsList,
  SandboxTabsTrigger,
} from "./sandbox";

const files = {
  "/App.tsx": `import { useState } from "react";
import "./styles.css";

const tasks = ["Write release notes", "Review PR #482", "Book flights to Lisbon"];

export default function App() {
  const [done, setDone] = useState<string[]>([]);
  const toggle = (t: string) =>
    setDone((d) => (d.includes(t) ? d.filter((x) => x !== t) : [...d, t]));

  console.log("Rendered", tasks.length, "tasks");

  return (
    <main>
      <h1>Today</h1>
      <p>{done.length} of {tasks.length} done</p>
      <ul>
        {tasks.map((t) => (
          <li key={t} onClick={() => toggle(t)} data-done={done.includes(t)}>
            {t}
          </li>
        ))}
      </ul>
    </main>
  );
}
`,
  "/styles.css": `body { margin: 0; font-family: system-ui, sans-serif; background: #0a0a0a; color: #fafafa; }
main { padding: 32px; }
h1 { margin: 0 0 4px; font-size: 28px; }
p { color: #a1a1aa; margin: 0 0 20px; }
ul { list-style: none; padding: 0; display: grid; gap: 8px; }
li { padding: 12px 16px; border: 1px solid #27272a; border-radius: 10px; cursor: pointer; }
li[data-done="true"] { text-decoration: line-through; color: #71717a; }
`,
};

export default function SandboxDemo() {
  return (
    <div className="h-[560px] w-full p-6">
      <SandboxProvider files={files} template="react-ts" theme="dark">
        <SandboxLayout>
          <SandboxTabs defaultValue="code">
            <SandboxTabsList>
              <SandboxTabsTrigger value="code">
                <CodeIcon size={14} />
                Code
              </SandboxTabsTrigger>
              <SandboxTabsTrigger value="preview">
                <AppWindowIcon size={14} />
                Preview
              </SandboxTabsTrigger>
              <SandboxTabsTrigger value="console">
                <TerminalIcon size={14} />
                Console
              </SandboxTabsTrigger>
            </SandboxTabsList>
            <SandboxTabsContent className="overflow-hidden" value="code">
              <div className="flex h-full">
                <div className="w-48 shrink-0 border-r">
                  <SandboxFileExplorer />
                </div>
                <div className="min-w-0 flex-1">
                  <SandboxCodeEditor showLineNumbers />
                </div>
              </div>
            </SandboxTabsContent>
            <SandboxTabsContent value="preview">
              <SandboxPreview />
            </SandboxTabsContent>
            <SandboxTabsContent value="console">
              <SandboxConsole />
            </SandboxTabsContent>
          </SandboxTabs>
        </SandboxLayout>
      </SandboxProvider>
    </div>
  );
}
