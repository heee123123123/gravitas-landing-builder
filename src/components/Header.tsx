import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { label: "The Firm", href: "#about" },
  { label: "Practice", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Enquiries", href: "#contact" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      if (delta > 0 && y > 80) setHidden(true);
      else if (delta < 0) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex items-center gap-10 px-[92px] py-[14px] md:px-[184px] md:py-[17px]"
      style={{
        backgroundColor: "#f1eee5",
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "opacity 360ms ease-out, transform 360ms ease-out",
      }}
    >
      <a
        href="#top"
        className="font-serif text-2xl tracking-wide uppercase md:text-3xl"
        style={{ color: "#0b131e" }}
      >
        <span style={{ wordSpacing: "-0.3em" }}>D. C.</span><span style={{ marginLeft: "0.05em" }}>NORMAN</span>
      </a>

      <nav className="flex items-center gap-8 md:gap-12">
        {ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[10px] md:text-xs tracking-[1px] transition-opacity hover:opacity-60"
            style={{ color: "#0b131e" }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
