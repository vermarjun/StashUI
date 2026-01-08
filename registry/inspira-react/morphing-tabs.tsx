"use client";

import { cn } from "@/lib/utils";

interface MorphingTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  margin?: number;
  blurStdDeviation?: number;
  className?: string;
}

export function MorphingTabs({
  tabs,
  activeTab,
  onTabChange,
  margin = 20,
  blurStdDeviation = 6,
  className,
}: MorphingTabsProps) {
  if (!tabs.length) return null;

  return (
    <div
      style={{ filter: "url(#exclusionTabsGoo)" }}
      className={cn("relative", className)}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          className="bg-primary text-background px-4 py-2 transition-all duration-500"
          style={{
            margin: `0 ${activeTab === tab ? margin : 0}px`,
          }}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}

      <div className="absolute w-full">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter
              id="exclusionTabsGoo"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={blurStdDeviation}
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values={`
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 36 -12`}
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
