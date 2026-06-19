import { RandomizedTextEffect } from "@/registry/ui-layouts/text-randomized";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center px-8 py-12 text-foreground">
      <span className="text-4xl font-bold font-mono tracking-tight">
        <RandomizedTextEffect text="Scramble into focus" />
      </span>
    </div>
  );
}
