import Cmp from "@/registry/origin-ui/comp-252";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-1">
          <p className="font-medium text-foreground text-sm">Sound</p>
          <p className="text-muted-foreground text-xs">
            Adjust the output level for notifications and media.
          </p>
        </div>
        <Cmp />
      </div>
    </div>
  );
}
