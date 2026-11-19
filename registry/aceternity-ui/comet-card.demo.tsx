"use client";

import { CometCard } from "@/registry/aceternity-ui/comet-card";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <CometCard>
        <button
          type="button"
          className="flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:p-4"
          aria-label="View invite F7RA"
          style={{ transformStyle: "preserve-3d", transform: "none", opacity: 1 }}
        >
          <div className="mx-2 flex-1">
            <div className="relative mt-2 aspect-[3/4] w-full">
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[16px] bg-black object-cover contrast-90"
                alt="Invite background"
                src="https://images.unsplash.com/photo-1761882725885-d3d8bd2032d1?w=800&h=1066&fit=crop&auto=format&q=80"
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px" }}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
            <div className="text-xs">Comet Invitation</div>
            <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
          </div>
        </button>
      </CometCard>
    </div>
  );
}
