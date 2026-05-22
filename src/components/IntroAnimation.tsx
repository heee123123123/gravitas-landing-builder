import { useEffect, useState } from "react";

type Props = {
  finalImage: string;
  onComplete: () => void;
};

const CYCLE_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1400&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1400&q=80",
  "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1400&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80",
];

// Each step: image dimensions between the two text lines.
const STEPS = [
  { w: 0, h: 0 },        // 0: no image
  { w: 220, h: 150 },    // 1
  { w: 340, h: 240 },    // 2
  { w: 460, h: 340 },    // 3
  { w: 580, h: 430 },    // 4
  { w: 700, h: 520 },    // 5
  { w: 0, h: 0, full: true }, // 6: hero fills viewport, becomes the page hero
] as const;

export default function IntroAnimation({ finalImage, onComplete }: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const [textHidden, setTextHidden] = useState(false);
  const [overlayHidden, setOverlayHidden] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Preload final hero
    const pre = new Image();
    pre.src = finalImage;

    // ~2s total. Cycle 5 images quickly, then hero fills viewport,
    // page reveals beneath while cream overlay fades — seamless because
    // the page's hero IS this same image.
    timers.push(setTimeout(() => setStepIdx(1), 150));
    timers.push(setTimeout(() => setStepIdx(2), 400));
    timers.push(setTimeout(() => setStepIdx(3), 650));
    timers.push(setTimeout(() => setStepIdx(4), 900));
    timers.push(setTimeout(() => setStepIdx(5), 1150));
    timers.push(setTimeout(() => setStepIdx(6), 1400));
    timers.push(setTimeout(() => setTextHidden(true), 1500));
    // Hero is now fullscreen — trigger page reveal. Page hero image matches,
    // so dropping the cream overlay reveals the live page seamlessly.
    timers.push(
      setTimeout(() => {
        setOverlayHidden(true);
        onComplete();
      }, 1850),
    );

    return () => timers.forEach(clearTimeout);
  }, [finalImage, onComplete]);

  const step = STEPS[stepIdx];
  const isFull = "full" in step && step.full;
  const showCycleImg = stepIdx > 0 && !isFull;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: isFull ? "transparent" : "#f1eee5",
        opacity: overlayHidden ? 0 : 1,
        pointerEvents: overlayHidden ? "none" : "auto",
        transition: "opacity 500ms ease-out, background 300ms ease-out",
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
          transition: "opacity 350ms ease-out",
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
          opacity: textHidden ? 0 : 1,
          transition: "opacity 350ms ease-out",
        }}
      >
        <span>Refining corporate</span>

        <div
          style={{
            width: isFull ? 0 : `${step.w}px`,
            height: isFull ? 0 : `${step.h}px`,
            transition:
              "width 250ms cubic-bezier(0.65, 0, 0.35, 1), height 250ms cubic-bezier(0.65, 0, 0.35, 1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {CYCLE_IMAGES.map((src, i) => (
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
                opacity: showCycleImg && i === stepIdx - 1 ? 1 : 0,
                transition: "opacity 200ms ease-out",
              }}
            />
          ))}
        </div>

        <span>presence for global markets</span>
      </div>
    </div>
  );
}
