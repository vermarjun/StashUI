"use client";

import LayeredProgressiveDisclosure from "@/registry/watermelon-ui/layered-progressive-disclosure";

export default function LayeredProgressiveDisclosureDemo() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-[380px]">
        <LayeredProgressiveDisclosure
          title="Animation"
          configOptions={[
            { label: "Width", value: "320" },
            { label: "Height", value: "240" },
          ]}
        />
      </div>
    </div>
  );
}
