"use client";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/registry/aceternity-ui/resizable-navbar";

const navItems = [
  { name: "Features", link: "#features" },
  { name: "Pricing", link: "#pricing" },
  { name: "About", link: "#about" },
  { name: "Blog", link: "#blog" },
];

export default function Demo() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[500px] bg-gray-50 dark:bg-neutral-950 overflow-y-auto">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <NavbarButton variant="secondary" href="#">Sign in</NavbarButton>
            <NavbarButton variant="dark" href="#">Get Started</NavbarButton>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
            {navItems.map((item) => (
              <a key={item.name} href={item.link} className="text-neutral-700 dark:text-neutral-300 font-medium">
                {item.name}
              </a>
            ))}
            <NavbarButton variant="dark" href="#" className="w-full">Get Started</NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <div className="flex items-center justify-center" style={{ height: "400px" }}>
        <p className="text-muted-foreground text-sm">Scroll down to see the navbar resize</p>
      </div>
      <div style={{ height: "600px" }} />
    </div>
  );
}
