import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Click-to-load portrait (9:16) video.
 *
 * The <video> element only mounts after the user clicks play, so the video file
 * is never fetched on initial page render. The container enforces a portrait
 * aspect ratio so vertical/short-form content fills the frame instead of getting
 * letterboxed inside a widescreen box.
 *
 * Capped at ~280px max width and centered within its parent — the section height
 * is then driven by the video's natural portrait shape, not by artificial padding.
 */
export function CompactVideo({ src, poster }: { src: string; poster?: string }) {
  const [active, setActive] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl border border-line bg-bg-0 shadow-xl">
        {active ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            controls
            playsInline
            disablePictureInPicture
            controlsList="nofullscreen nodownload noremoteplayback"
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label="Play video"
            className="group absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-2 to-bg-3 transition hover:brightness-110"
          >
            {poster && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${poster})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-0/80 via-bg-0/30 to-bg-0/10" />
            <div className="relative flex size-14 items-center justify-center rounded-full bg-gold-500/95 text-bg-0 shadow-2xl ring-1 ring-gold-300/40 transition group-hover:scale-110 group-hover:bg-gold-400">
              <Play className="size-6 translate-x-0.5 fill-current" strokeWidth={2.5} />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
