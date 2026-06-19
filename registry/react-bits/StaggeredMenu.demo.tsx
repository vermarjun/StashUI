"use client";
import { StaggeredMenu } from "@/registry/react-bits/StaggeredMenu";

const navItems = [
  { label: "Home",     ariaLabel: "Home",     link: "#" },
  { label: "Work",     ariaLabel: "Work",     link: "#" },
  { label: "About",    ariaLabel: "About",    link: "#" },
  { label: "Contact",  ariaLabel: "Contact",  link: "#" },
];

const socialItems = [
  { label: "GitHub",   link: "#" },
  { label: "Twitter",  link: "#" },
  { label: "Dribbble", link: "#" },
];

const LogoSVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='22' viewBox='0 0 90 22'%3E%3Ccircle cx='11' cy='11' r='9' fill='%23fff'/%3E%3Ctext x='26' y='16' font-family='sans-serif' font-size='14' font-weight='700' fill='%23fff'%3Emyui%3C/text%3E%3C/svg%3E";

export default function Demo() {
  return (
    <div className="relative w-full h-[560px] bg-[#120F17] rounded-xl overflow-hidden">
      <StaggeredMenu
        isFixed={false}
        items={navItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        logoUrl={LogoSVG}
        colors={["#B497CF", "#5227FF"]}
        accentColor="#5227FF"
        menuButtonColor="#e9e9ef"
        openMenuButtonColor="#111"
        position="right"
        closeOnClickAway={true}
      />
    </div>
  );
}
