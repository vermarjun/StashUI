'use client';

import * as React from 'react';
import { RadialIntro } from '@/registry/animate-ui/components-community-radial-intro';

const orbitItems = [
  {
    id: 1,
    name: 'React',
    src: 'https://images.unsplash.com/photo-1738510992679-41f599ec9399?w=60&h=60&fit=crop&auto=format&q=80',
  },
  {
    id: 2,
    name: 'TypeScript',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format&q=80',
  },
  {
    id: 3,
    name: 'Tailwind',
    src: 'https://images.unsplash.com/photo-1759434192768-fe3facebd5f6?w=60&h=60&fit=crop&auto=format&q=80',
  },
  {
    id: 4,
    name: 'Vite',
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=60&h=60&fit=crop&auto=format&q=80',
  },
  {
    id: 5,
    name: 'Node.js',
    src: 'https://images.unsplash.com/photo-1724888861686-ad3f706ab067?w=60&h=60&fit=crop&auto=format&q=80',
  },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-12">
      <RadialIntro orbitItems={orbitItems} stageSize={320} imageSize={60} />
    </div>
  );
}
