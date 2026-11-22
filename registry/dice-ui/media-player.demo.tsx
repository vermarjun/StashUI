import {
  MediaPlayer,
  MediaPlayerControls,
  MediaPlayerControlsOverlay,
  MediaPlayerFullscreen,
  MediaPlayerPiP,
  MediaPlayerPlay,
  MediaPlayerPlaybackSpeed,
  MediaPlayerSeek,
  MediaPlayerSeekBackward,
  MediaPlayerSeekForward,
  MediaPlayerTime,
  MediaPlayerVideo,
  MediaPlayerVolume,
} from "./media-player";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function MediaPlayerDemo() {
  return (
    // The player's buttons use Radix tooltips, which throw without a provider.
    <TooltipProvider>
      <div className="aspect-video w-full max-w-3xl">
        <MediaPlayer>
          <MediaPlayerVideo muted playsInline preload="auto">
            <source
              src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </MediaPlayerVideo>
          <MediaPlayerControls className="flex-col items-start gap-2.5">
            <MediaPlayerControlsOverlay />
            <MediaPlayerSeek />
            <div className="flex w-full items-center gap-2">
              <div className="flex flex-1 items-center gap-2">
                <MediaPlayerPlay />
                <MediaPlayerSeekBackward />
                <MediaPlayerSeekForward />
                <MediaPlayerVolume expandable />
                <MediaPlayerTime />
              </div>
              <div className="flex items-center gap-2">
                <MediaPlayerPlaybackSpeed />
                <MediaPlayerPiP />
                <MediaPlayerFullscreen />
              </div>
            </div>
          </MediaPlayerControls>
        </MediaPlayer>
      </div>
    </TooltipProvider>
  );
}
