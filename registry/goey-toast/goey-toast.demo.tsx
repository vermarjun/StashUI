'use client'

import { Button } from '@/components/ui/button'
import { GooeyToaster, gooeyToast } from './goey-toast'

const deploy = () =>
  new Promise<{ url: string }>((resolve) => setTimeout(() => resolve({ url: 'acme-web.app' }), 1800))

export default function GoeyToastDemo() {
  return (
    <div className="flex h-[520px] w-full flex-col items-center justify-center gap-6">
      <div className="text-center">
        <div className="text-lg font-semibold text-foreground">Gooey toasts</div>
        <div className="text-sm text-muted-foreground">A pill that melts into a card, then back.</div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="outline"
          onClick={() =>
            gooeyToast.success('Deployment complete', {
              description: 'Production is live at acme-web.app on main @ 3f8a2c1.',
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            gooeyToast.error('Payment failed', {
              description: 'Your Visa ending in 4242 was declined. Try another card.',
              action: { label: 'Update card', onClick: () => {}, successLabel: 'Opening…' },
            })
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            gooeyToast.promise(deploy(), {
              loading: 'Deploying…',
              success: (d) => `Live at ${d.url}`,
              error: 'Deploy failed',
              description: { success: 'Built in 42s · 18 routes · 0 warnings.' },
            })
          }
        >
          Promise
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            gooeyToast.info('Share link ready', {
              description: 'Anyone with the link can view “Q3 Roadmap”.',
              action: { label: 'Copy link', onClick: () => {}, successLabel: 'Copied!' },
            })
          }
        >
          Action
        </Button>
      </div>
      <GooeyToaster position="bottom-center" theme="dark" sound={false} />
    </div>
  )
}
