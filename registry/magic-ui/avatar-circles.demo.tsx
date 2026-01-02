"use client";
import { AvatarCircles } from "@/registry/magic-ui/avatar-circles";

const avatarUrls = [
  {
    imageUrl: "https://picsum.photos/seed/av1/40/40",
    profileUrl: "https://example.com/user1",
  },
  {
    imageUrl: "https://picsum.photos/seed/av2/40/40",
    profileUrl: "https://example.com/user2",
  },
  {
    imageUrl: "https://picsum.photos/seed/av3/40/40",
    profileUrl: "https://example.com/user3",
  },
  {
    imageUrl: "https://picsum.photos/seed/av4/40/40",
    profileUrl: "https://example.com/user4",
  },
  {
    imageUrl: "https://picsum.photos/seed/av5/40/40",
    profileUrl: "https://example.com/user5",
  },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full max-w-md p-8">
      <AvatarCircles avatarUrls={avatarUrls} numPeople={99} />
    </div>
  );
}
