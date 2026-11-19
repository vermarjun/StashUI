"use client";
import { ImagesBadge } from "@/registry/aceternity-ui/images-badge";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full max-w-md p-12">
      <ImagesBadge
        text="View Photos"
        images={[
          "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?w=200&h=200&fit=crop&auto=format&q=80",
          "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=200&h=200&fit=crop&auto=format&q=80",
          "https://images.unsplash.com/photo-1512045519129-eb9ceb788555?w=200&h=200&fit=crop&auto=format&q=80",
        ]}
      />
    </div>
  );
}
