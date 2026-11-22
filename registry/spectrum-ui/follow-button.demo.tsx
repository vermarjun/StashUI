"use client";

import { FollowButton } from "./follow-button";

const creators = [
  { name: "Maya Lin", handle: "@mayalin", bio: "Type & motion at a design studio", img: 47, following: false },
  { name: "Daniel Okafor", handle: "@dokafor", bio: "Writes about React internals", img: 12, following: true },
  { name: "Sofia Ramirez", handle: "@sofiar", bio: "Illustrator, 3D tinkerer", img: 45, following: false },
];

export default function FollowButtonDemo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-2 shadow-xl">
        <p className="px-4 pb-1 pt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Who to follow
        </p>
        <ul className="divide-y divide-border">
          {creators.map((c) => (
            <li key={c.handle} className="flex items-center gap-3 px-4 py-3">
              <img
                src={`https://i.pravatar.cc/150?img=${c.img}`}
                alt={c.name}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-card-foreground">
                  {c.name}{" "}
                  <span className="font-normal text-muted-foreground">{c.handle}</span>
                </p>
                <p className="truncate text-xs text-muted-foreground">{c.bio}</p>
              </div>
              <FollowButton size="sm" defaultFollowing={c.following} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
