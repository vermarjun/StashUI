"use client";

import DecayCard from "@/registry/react-bits/DecayCard";

export default function Demo() {
  return (
    <div className="flex min-h-[560px] w-full flex-col items-center justify-center gap-6 p-8">
      <DecayCard height={400} image="https://images.unsplash.com/photo-1544168190-79c17527004f?w=600&h=750&fit=crop&auto=format&q=80&sat=-100" width={300}>
        <span className="text-white mix-blend-difference">
          Decay
          <br />
          Card
        </span>
      </DecayCard>
      <p className="text-muted-foreground text-sm">Move the cursor quickly to distort the image.</p>
    </div>
  );
}
