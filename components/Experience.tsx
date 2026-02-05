"use client";

import { useEffect, useRef } from "react";
import { createScrollFadeIn, createSlideInLeft } from "@/lib/animations";
import { resumeData } from "@/data/resume";
import { Building2, MapPin, Calendar } from "lucide-react";

export default function Experience() {
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      createScrollFadeIn(headingRef.current, { y: 40 });
    }

    // Animate each role card
    if (timelineRef.current) {
      const cards = timelineRef.current.querySelectorAll(".experience-card");
      cards.forEach((card, index) => {
        createSlideInLeft(card as HTMLElement, {
          x: -40,
          delay: index * 0.15,
          start: "top 85%",
        });
      });
    }
  }, []);

  const { experience } = resumeData;

  return (
    <section id="experience" className="section-padding bg-card/30">
      <div className="container">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Career Journey</h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          {experience.map((job) => (
            <div key={job.company} className="relative">
              {/* Company header */}
              <div className="ml-8 md:ml-20 mb-8 flex flex-wrap items-center gap-4">
                <div className="absolute left-0 md:left-8 w-4 h-4 -translate-x-1/2 rounded-full bg-accent border-4 border-background" />
                <div className="flex items-center gap-2 text-accent">
                  <Building2 className="w-5 h-5" />
                  <span className="text-xl font-semibold">{job.company}</span>
                </div>
                <div className="flex items-center gap-2 text-muted text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{job.period}</span>
                </div>
              </div>

              {/* Roles */}
              <div className="ml-8 md:ml-20 space-y-8 mb-16">
                {job.roles.map((role, roleIndex) => (
                  <div
                    key={roleIndex}
                    className="experience-card relative p-6 md:p-8 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 opacity-0"
                  >
                    {/* Role connector line */}
                    <div className="absolute -left-[52px] md:-left-[52px] top-8 w-6 h-px bg-border/50" />

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                        {role.title}
                      </h3>
                      <span className="text-sm text-accent font-medium px-3 py-1 rounded-full bg-accent/10 w-fit">
                        {role.period}
                      </span>
                    </div>

                    <p className="text-muted/90 mb-6 leading-relaxed">
                      {role.description}
                    </p>

                    <ul className="space-y-3">
                      {role.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start gap-3 text-foreground/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
