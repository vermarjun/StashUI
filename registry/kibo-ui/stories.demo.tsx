"use client";

import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
  StoryImage,
  StoryOverlay,
  StoryVideo,
} from "./stories";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&q=80`;

const stories = [
  { id: 1, author: "Maya Chen", avatar: 47, image: u("1506905925346-21bda4d32df4") },
  {
    id: 2,
    author: "Leo Park",
    avatar: 12,
    video: "https://cdn.pixabay.com/video/2023/10/19/185726-876210695_large.mp4",
  },
  { id: 3, author: "Priya Nair", avatar: 32, image: u("1548192746-dd526f154ed9") },
  { id: 4, author: "Tom Becker", avatar: 15, image: u("1460999158988-6f0380f81f4d") },
  {
    id: 5,
    author: "Ana Souza",
    avatar: 44,
    video: "https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4",
  },
  { id: 6, author: "Sam Okafor", avatar: 53, image: u("1517849845537-4d257902454a") },
  { id: 7, author: "Hana Ito", avatar: 25, image: u("1504198266287-1659872e6590") },
  { id: 8, author: "Jonas Weber", avatar: 59, image: u("1478028928718-7bfdb1b32095") },
];

export default function StoriesDemo() {
  return (
    <div className="flex w-full items-center p-8">
      <Stories>
        <StoriesContent>
          {stories.map((s) => (
            <Story className="aspect-[3/4] w-[200px]" key={s.id}>
              {s.video ? (
                <StoryVideo src={s.video} />
              ) : (
                <StoryImage alt={`Story by ${s.author}`} src={s.image} />
              )}
              <StoryOverlay side="top" />
              <StoryOverlay className="h-16 from-black/60" />
              <StoryAuthor>
                <StoryAuthorImage
                  name={s.author}
                  src={`https://i.pravatar.cc/150?img=${s.avatar}`}
                />
                <StoryAuthorName>{s.author}</StoryAuthorName>
              </StoryAuthor>
            </Story>
          ))}
        </StoriesContent>
      </Stories>
    </div>
  );
}
