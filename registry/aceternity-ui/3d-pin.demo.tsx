import { PinContainer } from "@/registry/aceternity-ui/3d-pin";

export default function Demo() {
  return (
    <div className="flex h-[28rem] w-full items-center justify-center bg-background">
      <PinContainer title="aceternity.com" href="https://aceternity.com">
        <div className="flex h-[18rem] w-[18rem] flex-col items-start justify-start gap-3 rounded-lg p-4">
          <div className="flex w-full flex-row items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-sky-500" />
            <span className="text-sm font-semibold text-foreground">Aceternity UI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Beautiful, modern components built with Tailwind CSS and Framer Motion.
            Copy-paste into your Next.js projects.
          </p>
          <div className="mt-auto flex w-full items-center gap-2">
            <span className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground">UI</span>
            <span className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground">React</span>
            <span className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground">Next.js</span>
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
