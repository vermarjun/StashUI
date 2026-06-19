import ClickSpark from "@/registry/react-bits/ClickSpark";

export default function Demo() {
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-border bg-background">
      <ClickSpark
        sparkColor="#a78bfa"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={10}
        duration={500}
        easing="ease-out"
        extraScale={1.2}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 select-none">
          <p className="text-3xl font-bold text-foreground">Click anywhere</p>
          <p className="text-muted-foreground text-sm">Sparks fly from every click</p>
        </div>
      </ClickSpark>
    </div>
  );
}
