"use client";

import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/registry/origin-ui/cropper";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 w-full">
      <Cropper
        className="h-80 w-full max-w-xl rounded-xl"
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format"
        maxZoom={10}
        minZoom={1}
      >
        <CropperDescription />
        <CropperImage />
        <CropperCropArea />
      </Cropper>
      <p className="text-xs text-muted-foreground">
        Drag to reposition · Scroll to zoom
      </p>
    </div>
  );
}
