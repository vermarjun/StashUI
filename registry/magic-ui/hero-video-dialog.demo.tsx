import { HeroVideoDialog } from "@/registry/magic-ui/hero-video-dialog";

export default function Demo() {
  return (
    <div className="w-full max-w-2xl px-4">
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        thumbnailSrc="https://picsum.photos/seed/herovideo/1280/720"
        thumbnailAlt="Demo video thumbnail"
      />
    </div>
  );
}
