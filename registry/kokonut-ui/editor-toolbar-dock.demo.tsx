"use client";

import Toolbar from "@/registry/kokonut-ui/editor-toolbar-dock";

export default function EditorToolbarDockDemo() {
  return (
    <div className="flex w-full justify-center px-4">
      <Toolbar className="h-[480px] max-w-4xl" />
    </div>
  );
}
