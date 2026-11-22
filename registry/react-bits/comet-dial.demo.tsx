"use client";

import CometDial from "./comet-dial";

export default function CometDialDemo() {
  return (
    <div className="flex min-h-[440px] w-full items-center justify-center gap-12 bg-background p-8">
      <CometDial label="Volume" defaultValue={62} unit="%" size={220} accent="#a3e635" />
      <CometDial label="Temperature" defaultValue={21} min={10} max={30} step={0.5} unit="°" size={220} />
    </div>
  );
}
