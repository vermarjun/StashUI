import { BlurVignette, BlurVignetteArticle } from '@/registry/ui-layouts/blur-vignette';
import React from 'react';

const cards = [
  {
    src: 'https://img.freepik.com/free-photo/cartoon-superhero-illustration_23-2151732547.jpg',
    title: 'Night Watch',
    body: 'A comic-panel hero over a city skyline. The caption sits on a frosted strip that melts into the art instead of covering it.',
  },
  {
    src: 'https://img.freepik.com/free-photo/halloween-scene-illustration-anime-style_23-2151794328.jpg',
    title: 'Pumpkin Rooftop',
    body: 'Moonlight, a rooftop and one very patient pumpkin. Hover to slide the blurred caption up over the scene.',
  },
];

function Blurvignettecard() {
  return (
    <div className='mx-auto w-fit gap-4 sm:flex justify-center md:p-8 sm:p-4'>
      {cards.map((c) => (
        <BlurVignette
          key={c.title}
          classname='group w-80 shrink-0'
          radius='15px'
          inset='100px'
          transitionLength='200px'
          blur='15px'
        >
          <img
            src={c.src}
            alt={c.title}
            width={600}
            height={600}
            className='relative mx-auto h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
          />
          <BlurVignetteArticle classname='bottom-1 left-2 h-[38%] w-[96%] translate-y-[55%] rounded-xl border border-neutral-900/20 text-white transition-transform duration-500 ease-out group-hover:translate-y-0'>
            <article className='px-3 py-5'>
              <h1 className='text-2xl font-semibold'>{c.title}</h1>
              <p className='mt-1 text-xs text-white/85 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100'>
                {c.body}
              </p>
            </article>
          </BlurVignetteArticle>
        </BlurVignette>
      ))}
    </div>
  );
}

export default Blurvignettecard;
