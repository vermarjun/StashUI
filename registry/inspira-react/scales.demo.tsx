"use client";
import { Scales } from "@/registry/inspira-react/scales";

export default function ScalesDemo() {
  return (
    <div className="flex h-64 w-full flex-col gap-4">
      <Scales orientation="diagonal" size={14} className="rounded-lg border">
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-xl font-semibold">Diagonal Scales Pattern</p>
        </div>
      </Scales>
    </div>
  );
}
