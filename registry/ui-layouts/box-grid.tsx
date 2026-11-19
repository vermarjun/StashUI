import preview from '@/assets/preview/Preview';
import React, { useState } from 'react';

interface ProjectsTypes {
  id: string;
  img: string;
  title: string;
  des: string;
}

export default function BoxGrid() {
  return (
    <>
      <div className='grid grid-rows-10  grid-cols-12 grid-flow-col gap-2  pt-10'>
        <div className='row-start-1 col-span-2 row-end-6  dark:bg-neutral-800 bg-neutral-100 grid place-content-center h-full lg:rounded-xl rounded-md'>
          <img src={preview.dragitems} className=' object-cover' alt='' />
        </div>
        <div className='row-start-6 row-end-11  col-span-2 dark:bg-neutral-800 bg-neutral-100 grid place-content-center h-full lg:rounded-xl rounded-md'>
          <img src={preview.galleryNew} className=' object-cover' alt='' />
        </div>
        <div className='row-start-3 row-end-9  col-span-2 dark:bg-neutral-800 bg-neutral-100 grid place-content-center h-full lg:rounded-xl rounded-md'>
          <img src={preview.carousel} className=' object-cover' alt='' />
        </div>
        <div className='row-start-1 col-span-2 row-end-6  dark:bg-neutral-800 bg-neutral-100 grid place-content-center h-full lg:rounded-xl rounded-md'>
          <img src={preview.clippath} className=' object-cover' alt='' />
        </div>
        <div className='row-start-6 row-end-11  col-span-2 dark:bg-neutral-800 bg-neutral-100 grid place-content-center h-full lg:rounded-xl rounded-md'>
          <img src={preview.sparkles} className=' object-cover' alt='' />
        </div>
        <div className='row-start-3 row-end-9  col-span-2 dark:bg-neutral-800 bg-neutral-100 grid place-content-center h-full lg:rounded-xl rounded-md'>
          <img src={preview.carousel} className=' object-cover' alt='' />
        </div>
        <div className='row-start-1 col-span-2 row-end-6 dark:bg-neutral-800 bg-neutral-100 grid place-content-center h-full lg:rounded-xl rounded-md'>
          <img src={preview.faqs} className=' object-cover' alt='' />
        </div>
        <div className='row-start-6 row-end-11  col-span-2 dark:bg-neutral-800 bg-neutral-100 grid place-content-center  h-full lg:rounded-xl rounded-md'>
          <img src={preview.grid} className=' object-cover' alt='' />
        </div>
        <div className='row-start-3 row-end-9  col-span-2 dark:bg-neutral-800 bg-neutral-100 grid place-content-center h-full lg:rounded-xl rounded-md'>
          <img src={preview.image_masking} className=' object-cover' alt='' />
        </div>
      </div>
    </>
  );
}
