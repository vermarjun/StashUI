"use client";
import GooeyNav from "@/registry/react-bits/GooeyNav";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-24 bg-gray-900 rounded-xl p-8">
      <GooeyNav items={items} />
    </div>
  );
}
