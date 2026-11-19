import Cmp from "@/registry/origin-ui/comp-354";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl border border-border bg-card px-6 py-8 shadow-sm">
        <Cmp />
        <p className="text-center text-muted-foreground text-xs">Hover the button to see a compact tooltip.</p>
      </div>
    </div>
  );
}
