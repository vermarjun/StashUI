"use client";
import BubbleMenu from "@/registry/react-bits/BubbleMenu";

const Logo = () => (
  <svg width="112" height="22" viewBox="0 0 112 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="9" fill="#120F17" />
    <text x="26" y="16" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#120F17">StashUI</text>
  </svg>
);

const items = [
  { label: "Home",     href: "#",  rotation: -6,  hoverStyles: { bgColor: "#3b82f6", textColor: "#fff" } },
  { label: "About",    href: "#",  rotation:  6,  hoverStyles: { bgColor: "#10b981", textColor: "#fff" } },
  { label: "Work",     href: "#",  rotation:  8,  hoverStyles: { bgColor: "#f59e0b", textColor: "#fff" } },
  { label: "Blog",     href: "#",  rotation: -6,  hoverStyles: { bgColor: "#ef4444", textColor: "#fff" } },
  { label: "Contact",  href: "#",  rotation:  4,  hoverStyles: { bgColor: "#8b5cf6", textColor: "#fff" } },
];

export default function Demo() {
  return (
    <div className="relative w-full h-[560px] bg-gray-100 overflow-hidden rounded-xl">
      <BubbleMenu logo={<Logo />} items={items} menuBg="#ffffff" menuContentColor="#111" />
    </div>
  );
}
