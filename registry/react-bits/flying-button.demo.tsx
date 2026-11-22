"use client";

import FlyingButton from "./flying-button";

export default function FlyingButtonDemo() {
  return (
    <div className="flex min-h-[480px] w-full items-end justify-center bg-background p-8 pb-24">
      <FlyingButton size="large" ramp>
        Launch project
      </FlyingButton>
    </div>
  );
}
