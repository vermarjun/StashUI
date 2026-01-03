"use client";
import { ImagesBadge } from "@/registry/aceternity-ui/images-badge";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full max-w-md p-12">
      <ImagesBadge
        text="View Photos"
        images={[
          "https://picsum.photos/seed/b1/200/200",
          "https://picsum.photos/seed/b2/200/200",
          "https://picsum.photos/seed/b3/200/200",
        ]}
      />
    </div>
  );
}
