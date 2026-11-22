"use client";

import ElasticMesh from "./elastic-mesh";

export default function ElasticMeshDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <ElasticMesh text="Boing" />
      <p className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-xs uppercase tracking-[0.3em] text-white/45">
        Press, poke and stretch
      </p>
    </div>
  );
}
