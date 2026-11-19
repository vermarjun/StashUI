import { MaskContainer } from "@/registry/aceternity-ui/svg-mask-effect";

export default function Demo() {
  return (
    <div className="flex h-full min-h-[34rem] w-full items-center justify-center overflow-hidden">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl px-6 text-center text-4xl font-bold text-slate-800">
            The first rule of MRR Club is you do not talk about MRR Club. The
            second rule of MRR Club is you DO NOT talk about MRR Club.
          </p>
        }
        className="h-[34rem] w-full rounded-md text-white"
      >
        Discover the power of{" "}
        <span className="text-blue-500">Tailwind CSS v4</span> with native
        CSS variables and container queries with{" "}
        <span className="text-blue-500">advanced animations</span>.
      </MaskContainer>
    </div>
  );
}
