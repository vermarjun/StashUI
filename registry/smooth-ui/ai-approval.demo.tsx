"use client";

import { useState } from "react";
import AIApproval from "./ai-approval";

export default function AIApprovalDemo() {
  const [round, setRound] = useState(0);

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col gap-3">
        <div className="self-end rounded-2xl rounded-br-md bg-muted px-3.5 py-2 text-foreground text-sm">
          Clean up the staging database before tomorrow&apos;s demo.
        </div>
        <div className="text-muted-foreground text-sm leading-relaxed">
          I found 2,418 orphaned rows across <code className="text-foreground">orders</code>{" "}
          and <code className="text-foreground">sessions</code>. Before I touch
          anything:
        </div>
        <AIApproval
          key={round}
          options={[
            { detail: "2,418 rows", id: "archive", label: "Archive to cold storage" },
            { detail: "dry run", id: "report", label: "Just send me a report" },
            {
              destructive: true,
              detail: "irreversible",
              id: "delete",
              label: "Delete permanently",
            },
          ]}
          question="How should I handle the orphaned rows?"
        >
          Staging · postgres://staging-eu-1 · last backup 3h ago
        </AIApproval>
        <button
          className="self-start text-muted-foreground text-xs underline-offset-4 hover:text-foreground hover:underline"
          onClick={() => setRound((r) => r + 1)}
          type="button"
        >
          Ask again
        </button>
      </div>
    </div>
  );
}
