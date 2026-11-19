import Cmp from "@/registry/origin-ui/comp-365";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full items-start justify-center px-4 pt-24">
      <div className="flex w-full max-w-md items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
        <Cmp />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">Building a Design System</p>
          <p className="text-xs text-muted-foreground">Hover the thumbnail to preview the article</p>
        </div>
      </div>
    </div>
  );
}
