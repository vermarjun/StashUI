'use client';

import { ImageZoom } from '@/registry/animate-ui/primitives-effects-image-zoom';

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <ImageZoom
        width={320}
        height={220}
        zoomScale={2.5}
        className="rounded-xl overflow-hidden"
      >
        <img
          src="https://picsum.photos/seed/zoom/640/440"
          alt="Zoomable preview"
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
        />
      </ImageZoom>
    </div>
  );
}
