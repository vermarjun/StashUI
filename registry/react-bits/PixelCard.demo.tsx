import Cmp from "@/registry/react-bits/PixelCard";

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-center p-8">
      <Cmp variant="default">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none select-none">
          <span className="text-foreground text-sm font-semibold">Default</span>
          <span className="text-muted-foreground text-xs">Hover me</span>
        </div>
      </Cmp>
      <Cmp variant="blue">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none select-none">
          <span className="text-foreground text-sm font-semibold">Blue</span>
          <span className="text-muted-foreground text-xs">Hover me</span>
        </div>
      </Cmp>
      <Cmp variant="pink">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none select-none">
          <span className="text-foreground text-sm font-semibold">Pink</span>
          <span className="text-muted-foreground text-xs">Hover me</span>
        </div>
      </Cmp>
    </div>
  );
}
