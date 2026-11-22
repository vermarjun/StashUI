"use client";

import AmountPad from "@/registry/kokonut-ui/amount-pad";

export default function AmountPadDemo() {
  return (
    <div className="flex w-full justify-center px-4">
      <AmountPad
        balance={3204.18}
        recipient={{ name: "Maya Chen", handle: "@maya" }}
      />
    </div>
  );
}
