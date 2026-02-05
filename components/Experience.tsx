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
    <section id="experience" className="section-padding">
      <div className="container">
        {/* Section heading */}
        <div ref={headingRef} className="mb-12 opacity-0">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Career Journey</h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-6 top-0 bottom-0 w-px bg-border" />

          {experience.map((job) => (
            <div key={job.company} className="relative">
              {/* Company header */}
              <div className="ml-6 md:ml-16 mb-6 flex flex-wrap items-center gap-3">
                <div className="absolute left-0 md:left-6 w-3 h-3 -translate-x-1/2 rounded-full bg-foreground" />
                <div className="flex items-center gap-2 text-foreground">
                  <Building2 className="w-4 h-4 text-muted" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{job.period}</span>
                </div>
              </div>

              {/* Roles */}
              <div className="ml-6 md:ml-16 space-y-4 mb-12">
                {job.roles.map((role, roleIndex) => (
                  <div
                    key={roleIndex}
                    className="experience-card relative p-5 rounded-xl bg-card border border-border hover:border-border-light transition-colors duration-150 opacity-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <h3 className="text-lg font-medium text-foreground">
                        {role.title}
                      </h3>
                      <span className="text-sm text-muted">
                        {role.period}
                      </span>
                    </div>

                    <p className="text-muted mb-4 text-sm leading-relaxed">
                      {role.description}
                    </p>

                    <ul className="space-y-2">
                      {role.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <span className="w-1 h-1 rounded-full bg-muted mt-2 flex-shrink-0" />
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
