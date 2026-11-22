import { ContextualAIBar } from "./contextual-ai-bar";
import {
  Music2,
  Sparkles,
  Scissors,
  SlidersHorizontal,
  Volume2,
  Repeat,
} from "lucide-react";

export default function ContextualAIBarDemo() {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center p-6">
      <ContextualAIBar
        placeholder="Make the chorus punchier"
        musicIcon={<Music2 size={20} className="text-foreground" />}
        sparkleIcon={<Sparkles size={20} className="text-foreground" />}
        tools={[
          <Scissors key="cut" size={22} />,
          <SlidersHorizontal key="eq" size={22} />,
          <Volume2 key="vol" size={22} />,
          <Repeat key="loop" size={22} />,
        ]}
      />
    </div>
  );
}
