import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

// self-contained keyframes (no tailwind config / global CSS needed)
const STAR_BORDER_KEYFRAMES = `@keyframes star-movement-bottom{0%{transform:translate(0%,0%);opacity:1}100%{transform:translate(-100%,0%);opacity:0}}@keyframes star-movement-top{0%{transform:translate(0%,0%);opacity:1}100%{transform:translate(100%,0%);opacity:0}}`;

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = (as || 'button') as React.ElementType<React.HTMLAttributes<HTMLElement>>;

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      {...(rest as Record<string, unknown>)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as { style?: React.CSSProperties }).style
      }}
    >
      <style>{STAR_BORDER_KEYFRAMES}</style>
      <div
        className="absolute w-[300%] h-[50%] opacity-100 bottom-[-11px] right-[-250%] rounded-full animate-[star-movement-bottom_linear_infinite_alternate] z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 15%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-100 top-[-10px] left-[-250%] rounded-full animate-[star-movement-top_linear_infinite_alternate] z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 15%)`,
          animationDuration: speed
        }}
      ></div>
      <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
//         'star-movement-top': 'star-movement-top linear infinite alternate',
//       },
//       keyframes: {
//         'star-movement-bottom': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
//         },
//         'star-movement-top': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
//         },
//       },
//     },
//   }
// }
