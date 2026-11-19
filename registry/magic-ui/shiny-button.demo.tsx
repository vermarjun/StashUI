import { ShinyButton } from "@/registry/magic-ui/shiny-button";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-2xl border border-border bg-card px-8 py-12 text-center text-card-foreground shadow-sm">
        <h3 className="font-semibold text-3xl tracking-tight">Join the waitlist</h3>
        <p className="max-w-sm text-muted-foreground text-sm">
          A light sweep runs across the label and border on a loop.
        </p>
        <div className="flex items-center gap-3">
          <ShinyButton>Request access</ShinyButton>
          <ShinyButton>Learn more</ShinyButton>
        </div>
      </div>
    </div>
  );
}
