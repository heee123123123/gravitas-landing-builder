import { useEffect, useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1200&q=80",
];

// width x height in px, except final which is fullscreen
const STEPS: Array<{ w: number; h: number; full?: boolean }> = [
  { w: 150, h: 200 },
  { w: 300, h: 380 },
  { w: 500, h: 600 },
  { w: 700, h: 780 },
  { w: 0, h: 0, full: true },
];

type Props = {
  onComplete: () => void;
};

export default function IntroAnimation({ onComplete }: Props) {
  const [imgVisible, setImgVisible] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [imageIdx, setImageIdx] = useState(0);
  const [textHidden, setTextHidden] = useState(false);
  const [overlayHidden, setOverlayHidden] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 0.5s — image fades in
    timers.push(setTimeout(() => setImgVisible(true), 500));

    // 1.0s – 3.5s — cycle through steps 1..4 every ~625ms
    const stepStart = 1000;
    const stepGap = 625;
    for (let i = 1; i < STEPS.length; i++) {
      timers.push(
        setTimeout(() => {
          setStepIdx(i);
          setImageIdx((idx) => (idx + 1) % IMAGES.length);
        }, stepStart + (i - 1) * stepGap),
      );
    }

    // 4.0s — text fades out (final fullscreen step is already triggered above)
    timers.push(setTimeout(() => setTextHidden(true), 4000));

    // 4.5s — overlay fades out, reveal page
    timers.push(
      setTimeout(() => {
        setOverlayHidden(true);
        onComplete();
      }, 4500),
    );

    // 5.0s — remove overlay
    timers.push(setTimeout(() => {}, 5000));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const step = STEPS[stepIdx];
  const isFull = !!step.full;

  const imgStyle: React.CSSProperties = isFull
    ? {
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        opacity: imgVisible ? 1 : 0,
      }
    : {
        position: "relative",
        width: `${step.w}px`,
        height: `${step.h}px`,
        opacity: imgVisible ? 1 : 0,
      };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#f1eee5",
        opacity: overlayHidden ? 0 : 1,
        pointerEvents: overlayHidden ? "none" : "auto",
        transition: "opacity 500ms ease-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "0 32px",
          flexWrap: "wrap",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 300,
          color: "#3a3a3a",
          fontSize: "clamp(28px, 7vw, 120px)",
          lineHeight: 1.05,
          textAlign: "center",
          opacity: textHidden ? 0 : 1,
          transition: "opacity 500ms ease-out",
        }}
      >
        <span>Refining corporate</span>
        <span
          style={{
            position: "relative",
            display: "inline-block",
            width: isFull ? 0 : `${step.w}px`,
            height: isFull ? 0 : `${step.h}px`,
            transition:
              "width 600ms cubic-bezier(0.65, 0, 0.35, 1), height 600ms cubic-bezier(0.65, 0, 0.35, 1)",
            verticalAlign: "middle",
          }}
        >
          {/* Render all images stacked for smooth crossfade */}
          {IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                ...imgStyle,
                top: isFull ? 0 : 0,
                left: isFull ? 0 : 0,
                objectFit: "cover",
                opacity:
                  imgVisible && i === imageIdx
                    ? isFull
                      ? 1
                      : 1
                    : 0,
                transition:
                  "opacity 500ms ease-out, width 600ms cubic-bezier(0.65, 0, 0.35, 1), height 600ms cubic-bezier(0.65, 0, 0.35, 1), top 600ms ease, left 600ms ease",
              }}
            />
          ))}
        </span>
        <span>presence for global markets</span>
      </div>
    </div>
  );
}
