// https://cruip-tutorials.vercel.app/cards-hover-effect/
import React from 'react';

// self-contained: the rotating conic border needs a typed --border-angle and a keyframe
const GRADIENT_BORDER_CSS = `@property --border-angle{syntax:'<angle>';inherits:false;initial-value:0deg}@keyframes gradient-border-spin{to{--border-angle:360deg}}`;

function GradientBorder() {
  return (
    <>
      <style>{GRADIENT_BORDER_CSS}</style>
      <div className='w-full max-w-[422px] mx-auto [background:linear-gradient(45deg,#080b11,--theme(--color-slate-800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-slate-600/.48)_70%,--theme(--color-indigo-500)_80%,--theme(--color-indigo-300)_88%,--theme(--color-indigo-500)_95%,--theme(--color-slate-600/.48))_border-box] rounded-2xl border-2 border-transparent animate-[gradient-border-spin_4s_linear_infinite]'>
        <div className='relative text-center z-10 px-0 py-16 rounded-2xl  w-fit h-full mx-auto'>
          <>
            <img
              src={'/chat_zinhdw.webp'}
              alt='Group chat preview'
              width={600}
              height={600}
              className='mx-auto w-[85%]'
            />
            <h1 className='text-xl font-semibold tracking-tight text-white'>
              Create Group Effortlessly
            </h1>
            <p className='text-base pt-2  text-neutral-300 capitalize'>
              Seamless chats, crystal-clear videos, and <br />
              premium audio quality
            </p>
          </>
        </div>
      </div>
    </>
  );
}

export default GradientBorder;
