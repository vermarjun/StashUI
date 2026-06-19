import { Spotlight } from "@/registry/aceternity-ui/spotlight";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black/[0.96] antialiased">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-foreground text-2xl font-semibold">Spotlight Effect</p>
      </div>
    </div>
  );
}
