"use client";

import BellButton from "@/registry/kokonut-ui/bell-button";

export default function BellButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <BellButton count={1284} label="Notify me" />
      <div className="flex items-center gap-3">
        <BellButton defaultSubscribed label="Follow" subscribedLabel="Following" variant="compact" />
        <BellButton variant="icon" />
      </div>
    </div>
  );
}
