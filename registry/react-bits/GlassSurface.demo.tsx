"use client";
import GlassSurface from "@/registry/react-bits/GlassSurface";

export default function Demo() {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: "480px" }}>
      {/* Colourful background so the glass refraction is clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-sky-400 to-emerald-400 rounded-xl" />
      <GlassSurface
        width={440}
        height={200}
        borderRadius={24}
        distortionScale={-160}
        brightness={60}
        opacity={0.9}
        blur={14}
        saturation={1.4}
      >
        <div className="flex flex-col items-center gap-2 px-6 py-4 text-center">
          <p className="text-sm font-semibold text-white/90 tracking-wide">Glass Surface</p>
          <p className="text-xs text-white/60">SVG chromatic-aberration refraction</p>
        </div>
      </GlassSurface>
    </div>
  );
}
