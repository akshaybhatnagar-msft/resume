"use client";

import { useEffect, useRef } from "react";
import { createScrollFadeIn, createStaggeredReveal } from "@/lib/animations";
import { resumeData } from "@/data/resume";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      createScrollFadeIn(headingRef.current, { y: 40 });
    }
    if (contentRef.current) {
      createStaggeredReveal(contentRef.current, ".about-paragraph", {
        stagger: 0.2,
        y: 30,
      });
    }
    if (highlightsRef.current) {
      createStaggeredReveal(highlightsRef.current, ".highlight-item", {
        stagger: 0.1,
        y: 20,
        start: "top 85%",
      });
    }
  }, []);

  const { about } = resumeData;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Parallax background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
        <div className="parallax-bg w-full h-full opacity-30" />
      </div>

      <div className="container relative z-10">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <span className="section-label">About</span>
          <h2 className="section-title">Building the Future of AI</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main content */}
          <div ref={contentRef} className="lg:col-span-2 space-y-6">
            {about.summary.map((paragraph, index) => (
              <p
                key={index}
                className="about-paragraph text-lg md:text-xl text-muted/90 leading-relaxed font-light opacity-0"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Highlights sidebar */}
          <div ref={highlightsRef} className="lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              <h3 className="text-sm uppercase tracking-[0.2em] text-accent mb-6 font-medium">
                Highlights
              </h3>
              {about.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="highlight-item flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm opacity-0"
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-foreground/90 font-medium">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
