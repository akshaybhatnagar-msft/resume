"use client";

import { resumeData } from "@/data/resume";
import { Bot, FileJson, FileText } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { personal } = resumeData;

  return (
    <footer className="py-8 border-t border-border/30">
      <div className="container">
        <div className="flex flex-col gap-6">
          {/* AI-friendly links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted/60">
            <a
              href="/CLAUDE.md"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
              title="AI Context File"
            >
              <Bot className="w-3.5 h-3.5" />
              CLAUDE.md
            </a>
            <a
              href="/SKILLS.md"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
              title="Skills Documentation"
            >
              <FileText className="w-3.5 h-3.5" />
              SKILLS.md
            </a>
            <a
              href="/SESSIONS.md"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
              title="Past Projects"
            >
              <FileText className="w-3.5 h-3.5" />
              SESSIONS.md
            </a>
            <a
              href="/resume.json"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
              title="JSON Resume"
            >
              <FileJson className="w-3.5 h-3.5" />
              resume.json
            </a>
          </div>

          {/* Copyright and status */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
            <p>
              &copy; {currentYear} {personal.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Hidden semantic content for scrapers and screen readers */}
      <div className="sr-only" itemScope itemType="https://schema.org/Person">
        <span itemProp="name">{personal.name}</span>
        <span itemProp="jobTitle">{personal.title}</span>
        <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">{personal.company}</span>
        </span>
        <span itemProp="email">{personal.email}</span>
        <a itemProp="url" href={`https://github.com/${personal.github}`}>GitHub</a>
        <span itemProp="description">{personal.bio}</span>
        <span itemProp="knowsAbout">AI Infrastructure, GenAI, LLMs, Python, TypeScript, Azure, Kubernetes</span>
      </div>
    </footer>
  );
}
