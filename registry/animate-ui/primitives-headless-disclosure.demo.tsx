"use client";
import { ChevronDown } from "lucide-react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@/registry/animate-ui/primitives-headless-disclosure";

const faqs = [
  {
    question: "What is a headless UI component?",
    answer:
      "A headless component provides all the logic, state management, and accessibility features without prescribing any styles. You own the look entirely.",
  },
  {
    question: "How does the animation work?",
    answer:
      "The panel uses Framer Motion to animate height from 0 to auto, combined with a mask-image fade so the content reveals smoothly from the top down.",
  },
  {
    question: "Is it accessible?",
    answer:
      "Yes. The Headless UI Disclosure primitive manages ARIA attributes (aria-expanded, aria-controls) and keyboard interactions automatically.",
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-xl mx-auto py-12 px-4 space-y-3">
      {faqs.map((faq) => (
        <Disclosure key={faq.question}>
          <div className="rounded-xl border border-border overflow-hidden">
            <DisclosureButton className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-muted/50 transition-colors cursor-pointer focus:outline-none">
              <span>{faq.question}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform ui-open:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel>
              <p className="px-5 py-4 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </DisclosurePanel>
          </div>
        </Disclosure>
      ))}
    </div>
  );
}
