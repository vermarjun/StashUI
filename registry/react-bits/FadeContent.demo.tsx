import FadeContent from "@/registry/react-bits/FadeContent";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6 py-10 w-full">
      <FadeContent duration={800} delay={0} blur threshold={0.1}>
        <div className="rounded-xl border border-border bg-background px-8 py-6 text-center max-w-sm shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Fade in on scroll</h2>
          <p className="text-muted-foreground text-sm">
            This card fades (and unblurs) into view when it enters the viewport.
          </p>
        </div>
      </FadeContent>

      <FadeContent duration={1000} delay={200} threshold={0.1}>
        <div className="rounded-xl border border-border bg-background px-8 py-6 text-center max-w-sm shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Opacity only</h2>
          <p className="text-muted-foreground text-sm">
            A pure opacity fade with a slight delay for a staggered feel.
          </p>
        </div>
      </FadeContent>

      <FadeContent duration={900} delay={400} blur threshold={0.1}>
        <div className="rounded-xl border border-border bg-background px-8 py-6 text-center max-w-sm shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Blur + fade</h2>
          <p className="text-muted-foreground text-sm">
            Combines blur removal with a fade for a soft reveal effect.
          </p>
        </div>
      </FadeContent>
    </div>
  );
}
