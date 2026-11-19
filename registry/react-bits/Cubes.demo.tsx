import Cubes from "@/registry/react-bits/Cubes";

export default function Demo() {
  return (
    <div className="flex h-[640px] w-full items-center justify-center overflow-hidden bg-background">
      {/* Cubes sizes itself to half its parent's width, as a square */}
      <div className="flex w-[1040px] max-w-full justify-center">
      <Cubes
        gridSize={8}
        maxAngle={60}
        radius={4}
        faceColor="#1a1530"
        borderStyle="2px dashed #7c5cff"
        shadow="0 0 8px rgba(124,92,255,0.35)"
        rippleOnClick
        rippleColor="#e9d5ff"
        rippleSpeed={1.5}
        autoAnimate
      />
      </div>
    </div>
  );
}
