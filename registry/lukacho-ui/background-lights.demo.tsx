import { twMerge } from 'tailwind-merge'
import { Lights } from './background-lights'

// v3 plugin `bg-grid-white/[0.03]` -> inline data-uri grid
const grid = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

export default function BackgroundLightsDemo() {
  return (
    <span className="bg-black w-full h-[600px] block">
      <style>{`
        @keyframes lk-moveUp { 0% { transform: translateY(5%); opacity: 0 } 100% { transform: translateY(0%); opacity: 1 } }
        @keyframes lk-appear { from { opacity: 0 } to { opacity: 1 } }
        .lk-moveUp { animation: lk-moveUp 1.4s ease forwards }
        .lk-appear { animation: lk-appear 1s 1s forwards }
      `}</style>
      <div className={'w-full h-full relative px-4'} style={{ backgroundImage: grid }}>
        <div
          className={
            'w-full h-full flex flex-col sm:items-center items-start justify-center relative z-[1] lk-moveUp'
          }
        >
          <div className="relative w-full">
            <div className="bg-gradient-to-br from-green-950/[0.8] to-blue-950/[0.7] border border-green-900 rounded-lg p-1 aspect-square overflow-hidden absolute left-0 sm:left-1/2 sm:-translate-x-1/2 -top-12">
              <span
                className={twMerge(
                  'text-xl',
                  'text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-yellow-400 '
                )}
              >
                ✨
              </span>
            </div>
          </div>
          <div
            className={
              'text-transparent sm:text-center text-start font-bold sm:text-5xl text-4xl bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-black/[0.6]'
            }
          >
            Ship interfaces people trust.
          </div>
          <div className="mt-2 text-white/[0.7] sm:text-center text-start">
            Used by 4,200 teams to launch faster, from seed to Series C.
          </div>
          <div className="mt-5 w-full flex max-sm:flex-col justify-center sm:gap-10 gap-4 text-white">
            <button className="group h-10 sm:h-8 w-full sm:w-36 bg-gradient-to-br from-green-950 to-blue-950 border border-green-900 rounded-lg flex items-center justify-center gap-1.5">
              <span>Our work</span>
              <span className="group-hover:translate-x-0.5 transition-all">&rarr;</span>
            </button>
            <button className="h-8 flex items-center justify-center underline">
              <span>Contact us</span>
            </button>
          </div>
        </div>
        <div className={'absolute bottom-0 left-0 w-full h-full z-0 lk-appear opacity-0'}>
          <Lights />
        </div>
      </div>
    </span>
  )
}
