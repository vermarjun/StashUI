// Icons for gooey-toast (the upstream `icons` module was not part of the fetched source; these are lucide-style SVGs drawn in currentColor).
import type { FC } from 'react'

type IconProps = { size?: number; className?: string }

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
  'aria-hidden': true,
})

export const DefaultIcon: FC<IconProps> = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

export const SuccessIcon: FC<IconProps> = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const ErrorIcon: FC<IconProps> = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
)

export const WarningIcon: FC<IconProps> = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
)

export const InfoIcon: FC<IconProps> = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
)

export const SpinnerIcon: FC<IconProps> = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)
