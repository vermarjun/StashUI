"use client";

import { ContainerScroll } from "@/registry/inspira-react/container-scroll";

export default function ContainerScrollDemo() {
  return (
    <ContainerScroll
      titleContent={
        <div>
          <h2 className="text-4xl font-bold text-foreground md:text-7xl">
            Scroll to reveal
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A beautiful scroll-driven perspective card effect
          </p>
        </div>
      }
    >
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <p className="text-2xl font-semibold text-foreground">Your content here</p>
      </div>
    </ContainerScroll>
  );
}
