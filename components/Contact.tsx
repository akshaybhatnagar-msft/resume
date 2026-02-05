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
        <div ref={headingRef} className="text-center mb-12 opacity-0">
          <span className="section-label">Contact</span>
          <h2 className="section-title">{contact.heading}</h2>
          <p className="text-muted max-w-lg mx-auto mt-3">
            {contact.subheading}
          </p>
        </div>

        {/* Contact links - Grid layout for equal widths */}
        <div
          ref={linksRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="contact-link group flex items-center gap-3 px-4 py-4 rounded-xl bg-card border border-border hover:border-border-light transition-all duration-150 opacity-0"
              >
                <div className="p-2 rounded-lg bg-background-secondary text-muted group-hover:text-foreground transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted mb-0.5">
                    {link.name}
                  </p>
                  <p className="text-foreground text-sm truncate">
                    {link.label}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
