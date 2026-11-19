"use client";
import CardNav from "@/registry/react-bits/CardNav";

const logo =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="132" height="28" viewBox="0 0 132 28"><rect x="1" y="4" width="20" height="20" rx="6" fill="#fff"/><rect x="7" y="10" width="8" height="8" rx="2" fill="#0b0b10"/><text x="30" y="20.5" font-family="Inter, Helvetica, Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="-0.5" fill="#fff">Northwind</text></svg>`,
  );

const items = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#ffffff",
    links: [
      { label: "Company", href: "#", ariaLabel: "About Company" },
      { label: "Careers", href: "#", ariaLabel: "About Careers" },
    ],
  },
  {
    label: "Projects",
    bgColor: "#170D27",
    textColor: "#ffffff",
    links: [
      { label: "Featured", href: "#", ariaLabel: "Featured Projects" },
      { label: "Case Studies", href: "#", ariaLabel: "Project Case Studies" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#271E37",
    textColor: "#ffffff",
    links: [
      { label: "Email", href: "#", ariaLabel: "Email us" },
      { label: "Twitter", href: "#", ariaLabel: "Twitter" },
      { label: "LinkedIn", href: "#", ariaLabel: "LinkedIn" },
    ],
  },
];

export default function Demo() {
  return (
    <div className="relative flex h-[520px] w-full flex-col items-center overflow-hidden bg-neutral-950">
      <CardNav
        logo={logo}
        logoAlt="Northwind"
        items={items}
        baseColor="#18181b"
        menuColor="#ffffff"
        buttonBgColor="#ffffff"
        buttonTextColor="#0b0b10"
        ease="power3.out"
      />
      <div className="pointer-events-none mt-auto mb-24 flex flex-col items-center gap-3 px-6 text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Design studio for ambitious products
        </h2>
        <p className="max-w-md text-neutral-400">
          Open the menu to see the navigation expand into cards.
        </p>
      </div>
    </div>
  );
}
