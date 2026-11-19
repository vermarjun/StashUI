import { Meteors } from "@/registry/magic-ui/meteors";

export default function Demo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-border">
      <Meteors number={30} />
      <span className="pointer-events-none bg-gradient-to-b from-foreground to-muted-foreground/40 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent">
        Meteors
      </span>
    </div>
  );
}
