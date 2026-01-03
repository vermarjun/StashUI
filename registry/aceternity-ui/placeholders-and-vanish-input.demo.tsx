"use client";

import { PlaceholdersAndVanishInput } from "@/registry/aceternity-ui/placeholders-and-vanish-input";

export default function Demo() {
  const placeholders = [
    "What's on your mind today?",
    "Search for anything...",
    "Ask me a question",
    "Type something creative",
    "How can I help you?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle input change
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submit
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center py-16 gap-4">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
        Ask anything
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
