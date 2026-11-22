"use client";

import WidgetGrid from "@/registry/kokonut-ui/bento-grid-draggable";

// Wider than the component's max-w-4xl default and with taller rows, so the
// grid fills most of an 8:5 stage instead of a small block at the top.
export default function BentoGridDraggableDemo() {
  return (
    <div className="flex min-h-[680px] w-full items-center justify-center px-6 py-6">
      <WidgetGrid className="max-w-[1120px]" rowHeight={196} />
    </div>
  );
}
