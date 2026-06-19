"use client";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "@/registry/ui-layouts/accordion";

export default function Demo() {
  return (
    <div className="w-full max-w-lg mx-auto py-10 px-4">
      <Accordion defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionHeader>What is a UI component?</AccordionHeader>
          <AccordionPanel>
            A UI component is a modular, reusable element that serves a specific function within a
            graphical user interface — buttons, inputs, dropdowns, sliders, and more.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionHeader>Why are UI components important?</AccordionHeader>
          <AccordionPanel>
            Components promote consistency, efficiency, and scalability. They let developers reuse
            code and maintain a cohesive look and feel across the entire application.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionHeader>Key characteristics of great components?</AccordionHeader>
          <AccordionPanel>
            Well-designed components are modular, customizable, and accessible. They have clear
            functionality and adapt easily to any design language.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionHeader>How do components improve UX?</AccordionHeader>
          <AccordionPanel>
            Familiar, consistent interactions make navigation intuitive. Recognizable patterns reduce
            cognitive load and help users accomplish tasks faster.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
