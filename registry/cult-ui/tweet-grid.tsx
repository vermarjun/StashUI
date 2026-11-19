"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tweetGridVariants = cva("max-w-4xl md:max-w-6xl px-2", {
  variants: {
    columns: {
      1: "columns-1",
      2: "sm:columns-2",
      3: "md:columns-3",
      4: "lg:columns-4",
      5: "xl:columns-5",
    },
  },
  defaultVariants: {
    columns: 3,
  },
})

const tweetItemVariants = cva("break-inside-avoid", {
  variants: {
    spacing: {
      sm: "mb-2",
      md: "mb-4",
      lg: "mb-6",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
})

/** Optional inline tweet data, rendered without any network request. */
export interface TweetData {
  id: string
  name: string
  handle: string
  avatar?: string
  text: React.ReactNode
  date?: string
  verified?: boolean
  replies?: string | number
  reposts?: string | number
  likes?: string | number
}

export interface TweetGridProps
  extends VariantProps<typeof tweetGridVariants>,
    VariantProps<typeof tweetItemVariants> {
  /** Tweet IDs, or inline tweet data objects. */
  tweets: (string | TweetData)[]
  className?: string
}

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const Verified = () => (
  <svg viewBox="0 0 24 24" aria-label="Verified" className="size-4 fill-sky-500">
    <path d="M12 2l2.4 2.1 3.2-.3.9 3.1 2.8 1.6-1.2 3 1.2 3-2.8 1.6-.9 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.9-3.1-2.8-1.6 1.2-3-1.2-3 2.8-1.6.9-3.1 3.2.3zm-1.3 13.6l6-6-1.4-1.4-4.6 4.6-2.1-2.1-1.4 1.4z" />
  </svg>
)

// Static tweet card (no react-tweet fetch or CSS); bare IDs get a minimal card
const MockTweet: React.FC<{ tweet: string | TweetData }> = ({ tweet }) => {
  const t: TweetData =
    typeof tweet === "string"
      ? { id: tweet, name: "Tweet", handle: "x", text: `Tweet ${tweet}` }
      : tweet
  return (
    <article className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:border-foreground/20">
      <header className="mb-3 flex items-start gap-3">
        {t.avatar ? (
          <img
            src={t.avatar}
            alt={t.name}
            className="size-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {t.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1 truncate text-sm font-semibold">
            {t.name}
            {t.verified && <Verified />}
          </div>
          <div className="truncate text-sm text-muted-foreground">
            @{t.handle}
          </div>
        </div>
        <span className="text-muted-foreground">
          <XLogo />
        </span>
      </header>
      <div className="text-[15px] leading-snug whitespace-pre-line">
        {t.text}
      </div>
      {t.date && (
        <div className="mt-3 text-xs text-muted-foreground">{t.date}</div>
      )}
      {(t.replies != null || t.reposts != null || t.likes != null) && (
        <footer className="mt-3 flex items-center gap-5 border-t border-border pt-3 text-xs text-muted-foreground">
          {t.replies != null && <span>💬 {t.replies}</span>}
          {t.reposts != null && <span>🔁 {t.reposts}</span>}
          {t.likes != null && <span>❤️ {t.likes}</span>}
        </footer>
      )}
    </article>
  )
}

export const TweetGrid: React.FC<TweetGridProps> = ({
  tweets,
  columns,
  spacing,
  className,
}) => {
  return (
    <div className={cn(tweetGridVariants({ columns }), className)}>
      {tweets.map((tweet, i) => (
        <div
          key={`${typeof tweet === "string" ? tweet : tweet.id}-${i}`}
          className={cn(tweetItemVariants({ spacing }))}
        >
          <MockTweet tweet={tweet} />
        </div>
      ))}
    </div>
  )
}
