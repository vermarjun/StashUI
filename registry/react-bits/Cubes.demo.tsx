import Cubes from "@/registry/react-bits/Cubes";

export default function Demo() {
  return (
    <div className="flex h-[540px] w-full items-center justify-center overflow-hidden rounded-xl bg-background">
      <Cubes
        gridSize={10}
        maxAngle={45}
        radius={3}
        faceColor="#120F17"
        borderStyle="1px solid rgba(255,255,255,0.15)"
        rippleOnClick
        rippleColor="#a78bfa"
        autoAnimate
      />
    </div>
  );
}
