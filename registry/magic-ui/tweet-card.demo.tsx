import { TweetCard } from "@/registry/magic-ui/tweet-card";

export default function Demo() {
  // Tweet by @vercel: https://twitter.com/vercel/status/1683920951807971329
  return (
    <div className="flex items-center justify-center p-8">
      <TweetCard id="1683920951807971329" />
    </div>
  );
}
