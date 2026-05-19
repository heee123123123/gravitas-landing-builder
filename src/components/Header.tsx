import { useEffect, useState } from "react";

const ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <a
          href="#top"
          className="font-serif text-xl tracking-wide text-foreground md:text-2xl"
        >
          D.C. Norman
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="relative z-[60] h-8 w-10"
        >
          <span
            className="absolute left-0 block h-px w-full bg-primary transition-all duration-500 ease-out"
            style={{
              top: open ? "50%" : "25%",
              transform: open ? "translateY(-50%) rotate(45deg)" : "none",
            }}
          />
          <span
            className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-primary transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="absolute left-0 block h-px w-full bg-primary transition-all duration-500 ease-out"
            style={{
              top: open ? "50%" : "75%",
              transform: open ? "translateY(-50%) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </header>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-700 ease-out ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ transitionProperty: "opacity, transform" }}
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
