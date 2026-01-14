'use client';
import ImageMouseTrail from '@/registry/ui-layouts/mousetrail';

export default function Demo() {
  const images = [
    'https://picsum.photos/seed/trail1/400/480',
    'https://picsum.photos/seed/trail2/400/480',
    'https://picsum.photos/seed/trail3/400/480',
    'https://picsum.photos/seed/trail4/400/480',
    'https://picsum.photos/seed/trail5/400/480',
    'https://picsum.photos/seed/trail6/400/480',
    'https://picsum.photos/seed/trail7/400/480',
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <ImageMouseTrail items={images} maxNumberOfImages={5} distance={15}>
        <p className="text-2xl font-semibold text-gray-700 select-none pointer-events-none z-10">
          Move your mouse around
        </p>
      </ImageMouseTrail>
    </div>
  );
}
