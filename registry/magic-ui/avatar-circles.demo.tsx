"use client";
import { AvatarCircles } from "@/registry/magic-ui/avatar-circles";

const avatarUrls = [
  {
    imageUrl: "https://images.unsplash.com/photo-1667776384514-a06f0b7675a1?w=40&h=40&fit=crop&auto=format&q=80",
    profileUrl: "https://example.com/user1",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1718633739487-6efee8ac466d?w=40&h=40&fit=crop&auto=format&q=80",
    profileUrl: "https://example.com/user2",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1726551195795-612ca47c0b7d?w=40&h=40&fit=crop&auto=format&q=80",
    profileUrl: "https://example.com/user3",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?w=40&h=40&fit=crop&auto=format&q=80",
    profileUrl: "https://example.com/user4",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1476180814856-a36609db0493?w=40&h=40&fit=crop&auto=format&q=80",
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
