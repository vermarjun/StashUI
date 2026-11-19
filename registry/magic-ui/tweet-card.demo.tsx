"use client";

import type { Tweet } from "react-tweet/api";

import { MagicTweet } from "@/registry/magic-ui/tweet-card";

// TweetCard fetches from X on the server. The preview renders the same card
// from a local sample so it never depends on the network.
const text =
  "Shipped a new component library today. 1,500 components, every one with a live preview and a one-line install. #buildinpublic";
const tag = "#buildinpublic";

const tweet = {
  __typename: "Tweet",
  lang: "en",
  id_str: "1683920951807971329",
  text,
  display_text_range: [0, text.length],
  created_at: "2026-11-10T10:00:00.000Z",
  favorite_count: 1284,
  conversation_count: 96,
  news_action_type: "conversation",
  isEdited: false,
  isStaleEdit: false,
  edit_control: {
    edit_tweet_ids: ["1683920951807971329"],
    editable_until_msecs: "0",
    is_edit_eligible: false,
    edits_remaining: "0",
  },
  entities: {
    hashtags: [{ indices: [text.indexOf(tag), text.length], text: "buildinpublic" }],
    urls: [],
    user_mentions: [],
    symbols: [],
  },
  user: {
    id_str: "1",
    name: "Kelly King",
    screen_name: "kellyking",
    profile_image_url_https: "/origin/avatar-80-03.jpg",
    profile_image_shape: "Circle",
    verified: false,
    is_blue_verified: true,
  },
  photos: [
    {
      backgroundColor: { red: 0, green: 0, blue: 0 },
      cropCandidates: [],
      expandedUrl: "",
      url: "/media/sample-clip.jpg",
      width: 1280,
      height: 800,
    },
  ],
} as unknown as Tweet;

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <MagicTweet tweet={tweet} className="bg-background" />
    </div>
  );
}
