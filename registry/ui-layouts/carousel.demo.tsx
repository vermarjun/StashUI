'use client';
import {
  Carousel,
  Slider,
  SliderContainer,
  SliderDotButton,
  SliderNextButton,
  SliderPrevButton,
  SliderSnapDisplay,
} from '@/registry/ui-layouts/carousel';
import type { EmblaOptionsType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const SLIDES = [
  { id: 1, src: 'https://picsum.photos/seed/uilc1/900/500', alt: 'Gallery image 1' },
  { id: 2, src: 'https://picsum.photos/seed/uilc2/900/500', alt: 'Gallery image 2' },
  { id: 3, src: 'https://picsum.photos/seed/uilc3/900/500', alt: 'Gallery image 3' },
  { id: 4, src: 'https://picsum.photos/seed/uilc4/900/500', alt: 'Gallery image 4' },
];

export default function Demo() {
  const OPTIONS: EmblaOptionsType = { loop: true };
  return (
    <div className='w-full max-w-3xl mx-auto px-4 py-6'>
      <Carousel options={OPTIONS}>
        <SliderContainer className='h-[320px] sm:h-[380px]'>
          {SLIDES.map((s) => (
            <Slider key={s.id} className='w-full h-full'>
              <img
                src={s.src}
                alt={s.alt}
                className='w-full h-full object-cover rounded-xl'
              />
            </Slider>
          ))}
        </SliderContainer>

        <SliderPrevButton className='absolute top-1/2 -translate-y-1/2 left-3 p-2 border-2 rounded-full bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20'>
          <ChevronLeft className='w-7 h-7' />
        </SliderPrevButton>
        <SliderNextButton className='absolute top-1/2 -translate-y-1/2 right-3 p-2 border-2 rounded-full bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20'>
          <ChevronRight className='w-7 h-7' />
        </SliderNextButton>

        <div className='flex items-center justify-between px-1 pt-2'>
          <SliderSnapDisplay className='text-sm font-mono text-muted-foreground' />
          <SliderDotButton />
        </div>
      </Carousel>
    </div>
  );
}
