import { FlipCard } from "@/registry/inspira-react/flip-card";

export default function FlipCardDemo() {
  return (
    <div className="flex items-center justify-center gap-8 p-12">
      {/* Y-axis flip (default) */}
      <FlipCard
        rotate="y"
        back={
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <h3 className="text-lg font-bold text-white">Back Side</h3>
            <p className="text-center text-sm text-slate-300">
              This is the back of the card. Hover to flip!
            </p>
          </div>
        }
      >
        <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
          <h3 className="text-lg font-bold text-white">Front Side</h3>
          <p className="text-center text-sm text-indigo-100">Hover me to flip!</p>
        </div>
      </FlipCard>

      {/* X-axis flip */}
      <FlipCard
        rotate="x"
        back={
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <h3 className="text-lg font-bold text-white">Flipped X</h3>
            <p className="text-center text-sm text-slate-300">Rotates on X axis</p>
          </div>
        }
      >
        <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-500 to-pink-600 p-4">
          <h3 className="text-lg font-bold text-white">X Flip</h3>
          <p className="text-center text-sm text-rose-100">Hover to flip up!</p>
        </div>
      </FlipCard>
    </div>
  );
}
