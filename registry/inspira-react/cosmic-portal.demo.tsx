"use client";

import { useRef } from "react";
import { CosmicPortal, type CosmicPortalRef } from "@/registry/inspira-react/cosmic-portal";

export default function CosmicPortalDemo() {
  const portalRef = useRef<CosmicPortalRef>(null);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="h-[500px] w-full max-w-3xl rounded-xl overflow-hidden">
        <CosmicPortal
          ref={portalRef}
          primaryColor="#9b59b6"
          secondaryColor="#3498db"
          accentColor="#e74c3c"
          vortexColor="#2ecc71"
          crystalCount={12}
          bloomStrength={1.2}
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => portalRef.current?.activatePortal()}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Activate Portal
        </button>
        <button
          onClick={() => portalRef.current?.shiftDimensions()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Shift Dimensions
        </button>
      </div>
    </div>
  );
}
