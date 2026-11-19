"use client";

import { BentoCard, BentoGrid } from "@/registry/magic-ui/bento-grid";
import { Calendar } from "@/components/ui/calendar";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  SearchIcon,
} from "lucide-react";

const files = [
  { name: "bitcoin.pdf", body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group using the name Satoshi Nakamoto." },
  { name: "finances.xlsx", body: "A spreadsheet that organizes data in rows and columns, used for budgeting, forecasting and reporting." },
  { name: "logo.svg", body: "Scalable Vector Graphics is an XML-based vector image format for two-dimensional graphics." },
  { name: "keys.gpg", body: "GPG keys are used to encrypt and decrypt email, files, directories and whole disk partitions." },
  { name: "seed.txt", body: "A seed phrase is a list of words which store all the information needed to recover a wallet." },
];

const FileCard = ({ f }: { f: (typeof files)[number] }) => (
  <figure className="w-40 shrink-0 transform-gpu rounded-xl border border-white/[.12] bg-white/[.06] p-4 transition-all duration-300 ease-out group-hover:border-white/20">
    <figcaption className="text-sm font-medium text-white">{f.name}</figcaption>
    <blockquote className="mt-2 line-clamp-4 text-xs text-neutral-400">{f.body}</blockquote>
  </figure>
);

const FilesBackground = () => (
  <div className="absolute inset-x-0 top-6 bottom-0 flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(to_top,transparent_30%,#000_62%)]">
    <style>{`@keyframes mbg-marquee{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 0.5rem))}}`}</style>
    <div className="flex w-max gap-4 animate-[mbg-marquee_24s_linear_infinite]">
      {[...files, ...files].map((f, i) => <FileCard key={i} f={f} />)}
    </div>
    <div className="flex w-max gap-4 animate-[mbg-marquee_30s_linear_infinite_reverse]">
      {[...files.slice().reverse(), ...files.slice().reverse()].map((f, i) => <FileCard key={i} f={f} />)}
    </div>
    <div className="flex w-max gap-4 animate-[mbg-marquee_20s_linear_infinite]">
      {[...files.slice(2), ...files.slice(0, 2), ...files.slice(2), ...files.slice(0, 2)].map((f, i) => <FileCard key={i} f={f} />)}
    </div>
  </div>
);

const SearchBackground = () => (
  <div className="absolute inset-x-6 top-6 origin-top rounded-xl border border-white/10 bg-neutral-950 shadow-2xl transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_15%,#000_70%)] group-hover:scale-[1.03]">
    <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5 text-sm text-neutral-300">
      <SearchIcon className="h-4 w-4 text-neutral-500" />
      quarterly report
      <span className="ml-0.5 h-4 w-px animate-pulse bg-neutral-300" />
    </div>
    <div className="space-y-1 p-2 text-xs">
      {["Q3 Quarterly Report.pdf", "Quarterly OKRs - Design", "Report template", "Board deck, quarterly", "Investor update (Oct)"].map((r, i) => (
        <div
          key={r}
          className={"flex items-center gap-2 rounded-md px-2 py-1.5 " + (i === 0 ? "bg-white/10 text-white" : "text-neutral-400")}
        >
          <FileTextIcon className="h-3.5 w-3.5" /> {r}
        </div>
      ))}
    </div>
  </div>
);

const LanguagesBackground = () => (
  <div className="absolute top-4 right-4 left-24 flex h-[4.25rem] flex-wrap justify-end gap-2 overflow-hidden [mask-image:linear-gradient(to_left,#000_60%,transparent_100%)]">
    {["Hello", "Bonjour", "Hola", "こんにちは", "Ciao", "Hallo", "안녕하세요", "Olá", "Привет", "नमस्ते"].map((w, i) => (
      <span
        key={w}
        className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-neutral-300 transition-transform duration-300 group-hover:-translate-y-1"
        style={{ transitionDelay: `${i * 30}ms` }}
      >
        {w}
      </span>
    ))}
  </div>
);

const notifications = [
  { name: "Payment received", description: "Magic UI", time: "15m ago", icon: "💸", color: "#00C9A7" },
  { name: "User signed up", description: "Magic UI", time: "10m ago", icon: "👤", color: "#FFB800" },
  { name: "New message", description: "Magic UI", time: "5m ago", icon: "💬", color: "#FF3D71" },
  { name: "New event", description: "Magic UI", time: "2m ago", icon: "🗞️", color: "#1E86FF" },
];

const NotificationsBackground = () => (
  <div className="absolute inset-x-6 top-6 flex flex-col gap-3 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-[1.03]">
    {notifications.map((n) => (
      <figure
        key={n.name}
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-transparent p-3 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] backdrop-blur-md"
      >
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: n.color }}
        >
          <span className="text-lg">{n.icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex items-center text-sm font-medium whitespace-pre text-white">
            {n.name}
            <span className="mx-1">·</span>
            <span className="text-xs text-neutral-500">{n.time}</span>
          </figcaption>
          <p className="text-xs text-white/60">{n.description}</p>
        </div>
      </figure>
    ))}
  </div>
);

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    background: <FilesBackground />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: SearchIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "#",
    cta: "Learn more",
    background: <SearchBackground />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "#",
    cta: "Learn more",
    background: <LanguagesBackground />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Filter your files by date.",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2026, 10, 14)}
        defaultMonth={new Date(2026, 10, 1)}
        className="absolute top-3 right-3 origin-top-right scale-[0.62] rounded-md border border-white/10 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_35%,#000_100%)] group-hover:scale-75"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    background: <NotificationsBackground />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-5xl p-4">
      <BentoGrid className="lg:auto-rows-[14.5rem]">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
