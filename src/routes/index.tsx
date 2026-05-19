import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import CrosshairCursor from "@/components/CrosshairCursor";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div id="top" className="relative min-h-screen">
      <CrosshairCursor />
      <Header />

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative h-[100svh] w-full overflow-hidden">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, var(--color-background) 0%, transparent 22%, transparent 60%, var(--color-background) 100%)",
            }}
          />

          {/* Scroll indicator — arrow only */}
          <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center">
            <svg
              className="arrow-pulse"
              width="14"
              height="22"
              viewBox="0 0 14 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              style={{ color: "var(--color-primary)" }}
            >
              <line x1="7" y1="0" x2="7" y2="20" />
              <polyline points="1,14 7,20 13,14" />
            </svg>
          </div>
        </section>

        {/* INTRO HEADLINE + CTA */}
        <section className="mx-auto w-full max-w-[1600px] px-8 pt-28 pb-32 text-center md:px-20 md:pt-40 md:pb-44">
          <Reveal>
            <p className="tracked-caps text-xs text-primary md:text-sm">
              Management Consultant
            </p>
            <p className="tracked-caps mt-5 text-[10px] text-muted-foreground md:text-xs">
              By appointment only
            </p>

            <div className="mx-auto mt-14 h-px w-24 bg-border" />

            <div className="mt-14">
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 border border-primary/50 px-8 py-4 text-xs tracking-[0.28em] text-primary uppercase transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
              >
                Request a consultation
              </a>
            </div>
          </Reveal>
        </section>

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
              <p className="font-serif text-2xl leading-[1.45] text-foreground md:text-4xl md:leading-[1.35]">
                Decades of experience advising organizations at the intersection
                of strategy and execution. The work is conducted in confidence,
                with a small number of clients, over the long term.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1600px] px-8 md:px-20">
          <div className="hairline" />
        </div>

        {/* SERVICES */}
        <section id="services" className="mx-auto w-full max-w-[1600px] px-8 py-28 md:px-20 md:py-40">
          <Reveal className="mb-20">
            <p className="tracked-caps text-[10px] text-muted-foreground">II — Areas of Focus</p>
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
            <a
              href="mailto:office@dcnorman.com"
              className="mt-12 inline-block font-serif text-3xl text-primary transition-opacity hover:opacity-70 md:text-6xl"
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
