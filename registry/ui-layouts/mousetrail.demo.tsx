'use client';
import ImageMouseTrail from '@/registry/ui-layouts/mousetrail';

export default function Demo() {
  const images = [
    'https://images.unsplash.com/photo-1584043204475-8cc101d6c77a?w=400&h=480&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1520256862855-398228c41684?w=400&h=480&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1719554873571-0fd6bf322bb1?w=400&h=480&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1618220649687-ba860f3176e7?w=400&h=480&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=480&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=480&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1573790387438-4da905039392?w=400&h=480&fit=crop&auto=format&q=80',
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
