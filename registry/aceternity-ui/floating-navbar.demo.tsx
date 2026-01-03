"use client";
import { FloatingNav } from "@/registry/aceternity-ui/floating-navbar";

const navItems = [
  { name: "Home", link: "#" },
  { name: "About", link: "#about" },
  { name: "Services", link: "#services" },
  { name: "Contact", link: "#contact" },
];

export default function Demo() {
  return (
    <div className="relative w-full h-[400px] bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <FloatingNav navItems={navItems} />
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        Scroll down to reveal the floating navbar
      </div>
    </div>
  );
}
