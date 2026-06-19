import { GlareHover } from "@/registry/magic-ui/glare-hover";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-8">
      <GlareHover
        width="260px"
        height="160px"
        background="#0a0a0a"
        color="#a78bfa"
        className="rounded-xl border border-border"
      >
        <div className="flex flex-col gap-1 p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Total Revenue
          </p>
          <p className="text-3xl font-bold text-foreground">$48,295</p>
          <p className="text-xs text-green-500">+12.4% from last month</p>
        </div>
      </GlareHover>

      <GlareHover
        width="260px"
        height="160px"
        background="#0a0a0a"
        color="#f472b6"
        className="rounded-xl border border-border"
      >
        <div className="flex flex-col gap-1 p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Active Users
          </p>
          <p className="text-3xl font-bold text-foreground">3,842</p>
          <p className="text-xs text-green-500">+8.1% from last month</p>
        </div>
      </GlareHover>
    </div>
  );
}
