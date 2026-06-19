"use client";

import { MediaModal } from "@/registry/ui-layouts/media-modal";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-72 h-52 rounded-xl overflow-hidden">
        <MediaModal
          imgSrc="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800"
        />
      </div>
    </div>
  );
}
