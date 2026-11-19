"use client";
import { CardStack } from "@/registry/aceternity-ui/card-stack";
import { cn } from "@/lib/utils";

const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "rounded-sm bg-emerald-100 px-1 py-0.5 font-bold text-emerald-700 dark:bg-emerald-700/[0.25] dark:text-emerald-400",
      className,
    )}
  >
    {children}
  </span>
);

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of <Highlight>Fight Club</Highlight> is that you do not
        talk about fight club. The second rule of{" "}
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
  {
    id: 3,
    name: "Priya Raman",
    designation: "Design Lead at Linear",
    content: (
      <p>
        We shipped the new onboarding with these in an afternoon.{" "}
        <Highlight>Activation went up 18%</Highlight> and nobody on the team
        had to touch a keyframe.
      </p>
    ),
  },
];

export default function Demo() {
  return (
    <div className="flex h-[30rem] w-full items-center justify-center pt-10">
      <CardStack items={CARDS} offset={18} scaleFactor={0.07} duration={2600} />
    </div>
  );
}
