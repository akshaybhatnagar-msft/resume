"use client";

import { useEffect, useRef, useState } from "react";
import { createScrollFadeIn, createStaggeredReveal } from "@/lib/animations";
import {
  Brain,
  Cloud,
  Code2,
  Cpu,
  ChevronDown,
  Zap,
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
      "Design and implement production-grade AI infrastructure including model serving, inference optimization, and distributed training systems. Expert in scaling AI systems to millions of users.",
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
      "Full-stack development across multiple languages and frameworks. Primary expertise in Python and TypeScript, with strong C# and systems programming skills.",
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
      className="skill-card group relative p-6 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm hover:border-accent/40 transition-all duration-300 opacity-0"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Skill header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-lg font-semibold text-foreground">
              {skill.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <Zap className="w-3 h-3 text-accent" />
              <span className="text-xs text-muted">
                {skill.proficiency}% proficiency
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trigger keywords */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {skill.trigger.map((t, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-mono"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-muted/80 text-sm leading-relaxed mb-4">
        {skill.description}
      </p>

      {/* Expandable capabilities */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
      >
        <span>Capabilities</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-48 mt-3" : "max-h-0"
        }`}
      >
        <ul className="space-y-2">
          {skill.capabilities.map((cap, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              {cap}
            </li>
          ))}
        </ul>
      </div>

      {/* Proficiency bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/30 rounded-b-xl overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-1000"
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
        stagger: 0.1,
        y: 40,
      });
    }
  }, []);

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        {/* Section heading */}
        <div ref={headingRef} className="mb-12 opacity-0">
          <span className="section-label font-mono">/skills</span>
          <h2 className="section-title">SKILLS.md</h2>
          <p className="text-muted/80 mt-4 max-w-2xl text-lg">
            Skills documented like Claude Code's skill system.
            Each skill has triggers, descriptions, and capabilities.
          </p>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Usage hint */}
        <div className="mt-12 p-4 rounded-lg bg-card/50 border border-border/50 max-w-2xl mx-auto">
          <p className="text-sm text-muted/60 text-center font-mono">
            <span className="text-accent">Tip:</span> Mention any trigger keyword
            to engage that skill. Example: "Help with{" "}
            <span className="text-accent">LLM integration</span>"
          </p>
        </div>
      </div>
    </section>
  );
}
