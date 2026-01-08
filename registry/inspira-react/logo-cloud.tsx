"use client"

import { cn } from "@/lib/utils"

interface Logo {
  name: string
  path: string
}

interface LogoCloudProps {
  className?: string
  title?: string
  logos?: Logo[]
}

export function AnimatedLogoCloud({ className, title, logos = [] }: LogoCloudProps) {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        {title && (
          <div className="text-muted-foreground text-center font-medium">{title}</div>
        )}
        <div
          className={cn(
            "logo-cloud-mask group relative mt-6 flex gap-6 overflow-hidden p-2",
            className,
          )}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="animate-logo-cloud flex shrink-0 flex-row justify-around gap-6"
            >
              {logos.map((logo, key) => (
                <img
                  key={key}
                  src={logo.path}
                  alt={logo.name}
                  className="h-10 w-28 px-2 brightness-0 dark:invert"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .logo-cloud-mask {
          mask-image: linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%);
        }
        .animate-logo-cloud {
          animation: logo-cloud 30s linear infinite;
        }
        @keyframes logo-cloud {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 4rem)); }
        }
      `}</style>
    </div>
  )
}

export function IconLogoCloud({ className, title, logos = [] }: LogoCloudProps) {
  return (
    <div className="w-full py-12">
      <div className="flex w-full flex-col items-center justify-center gap-6 px-4 md:px-8">
        {title && (
          <div className="text-muted-foreground font-medium">{title}</div>
        )}
        <div className={cn("grid grid-cols-3 md:grid-cols-8 lg:grid-cols-8", className)}>
          {logos.map((logo, key) => (
            <img
              key={key}
              src={logo.path}
              alt={logo.name}
              className="h-7 w-12 px-2 brightness-0 dark:invert"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function StaticLogoCloud({ className, title, logos = [] }: LogoCloudProps) {
  return (
    <div className="w-full py-12">
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4 md:px-8">
        {title && (
          <div className="text-muted-foreground font-medium uppercase">{title}</div>
        )}
        <div className={cn("grid grid-cols-3 gap-x-4 md:grid-cols-5 lg:grid-cols-8", className)}>
          {logos.map((logo, key) => (
            <img
              key={key}
              src={logo.path}
              alt={logo.name}
              className="h-10 w-28 px-2 brightness-0 dark:invert"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
