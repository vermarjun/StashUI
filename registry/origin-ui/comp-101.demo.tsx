import Cmp from "@/registry/origin-ui/comp-101";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Cmp />
      <p className="text-sm text-muted-foreground">Bookmark toggle with tooltip</p>
    </div>
  );
}
