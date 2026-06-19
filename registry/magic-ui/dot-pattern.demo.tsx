import { DotPattern } from "@/registry/magic-ui/dot-pattern";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />
    </div>
  );
}
