"use client";

import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/origin-ui/accordion";

const items = [
  {
    id: "1",
    title: "What makes this library different?",
    content:
      "Built with TypeScript and following WAI-ARIA standards, it offers excellent type safety, accessibility, and comprehensive documentation.",
  },
  {
    id: "2",
    title: "How do I customize components?",
    content:
      "Use CSS variables for global styling or className props for component-specific changes. Supports Tailwind and dark mode out of the box.",
  },
  {
    id: "3",
    title: "Is it optimized for performance?",
    content:
      "Yes — tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-lg space-y-2 px-4">
      <Accordion type="single" collapsible defaultValue="2">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
