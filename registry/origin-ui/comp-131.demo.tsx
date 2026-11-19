import Cmp from "@/registry/origin-ui/comp-131";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full items-start justify-center p-10 pt-24">
      <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground">
        <div className="min-w-0">
          <p className="truncate font-medium text-sm">feat: add usage-based billing</p>
          <p className="text-muted-foreground text-xs">#482 · 6 commits · checks passed</p>
        </div>
        <Cmp />
      </div>
    </div>
  );
}
