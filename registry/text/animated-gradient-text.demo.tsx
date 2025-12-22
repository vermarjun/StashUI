import { AnimatedGradientText } from "@/registry/text/animated-gradient-text";

export default function AnimatedGradientTextDemo() {
  return (
    <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
      Build{" "}
      <AnimatedGradientText gradient="from-indigo-500 via-purple-500 to-pink-500">beautiful</AnimatedGradientText>{" "}
      interfaces
    </h2>
  );
}
