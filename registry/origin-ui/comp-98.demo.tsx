import Cmp from "@/registry/origin-ui/comp-98";

export default function Demo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-16 p-8">
      <div className="scale-[2.75]">
        <Cmp />
      </div>
      <p className="text-muted-foreground text-sm">Quick actions: the plus spins into a close icon</p>
    </div>
  );
}
