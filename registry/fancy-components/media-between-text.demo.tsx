"use client"

import MediaBetweenText from "./media-between-text"

export default function MediaBetweenTextDemo() {
  return (
    <div className="flex h-[480px] w-full flex-col items-center justify-center gap-10 bg-background">
      <MediaBetweenText
        firstText="that's a nice ("
        secondText=") view!"
        mediaUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        mediaType="image"
        triggerType="hover"
        alt="Mountain range at sunrise"
        mediaContainerClassName="w-full h-[100px] overflow-hidden mx-2 mt-4"
        className="flex w-full cursor-pointer flex-row items-center justify-center text-6xl font-light lowercase text-[#ff5941]"
        animationVariants={{
          initial: { width: 0 },
          animate: {
            width: "100px",
            transition: { duration: 0.4, type: "spring", bounce: 0 },
          },
        }}
      />
      <p className="text-sm text-muted-foreground">hover the sentence</p>
    </div>
  )
}
