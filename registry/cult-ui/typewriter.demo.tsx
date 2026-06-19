import { Typewriter } from "@/registry/cult-ui/typewriter";

const cyclingPhrases = [
  "dashboard with a sidebar",
  "quiz page with answers",
  "ecommerce product listing",
  "blog article detail page",
  "UI like platform.openai.com",
];

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center px-8 py-12 text-foreground">
      <p className="text-2xl font-semibold">
        <Typewriter
          delay={0.3}
          baseText="Build a "
          texts={cyclingPhrases}
        />
      </p>
    </div>
  );
}
