"use client";

import { useState } from "react";
import { MultiStepLoader } from "@/registry/aceternity-ui/multi-step-loader";

export default function Demo() {
  const [loading, setLoading] = useState(false);

  const loadingStates = [
    { text: "Connecting to server" },
    { text: "Authenticating user" },
    { text: "Loading workspace" },
    { text: "Fetching your data" },
    { text: "Preparing dashboard" },
    { text: "Almost there..." },
    { text: "Welcome back!" },
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-16 gap-6">
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={1500}
        loop={false}
      />
      <button
        onClick={() => setLoading(!loading)}
        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-80 transition-opacity"
      >
        {loading ? "Stop Loading" : "Start Loading"}
      </button>
      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[200] text-sm underline"
          onClick={() => setLoading(false)}
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
