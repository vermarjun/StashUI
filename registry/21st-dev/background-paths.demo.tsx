"use client";

import BackgroundPaths from "./background-paths";

export default function BackgroundPathsDemo() {
  return (
    <BackgroundPaths className="min-h-[640px] bg-background text-foreground dark:bg-background dark:text-foreground">
      <div className="relative flex max-w-2xl flex-col items-center gap-5 px-6 text-center">
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          New · Workflows 2.0
        </span>
        <h2 className="text-5xl font-semibold tracking-tight sm:text-6xl">Ship in the flow</h2>
        <p className="max-w-md text-base text-muted-foreground">
          Plan, build and release from one calm workspace. Move the cursor through the lines and they part
          around you.
        </p>
        <button className="mt-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
          Start for free
        </button>
      </div>
    </BackgroundPaths>
  );
}
