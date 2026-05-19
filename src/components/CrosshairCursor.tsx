import { useEffect, useState } from "react";

export default function CrosshairCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 z-[100] h-px w-screen"
        style={{ top: pos.y, backgroundColor: "var(--color-primary)", opacity: 0.4 }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 z-[100] h-screen w-px"
        style={{ left: pos.x, backgroundColor: "var(--color-primary)", opacity: 0.4 }}
      />
    </>
  );
}
