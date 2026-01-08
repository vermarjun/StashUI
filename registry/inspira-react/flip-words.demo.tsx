import { FlipWords } from "@/registry/inspira-react/flip-words";

const WORDS = ["amazing", "beautiful", "powerful", "delightful"];

export default function FlipWordsDemo() {
  return (
    <div className="flex h-48 items-center justify-center">
      <h2 className="text-4xl font-bold">
        Build{" "}
        <FlipWords
          words={WORDS}
          duration={2500}
          className="text-indigo-500 dark:text-indigo-400"
        />
        UIs
      </h2>
    </div>
  );
}
