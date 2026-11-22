'use client';

import { GlyphBackground } from './glyph-background';

export default function GlyphBackgroundDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-[#121212]">
      <GlyphBackground
        className="absolute inset-0 bg-[#121212] text-white"
        glowColor="#a78bfa"
        fontSize={11}
        interactive
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-white">Every character, alive</h2>
        <p className="max-w-sm text-sm text-white/60">
          Move to leave a trail of light. Click to send a pulse through the field.
        </p>
      </div>
    </div>
  );
}
