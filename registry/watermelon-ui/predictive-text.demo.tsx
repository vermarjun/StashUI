import { PredictiveText } from "./predictive-text";

const words = [
  "see", "seeing", "sounds", "sounds good", "tomorrow", "tonight", "today",
  "thanks", "thank", "the", "there", "dinner", "dinosaur", "lunch", "later",
  "let's", "meet", "meeting", "maybe", "perfect", "plan", "place", "around",
  "at", "about", "seven", "send", "you", "your",
];

export default function PredictiveTextDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center">
      <PredictiveText dictionary={words} placeholder="Message Maya" />
    </div>
  );
}
