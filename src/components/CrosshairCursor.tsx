import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const el = ref.current;
    if (!el) return;
    el.style.display = "block";
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ display: "none" }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      {/* crosshair centered at cursor; full-viewport spans */}
      <div
        className="fixed left-0 top-0 h-px w-screen -translate-y-1/2"
        style={{
          backgroundColor: "var(--color-primary)",
          opacity: 0.35,
          transform: "translate(0, -50%)",
          top: "var(--cy, 0)",
        }}
      />
    </div>
  );
}

// Simpler approach: render two lines positioned by mouse coords via state
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
        style={{
          top: pos.y,
          backgroundColor: "var(--color-primary)",
          opacity: 0.45,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 z-[100] h-screen w-px"
        style={{
          left: pos.x,
          backgroundColor: "var(--color-primary)",
          opacity: 0.45,
        }}
      />
    </>
  );
}
