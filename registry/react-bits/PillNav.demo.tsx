"use client";
import PillNav from "@/registry/react-bits/PillNav";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Demo() {
  return (
    <div className="relative w-full min-h-24 bg-gray-900 rounded-xl overflow-hidden">
      <PillNav
        logo="https://picsum.photos/seed/logo/40/40"
        logoAlt="Brand Logo"
        items={navItems}
        activeHref="#home"
        baseColor="#ffffff"
        pillColor="#1a1a2e"
        hoveredPillTextColor="#ffffff"
      />
    </div>
  );
}
