import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { label: "The Firm", href: "#about" },
  { label: "Practice", href: "#services" },
  { label: "Ventures", href: "#ventures" },
  { label: "Enquiries", href: "#contact" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 40) {
        setHidden(false);
      } else if (y > lastY.current + 4) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[92px] py-[14px] md:px-[184px] md:py-[17px] transition-opacity duration-700 ease-out ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#f1eee5" }}
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
            className="text-[10px] md:text-xs tracking-[0.28em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "#0b131e" }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
