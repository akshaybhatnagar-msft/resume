"use client";

import { useEffect, useRef } from "react";
import { createScrollFadeIn, createStaggeredReveal } from "@/lib/animations";
import { resumeData } from "@/data/resume";
import { ExternalLink, Sparkles } from "lucide-react";

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      createScrollFadeIn(headingRef.current, { y: 40 });
    }
    if (gridRef.current) {
      createStaggeredReveal(gridRef.current, ".project-card", {
        stagger: 0.12,
        y: 50,
      });
    }
  }, []);

  const { projects } = resumeData;

  return (
    <section id="projects" className="section-padding bg-card/30">
      <div className="container">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Featured Work</h2>
        </div>

        {/* Projects grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="project-card group relative p-6 md:p-8 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 opacity-0"
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </div>
              )}

              {/* Project content */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors pr-20">
                  {project.title}
                </h3>
                <p className="text-muted/90 leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2.5 py-1 rounded-md bg-border/30 text-muted text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link indicator */}
              <div className="flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Project</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
