import Cmp from "@/registry/origin-ui/comp-269";

export default function Demo() {
  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6">
      <div>
        <p className="text-base font-semibold text-card-foreground">Sign in</p>
        <p className="text-sm text-muted-foreground">Welcome back to your workspace.</p>
      </div>
      <Cmp />
      <div className="space-y-2">
        <div className="h-9 rounded-md border border-input px-3 text-sm leading-9 text-muted-foreground">
          alex@company.com
        </div>
        <div className="h-9 rounded-md border border-destructive/60 px-3 text-sm leading-9 text-muted-foreground">
          ••••••••
        </div>
      </div>
      <button className="h-9 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground">
        Sign in
      </button>
    </div>
  );
}
