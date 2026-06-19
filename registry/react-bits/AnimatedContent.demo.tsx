import AnimatedContent from "@/registry/react-bits/AnimatedContent";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6 py-10 w-full">
      <AnimatedContent distance={60} direction="vertical" duration={0.8} delay={0}>
        <div className="rounded-xl border border-border bg-background px-8 py-6 text-center shadow-sm max-w-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Scroll-triggered animation</h2>
          <p className="text-muted-foreground text-sm">
            This card slides in from below when it enters the viewport.
          </p>
        </div>
      </AnimatedContent>

      <AnimatedContent distance={60} direction="horizontal" duration={0.9} delay={0.1}>
        <div className="rounded-xl border border-border bg-background px-8 py-6 text-center shadow-sm max-w-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Horizontal slide</h2>
          <p className="text-muted-foreground text-sm">
            This one glides in from the side with a short delay.
          </p>
        </div>
      </AnimatedContent>

      <AnimatedContent distance={40} direction="vertical" reverse duration={1} delay={0.2} animateOpacity scale={0.9}>
        <div className="rounded-xl border border-border bg-background px-8 py-6 text-center shadow-sm max-w-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Scale + fade</h2>
          <p className="text-muted-foreground text-sm">
            Combines a slight scale-up with the translate for extra depth.
          </p>
        </div>
      </AnimatedContent>
    </div>
  );
}
