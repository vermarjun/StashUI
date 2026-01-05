"use client";

import { TweetGrid } from "@/registry/cult-ui/tweet-grid";

export default function Demo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <TweetGrid
        tweets={[
          "1620543756048035840",
          "1629307668956545024",
          "1634178537849057280",
          "1638567890123456789",
          "1645678901234567890",
          "1652345678901234567",
        ]}
        columns={3}
        spacing="md"
      />
    </div>
  );
}
