"use client";
import Folder from "@/registry/react-bits/Folder";

const photos = [
  "1506905925346-21bda4d32df4",
  "1469474968028-56623f02e42e",
  "1693581176773-a5f2362209e6",
];

export default function Demo() {
  return (
    <div className="flex h-[560px] w-full flex-col items-center justify-center gap-24 pt-24">
      <Folder
        size={2.4}
        color="#52525b"
        items={photos.map((id) => (
          <img
            key={id}
            src={`https://images.unsplash.com/photo-${id}?w=240&h=200&fit=crop&auto=format&q=80`}
            alt=""
            className="h-full w-full rounded-[10px] object-cover p-[3px]"
          />
        ))}
      />
      <p className="select-none text-sm text-muted-foreground">Trip to the Alps, 3 photos</p>
    </div>
  );
}
