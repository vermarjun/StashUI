"use client";

import LightTunnel from "./light-tunnel";

export default function LightTunnelDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <LightTunnel className="absolute inset-0" />
    </div>
  );
}
