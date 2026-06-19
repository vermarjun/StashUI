"use client";
import { MagneticButton } from "@/registry/aceternity-ui/magnetic-button";

export default function MagneticButtonDemo() {
  return (
    <MagneticButton strength={0.8} maxDistance={100}>
      <button className="px-8 py-3 rounded-lg border border-border bg-background text-foreground text-sm font-medium shadow-sm hover:bg-muted transition-colors">
        Magnetic
      </button>
    </MagneticButton>
  );
}
