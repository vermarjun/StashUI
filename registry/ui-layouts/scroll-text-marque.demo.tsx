import ScrollBaseAnimation from "@/registry/ui-layouts/scroll-text-marque";

export default function Demo() {
  return (
    <div className="w-full overflow-hidden py-12">
      <ScrollBaseAnimation
        baseVelocity={-4}
        clasname="font-bold tracking-[-0.06em] leading-none text-foreground"
      >
        Velocity-driven marquee
      </ScrollBaseAnimation>
      <ScrollBaseAnimation
        baseVelocity={4}
        clasname="font-bold tracking-[-0.06em] leading-none text-muted-foreground"
      >
        Scroll to change speed
      </ScrollBaseAnimation>
    </div>
  );
}
