"use client";
import { ButtonsCard } from "@/registry/aceternity-ui/tailwindcss-buttons";

const buttons = [
  {
    label: "Get started",
    className:
      "px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors",
  },
  {
    label: "Sign up free",
    className:
      "px-6 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm font-medium hover:border-neutral-500 transition-colors",
  },
  {
    label: "Learn more",
    className:
      "px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md",
  },
  {
    label: "Explore docs",
    className:
      "px-6 py-2 rounded-md border-2 border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors",
  },
  {
    label: "Download",
    className:
      "px-6 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg",
  },
  {
    label: "Contact sales",
    className:
      "px-6 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors",
  },
];

export default function TailwindcssButtonsDemo() {
  return (
    <div className="grid grid-cols-3 gap-4 p-6 w-full max-w-3xl mx-auto">
      {buttons.map((btn) => (
        <ButtonsCard key={btn.label}>
          <button className={btn.className}>{btn.label}</button>
        </ButtonsCard>
      ))}
    </div>
  );
}
