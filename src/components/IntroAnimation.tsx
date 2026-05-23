import { useEffect, useMemo, useState } from "react";

type Props = {
  finalImage: string;
  onComplete: () => void;
};

const CYCLE_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1800&q=80",
];

const STEPS = [
  { w: 0, h: 0 },
  { w: 190, h: 128 },
  { w: 320, h: 214 },
  { w: 470, h: 314 },
  { w: 650, h: 434 },
  { w: 860, h: 574 },
  { w: 1080, h: 720 },
  { w: 0, h: 0, full: true },
] as const;

const IMAGE_DELAYS = [1000, 1380, 1760, 2140, 2520, 2900, 3280];
const TEXT_FADE_DELAY = 1180;
const OVERLAY_EXIT_DELAY = 3600;
const COMPLETE_DELAY = 4100;

export default function IntroAnimation({ finalImage, onComplete }: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const [textHidden, setTextHidden] = useState(false);
  const [overlayExiting, setOverlayExiting] = useState(false);
  const allImages = useMemo(() => [...CYCLE_IMAGES, finalImage], [finalImage]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    const startAnimation = () => {
      if (cancelled) return;
      IMAGE_DELAYS.forEach((delay, index) => {
        timers.push(setTimeout(() => setStepIdx(index + 1), delay));
      });
      timers.push(setTimeout(() => setTextHidden(true), TEXT_FADE_DELAY));
      timers.push(setTimeout(() => setOverlayExiting(true), OVERLAY_EXIT_DELAY));
      timers.push(setTimeout(onComplete, COMPLETE_DELAY));
    };

    Promise.all(allImages.map(preloadImage)).then(startAnimation);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [allImages, onComplete]);

  const step = STEPS[stepIdx];
  const isFull = "full" in step && step.full;
  const activeImageIndex = Math.max(0, stepIdx - 1);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#f1eee5",
        opacity: overlayExiting ? 0 : 1,
        pointerEvents: overlayExiting ? "none" : "auto",
        transition: "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Fullscreen final hero image — sits behind text, fades in at final step
          matching the page's hero so the handoff is invisible. */}
      <img
        src={finalImage}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          opacity: isFull ? 1 : 0,
          transform: isFull ? "scale(1)" : "scale(1.08)",
          transition:
            "opacity 460ms cubic-bezier(0.16, 1, 0.3, 1), transform 720ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Vertical stack: text / image / text */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "0 32px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 300,
          color: "#3a3a3a",
          fontSize: "clamp(28px, 6.5vw, 110px)",
          lineHeight: 1.05,
          textAlign: "center",
        }}
      >
        <span style={{ opacity: textHidden ? 0 : 1, transition: "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1)" }}>
          Refining corporate
        </span>

        <div
          style={{
            width: isFull ? "100vw" : `${step.w}px`,
            height: isFull ? "100vh" : `${step.h}px`,
            transition:
              "width 520ms cubic-bezier(0.16, 1, 0.3, 1), height 520ms cubic-bezier(0.16, 1, 0.3, 1), opacity 460ms ease-out",
            position: isFull ? "fixed" : "relative",
            inset: isFull ? 0 : "auto",
            overflow: "hidden",
            opacity: 1,
            background: "#f1eee5",
          }}
        >
          {allImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: stepIdx > 0 && i === activeImageIndex ? 1 : 0,
                transform: stepIdx > 0 && i === activeImageIndex ? "scale(1.02)" : "scale(1.12)",
                transition:
                  "opacity 520ms cubic-bezier(0.16, 1, 0.3, 1), transform 780ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ))}
        </div>

        <span style={{ opacity: textHidden ? 0 : 1, transition: "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1)" }}>
          presence for global markets
        </span>
      </div>
    </div>
  );
}
