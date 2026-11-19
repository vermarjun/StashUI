import Cmp from "@/registry/origin-ui/comp-396";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Cmp />
      <div className="text-center">
        <p className="font-medium text-foreground">Kelly King</p>
        <p className="text-sm text-muted-foreground">Online, square avatar</p>
      </div>
    </div>
  );
}
