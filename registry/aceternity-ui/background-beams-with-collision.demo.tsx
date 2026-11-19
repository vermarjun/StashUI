import { BackgroundBeamsWithCollision } from "@/registry/aceternity-ui/background-beams-with-collision";

export default function Demo() {
  return (
    <BackgroundBeamsWithCollision className="h-[600px] md:h-[600px]">
      <h2 className="relative z-20 text-center font-sans text-2xl font-bold tracking-tight text-black md:text-4xl lg:text-7xl dark:text-white">
        What&apos;s cooler than Beams?{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span>Exploding beams.</span>
          </div>
          <div className="relative bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent">
            <span>Exploding beams.</span>
          </div>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
