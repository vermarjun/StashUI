"use client";

import Particles from "@/registry/react-bits/Particles";

export default function Demo() {
  return (
    <div className="w-full h-[600px] bg-black overflow-hidden relative">
      <Particles
        particleCount={320}
        particleSpread={10}
        speed={0.1}
        particleColors={["#ffffff", "#c084fc", "#22d3ee"]}
        alphaParticles={false}
        particleBaseSize={150}
        sizeRandomness={1}
        cameraDistance={20}
        moveParticlesOnHover={true}
        className="w-full h-full"
      />
    </div>
  );
}
