"use client";

import { useEffect, useRef } from "react";
import {
  createScrollFadeIn,
  createStaggeredReveal,
  animateSkillBars,
} from "@/lib/animations";
import { resumeData } from "@/data/resume";
import { Code2, Brain, Cloud, Wrench } from "lucide-react";

const categoryIcons = {
  languages: Code2,
  aiml: Brain,
  cloud: Cloud,
  tools: Wrench,
};

const categoryLabels = {
  languages: "Languages",
  aiml: "AI & Machine Learning",
  cloud: "Cloud & Infrastructure",
  tools: "Tools & APIs",
};

export default function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      createScrollFadeIn(headingRef.current, { y: 40 });
    }
    if (gridRef.current) {
      createStaggeredReveal(gridRef.current, ".skill-category", {
        stagger: 0.15,
        y: 40,
      });
      // Animate skill bars after cards appear
      setTimeout(() => {
        if (gridRef.current) {
          animateSkillBars(gridRef.current);
        }
      }, 300);
    }
  }, []);

  const { skills } = resumeData;

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technical Expertise</h2>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {Object.entries(skills).map(([category, items]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            const label =
              categoryLabels[category as keyof typeof categoryLabels];

            return (
              <div
                key={category}
                className="skill-category p-6 md:p-8 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-300 opacity-0"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {label}
                  </h3>
                </div>

                {/* Skills list */}
                <div className="space-y-5">
                  {items.map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground/90 font-medium text-sm">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted">{skill.level}%</span>
                      </div>
                      <div className="skill-bar h-2 rounded-full bg-border/50 overflow-hidden">
                        <div
                          className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                          data-level={skill.level}
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
