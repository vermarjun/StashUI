import { MacbookScroll } from "@/registry/aceternity-ui/macbook-scroll";

export default function Demo() {
  return (
    <div className="w-full overflow-hidden bg-background">
      <MacbookScroll
        title={
          <span>
            Your dashboard, opened on scroll. <br /> Built with Tailwind CSS.
          </span>
        }
        badge={
          <span className="inline-flex size-8 -rotate-12 items-center justify-center rounded-full bg-white text-xs font-black text-black">
            S
          </span>
        }
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format&q=80"
        showGradient={false}
      />
    </div>
  );
}
