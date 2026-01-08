"use client";

import { LetterPullup } from "@/registry/inspira-react/letter-pullup";

export default function LetterPullupDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 p-8">
      <LetterPullup words="Hello World" delay={0.05} />
      <LetterPullup
        words="Pull Up Letters"
        delay={0.04}
        className="text-blue-600 dark:text-blue-400"
      />
    </div>
  );
}
