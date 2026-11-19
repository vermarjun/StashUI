import { BackgroundLines } from "@/registry/aceternity-ui/background-lines";

export default function Demo() {
  return (
    <BackgroundLines className="flex h-[600px] w-full flex-col items-center justify-center px-4 md:h-[600px]">
      <h2 className="relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text py-2 text-center font-sans text-2xl font-bold tracking-tight text-transparent md:py-10 md:text-4xl lg:text-7xl dark:from-neutral-600 dark:to-white">
        Sanjana Airlines, <br /> Sajana Textiles.
      </h2>
      <p className="relative z-20 mx-auto max-w-xl text-center text-sm text-neutral-700 md:text-lg dark:text-neutral-400">
        Get the best advices from our experts, including expert artists,
        painters, marathon enthusiasts and RDX, totally free.
      </p>
    </BackgroundLines>
  );
}
