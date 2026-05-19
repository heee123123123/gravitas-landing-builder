import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import CrosshairCursor from "@/components/CrosshairCursor";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="relative min-h-screen page-fade-in">
      <CrosshairCursor />
      <Header />

      <main className="relative z-10">
        {/* HERO — full bleed image with overlaid text */}
        <section className="relative h-[99.2vh] w-full overflow-hidden">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle dark gradient behind text only (right side) */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to left, rgba(11,19,30,0.7) 0%, rgba(11,19,30,0.4) 35%, transparent 65%)",
            }}
          />

          <div className="relative grid h-full w-full grid-cols-1 md:grid-cols-2">
            <div aria-hidden />
            <div className="relative flex h-full w-full items-center px-10 py-16 md:px-20 md:py-24">
              <Reveal>
                <p className="tracked-caps text-xs md:text-sm" style={{ color: "#e8dcc8" }}>
                  Management Consultant
                </p>
                <p className="tracked-caps mt-5 text-[10px] md:text-xs" style={{ color: "#c4ad7a" }}>
                  By Appointment Only
                </p>

                <div className="mt-12 h-px w-24" style={{ backgroundColor: "rgba(232,220,200,0.4)" }} />

                <div className="mt-12">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-4 px-8 py-4 text-xs tracking-[0.28em] uppercase transition-colors duration-500"
                    style={{
                      border: "1px solid rgba(232,220,200,0.5)",
                      color: "#e8dcc8",
                    }}
                  >
                    Request a Consultation
                  </a>
                </div>
              </Reveal>
            </div>
          </div>



          {/* Scroll indicator — arrow only */}
          <div
            className={`absolute inset-x-0 bottom-8 z-10 flex justify-center transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
          >
            <svg
              className="arrow-pulse"
              width="14"
              height="22"
              viewBox="0 0 14 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              style={{ color: "#e8dcc8" }}
            >
              <line x1="7" y1="0" x2="7" y2="20" />
              <polyline points="1,14 7,20 13,14" />
            </svg>
          </div>
        </section>

        {/* INTRO HEADLINE + CTA removed — merged into hero right column */}

        <div className="mx-auto w-full max-w-[1600px] px-8 md:px-20">
          <div className="hairline" />
        </div>

        {/* ABOUT */}
        <section id="about" className="mx-auto w-full max-w-[1600px] px-8 py-28 md:px-20 md:py-40">
          <div className="grid grid-cols-12 gap-8">
            <Reveal className="col-span-12 md:col-span-3">
              <p className="tracked-caps text-[10px] text-muted-foreground">I — Practice</p>
            </Reveal>
            <Reveal className="col-span-12 md:col-span-8 md:col-start-5" delay={120}>
              <div>
                <p className="font-serif text-2xl leading-[1.45] text-foreground md:text-4xl md:leading-[1.35]">
                  D.C. Norman advises a select group of organisations at the intersection of strategy, capital and leadership. Operating across Europe and North America, the firm brings decades of experience to its most complex engagements.
                </p>
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                  D.C. Norman maintains a deliberately small client roster, ensuring each engagement receives the firm's full counsel.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1600px] px-8 md:px-20">
          <div className="hairline" />
        </div>

        {/* SERVICES */}
        <section id="services" className="mx-auto w-full max-w-[1600px] px-8 py-28 md:px-20 md:py-40">
          <Reveal className="mb-20">
            <p className="tracked-caps text-[10px] text-muted-foreground">II — Practice Areas</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-16">
            {[
              {
                num: "i.",
                title: "Strategy",
                body: "Long-range positioning. Capital allocation. Counsel to boards and principals on matters of consequence.",
              },
              {
                num: "ii.",
                title: "Operations",
                body: "Quiet reorganization. Margin recovery. Senior leadership transitions handled with discretion.",
              },
              {
                num: "iii.",
                title: "Advisory",
                body: "A standing arrangement. Independent perspective held in reserve, drawn upon as circumstances require.",
              },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="relative pt-8">
                  <div
                    className="absolute inset-x-0 top-0 h-px bg-border"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%)",
                    }}
                  />
                  <p className="tracked-caps text-[10px] text-muted-foreground">{s.num}</p>
                  <h3 className="mt-6 font-serif text-3xl text-primary">{s.title}</h3>
                  <p className="mt-6 text-sm leading-relaxed text-foreground/85">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1600px] px-8 md:px-20">
          <div className="hairline" />
        </div>

        {/* CONTACT */}
        <section id="contact" className="mx-auto w-full max-w-[1600px] px-8 py-32 text-center md:px-20 md:py-48">
          <Reveal>
            <p className="tracked-caps text-[10px] text-muted-foreground">III — Correspondence</p>
            <p className="tracked-caps mt-10 text-[10px] text-muted-foreground">
              Enquiries are welcomed from principals only.
            </p>
            <a
              href="mailto:office@dcnorman.com"
              className="mt-10 inline-block font-serif text-3xl text-primary transition-opacity hover:opacity-70 md:text-6xl"
            >
              office@dcnorman.com
            </a>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className="relative py-12 text-center">
          <div
            className="absolute inset-x-0 top-0 mx-auto h-px max-w-[1600px] bg-border"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%)",
            }}
          />
          <p className="font-serif text-sm tracking-wide text-muted-foreground">D.C. Norman</p>
        </footer>
      </main>
    </div>
  );
}
