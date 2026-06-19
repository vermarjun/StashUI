"use client";
import CardNav from "@/registry/react-bits/CardNav";

const items = [
  {
    label: "Products",
    bgColor: "#120F17",
    textColor: "#ffffff",
    links: [
      { label: "Components",  href: "#", ariaLabel: "Components" },
      { label: "Templates",   href: "#", ariaLabel: "Templates" },
      { label: "Icons",       href: "#", ariaLabel: "Icons" },
    ],
  },
  {
    label: "Resources",
    bgColor: "#1e1b4b",
    textColor: "#c7d2fe",
    links: [
      { label: "Documentation", href: "#", ariaLabel: "Documentation" },
      { label: "Blog",          href: "#", ariaLabel: "Blog" },
      { label: "Changelog",     href: "#", ariaLabel: "Changelog" },
    ],
  },
  {
    label: "Company",
    bgColor: "#0f172a",
    textColor: "#94a3b8",
    links: [
      { label: "About",   href: "#", ariaLabel: "About" },
      { label: "Careers", href: "#", ariaLabel: "Careers" },
      { label: "Contact", href: "#", ariaLabel: "Contact" },
    ],
  },
];

export default function Demo() {
  return (
    <div className="relative w-full h-[340px] bg-gray-100 overflow-visible rounded-xl flex items-start justify-center pt-6">
      <CardNav
        logo="https://picsum.photos/seed/cardnav/120/32"
        logoAlt="Brand"
        items={items}
        baseColor="#ffffff"
        menuColor="#120F17"
        buttonBgColor="#120F17"
        buttonTextColor="#ffffff"
      />
    </div>
  );
}
