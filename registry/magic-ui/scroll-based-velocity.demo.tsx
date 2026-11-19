import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/registry/magic-ui/scroll-based-velocity";

export default function Demo() {
  return (
    <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden">
      <ScrollVelocityContainer className="font-bold text-5xl text-foreground tracking-[-0.02em] md:text-7xl md:leading-[5rem]">
        <ScrollVelocityRow baseVelocity={20} direction={1}>
          Velocity Scroll&nbsp;·&nbsp;
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={20} direction={-1}>
          Velocity Scroll&nbsp;·&nbsp;
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
    </div>
  );
}
