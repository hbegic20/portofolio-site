import { SectionHeading } from "@/components/ui/SectionHeading";
import { sections } from "@/content/sections";

const container = "mx-auto w-full max-w-[1320px] px-5 md:px-10";

export default function Home() {
  const [hero, ...rest] = sections;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
        <nav aria-label="Primary" className={`${container} flex h-16 items-center gap-8`}>
          <a href="#top" className="font-mono text-sm">
            <span className="text-accent">~/[name]</span>{" "}
            <span className="text-text-subtle">$</span>
          </a>
          <ul className="hidden gap-6 font-mono text-sm text-text-muted md:flex">
            {sections
              .filter((s) => s.inNav)
              .map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-text">
                    ./{s.slug}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </header>

      <main id="main">
        <section id={hero.id} aria-labelledby="top-heading" className="py-14 md:py-30">
          <div className={container}>
            <h1
              id="top-heading"
              className="max-w-[14ch] text-h1 leading-[0.95] font-semibold tracking-heading"
            >
              I build the <span className="text-accent">whole stack</span> — and make it feel fast.
            </h1>
          </div>
        </section>

        {rest.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className={`py-14 md:py-30 ${i % 2 === 0 ? "bg-bg-alt" : ""}`}
          >
            <div className={container}>
              <SectionHeading section={section} />
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-border py-10">
        <p className={`${container} font-mono text-xs text-text-subtle`}>
          © [year] [Name] · built with Next.js, R3F & Blender
        </p>
      </footer>
    </>
  );
}
