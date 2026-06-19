import GlareHover from "@/registry/react-bits/GlareHover";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-10 w-full">
      <GlareHover
        width="280px"
        height="340px"
        background="#0a0a0a"
        borderRadius="16px"
        borderColor="#2a2a2a"
        glareColor="#ffffff"
        glareOpacity={0.45}
        glareAngle={-45}
        glareSize={300}
      >
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <div className="text-4xl">✦</div>
          <p className="text-base font-semibold text-white">Hover to reveal glare</p>
          <p className="text-xs text-white/50">A shimmering highlight sweeps across on mouse-enter</p>
        </div>
      </GlareHover>

      <GlareHover
        width="280px"
        height="340px"
        background="#111827"
        borderRadius="16px"
        borderColor="#374151"
        glareColor="#a78bfa"
        glareOpacity={0.55}
        glareAngle={-35}
        glareSize={280}
      >
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <div className="text-4xl">⬡</div>
          <p className="text-base font-semibold text-white">Purple tint</p>
          <p className="text-xs text-white/50">Custom glare colour and angle</p>
        </div>
      </GlareHover>
    </div>
  );
}
