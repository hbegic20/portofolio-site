import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { RevealScope } from "@/components/layout/RevealScope";
import { About } from "@/components/sections/About";
import { ApiPlayground } from "@/components/sections/ApiPlayground";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { OpenSource } from "@/components/sections/OpenSource";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Nav />
      <RevealScope>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <ApiPlayground />
        <OpenSource />
        <Contact />
      </RevealScope>
      <Footer />
    </>
  );
}
