import { useState } from "react";

interface Props {
  /** Optional real video file path, e.g. "/videos/copper-still.mp4".
   *  If the file is absent it 404s, onError fires, and the cinematic
   *  gradient fallback shows instead — no code change needed to add video. */
  video?: string;
  /** Optional poster / fallback photo path. */
  image?: string;
  /** Tailwind gradient classes for the always-present cinematic fallback. */
  fallbackClassName?: string;
  className?: string;
}

/**
 * Layered cinematic background:
 *   1. Always-rendered CSS gradient (guaranteed premium look, zero assets)
 *   2. Optional <img> poster on top (hidden if it fails to load)
 *   3. Optional <video> on top (hidden if it fails to load)
 *
 * Drop a real `.mp4`/`.webm` into /public/videos and pass its path to upgrade
 * any section to full motion without touching the rest of the site.
 */
export default function MediaBackground({
  video,
  image,
  fallbackClassName = "bg-gradient-to-b from-charcoal-700 via-charcoal-800 to-charcoal-900",
  className = "",
}: Props) {
  const [imgOk, setImgOk] = useState(Boolean(image));
  const [videoOk, setVideoOk] = useState(Boolean(video));

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 1. Cinematic CSS fallback — always present */}
      <div className={`absolute inset-0 ${fallbackClassName}`} />
      <div className="absolute inset-0 bg-radial-warm" />

      {/* 2. Optional poster image */}
      {image && imgOk && (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setImgOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* 3. Optional motion video */}
      {video && videoOk && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={image}
          onError={() => setVideoOk(false)}
        >
          <source src={video} />
        </video>
      )}
    </div>
  );
}
