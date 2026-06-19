"use client";

import LetterGlitch from "@/registry/react-bits/LetterGlitch";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <LetterGlitch
        glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
        glitchSpeed={50}
        outerVignette={true}
        smooth={true}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
      />
    </div>
  );
}
