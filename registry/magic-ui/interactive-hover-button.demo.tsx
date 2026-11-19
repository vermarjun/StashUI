import { InteractiveHoverButton } from "@/registry/magic-ui/interactive-hover-button";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-2xl border border-border bg-card px-8 py-12 text-center text-card-foreground shadow-sm">
        <span className="rounded-full border border-border px-3 py-1 text-muted-foreground text-xs">New in v2.4</span>
        <h3 className="font-semibold text-3xl tracking-tight">Ship interfaces faster</h3>
        <p className="max-w-sm text-muted-foreground text-sm">
          Hover the button: the dot expands to fill it and the label slides out for an arrow.
        </p>
        <InteractiveHoverButton>Get started</InteractiveHoverButton>
      </div>
    </div>
  );
}
