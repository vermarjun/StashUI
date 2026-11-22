'use client'

// gooey-toast: organic blob-morph toasts on top of sonner.
// Mount <GooeyToaster /> once, then call gooeyToast.success(...) / .promise(...) anywhere.
import { GooeyToaster as BaseGooeyToaster } from './goey-toast-toaster'
import { GOOEY_TOAST_CSS } from './goey-toast-css'
import type { GooeyToasterProps } from './goey-toast-types'

/** <GooeyToaster /> with the package stylesheet injected alongside it. */
export function GooeyToaster(props: GooeyToasterProps) {
  return (
    <>
      <style data-gooey-toast-style="">{GOOEY_TOAST_CSS}</style>
      <BaseGooeyToaster {...props} />
    </>
  )
}

export { gooeyToast } from './goey-toast-api'
export { animationPresets } from './goey-toast-presets'
export { preloadGooeySounds } from './goey-toast-sound'
export type { AnimationPreset, AnimationPresetName } from './goey-toast-presets'
export type {
  GooeyToastOptions,
  GooeyPromiseData,
  GooeyToasterProps,
  GooeyToastAction,
  GooeyToastClassNames,
  GooeyToastTimings,
  GooeyToastUpdateOptions,
  DismissFilter,
  GooeySoundOption,
} from './goey-toast-types'
