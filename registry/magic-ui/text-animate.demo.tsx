"use client";
import { TextAnimate } from "@/registry/magic-ui/text-animate";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl p-8 gap-4">
      <TextAnimate animation="blurInUp" by="word" className="text-3xl font-bold">
        Animate your text beautifully
      </TextAnimate>
      <TextAnimate animation="fadeIn" by="character" className="text-lg text-neutral-500">
        Each character fades in one by one
      </TextAnimate>
    </div>
  );
}
