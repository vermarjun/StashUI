import Cmp from "@/registry/ui-layouts/flipcountdown";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.3em]">New year countdown</p>
      <Cmp />
    </div>
  );
}
