import { ScrollAnimation } from "@/registry/ui-layouts/scroll-animation";

const cards = [
  { title: "Blur In", body: "Fades and unblurs as it enters the viewport — great for hero text or section intros." },
  { title: "Direction Control", body: "Animate from up, down, left, or right with a single prop change." },
  { title: "Staggered Delay", body: "Pass a delay value per element to choreograph multi-step entrance sequences." },
  { title: "Scroll Trigger", body: "Powered by Framer Motion's whileInView — fires once when 30 % of the element is visible." },
];

export default function Demo() {
  return (
    <div className="w-full max-w-xl mx-auto py-12 px-4 flex flex-col gap-6">
      {cards.map((card, i) => (
        <ScrollAnimation key={card.title} direction="up" delay={i * 0.12}>
          <div className="rounded-xl border border-border bg-muted/50 p-6">
            <p className="text-sm font-semibold text-foreground mb-1">{card.title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
          </div>
        </ScrollAnimation>
      ))}
    </div>
  );
}
