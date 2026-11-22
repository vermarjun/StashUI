"use client";

import FoldText from "@/registry/react-bits/fold-text";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full items-center justify-center bg-background px-6 text-center text-foreground">
      <FoldText text={"Design that\nunfolds"} trigger="loop" fontSize={96} fontWeight={700} />
    </div>
  );
}
