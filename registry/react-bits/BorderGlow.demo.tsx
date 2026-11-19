"use client";
import BorderGlow from "@/registry/react-bits/BorderGlow";

export default function Demo() {
  return (
    <BorderGlow
      animated
      backgroundColor="var(--card)"
      borderRadius={28}
      className="w-[380px] border border-border"
      coneSpread={30}
      edgeSensitivity={18}
      glowColor="280 80 75"
      glowIntensity={1.7}
      glowRadius={56}
    >
      <div className="flex flex-col gap-4 p-8">
        <span className="w-fit rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          Pro plan
        </span>
        <h3 className="text-2xl font-semibold text-foreground">Border Glow</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Move your cursor toward an edge of the card. The border lights up in a
          cone that follows the pointer and fades as you leave.
        </p>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-semibold text-foreground">$24</span>
          <span className="text-sm text-muted-foreground">/ month</span>
        </div>
        <button
          className="mt-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
          type="button"
        >
          Get started
        </button>
      </div>
    </BorderGlow>
  );
}
