"use client";

import Particles from "@/registry/react-bits/Particles";

export default function Demo() {
  return (
    <div className="w-full h-[600px] bg-black rounded-xl overflow-hidden relative">
      <Particles
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleColors={["#ffffff", "#a855f7", "#06b6d4"]}
        alphaParticles={true}
        particleBaseSize={100}
        sizeRandomness={1}
        cameraDistance={20}
        moveParticlesOnHover={true}
        className="w-full h-full"
      />
    </div>
  );
}
