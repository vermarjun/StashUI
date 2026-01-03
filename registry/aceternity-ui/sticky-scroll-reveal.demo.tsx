"use client";
import { StickyScroll } from "@/registry/aceternity-ui/sticky-scroll-reveal";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white text-lg font-semibold">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white text-lg font-semibold">
        Real Time Changes
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white text-lg font-semibold">
        Version Control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white text-lg font-semibold">
        Running out of content
      </div>
    ),
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-5xl">
      <StickyScroll content={content} />
    </div>
  );
}
