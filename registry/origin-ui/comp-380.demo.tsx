import Cmp from "@/registry/origin-ui/comp-380";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-4">
      <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground text-sm">Appearance</p>
          <p className="truncate text-muted-foreground text-xs">Choose how the interface looks</p>
        </div>
        <Cmp />
      </div>
    </div>
  );
}
