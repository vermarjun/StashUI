"use client";

import LineSidebar from "./line-sidebar";

export default function LineSidebarDemo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center bg-background p-8">
      <LineSidebar defaultActive={1} />
    </div>
  );
}
