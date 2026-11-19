'use client';
import {
  ProgressSlider,
  SliderBtn,
  SliderBtnGroup,
  SliderContent,
  SliderWrapper,
} from '@/registry/ui-layouts/progressive-carousel';
import React from 'react';

const SLIDES = [
  {
    value: 'slide-1',
    img: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=900&h=500&fit=crop&auto=format&q=80',
    label: 'Mountain Vista',
    sub: 'Snow-capped peaks at golden hour',
  },
  {
    value: 'slide-2',
    img: 'https://images.unsplash.com/photo-1756806983832-1f056cf24182?w=900&h=500&fit=crop&auto=format&q=80',
    label: 'Ocean Breeze',
    sub: 'Endless horizon over turquoise water',
  },
  {
    value: 'slide-3',
    img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=900&h=500&fit=crop&auto=format&q=80',
    label: 'Forest Path',
    sub: 'Ancient trees filtered in morning light',
  },
  {
    value: 'slide-4',
    img: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?w=900&h=500&fit=crop&auto=format&q=80',
    label: 'Desert Dunes',
    sub: 'Rolling sand at twilight',
  },
];

export default function Demo() {
  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-6'>
      <ProgressSlider activeSlider='slide-1' duration={4000} className='flex flex-col gap-4'>
        {/* Main image display */}
        <SliderContent className='relative w-full overflow-hidden rounded-xl aspect-video bg-muted'>
          {SLIDES.map((s) => (
            <SliderWrapper key={s.value} value={s.value} className='absolute inset-0'>
              <img
                src={s.img}
                alt={s.label}
                className='w-full h-full object-cover'
              />
              <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white'>
                <p className='text-lg font-semibold'>{s.label}</p>
                <p className='text-sm opacity-80'>{s.sub}</p>
              </div>
            </SliderWrapper>
          ))}
        </SliderContent>

        {/* Navigation buttons with progress bars */}
        <SliderBtnGroup className='flex gap-2 w-full'>
          {SLIDES.map((s) => (
            <SliderBtn
              key={s.value}
              value={s.value}
              className='flex-1 h-1 rounded-full bg-muted-foreground/20 cursor-pointer'
              progressBarClass='h-full bg-foreground rounded-full top-0'
            />
          ))}
        </SliderBtnGroup>
      </ProgressSlider>
    </div>
  );
}
