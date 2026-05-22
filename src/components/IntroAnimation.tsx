import { useEffect, useState } from "react";

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

export default function IntroAnimation({ finalImage, onComplete }: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const [textHidden, setTextHidden] = useState(false);
  const [overlayExiting, setOverlayExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const allImages = [...CYCLE_IMAGES, finalImage];

    allImages.forEach((src) => {
      const pre = new Image();
      pre.src = src;
    });

    [1000, 1280, 1560, 1840, 2120, 2400, 2680].forEach((delay, index) => {
      timers.push(setTimeout(() => setStepIdx(index + 1), delay));
    });
    timers.push(setTimeout(() => setTextHidden(true), 1180));
    timers.push(setTimeout(() => setOverlayExiting(true), 3220));
    timers.push(setTimeout(onComplete, 3920));

    return () => timers.forEach(clearTimeout);
  }, [finalImage, onComplete]);

  const step = STEPS[stepIdx];
  const isFull = "full" in step && step.full;
  const allImages = [...CYCLE_IMAGES, finalImage];
  const activeImageIndex = Math.max(0, stepIdx - 1);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: isFull ? "transparent" : "#f1eee5",
        opacity: overlayExiting ? 0 : 1,
        pointerEvents: overlayExiting ? "none" : "auto",
        transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), background 520ms ease-out",
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
          transform: isFull ? "scale(1)" : "scale(0.18)",
          transition:
            "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
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
            width: isFull ? "100vw" : `${step.w}px`,
            height: isFull ? "100vh" : `${step.h}px`,
            transition:
              "width 520ms cubic-bezier(0.22, 1, 0.36, 1), height 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 380ms ease-out",
            position: isFull ? "fixed" : "relative",
            inset: isFull ? 0 : "auto",
            overflow: "hidden",
            opacity: isFull ? 0 : 1,
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
                transform: stepIdx > 0 && i === activeImageIndex ? "scale(1)" : "scale(1.035)",
                transition:
                  "opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          ))}
        </div>

        <span>presence for global markets</span>
      </div>
    </div>
  );
}
