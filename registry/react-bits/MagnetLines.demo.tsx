import MagnetLines from "@/registry/react-bits/MagnetLines";

export default function Demo() {
  return (
    <div className="flex h-[560px] w-full items-center justify-center overflow-hidden rounded-xl bg-background">
      <MagnetLines
        rows={9}
        columns={9}
        containerSize="min(70vmin, 480px)"
        lineColor="currentColor"
        lineWidth="1.5px"
        lineHeight="28px"
        baseAngle={-10}
        className="text-foreground"
      />
    </div>
  );
}
