"use client";
import StarBorder from "@/registry/react-bits/StarBorder";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center gap-10">
      <StarBorder className="text-lg" color="#5ef3ff" speed="4s" thickness={4}>
        Get early access
      </StarBorder>
      <StarBorder as="div" color="#ff4fd8" speed="5s" thickness={4}>
        <div className="w-72 text-left">
          <p className="font-semibold">Launch week is live</p>
          <p className="mt-1 text-sm text-gray-400">
            Five new components, a theme builder and one very shiny border.
          </p>
        </div>
      </StarBorder>
    </div>
  );
}
