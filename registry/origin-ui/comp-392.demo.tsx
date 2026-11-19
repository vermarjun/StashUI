import Cmp from "@/registry/origin-ui/comp-392";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Cmp />
      <div className="text-center">
        <p className="font-medium text-foreground">Guest</p>
        <p className="text-sm text-muted-foreground">Icon fallback</p>
      </div>
    </div>
  );
}
