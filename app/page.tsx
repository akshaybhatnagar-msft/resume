import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ClaudeContext from "@/components/ClaudeContext";
import Experience from "@/components/Experience";
import SkillsAsSkills from "@/components/SkillsAsSkills";
import Sessions from "@/components/Sessions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ClaudeContext />
        <Experience />
        <SkillsAsSkills />
        <Sessions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
