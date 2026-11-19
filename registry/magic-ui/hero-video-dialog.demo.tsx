import { HeroVideoDialog } from "@/registry/magic-ui/hero-video-dialog";

export default function Demo() {
  return (
    <div className="w-full max-w-3xl px-4">
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?autoplay=1&rel=0"
        thumbnailSrc="https://i.ytimg.com/vi/qh3NGpYRG3I/maxresdefault.jpg"
        thumbnailAlt="Build a clean UI in Next.js with Magic UI"
      />
    </div>
  );
}
