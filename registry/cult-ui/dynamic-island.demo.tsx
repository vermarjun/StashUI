"use client";

import { useState } from "react";
import DynamicIsland, {
  DynamicContainer,
  DynamicIslandProvider,
  DynamicTitle,
  DynamicDescription,
  SIZE_PRESETS,
  useDynamicIslandSize,
} from "@/registry/cult-ui/dynamic-island";

function IslandContent() {
  const { setSize, state } = useDynamicIslandSize();

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <DynamicIsland id="demo-island">
        <DynamicContainer className="flex items-center justify-center w-full h-full px-4">
          <DynamicTitle className="text-white text-xs font-semibold truncate">
            {state.size === "default" ? "Dynamic Island" : "Playing music..."}
          </DynamicTitle>
          <DynamicDescription className="text-gray-400 text-xs truncate">
            {state.size === "medium" ? "Now playing: Chill Vibes" : ""}
          </DynamicDescription>
        </DynamicContainer>
      </DynamicIsland>
      <div className="flex gap-2 flex-wrap justify-center">
        {(["default", "compact", "medium", "large"] as const).map((preset) => (
          <button
            key={preset}
            onClick={() => setSize(preset)}
            className="px-3 py-1.5 text-xs rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="w-full flex flex-col items-center p-8 bg-neutral-950 rounded-xl min-h-[300px]">
      <DynamicIslandProvider initialSize="default">
        <IslandContent />
      </DynamicIslandProvider>
    </div>
  );
}
