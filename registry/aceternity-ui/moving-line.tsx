import React, { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const MovingLine = ({ children }: { children?: React.ReactNode }) => {
  const transition = {
    duration: 14,
    ease: "easeInOut" as const,
  };

  const ref = useRef<any>(null);

  // Track scroll progress, lies between 0 and 1.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  // when scroll progress reached 1, path length becomes 0.
  const pathLengthValue = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const PATH = "M0.5 0.980671L0.5 1566.02";
  return (
    <div
      className="max-w-4xl mx-auto flex flex-row space-x-10 items-start w-full "
      ref={ref}
    >
      <svg
        width="1"
        height="1567"
        viewBox="0 0 1 1567"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-foreground"
      >
        <path d={PATH} stroke="url(#paint0_linear_207_38)" />
        <defs>
          <linearGradient
            id="paint0_linear_207_38"
            x1="1"
            y1="-102.823"
            x2="1"
            y2="1566.02"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <motion.path
          // animatng pathLength value, goes from 1 to 0
          style={{
            pathLength: useSpring(pathLengthValue, {
              stiffness: 500,
              damping: 100,
            }),
          }}
          transition={transition}
          d={PATH}
          stroke="currentColor"
          strokeOpacity="1"
          strokeLinecap={"round"}
          strokeWidth="3"
        />
      </svg>
      <div className="flex flex-col w-full">
        {children ?? (
          <>
            <Content />
            <Content />
            <Content />
          </>
        )}
      </div>
    </div>
  );
};

{
  /* dummy content to fill up the screen */
}

export const Content = () => {
  return (
    <div className="content w-full mb-10 ">
      <p className="text-2xl font-bold text-foreground">
        The path follows the scroll
      </p>
      <p className="text-base font-normal text-muted-foreground">
        If you look closely, you can see the path is being animated.
      </p>
      <div className="flex space-x-4 w-full ">
        <div className="w-full h-40 md:h-96 rounded-md bg-muted mt-4" />
        <div className="w-full h-40 md:h-96 rounded-md bg-muted mt-4" />
      </div>
    </div>
  );
};

export default MovingLine;
