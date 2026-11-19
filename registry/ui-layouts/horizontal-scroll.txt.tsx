'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';

const panels = [
  {
    word: 'PASSION',
    bg: 'bg-red-400',
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
  },
  {
    word: 'WORK',
    bg: 'bg-blue-400',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop',
  },
  {
    word: 'MOTIVATION',
    bg: 'bg-orange-400',
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop',
  },
  {
    word: 'INSPIRATION',
    bg: 'bg-yellow-400',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=600&fit=crop',
  },
  {
    word: 'BELIEVE',
    bg: 'bg-green-400',
    src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=600&fit=crop',
  },
];

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = Math.max(1, rect.height - vh);
      // Pin the track by hand (works even when an ancestor scrolls, where
      // position: sticky would not).
      const pinned = clamp(-rect.top, 0, travel);
      const progress = pinned / travel;
      const n = panels.length;
      track.style.transform = `translate3d(${-progress * (n - 1) * 100}vw, ${pinned}px, 0)`;
      // Each heading slides across its own panel for parallax.
      headingRefs.current.forEach((h, i) => {
        if (!h) return;
        const local = clamp(progress * (n - 1) - i, -1, 1);
        h.style.transform = `translateX(${-local * 40}vw)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // also listen on any scrolling ancestor
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('scroll', onScroll, { capture: true } as EventListenerOptions);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ReactLenis root>
      <main>
        <article>
          <header className='relative grid h-[80vh] w-full place-content-center bg-slate-950 text-white'>
            <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
            <h1 className='text-center text-6xl font-bold tracking-tight'>
              I know you love to scroll <br />
              So scroll
            </h1>
          </header>
          <section ref={sectionRef} className='relative h-[500vh] overflow-hidden'>
            <ul ref={trackRef} className='flex will-change-transform'>
              {panels.map((p, i) => (
                <li
                  key={p.word}
                  className={`relative flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-hidden ${p.bg}`}
                >
                  <h2
                    ref={(el) => {
                      headingRefs.current[i] = el;
                    }}
                    className='relative bottom-5 inline-block text-[18vw] font-semibold whitespace-nowrap text-black'
                  >
                    {p.word}
                  </h2>
                  <img
                    src={p.src}
                    className='absolute bottom-0 w-[380px] 2xl:w-[550px]'
                    width={500}
                    height={500}
                    alt={p.word.toLowerCase()}
                  />
                </li>
              ))}
            </ul>
          </section>
          <footer className='grid h-[80vh] place-content-center bg-red-600 font-medium text-white'>
            <p>
              Inspired by{' '}
              <a target='_blank' rel='noreferrer' href='https://twitter.com/mattgperry' className='underline'>
                Matt Perry
              </a>
            </p>
          </footer>
        </article>
      </main>
    </ReactLenis>
  );
}
