import Cmp from "@/registry/origin-ui/comp-135";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="font-semibold text-base">Permissions</h3>
        <p className="mt-1 text-muted-foreground text-sm">Some options are locked by your admin.</p>
        <div className="mt-5 flex h-40 items-center justify-center rounded-lg border border-border border-dashed bg-background/60">
          <Cmp />
        </div>
        <p className="mt-4 text-center text-muted-foreground text-xs">Disabled checkboxes ignore interaction.</p>
      </div>
    </div>
  );
}
