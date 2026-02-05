"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, User } from "lucide-react";
import { resumeData } from "@/data/resume";
import ClaudeIcon from "./ClaudeIcon";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Simple knowledge base from resume data
const generateResponse = (query: string): string => {
  const q = query.toLowerCase();
  const { personal, about, experience, skills, projects } = resumeData;

  // Greetings
  if (q.match(/^(hi|hello|hey|howdy|greetings)/)) {
    return `Hello! I'm an AI assistant for ${personal.name}'s portfolio. I can answer questions about his experience, skills, projects, and background. What would you like to know?`;
  }

  // Who is / About
  if (q.match(/who is|about|tell me about|introduce/)) {
    return `${personal.name} is a ${personal.title} at ${personal.company}, specializing in ${personal.tagline}. ${about.summary[0]}`;
  }

  // Current role / Job
  if (q.match(/current|role|job|position|what does he do|work/)) {
    const currentRole = experience[0].roles[0];
    return `${personal.name} is currently a ${currentRole.title} at ${experience[0].company}. ${currentRole.description} Key achievements include: ${currentRole.achievements.join(", ")}.`;
  }

  // Experience / Career
  if (q.match(/experience|career|history|background|years/)) {
    const roles = experience[0].roles.map((r) => `${r.title} (${r.period})`).join(", ");
    return `${personal.name} has been at ${experience[0].company} since 2016, progressing through several roles: ${roles}. He has over 10 years of experience in AI infrastructure and enterprise systems.`;
  }

  // Skills - Languages
  if (q.match(/language|programming|code|python|typescript|c#/)) {
    const langs = skills.languages.map((s) => `${s.name} (${s.level}%)`).join(", ");
    return `${personal.name}'s programming languages: ${langs}. His strongest languages are Python and TypeScript, which he uses extensively for AI/ML systems and full-stack development.`;
  }

  // Skills - AI/ML
  if (q.match(/ai|ml|machine learning|llm|genai|model/)) {
    const aiSkills = skills.aiml.map((s) => `${s.name} (${s.level}%)`).join(", ");
    return `${personal.name}'s AI/ML expertise includes: ${aiSkills}. He specializes in large language models, reinforcement learning, and building production-grade AI platforms.`;
  }

  // Skills - Cloud
  if (q.match(/cloud|azure|aws|kubernetes|infrastructure/)) {
    const cloudSkills = skills.cloud.map((s) => `${s.name} (${s.level}%)`).join(", ");
    return `Cloud infrastructure skills: ${cloudSkills}. He has deep expertise in Azure, particularly Container Apps and GPU workloads for AI inference.`;
  }

  // Projects
  if (q.match(/project|copilot|sydney|libre|researcher|built|created/)) {
    const featuredProjects = projects
      .filter((p) => p.featured)
      .map((p) => `**${p.title}**: ${p.description}`)
      .join("\n\n");
    return `Key projects include:\n\n${featuredProjects}`;
  }

  // Contact
  if (q.match(/contact|email|reach|connect|linkedin|github/)) {
    return `You can reach ${personal.name} at:\n- Email: ${personal.email}\n- LinkedIn: ${personal.linkedin}\n- GitHub: github.com/${personal.github}\n- Twitter: @${personal.twitter}`;
  }

  // Education (not in data, but handle gracefully)
  if (q.match(/education|degree|university|school|study/)) {
    return `While specific education details aren't listed here, ${personal.name} has over 10 years of hands-on experience at Microsoft, progressing from L61 to L68—a testament to continuous learning and technical excellence.`;
  }

  // Strengths / What's special
  if (q.match(/strength|special|best|unique|stand out/)) {
    return `${personal.name}'s key strengths include:\n- Deep expertise in GenAI and LLM platforms\n- Track record of building enterprise-scale systems (10M+ daily requests)\n- Full progression from L61 to L68 at Microsoft\n- Hands-on experience with both Claude and OpenAI APIs\n- Strong background in constitutional AI and responsible AI practices`;
  }

  // Claude / Anthropic specific
  if (q.match(/claude|anthropic/)) {
    return `${personal.name} has extensive experience with Claude API integration. He led Sydney backend services which includes Claude integration for enhanced reasoning capabilities. He's also experienced with building multi-model orchestration systems.`;
  }

  // Default / Unknown
  return `I can help you learn about ${personal.name}'s experience, skills, projects, or how to contact him. Try asking about:\n- His current role and experience\n- Technical skills (AI/ML, cloud, languages)\n- Key projects (Copilot for Finance, Sydney, Libre Researcher)\n- How to get in touch`;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I'm an AI assistant for Akshay's portfolio. Ask me anything about his experience, skills, or projects.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 z-50 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-background-secondary border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <ClaudeIcon size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Ask about Akshay</p>
              <p className="text-xs text-muted">AI-powered assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-background transition-colors text-muted hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[320px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === "user"
                    ? "bg-foreground/10"
                    : "bg-accent/20"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-3.5 h-3.5 text-foreground" />
                ) : (
                  <ClaudeIcon size={14} className="text-accent" />
                )}
              </div>
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  message.role === "user"
                    ? "bg-foreground text-background"
                    : "bg-background-secondary text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <ClaudeIcon size={14} className="text-accent" />
              </div>
              <div className="bg-background-secondary px-3 py-2 rounded-xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-background-secondary">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about experience, skills..."
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-border-light transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-3 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 ${
          isOpen
            ? "bg-muted text-foreground rotate-90"
            : "bg-accent hover:scale-105"
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-foreground" /> : <ClaudeIcon size={28} />}
      </button>
    </>
  );
}
