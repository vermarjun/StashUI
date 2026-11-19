import Cmp from "@/registry/origin-ui/comp-273";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-6">
      <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-1">
          <p className="font-medium text-foreground text-sm">Release notes</p>
          <p className="text-muted-foreground text-sm">
            Version 2.4 ships faster builds, a new theme picker and a handful
            of accessibility fixes.
          </p>
        </div>
        <Cmp />
      </div>
    </div>
  );
}
