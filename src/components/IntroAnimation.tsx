import { useEffect, useState } from "react";

type Props = {
  finalImage: string;
  onComplete: () => void;
};

const FADE_IN_MS = 1600;
const HOLD_MS = 400;

export default function IntroAnimation({ finalImage, onComplete }: Props) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.decoding = "async";
    img.src = finalImage;

    const t1 = setTimeout(() => setShown(true), 60);
    const t2 = setTimeout(onComplete, FADE_IN_MS + HOLD_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [finalImage, onComplete]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#0d1620",
        opacity: shown ? 0 : 1,
        transition: `opacity ${FADE_IN_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        pointerEvents: shown ? "none" : "auto",
      }}
    />
  );
}
