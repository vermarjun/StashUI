"use client";
import { HoverBorderGradient } from "@/registry/aceternity-ui/hover-border-gradient";

function AceternityLogo() {
  return (
    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 66 65" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="15"
      />
    </svg>
  );
}

export default function Demo() {
  return (
      <HoverBorderGradient
        as="button"
        className="flex items-center space-x-2 bg-black text-white"
        containerClassName="rounded-full"
      >
        <AceternityLogo />
        <span>Aceternity UI</span>
      </HoverBorderGradient>
  );
}
