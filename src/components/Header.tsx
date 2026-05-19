import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { label: "The Firm", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[92px] py-[14px] md:px-[184px] md:py-[17px] transition-opacity duration-700 ease-out ${
          hidden && !open ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ backgroundColor: "#f1eee5" }}
      >
        <a
          href="#top"
          className="font-serif text-2xl tracking-wide uppercase md:text-3xl"
          style={{ color: "#0b131e" }}
        >
          <span style={{ wordSpacing: "-0.4em" }}>D. C.</span><span style={{ marginLeft: "0.05em" }}>NORMAN</span>
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="relative z-[60] h-10 w-7"
        >
          <span
            className="absolute left-0 block h-px w-full transition-all duration-500 ease-out"
            style={{
              top: open ? "50%" : "25%",
              transform: open ? "translateY(-50%) rotate(45deg)" : "none",
              backgroundColor: open ? "var(--color-primary)" : "#0b131e",
            }}
          />
          <span
            className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1, backgroundColor: "#0b131e" }}
          />
          <span
            className="absolute left-0 block h-px w-full transition-all duration-500 ease-out"
            style={{
              top: open ? "50%" : "75%",
              transform: open ? "translateY(-50%) rotate(-45deg)" : "none",
              backgroundColor: open ? "var(--color-primary)" : "#0b131e",
            }}
          />
        </button>
      </header>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-700 ease-out ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          className={`flex h-full flex-col items-center justify-center gap-10 transition-transform duration-700 ease-out ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-serif text-4xl text-primary transition-opacity hover:opacity-70 md:text-6xl"
              style={{
                transitionDelay: open ? `${120 + i * 80}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transitionProperty: "opacity, transform",
                transitionDuration: "700ms",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
