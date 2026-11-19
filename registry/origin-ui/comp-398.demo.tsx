import Cmp from "@/registry/origin-ui/comp-398";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Cmp />
      <div className="text-center">
        <p className="font-medium text-foreground">Kelly King</p>
        <p className="text-sm text-muted-foreground">6 unread messages</p>
      </div>
    </div>
  );
}
