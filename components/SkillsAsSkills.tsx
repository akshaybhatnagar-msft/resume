"use client";

import { useEffect, useRef, useState } from "react";
import { createScrollFadeIn, createStaggeredReveal } from "@/lib/animations";
import {
  Brain,
  Cloud,
  Code2,
  Cpu,
  ChevronDown,
  Server,
  Users,
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ElementType;
  trigger: string[];
  description: string;
  capabilities: string[];
  proficiency: number;
}

const skills: Skill[] = [
  {
    name: "ai-infrastructure",
    icon: Cpu,
    trigger: ["AI platform", "ML systems", "inference", "model serving"],
    description:
      "Design and implement production-grade AI infrastructure including model serving, inference optimization, and distributed training systems.",
    capabilities: [
      "Design high-throughput inference pipelines",
      "Optimize model serving latency and cost",
      "Implement A/B testing for ML models",
      "Build model monitoring and observability",
    ],
    proficiency: 95,
  },
  {
    name: "llm-integration",
    icon: Brain,
    trigger: ["LLM APIs", "Claude", "OpenAI", "prompt engineering"],
    description:
      "Integrate and orchestrate large language models in production systems. Deep experience with Claude API, OpenAI APIs, and building multi-model systems.",
    capabilities: [
      "Design prompt engineering strategies",
      "Implement RAG systems",
      "Build multi-model orchestration",
      "Optimize token usage and costs",
    ],
    proficiency: 95,
  },
  {
    name: "cloud-architecture",
    icon: Cloud,
    trigger: ["Azure", "Kubernetes", "Container Apps", "GPU workloads"],
    description:
      "Architect and deploy systems on Microsoft Azure. Expert in Container Apps, AKS, GPU configurations, and enterprise cloud patterns.",
    capabilities: [
      "Design multi-region deployments",
      "Implement GPU-accelerated workloads",
      "Build cost-optimized architectures",
      "Configure enterprise security",
    ],
    proficiency: 95,
  },
  {
    name: "backend-systems",
    icon: Server,
    trigger: ["distributed systems", "microservices", "APIs", "high-scale"],
    description:
      "Build scalable backend systems handling millions of requests. Experience with microservices, event-driven architectures, and high-availability systems.",
    capabilities: [
      "Design distributed architectures",
      "Implement event-driven patterns",
      "Build fault-tolerant services",
      "Optimize for throughput and latency",
    ],
    proficiency: 90,
  },
  {
    name: "full-stack-development",
    icon: Code2,
    trigger: ["Python", "TypeScript", "C#", "React", "Next.js"],
    description:
      "Full-stack development across multiple languages and frameworks. Primary expertise in Python and TypeScript, with strong C# skills.",
    capabilities: [
      "Build production React/Next.js apps",
      "Design Python ML pipelines",
      "Develop C#/.NET services",
      "Create CLI tools and automation",
    ],
    proficiency: 90,
  },
  {
    name: "technical-leadership",
    icon: Users,
    trigger: ["architecture reviews", "mentoring", "tech strategy"],
    description:
      "Lead technical initiatives across teams and organizations. Experience driving alignment on technical decisions and mentoring engineers.",
    capabilities: [
      "Conduct architecture reviews",
      "Drive technical strategy",
      "Mentor engineering teams",
      "Navigate cross-org dependencies",
    ],
    proficiency: 85,
  },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = skill.icon;

  return (
    <div
      className="skill-card group relative p-5 rounded-xl bg-card border border-border hover:border-border-light transition-colors duration-150 opacity-0"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Skill header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-background-secondary text-muted group-hover:text-foreground transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-medium text-foreground">
              {skill.name}
            </h3>
            <span className="text-xs text-muted">
              {skill.proficiency}%
            </span>
          </div>
        </div>
      </div>

      {/* Trigger keywords */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {skill.trigger.map((t, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded-md bg-background-secondary text-muted text-xs"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-muted text-sm leading-relaxed mb-3">
        {skill.description}
      </p>

      {/* Expandable capabilities */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
      >
        <span>Capabilities</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isExpanded ? "max-h-40 mt-3" : "max-h-0"
        }`}
      >
        <ul className="space-y-1.5">
          {skill.capabilities.map((cap, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-foreground/70"
            >
              <span className="w-1 h-1 rounded-full bg-muted mt-2 flex-shrink-0" />
              {cap}
            </li>
          ))}
        </ul>
      </div>

      {/* Proficiency bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border overflow-hidden rounded-b-xl">
        <div
          className="h-full bg-foreground/30"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
    </div>
  );
}

export default function SkillsAsSkills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      createScrollFadeIn(headingRef.current, { y: 40 });
    }
    if (gridRef.current) {
      createStaggeredReveal(gridRef.current, ".skill-card", {
        stagger: 0.08,
        y: 30,
      });
    }
  }, []);

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        {/* Section heading */}
        <div ref={headingRef} className="mb-10 opacity-0">
          <span className="section-label font-mono">/skills</span>
          <h2 className="section-title">Skills</h2>
          <p className="text-muted mt-3 max-w-xl">
            Technical capabilities documented like Claude Code's skill system.
          </p>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
