"use client";

import { cn } from "@/lib/utils";

interface HaloSearchProps {
  className?: string;
}

export function HaloSearch({ className }: HaloSearchProps) {
  return (
    <div id="halo-search" className={cn("flex items-center justify-center", className)}>
      <style>{`
        #halo-search {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #halo-search #search-wrapper {
          position: relative;
        }
        #halo-search .search-field {
          background-color: #010201;
          border: none;
          width: 301px;
          height: 56px;
          border-radius: 10px;
          color: white;
          padding-right: 60px;
          padding-left: 16px;
          font-size: 18px;
        }
        #halo-search .search-field::placeholder {
          color: #c0b9c0;
        }
        #halo-search .search-field:focus {
          outline: none;
        }
        #halo-search .inner-glow,
        #halo-search .main-border,
        #halo-search .outer-ring,
        #halo-search .aurora-glow {
          max-height: 70px;
          max-width: 314px;
          height: 100%;
          width: 100%;
          position: absolute;
          overflow: hidden;
          z-index: -1;
          border-radius: 12px;
          filter: blur(3px);
        }
        #halo-search .inner-glow {
          max-height: 63px;
          max-width: 307px;
          border-radius: 10px;
          filter: blur(2px);
        }
        #halo-search .inner-glow::before {
          content: "";
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(83deg);
          position: absolute;
          width: 600px;
          height: 600px;
          background-repeat: no-repeat;
          background-position: 0 0;
          filter: brightness(1.4);
          background-image: conic-gradient(
            rgba(0,0,0,0) 0%,
            #a099d8,
            rgba(0,0,0,0) 8%,
            rgba(0,0,0,0) 50%,
            #dfa2da,
            rgba(0,0,0,0) 58%
          );
          transition: all 2s;
        }
        #halo-search .main-border {
          max-height: 59px;
          max-width: 303px;
          border-radius: 11px;
          filter: blur(0.5px);
        }
        #halo-search .main-border::before {
          content: "";
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(70deg);
          position: absolute;
          width: 600px;
          height: 600px;
          filter: brightness(1.3);
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(
            #1c191c,
            #402fb5 5%,
            #1c191c 14%,
            #1c191c 50%,
            #cf30aa 60%,
            #1c191c 64%
          );
          transition: all 2s;
        }
        #halo-search .outer-ring {
          max-height: 65px;
          max-width: 312px;
        }
        #halo-search .outer-ring::before {
          content: "";
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(82deg);
          position: absolute;
          width: 600px;
          height: 600px;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(
            rgba(0,0,0,0),
            #18116a,
            rgba(0,0,0,0) 10%,
            rgba(0,0,0,0) 50%,
            #6e1b60,
            rgba(0,0,0,0) 60%
          );
          transition: all 2s;
        }
        #halo-search .aurora-glow {
          overflow: hidden;
          filter: blur(30px);
          opacity: 0.4;
          max-height: 130px;
          max-width: 354px;
        }
        #halo-search .aurora-glow::before {
          content: "";
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(60deg);
          position: absolute;
          width: 999px;
          height: 999px;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(#000, #402fb5 5%, #000 38%, #000 50%, #cf30aa 60%, #000 87%);
          transition: all 2s;
        }
        #halo-search #text-mask {
          pointer-events: none;
          width: 100px;
          height: 20px;
          position: absolute;
          background: linear-gradient(90deg, transparent, black);
          top: 18px;
          left: 32px;
        }
        #halo-search .search-btn-border {
          height: 42px;
          width: 42px;
          position: absolute;
          overflow: hidden;
          top: 7px;
          right: 7px;
          border-radius: 12px;
        }
        #halo-search .search-btn-border::before {
          content: "";
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(90deg);
          position: absolute;
          width: 600px;
          height: 600px;
          background-repeat: no-repeat;
          background-position: 0 0;
          filter: brightness(1.35);
          background-image: conic-gradient(
            rgba(0,0,0,0),
            #3d3a4f,
            rgba(0,0,0,0) 50%,
            rgba(0,0,0,0) 50%,
            #3d3a4f,
            rgba(0,0,0,0) 100%
          );
          animation: halo-rotate 4s linear infinite;
        }
        #halo-search:hover > .outer-ring::before {
          transform: translate(-50%, -50%) rotate(-98deg);
        }
        #halo-search:hover > .aurora-glow::before {
          transform: translate(-50%, -50%) rotate(-120deg);
        }
        #halo-search:hover > .inner-glow::before {
          transform: translate(-50%, -50%) rotate(-97deg);
        }
        #halo-search:hover > .main-border::before {
          transform: translate(-50%, -50%) rotate(-110deg);
        }
        #halo-search:focus-within > .outer-ring::before {
          transform: translate(-50%, -50%) rotate(442deg);
          transition: all 4s;
        }
        #halo-search:focus-within > .aurora-glow::before {
          transform: translate(-50%, -50%) rotate(420deg);
          transition: all 4s;
        }
        #halo-search:focus-within > .inner-glow::before {
          transform: translate(-50%, -50%) rotate(443deg);
          transition: all 4s;
        }
        #halo-search:focus-within > .main-border::before {
          transform: translate(-50%, -50%) rotate(430deg);
          transition: all 4s;
        }
        #halo-search:focus-within #search-wrapper #text-mask {
          display: none;
        }
        @keyframes halo-rotate {
          100% {
            transform: translate(-50%, -50%) rotate(450deg);
          }
        }
      `}</style>

      <div className="aurora-glow" />
      <div className="outer-ring" />
      <div className="outer-ring" />
      <div className="outer-ring" />
      <div className="inner-glow" />
      <div className="main-border" />

      <div id="search-wrapper">
        <input
          placeholder="Search..."
          type="text"
          name="text"
          className="search-field"
        />
        <div id="text-mask" />
        <div className="search-btn-border" />
        <span
          className="absolute top-2 right-2 isolate z-[2] flex size-full max-h-10 max-w-10 items-center justify-center overflow-hidden rounded-lg border border-solid border-transparent"
          style={{ background: "linear-gradient(180deg, #161329, black, #1d1b4b)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
      </div>
    </div>
  );
}
