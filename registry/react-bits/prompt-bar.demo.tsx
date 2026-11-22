"use client";

import { useEffect, useRef, useState } from "react";
import PromptBar from "@/registry/react-bits/prompt-bar";

export default function Demo() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <div className="flex min-h-[560px] w-full flex-col items-center justify-end gap-5 bg-background px-6 pb-14 pt-10">
      <div className="flex w-full max-w-[520px] flex-col gap-3 text-sm">
        <div className="self-end rounded-2xl rounded-br-md bg-muted px-4 py-2.5 text-foreground">
          How did September close compared to August?
        </div>
        <div className="max-w-[90%] text-muted-foreground">
          Revenue landed at $1.42M, up 8.3% month over month. Net churn dipped to 2.1%, the lowest since March.
        </div>
        {sent ? (
          <div className="self-end rounded-2xl rounded-br-md bg-muted px-4 py-2.5 text-foreground">{sent}</div>
        ) : null}
      </div>
      <PromptBar
        width={520}
        placeholder="Ask about revenue, churn, anything"
        busy={busy}
        onSend={text => {
          setSent(text);
          setBusy(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setBusy(false), 2400);
        }}
        onStop={() => setBusy(false)}
        onAttach={() => ["q3-board-deck.pdf"]}
        onDictate={() => "Break down churn by region for September"}
      />
    </div>
  );
}
