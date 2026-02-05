"use client";

import { useEffect, useRef, useState } from "react";
import { createScrollFadeIn, createStaggeredReveal } from "@/lib/animations";
import { resumeData } from "@/data/resume";
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronRight,
  Terminal,
  Sparkles,
} from "lucide-react";

interface Session {
  id: string;
  title: string;
  status: "completed" | "active";
  period: string;
  context: string;
  outcomes: string[];
  tech: string[];
  featured?: boolean;
}

const sessions: Session[] = [
  {
    id: "session-001",
    title: "Copilot for Finance",
    status: "active",
    period: "2023 - Present",
    context:
      "Build AI-powered financial analysis platform integrated into Microsoft 365, enabling natural language queries over enterprise financial data.",
    outcomes: [
      "Deployed to Fortune 500 clients",
      "60% reduction in analysis time",
      "95%+ query accuracy achieved",
    ],
    tech: ["Python", "Azure", "LLMs", "TypeScript"],
    featured: true,
  },
  {
    id: "session-002",
    title: "Sydney Backend Services",
    status: "active",
    period: "2023 - Present",
    context:
      "Architect backend for conversational AI with advanced reasoning capabilities and multi-model orchestration including Claude integration.",
    outcomes: [
      "99.9% uptime achieved",
      "Sub-second latency",
      "Multi-model orchestration",
    ],
    tech: ["C#", "Azure", "Claude API", "Redis"],
    featured: true,
  },
  {
    id: "session-003",
    title: "Libre Researcher",
    status: "completed",
    period: "2021 - 2023",
    context:
      "Create autonomous research platform combining web search, document analysis, and synthesis for deep research workflows.",
    outcomes: [
      "Research time: days → hours",
      "Adopted by multiple teams",
      "Core components open-sourced",
    ],
    tech: ["Python", "GRPO", "TypeScript", "Azure"],
    featured: true,
  },
  {
    id: "session-004",
    title: "ML Inference Infrastructure",
    status: "completed",
    period: "2020 - 2023",
    context:
      "Scale ML inference to 10M+ daily requests while maintaining low latency and optimizing cost efficiency.",
    outcomes: [
      "10M+ daily requests at peak",
      "p99 latency: 50ms",
      "40% cost reduction",
    ],
    tech: ["Python", "Kubernetes", "TensorRT", "Prometheus"],
    featured: false,
  },
  {
    id: "session-005",
    title: "Constitutional AI Guidelines",
    status: "completed",
    period: "2022 - 2023",
    context:
      "Establish constitutional AI principles and evaluation frameworks for Microsoft's enterprise AI deployments.",
    outcomes: [
      "Enterprise guidelines established",
      "100+ engineers trained",
      "Automated safety pipeline built",
    ],
    tech: ["Python", "PyTorch", "Evaluation Frameworks"],
    featured: false,
  },
  {
    id: "session-006",
    title: "Cross-Platform Terminal",
    status: "completed",
    period: "2021 - 2022",
    context:
      "Build modern terminal with unified Windows/macOS experience and AI-assisted command suggestions.",
    outcomes: [
      "Functional for personal use",
      "AI command suggestions",
      "Learned Rust ecosystem",
    ],
    tech: ["Rust", "TypeScript", "Tauri"],
    featured: false,
  },
];

function SessionCard({ session, index }: { session: Session; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="session-card group relative opacity-0"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-5 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-300 ${
          isExpanded
            ? "bg-card/80 border-accent/50"
            : "bg-card/40 border-border/50 hover:border-accent/30"
        }`}
      >
        {/* Session header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            {session.status === "active" ? (
              <div className="relative">
                <Circle className="w-4 h-4 text-green-500 fill-green-500" />
                <span className="absolute inset-0 w-4 h-4 rounded-full bg-green-500 animate-ping opacity-50" />
              </div>
            ) : (
              <CheckCircle2 className="w-4 h-4 text-accent" />
            )}

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  {session.title}
                </h3>
                {session.featured && (
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                )}
              </div>
              <p className="text-xs text-muted font-mono">{session.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted">
            <Clock className="w-3 h-3" />
            {session.period}
          </div>
        </div>

        {/* Context */}
        <p className="text-sm text-muted/80 mb-3 line-clamp-2">
          {session.context}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {session.tech.map((t, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-border/30 text-muted text-xs font-mono"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expand indicator */}
        <div className="flex items-center gap-1 text-xs text-accent">
          <ChevronRight
            className={`w-3 h-3 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
          <span>{isExpanded ? "Hide outcomes" : "View outcomes"}</span>
        </div>

        {/* Expanded outcomes */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-40 mt-4 pt-4 border-t border-border/30" : "max-h-0"
          }`}
        >
          <p className="text-xs text-muted uppercase tracking-wider mb-2">
            Outcomes
          </p>
          <ul className="space-y-1.5">
            {session.outcomes.map((outcome, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Sessions() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      createScrollFadeIn(headingRef.current, { y: 40 });
    }
    if (gridRef.current) {
      createStaggeredReveal(gridRef.current, ".session-card", {
        stagger: 0.1,
        y: 40,
      });
    }
  }, []);

  const activeSessions = sessions.filter((s) => s.status === "active");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  return (
    <section id="sessions" className="section-padding bg-card/30">
      <div className="container">
        {/* Section heading */}
        <div ref={headingRef} className="mb-12 opacity-0">
          <span className="section-label flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Sessions
          </span>
          <h2 className="section-title">SESSIONS.md</h2>
          <p className="text-muted/80 mt-4 max-w-2xl text-lg">
            Projects documented as completed sessions - with context, tech stack,
            and measurable outcomes.
          </p>
        </div>

        {/* Active sessions */}
        {activeSessions.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-medium text-green-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Active Sessions ({activeSessions.length})
            </h3>
            <div
              ref={gridRef}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {activeSessions.map((session, index) => (
                <SessionCard key={session.id} session={session} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Completed sessions */}
        <div>
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Completed Sessions ({completedSessions.length})
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedSessions.map((session, index) => (
              <SessionCard
                key={session.id}
                session={session}
                index={index + activeSessions.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
