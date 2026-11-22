"use client";

import BranchedMenu from "./branched-menu";

export default function BranchedMenuDemo() {
  return (
    <div className="flex min-h-[460px] w-full items-center justify-center p-8">
      <div className="rounded-2xl border border-border bg-card p-4">
        <BranchedMenu defaultOpen={0} defaultActive="quick" width={260} />
      </div>
    </div>
  );
}
