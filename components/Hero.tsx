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
      {/* Gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="hero-image mb-8 relative inline-block opacity-0">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[3px] border-accent/50 shadow-2xl shadow-accent/20 mx-auto">
            <Image
              src={personal.profileImage}
              alt={personal.name}
              width={224}
              height={224}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-accent/20 to-accent-secondary/20 blur-xl -z-10" />
        </div>

        {/* Name */}
        <h1 className="hero-name text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-4 opacity-0">
          <span className="bg-gradient-to-r from-foreground via-foreground to-muted bg-clip-text">
            {personal.name}
          </span>
        </h1>

        {/* Title */}
        <div className="hero-title mb-6 opacity-0">
          <p className="text-xl md:text-2xl lg:text-3xl text-accent font-medium tracking-wide">
            {personal.title} @ {personal.company}
          </p>
          <p className="text-lg md:text-xl text-muted mt-2 font-light">
            {personal.tagline}
          </p>
        </div>

        {/* Bio */}
        <p className="hero-bio text-lg md:text-xl text-muted/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed opacity-0">
          {personal.bio}
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-5">
          <a
            href={`mailto:${personal.email}`}
            className="hero-social social-link opacity-0"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social social-link opacity-0"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`https://github.com/${personal.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social social-link opacity-0"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={`https://twitter.com/${personal.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social social-link opacity-0"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted/60 hover:text-accent transition-colors group"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
