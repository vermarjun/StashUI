import { ArrowBigDown, ArrowRight, ChevronRight, ChevronsRight, Heart } from 'lucide-react';
import React, { useState } from 'react';

function HoverCard4() {
  return (
    <>
      <div className='w-[90%] relative mt-4  group mx-auto dark:bg-black  bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black '>
        <figure className='w-full h-62 rounded-md  overflow-hidden'>
          <img src={
              'https://images.unsplash.com/photo-1565759732117-a48f0bedbbfd?q=80&w=1000&auto=format&fit=crop'
            } alt='shoes' width={600} height={600} className='h-full w-full scale-110 brightness-90 group-hover:scale-100 group-hover:brightness-100 rounded-lg object-cover transition-all duration-500' />
        </figure>
        <div className='p-4 space-y-1  transition-all duration-300 '>
          <span className='text-sm opacity-70'>9 Dec 2023</span>
          <h1 className='text-lg font-medium decoration-2 underline-offset-4 group-hover:underline'>
            Why good UX matters, and how to get it right on your site
          </h1>
          <a
            href='#'
            className='bg-green-400 w-fit text-base rounded-md text-black font-medium py-2 pl-3 pr-2 flex items-center gap-1 transition-all duration-300 group-hover:pr-3'
          >
            Read Story
            <span className='relative'>
              <ChevronRight className='group-hover:opacity-0 opacity-100 translate-y-0 group-hover:translate-y-2 transition-all duration-300 ' />
              <ChevronsRight className='absolute top-0 group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ' />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

export default HoverCard4;
