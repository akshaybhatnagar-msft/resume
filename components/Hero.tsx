"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ChevronDown, Twitter } from "lucide-react";
import { animateHero } from "@/lib/animations";
import { resumeData } from "@/data/resume";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animateHero(containerRef.current);
    }
  }, []);

  const { personal } = resumeData;

  return (
    <section
      ref={containerRef}
      className="hero-section min-h-screen flex flex-col items-center justify-center relative px-6"
    >
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Profile Image */}
        <div className="hero-image mb-8 relative inline-block opacity-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-border mx-auto">
            <Image
              src={personal.profileImage}
              alt={personal.name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="hero-name text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 opacity-0 text-foreground">
          {personal.name}
        </h1>

        {/* Title */}
        <div className="hero-title mb-6 opacity-0">
          <p className="text-lg md:text-xl text-muted">
            {personal.title} @ {personal.company}
          </p>
          <p className="text-base md:text-lg text-muted/70 mt-1">
            {personal.tagline}
          </p>
        </div>

        {/* Bio */}
        <p className="hero-bio text-base md:text-lg text-muted/80 max-w-xl mx-auto mb-10 leading-relaxed opacity-0">
          {personal.bio}
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          <a
            href={`mailto:${personal.email}`}
            className="hero-social social-link opacity-0"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social social-link opacity-0"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`https://github.com/${personal.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social social-link opacity-0"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={`https://twitter.com/${personal.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social social-link opacity-0"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0">
        <a
          href="#claude-context"
          className="flex flex-col items-center gap-2 text-muted/50 hover:text-foreground transition-colors"
        >
          <span className="text-xs tracking-wide">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
