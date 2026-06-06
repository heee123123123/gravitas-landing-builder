import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import heroEstate from "@/assets/hero-estate.jpg";
import Header from "@/components/Header";
import IntroAnimation from "@/components/IntroAnimation";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="relative min-h-screen">
      {!introComplete && <IntroAnimation finalImage={heroImg} onComplete={() => setIntroComplete(true)} />}
      <div style={{ opacity: 1, transition: "opacity 600ms ease-out" }}>
        <Header />

        <main className="relative z-10">
          {/* HERO — cinematic anchor + overlaid typographic plate */}
          <section className="relative w-full pt-32 md:pt-36">
            <div className="mx-auto w-full max-w-[1280px] px-8 md:px-12">
              <div className="relative">
                {/* Wide cinematic anchor */}
                <div
                  className="relative w-full overflow-hidden border"
                  style={{
                    aspectRatio: "21 / 9",
                    borderColor: "color-mix(in oklab, #0b131e 10%, transparent)",
                  }}
                >
                  <img
                    src={heroEstate}
                    alt="D.C. Norman — private estate at dusk"
                    width={1920}
                    height={823}
                    className="block h-full w-full object-cover hero-kenburns"
                  />
                  {/* Subtle inner frame hairline */}
                  <div
                    className="pointer-events-none absolute inset-3 md:inset-4 border"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  />
                </div>

                {/* Typographic plate, overlaid bottom-left */}
                <Reveal>
                  <div
                    className="relative md:absolute md:bottom-0 md:left-8 lg:left-16 z-20 w-full md:max-w-[640px] -mt-10 md:mt-0 p-8 md:p-12 lg:p-16"
                    style={{
                      backgroundColor: "#f1eee5",
                      borderTop: "1px solid color-mix(in oklab, #0b131e 12%, transparent)",
                      borderRight: "1px solid color-mix(in oklab, #0b131e 12%, transparent)",
                    }}
                  >
                    {/* Meta row */}
                    <div className="flex items-center gap-6">
                      <span
                        className="tracked-caps text-[9px] text-foreground"
                        style={{ letterSpacing: "0.5em", opacity: 0.45 }}
                      >
                        Est. MCMXCIV
                      </span>
                      <div
                        className="h-px flex-1"
                        style={{ backgroundColor: "color-mix(in oklab, #0b131e 12%, transparent)" }}
                      />
                    </div>

                    {/* Headline */}
                    <h1
                      className="mt-8 md:mt-10 font-serif font-medium text-foreground leading-[1.05] tracking-tight text-balance text-[2.25rem] md:text-[3rem] lg:text-[3.5rem]"
                    >
                      A private counsel to enduring enterprises.
                    </h1>

                    {/* Intro paragraph */}
                    <p
                      className="mt-8 md:mt-10 max-w-[420px] text-sm md:text-base leading-relaxed text-foreground"
                      style={{ opacity: 0.72 }}
                    >
                      D.C. Norman is an advisory and principal investment house. We work with a small number of founders, families and boards on matters of consequence — over decades, not quarters.
                    </p>

                    {/* Footer of plate */}
                    <div
                      className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6"
                      style={{ borderTop: "1px solid color-mix(in oklab, #0b131e 12%, transparent)" }}
                    >
                      <div className="flex gap-5 tracked-caps text-[9px] text-foreground">
                        <span>London</span>
                        <span style={{ opacity: 0.35 }}>Zürich</span>
                        <span style={{ opacity: 0.35 }}>Singapore</span>
                      </div>
                      <div
                        className="tracked-caps text-[9px] text-foreground"
                        style={{ letterSpacing: "0.3em", opacity: 0.8 }}
                      >
                        By Introduction Only
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Plate caption — vertical, right edge */}
                <div className="hidden md:flex absolute bottom-6 right-4 z-10 items-center gap-3">
                  <div
                    className="h-10 w-px"
                    style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                  />
                  <span
                    className="tracked-caps text-[9px]"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      letterSpacing: "0.35em",
                    }}
                  >
                    Plate I — Mayfair, at dusk
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-32 md:mt-40 w-full max-w-[1280px] px-8 md:px-24">
              <div
                className={`flex justify-center transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
              >
                <svg
                  className="arrow-pulse"
                  width="14"
                  height="22"
                  viewBox="0 0 14 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ color: "#0b131e" }}
                >
                  <line x1="7" y1="0" x2="7" y2="20" />
                  <polyline points="1,14 7,20 13,14" />
                </svg>
              </div>
            </div>
          </section>

          <div className="mx-auto w-full max-w-[1280px] px-8 md:px-24">
            <div className="hairline" />
          </div>

          {/* ABOUT — asymmetric: caption col 1-2, copy col 5-11 */}
          <section id="about" className="mx-auto w-full max-w-[1280px] px-8 py-28 md:px-24 md:py-40">
            <div className="grid grid-cols-12 gap-8">
              <Reveal className="col-span-12 md:col-span-2">
                <p className="tracked-caps text-[10px] text-muted-foreground">I — The Firm</p>
              </Reveal>
              <Reveal className="col-span-12 md:col-span-7 md:col-start-5" delay={120}>
                <p className="font-serif text-2xl leading-[1.45] text-foreground md:text-[2.125rem] md:leading-[1.35]">
                  Most advisory relationships are transactional by design. Ours are not. D.C. Norman enters few engagements precisely because it commits fully to each one. We measure our involvement not in hours or deliverables, but in the trajectory of the organisations we work with. That alignment is not incidental — it is the foundation of how we operate.
                </p>
              </Reveal>
            </div>
          </section>

          {/* DARK PHILOSOPHY BAND */}
          <section
            className="relative w-full"
            style={{ backgroundColor: "#0d1620", color: "#e8dcc8" }}
          >
            <div className="mx-auto w-full max-w-[1280px] px-8 py-32 md:px-24 md:py-48">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-2">
                  <p
                    className="tracked-caps text-[10px]"
                    style={{ color: "#8a8678" }}
                  >
                    Ethos
                  </p>
                </div>
                <Reveal className="col-span-12 md:col-span-8 md:col-start-4">
                  <p
                    className="font-serif text-2xl leading-[1.4] md:text-[2.5rem] md:leading-[1.3]"
                    style={{ color: "#e8dcc8" }}
                  >
                    Capital is patient. Counsel is private. Our work is judged not in quarters, but in decades.
                  </p>
                  <p
                    className="tracked-caps mt-16 text-[10px]"
                    style={{ color: "#8a8678" }}
                  >
                    — D.C. Norman, Established MCMXCIV
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* PRACTICE — 3 across */}
          <section id="services" className="mx-auto w-full max-w-[1280px] px-8 py-28 md:px-24 md:py-40">
            <div className="grid grid-cols-12 gap-8 mb-16">
              <Reveal className="col-span-12 md:col-span-2">
                <p className="tracked-caps text-[10px] text-muted-foreground">II — Practice</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  num: "i.",
                  title: "Strategy",
                  body: "Long-range positioning, capital allocation and board-level counsel — on matters where the outcome is consequential.",
                },
                {
                  num: "ii.",
                  title: "Execution",
                  body: "Sound strategy is only as valuable as its implementation. We work alongside management to refine, adapt and carry it through.",
                },
                {
                  num: "iii.",
                  title: "Principal Investment",
                  body: "Where conviction exists, D.C. Norman takes a stake. Fees structured around outcomes — not hours.",
                },
              ].map((s, i) => (
                <Reveal key={s.title} delay={i * 120}>
                  <div className="relative flex flex-col gap-6 py-10 md:py-0">
                    <div
                      className="absolute inset-x-0 top-0 h-px bg-border md:hidden"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
                        maskImage:
                          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
                      }}
                    />
                    <p className="tracked-caps text-[10px] text-muted-foreground">{s.num}</p>
                    <h3 className="font-serif text-3xl text-primary md:text-4xl">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/85 md:text-base">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <div className="mx-auto w-full max-w-[1280px] px-8 md:px-24">
            <div className="hairline" />
          </div>

          {/* PORTFOLIO — 3 across */}
          <section id="portfolio" className="mx-auto w-full max-w-[1280px] px-8 py-28 md:px-24 md:py-40">
            <div className="grid grid-cols-12 gap-8 mb-16">
              <Reveal className="col-span-12 md:col-span-2">
                <p className="tracked-caps text-[10px] text-muted-foreground">III — Selected Engagements</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  num: "i.",
                  title: "Meridian Holdings",
                  sector: "Industrial — Private",
                  body: "Multi-year engagement spanning strategic repositioning, capital structure and succession. Principal stake retained.",
                },
                {
                  num: "ii.",
                  title: "Arden & Vale",
                  sector: "Consumer — Public",
                  body: "Board-level counsel through a contested transition and subsequent reorganisation of the operating portfolio.",
                },
                {
                  num: "iii.",
                  title: "Northcourt Capital",
                  sector: "Financial Services",
                  body: "Long-term advisory across regulatory strategy and institutional positioning ahead of a structured liquidity event.",
                },
                {
                  num: "iv.",
                  title: "Ellsworth Group",
                  sector: "Real Assets",
                  body: "Principal investment alongside operating management. Outcome-aligned terms, no advisory fees.",
                },
              ].map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <div className="relative flex flex-col gap-5 py-10 md:py-0">
                    <div
                      className="absolute inset-x-0 top-0 h-px bg-border md:hidden"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
                        maskImage:
                          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
                      }}
                    />
                    <p className="tracked-caps text-[10px] text-muted-foreground">{p.num}</p>
                    <div>
                      <h3 className="font-serif text-3xl text-primary md:text-4xl">{p.title}</h3>
                      <p className="tracked-caps mt-2 text-[10px] text-muted-foreground">{p.sector}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/85 md:text-base">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* CONTACT — dark band */}
          <section
            id="contact"
            className="relative w-full"
            style={{ backgroundColor: "#0d1620", color: "#e8dcc8" }}
          >
            <div className="mx-auto w-full max-w-[1280px] px-8 py-32 text-center md:px-24 md:py-48">
              <Reveal>
                <p
                  className="tracked-caps text-[10px]"
                  style={{ color: "#8a8678" }}
                >
                  IV — Correspondence
                </p>
                <p
                  className="tracked-caps mt-10 text-[10px]"
                  style={{ color: "#8a8678" }}
                >
                  Enquiries are welcomed from principals only.
                </p>
                <a
                  href="mailto:office@dcnorman.com"
                  className="mt-10 inline-block font-serif text-3xl transition-opacity hover:opacity-70 md:text-5xl"
                  style={{ color: "#e8dcc8" }}
                >
                  office@dcnorman.com
                </a>
              </Reveal>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="relative py-12 text-center">
            <div
              className="absolute inset-x-0 top-0 mx-auto h-px max-w-[1280px] bg-border"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%)",
              }}
            />
            <p className="font-serif text-sm tracking-wide text-muted-foreground">
              D.C. Norman · London · Zürich · Singapore
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
