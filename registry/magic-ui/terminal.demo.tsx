"use client";

import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "@/registry/magic-ui/terminal";

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-6">
      <Terminal className="w-full max-w-lg">
        <TypingAnimation>$ npx shadcn@latest init</TypingAnimation>

        <AnimatedSpan className="text-green-500">
          ✔ Preflight checks.
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          ✔ Verifying framework. Found Next.js.
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          ✔ Validating Tailwind CSS.
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          ✔ Validating import alias.
        </AnimatedSpan>

        <AnimatedSpan className="text-muted-foreground">
          ℹ Writing components.json.
        </AnimatedSpan>
        <AnimatedSpan className="text-muted-foreground">
          ℹ Initializing project.
        </AnimatedSpan>
        <AnimatedSpan className="text-muted-foreground">
          ℹ Installing dependencies.
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          ✔ Project initialized. Happy building!
        </AnimatedSpan>

        <TypingAnimation delay={2800} className="text-muted-foreground">
          $ npx shadcn@latest add button
        </TypingAnimation>

        <AnimatedSpan className="text-green-500">
          ✔ Done.
        </AnimatedSpan>
      </Terminal>
    </div>
  );
}
