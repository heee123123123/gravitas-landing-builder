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

// Per-image sizes — early ones smaller & portrait/window-like, later ones wide landscape.
const IMAGE_SIZES: { w: number; h: number }[] = [
  { w: 240, h: 340 }, // portrait — window
  { w: 300, h: 420 }, // taller portrait
  { w: 440, h: 300 }, // landscape gallery
  { w: 360, h: 500 }, // tall portrait window
  { w: 720, h: 440 }, // wide landscape
  { w: 920, h: 560 }, // larger landscape
  { w: 1100, h: 660 }, // hero pre-expand (landscape)
];

const TEXT_TOP = "Refining corporate";
const TEXT_BOT = "presence for global markets";
const CHAR_MS = 24;
const TEXT_TOP_DONE = TEXT_TOP.length * CHAR_MS;
const TEXT_BOT_START = TEXT_TOP_DONE + 50;
const TEXT_BOT_DONE = TEXT_BOT_START + TEXT_BOT.length * CHAR_MS;
const TEXT_HOLD = 500;
const IMAGES_START = TEXT_BOT_DONE + TEXT_HOLD;

// Per-step delays (relative to IMAGES_START). Pulsing rhythm for the gallery, final step reveals the hero at base size.
const STEP_OFFSETS = [0, 280, 560, 880, 1160, 1480, 1840, 2220];
const IMAGE_DELAYS = STEP_OFFSETS.map((d) => IMAGES_START + d);

const FINAL_STEP_INDEX = IMAGE_DELAYS.length - 1; // last entry = hero reveal at base size
const HERO_EXPAND_DELAY = IMAGE_DELAYS[FINAL_STEP_INDEX] + 820;
const HERO_EXPAND_DURATION = 1040;
const COMPLETE_DELAY = HERO_EXPAND_DELAY + HERO_EXPAND_DURATION + 90;

export default function IntroAnimation({ finalImage, onComplete }: Props) {
  const [stepIdx, setStepIdx] = useState(0); // 0 = no images yet; 1..N reveal images
  const [topTyped, setTopTyped] = useState(0);
  const [botTyped, setBotTyped] = useState(0);
  const [textHidden, setTextHidden] = useState(false);
  const [heroExpanded, setHeroExpanded] = useState(false);

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

    const start = () => {
      if (cancelled) return;

      for (let i = 1; i <= TEXT_TOP.length; i++) {
        timers.push(setTimeout(() => setTopTyped(i), i * CHAR_MS));
      }
      for (let i = 1; i <= TEXT_BOT.length; i++) {
        timers.push(setTimeout(() => setBotTyped(i), TEXT_BOT_START + i * CHAR_MS));
      }

      // Fade text out shortly after images begin
      timers.push(setTimeout(() => setTextHidden(true), IMAGES_START + 120));

      IMAGE_DELAYS.forEach((delay, index) => {
        timers.push(setTimeout(() => setStepIdx(index + 1), delay));
      });

      timers.push(setTimeout(() => setHeroExpanded(true), HERO_EXPAND_DELAY));
      timers.push(setTimeout(onComplete, COMPLETE_DELAY));
    };

    Promise.all(allImages.map(preloadImage)).then(start);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [allImages, onComplete]);

  const renderTyped = (text: string, typed: number) => {
    const visible = text.slice(0, typed);
    const hidden = text.slice(typed);
    return (
      <>
        <span>{visible}</span>
        <span style={{ opacity: 0 }} aria-hidden="true">
          {hidden}
        </span>
      </>
    );
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#f1eee5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Stacked images — each fades in over the previous with higher z-index. */}
      {allImages.map((src, i) => {
        const revealed = stepIdx > i;
        const isFinal = i === allImages.length - 1;
        const size = IMAGE_SIZES[i] ?? IMAGE_SIZES[IMAGE_SIZES.length - 1];

        const width = isFinal && heroExpanded ? "100vw" : `${size.w}px`;
        const height = isFinal && heroExpanded ? "100vh" : `${size.h}px`;

        return (
          <img
            key={src}
            src={src}
            alt=""
            loading="eager"
            decoding="async"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width,
              height,
              objectFit: "cover",
              transform: `translate(-50%, -50%) scale(${revealed ? 1 : 1.06})`,
              opacity: revealed ? 1 : 0,
              zIndex: 10 + i,
              willChange: isFinal ? "opacity, transform, width, height" : "opacity, transform",
              transition: isFinal
                ? `opacity 640ms cubic-bezier(0.22, 1, 0.36, 1), transform 760ms cubic-bezier(0.22, 1, 0.36, 1), width ${HERO_EXPAND_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1), height ${HERO_EXPAND_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`
                : "opacity 640ms cubic-bezier(0.22, 1, 0.36, 1), transform 760ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        );
      })}

      {/* Text */}
      <div
        style={{
          position: "relative",
          zIndex: 60,
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
          opacity: textHidden ? 0 : 1,
          transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span>{renderTyped(TEXT_TOP, topTyped)}</span>
        <span>{renderTyped(TEXT_BOT, botTyped)}</span>
      </div>
    </div>
  );
}
