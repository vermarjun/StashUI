import Cmp from "@/registry/origin-ui/comp-366";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-4">
      <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground text-sm">Project Alpha</p>
          <p className="truncate text-muted-foreground text-xs">Updated 2 hours ago by Keith</p>
        </div>
        <Cmp />
      </div>
    </div>
  );
}
