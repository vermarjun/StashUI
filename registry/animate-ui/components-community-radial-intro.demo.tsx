'use client';

import * as React from 'react';
import { RadialIntro } from '@/registry/animate-ui/components-community-radial-intro';

const orbitItems = [
  {
    id: 1,
    name: 'React',
    src: 'https://picsum.photos/seed/react/60/60',
  },
  {
    id: 2,
    name: 'TypeScript',
    src: 'https://picsum.photos/seed/typescript/60/60',
  },
  {
    id: 3,
    name: 'Tailwind',
    src: 'https://picsum.photos/seed/tailwind/60/60',
  },
  {
    id: 4,
    name: 'Vite',
    src: 'https://picsum.photos/seed/vite/60/60',
  },
  {
    id: 5,
    name: 'Node.js',
    src: 'https://picsum.photos/seed/nodejs/60/60',
  },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-12">
      <RadialIntro orbitItems={orbitItems} stageSize={320} imageSize={60} />
    </div>
  );
}
