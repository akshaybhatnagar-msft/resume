"use client";

import { useEffect, useRef } from "react";
import { createScrollFadeIn, createStaggeredReveal } from "@/lib/animations";
import { resumeData } from "@/data/resume";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      createScrollFadeIn(headingRef.current, { y: 40 });
    }
    if (linksRef.current) {
      createStaggeredReveal(linksRef.current, ".contact-link", {
        stagger: 0.1,
        y: 30,
      });
    }
  }, []);

  const { personal, contact } = resumeData;

  const socialLinks = [
    {
      name: "Email",
      href: `mailto:${personal.email}`,
      icon: Mail,
      label: personal.email,
    },
    {
      name: "LinkedIn",
      href: personal.linkedin,
      icon: Linkedin,
      label: "Connect on LinkedIn",
    },
    {
      name: "GitHub",
      href: `https://github.com/${personal.github}`,
      icon: Github,
      label: `@${personal.github}`,
    },
    {
      name: "Twitter",
      href: `https://twitter.com/${personal.twitter}`,
      icon: Twitter,
      label: `@${personal.twitter}`,
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <span className="section-label">Contact</span>
          <h2 className="section-title">{contact.heading}</h2>
          <p className="text-lg text-muted/80 max-w-xl mx-auto mt-4 font-light">
            {contact.subheading}
          </p>
        </div>

        {/* Contact links */}
        <div
          ref={linksRef}
          className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="contact-link group flex items-center gap-3 px-6 py-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-accent/40 hover:bg-card/80 transition-all duration-300 opacity-0"
              >
                <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted uppercase tracking-wider">
                    {link.name}
                  </p>
                  <p className="text-foreground font-medium text-sm">
                    {link.label}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
