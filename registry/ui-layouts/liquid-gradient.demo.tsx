'use client';
import { useState } from 'react';
import { Liquid } from '@/registry/ui-layouts/liquid-gradient';

const sampleColors = {
  color1: '#ff6b6b',
  color2: '#ffa36b',
  color3: '#ffcc6b',
  color4: '#a8ff6b',
  color5: '#6bffa3',
  color6: '#6bccff',
  color7: '#6b8cff',
  color8: '#a36bff',
  color9: '#ff6bcf',
  color10: '#ff6b8c',
  color11: '#ff9f6b',
  color12: '#6bffcc',
  color13: '#6bffd4',
  color14: '#6be8ff',
  color15: '#8c6bff',
  color16: '#cf6bff',
  color17: '#ff6be8',
};

export default function Demo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-center p-8">
      <div
        className="relative w-[400px] h-[120px] overflow-hidden rounded-[60px] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Liquid isHovered={isHovered} colors={sampleColors} />
        <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg z-10 select-none">
          Hover me
        </span>
      </div>
    </div>
  );
}
