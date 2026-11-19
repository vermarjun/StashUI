import Cmp from "@/registry/origin-ui/comp-105";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Cmp />
      <p className="text-sm text-muted-foreground">Copy to clipboard</p>
    </div>
  );
}
