'use client';

import { ImageZoom } from '@/registry/animate-ui/primitives-effects-image-zoom';

export default function Demo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-8">
      <ImageZoom
        data-zoom
        width={600}
        height={400}
        zoomScale={2.5}
        className="overflow-hidden rounded-2xl border border-border"
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=1066&fit=crop&auto=format&q=85"
          alt="Alpine peaks above a sea of clouds"
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
        />
      </ImageZoom>
      <p className="text-sm text-muted-foreground">Hover to zoom, move to pan, click to toggle</p>
    </div>
  );
}
