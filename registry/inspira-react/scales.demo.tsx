"use client";
import { Scales } from "@/registry/inspira-react/scales";

export default function ScalesDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <Scales orientation="diagonal" size={14} className="rounded-lg border">
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-xl font-semibold">Diagonal Scales Pattern</p>
        </div>
      </Scales>
    </div>
  );
}
