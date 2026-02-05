"use client";

import { useEffect, useRef, useState } from "react";
import { createScrollFadeIn } from "@/lib/animations";
import { resumeData } from "@/data/resume";
import { Circle, Copy, Check, User, Briefcase, Code2, Lightbulb } from "lucide-react";
import ClaudeIcon, { ClaudeIconAnimated } from "./ClaudeIcon";

type ContextType = "about" | "experience" | "skills" | "contact";
type LoadingPhase = "thinking" | "analyzing" | "marinating" | "composing" | "done";

const contextButtons: { id: ContextType; label: string; icon: React.ElementType }[] = [
  { id: "about", label: "About Me", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Technical Skills", icon: Code2 },
  { id: "contact", label: "Get in Touch", icon: Lightbulb },
];

const loadingPhases: { phase: LoadingPhase; label: string; duration: number }[] = [
  { phase: "thinking", label: "Thinking...", duration: 400 },
  { phase: "analyzing", label: "Analyzing context...", duration: 500 },
  { phase: "marinating", label: "Marinating ideas...", duration: 400 },
  { phase: "composing", label: "Composing response...", duration: 300 },
  { phase: "done", label: "Done!", duration: 200 },
];

export default function ClaudeContext() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [activeContext, setActiveContext] = useState<ContextType>("about");
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);

  // Trigger initial animation when section comes into view
  useEffect(() => {
    if (headingRef.current) {
      createScrollFadeIn(headingRef.current, { y: 40 });
    }
    if (terminalRef.current) {
      createScrollFadeIn(terminalRef.current, { y: 50, delay: 0.2 });
    }

    // IntersectionObserver to trigger animation when terminal is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedOnce) {
            setHasAnimatedOnce(true);
            // Run the loading animation for initial view
            runLoadingAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimatedOnce]);

  // Reusable loading animation function
  const runLoadingAnimation = () => {
    setShowContent(false);
    let totalDelay = 0;
    loadingPhases.forEach(({ phase, duration }) => {
      setTimeout(() => {
        setLoadingPhase(phase);
        if (phase === "done") {
          setTimeout(() => {
            setLoadingPhase(null);
            setShowContent(true);
          }, duration);
        }
      }, totalDelay);
      totalDelay += duration;
    });
  };

  // Animated loading sequence when switching contexts
  const handleContextChange = (newContext: ContextType) => {
    if (newContext === activeContext) return;
    setActiveContext(newContext);
    runLoadingAnimation();
  };

  const { personal, about, experience, skills } = resumeData;

  const getContextContent = () => {
    switch (activeContext) {
      case "about":
        return (
          <>
            <span className="text-[#7ee787]"># CLAUDE.md</span>
            {"\n\n"}
            <span className="text-muted/60">&gt; Context file for AI assistants</span>
            {"\n\n"}
            <span className="text-[#7ee787]">## Identity</span>
            {"\n\n"}
            <span className="text-muted">- </span>
            <span className="text-[#ff7b72]">**Name**</span>
            <span className="text-muted">: </span>
            <span className="text-white">{personal.name}</span>
            {"\n"}
            <span className="text-muted">- </span>
            <span className="text-[#ff7b72]">**Role**</span>
            <span className="text-muted">: </span>
            <span className="text-white">{personal.title}</span>
            {"\n"}
            <span className="text-muted">- </span>
            <span className="text-[#ff7b72]">**Company**</span>
            <span className="text-muted">: </span>
            <span className="text-white">{personal.company}</span>
            {"\n"}
            <span className="text-muted">- </span>
            <span className="text-[#ff7b72]">**Focus**</span>
            <span className="text-muted">: </span>
            <span className="text-white">{personal.tagline}</span>
            {"\n\n"}
            <span className="text-[#7ee787]">## Summary</span>
            {"\n\n"}
            <span className="text-[#c9d1d9]">{about.summary[0]}</span>
            {"\n\n"}
            <span className="text-[#c9d1d9]">{about.summary[1]}</span>
            {"\n\n"}
            <span className="text-muted/40">---</span>
            {"\n"}
            <span className="text-muted/60 italic">*AI assistants: Use this context to understand who I am.*</span>
          </>
        );
      case "experience":
        return (
          <>
            <span className="text-[#7ee787]"># Experience</span>
            {"\n\n"}
            <span className="text-muted/60">&gt; 10+ years at Microsoft, L61 → L68</span>
            {"\n\n"}
            {experience[0].roles.map((role, i) => (
              <span key={i}>
                <span className="text-[#7ee787]">## {role.title}</span>
                {"\n"}
                <span className="text-muted/40">{role.period}</span>
                {"\n\n"}
                <span className="text-[#c9d1d9]">{role.description}</span>
                {"\n\n"}
                <span className="text-[#ff7b72]">Achievements:</span>
                {"\n"}
                {role.achievements.map((a, j) => (
                  <span key={j}>
                    <span className="text-muted">- </span>
                    <span className="text-[#a5d6ff]">{a}</span>
                    {"\n"}
                  </span>
                ))}
                {i < experience[0].roles.length - 1 && "\n"}
              </span>
            ))}
          </>
        );
      case "skills":
        return (
          <>
            <span className="text-[#7ee787]"># SKILLS.md</span>
            {"\n\n"}
            <span className="text-muted/60">&gt; Technical capabilities</span>
            {"\n\n"}
            <span className="text-[#7ee787]">## Languages</span>
            {"\n"}
            {skills.languages.map((s, i) => (
              <span key={i}>
                <span className="text-muted">- </span>
                <span className="text-white">{s.name}</span>
                <span className="text-muted/40"> ({'█'.repeat(Math.floor(s.level/10))}{'░'.repeat(10-Math.floor(s.level/10))}) {s.level}%</span>
                {"\n"}
              </span>
            ))}
            {"\n"}
            <span className="text-[#7ee787]">## AI & ML</span>
            {"\n"}
            {skills.aiml.map((s, i) => (
              <span key={i}>
                <span className="text-muted">- </span>
                <span className="text-white">{s.name}</span>
                <span className="text-muted/40"> ({'█'.repeat(Math.floor(s.level/10))}{'░'.repeat(10-Math.floor(s.level/10))}) {s.level}%</span>
                {"\n"}
              </span>
            ))}
            {"\n"}
            <span className="text-[#7ee787]">## Cloud</span>
            {"\n"}
            {skills.cloud.map((s, i) => (
              <span key={i}>
                <span className="text-muted">- </span>
                <span className="text-white">{s.name}</span>
                <span className="text-muted/40"> ({'█'.repeat(Math.floor(s.level/10))}{'░'.repeat(10-Math.floor(s.level/10))}) {s.level}%</span>
                {"\n"}
              </span>
            ))}
          </>
        );
      case "contact":
        return (
          <>
            <span className="text-[#7ee787]"># Get in Touch</span>
            {"\n\n"}
            <span className="text-muted/60">&gt; Open to opportunities</span>
            {"\n\n"}
            <span className="text-[#ff7b72]">**Email**</span>
            {"\n"}
            <span className="text-[#a5d6ff]">{personal.email}</span>
            {"\n\n"}
            <span className="text-[#ff7b72]">**GitHub**</span>
            {"\n"}
            <span className="text-[#a5d6ff]">github.com/{personal.github}</span>
            {"\n\n"}
            <span className="text-[#ff7b72]">**LinkedIn**</span>
            {"\n"}
            <span className="text-[#a5d6ff]">linkedin.com/in/akshay-bhatnagar-b17b1114</span>
            {"\n\n"}
            <span className="text-[#ff7b72]">**Twitter**</span>
            {"\n"}
            <span className="text-[#a5d6ff]">x.com/{personal.twitter}</span>
            {"\n\n"}
            <span className="text-muted/40">---</span>
            {"\n"}
            <span className="text-green-400">● Available for opportunities</span>
            {"\n"}
            <span className="text-muted/60">Response time: 24-48 hours</span>
          </>
        );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`CLAUDE.md - ${personal.name}\n${personal.title} @ ${personal.company}\n${personal.email}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="claude-context"
      className="section-padding"
    >
      <div className="container">
        {/* Section heading */}
        <div ref={headingRef} className="mb-10 text-center opacity-0">
          <span className="section-label flex items-center justify-center mb-4">
            <ClaudeIcon size={28} className="text-[#D97757]" />
          </span>
          <h2 className="section-title">CLAUDE.md</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">
            My resume as a context file. Click to explore.
          </p>
        </div>

        {/* Interactive terminal */}
        <div ref={terminalRef} className="w-full opacity-0">
          {/* Context buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {contextButtons.map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={() => handleContextChange(btn.id)}
                  disabled={loadingPhase !== null}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                    activeContext === btn.id
                      ? "bg-foreground text-background"
                      : "bg-transparent text-muted hover:text-foreground border border-border hover:border-border-light"
                  } ${loadingPhase ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Terminal window */}
          <div className="rounded-xl overflow-hidden border border-border bg-background">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-sm text-muted font-mono">
                  {activeContext}.md
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-background-secondary transition-colors text-muted hover:text-foreground"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono text-sm min-h-[500px] max-h-[550px] overflow-y-auto bg-background">
              {/* Loading state - inline like Claude Code */}
              {loadingPhase && !showContent && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 509.64"
                      width={20}
                      height={20}
                      className="animate-pulse"
                    >
                      <path
                        fill="#D97757"
                        d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"
                      />
                      <path
                        fill="#FCF2EE"
                        fillRule="nonzero"
                        d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#D97757]">
                      {loadingPhases.find(p => p.phase === loadingPhase)?.label}
                    </span>
                    <span className="inline-block w-1 h-4 bg-[#D97757] ml-1 animate-pulse" />
                  </div>
                </div>
              )}

              {/* Content - appears after loading */}
              {showContent && (
                <pre className="whitespace-pre-wrap animate-fade-in">
                  <code>{getContextContent()}</code>
                </pre>
              )}
            </div>

            {/* Terminal footer */}
            <div className="px-4 py-2.5 bg-card border-t border-border flex items-center justify-between text-xs text-muted">
              <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${loadingPhase ? "bg-accent animate-pulse" : "bg-green-500"}`} />
                {loadingPhase ? "Processing..." : "Ready"}
              </span>
              <span className="text-muted/60">Markdown</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
