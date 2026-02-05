// Resume data - Update these with your actual information
export const resumeData = {
  personal: {
    name: "Akshay Bhatnagar",
    title: "Partner Engineer (L68)",
    company: "Microsoft",
    tagline: "AI Infrastructure & GenAI Platforms",
    bio: "Building the future of AI-powered enterprise solutions",
    email: "akshay.bhatnagar@outlook.com",
    linkedin: "[YOUR_LINKEDIN_URL]",
    github: "akshaybhatnagar-msft",
    twitter: "[YOUR_TWITTER_HANDLE]",
    profileImage: "/profile-v6.png",
  },

  about: {
    summary: [
      "Partner-level engineer at Microsoft with over 10 years of experience driving high-impact AI and infrastructure initiatives. I've progressed from L61 to L68, leading cross-functional teams and architecting systems that serve millions of users.",
      "My expertise spans large language models, reinforcement learning, and building production-grade AI platforms. I'm passionate about transforming complex technical challenges into elegant, scalable solutions that empower businesses worldwide.",
      "Currently focused on GenAI platforms, including Copilot integrations, advanced reasoning systems, and next-generation AI infrastructure that pushes the boundaries of what's possible.",
    ],
    highlights: [
      "10+ years at Microsoft",
      "L61 → L68 progression",
      "GenAI & LLM platforms",
      "Enterprise-scale systems",
    ],
  },

  experience: [
    {
      company: "Microsoft",
      location: "Redmond, WA",
      period: "2016 - Present",
      roles: [
        {
          title: "Partner Engineer (L68)",
          period: "2023 - Present",
          description:
            "Leading AI infrastructure initiatives across Microsoft's GenAI platforms, driving strategic technical decisions for enterprise-scale systems.",
          achievements: [
            "Architected Copilot for Finance integration serving Fortune 500 clients",
            "Led Sydney backend services with Claude integration for enhanced reasoning",
            "Pioneered GRPO-based trade promotion validation systems",
          ],
        },
        {
          title: "Principal Engineer (L66)",
          period: "2020 - 2023",
          description:
            "Drove technical strategy for ML platform infrastructure, establishing patterns adopted across multiple product teams.",
          achievements: [
            "Built Libre Researcher platform for autonomous research workflows",
            "Scaled inference infrastructure to handle 10M+ daily requests",
            "Established constitutional AI guidelines for enterprise deployments",
          ],
        },
        {
          title: "Senior Engineer (L63)",
          period: "2016 - 2020",
          description:
            "Core contributor to Azure AI services, building foundational components for Microsoft's cloud ML offerings.",
          achievements: [
            "Developed core ML pipeline orchestration systems",
            "Contributed to Azure Cognitive Services APIs",
            "Built real-time model serving infrastructure",
          ],
        },
      ],
    },
  ],

  skills: {
    languages: [
      { name: "Python", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "C#", level: 85 },
      { name: "C++", level: 75 },
      { name: "Go", level: 70 },
    ],
    aiml: [
      { name: "Large Language Models", level: 95 },
      { name: "Reinforcement Learning", level: 90 },
      { name: "Constitutional AI", level: 85 },
      { name: "Model Fine-tuning", level: 90 },
      { name: "GRPO & RLHF", level: 85 },
    ],
    cloud: [
      { name: "Azure (Container Apps, GPU)", level: 95 },
      { name: "Kubernetes", level: 85 },
      { name: "AWS", level: 75 },
      { name: "Terraform", level: 80 },
    ],
    tools: [
      { name: "Microsoft Graph APIs", level: 90 },
      { name: "Claude API", level: 85 },
      { name: "OpenAI APIs", level: 90 },
      { name: "Docker", level: 85 },
      { name: "Git", level: 95 },
    ],
  },

  projects: [
    {
      title: "Copilot for Finance",
      description:
        "AI-powered financial analysis platform integrated into Microsoft 365, enabling natural language queries over enterprise financial data.",
      tech: ["Python", "Azure", "LLMs", "TypeScript"],
      link: "#",
      featured: true,
    },
    {
      title: "Sydney Backend Services",
      description:
        "Backend infrastructure for conversational AI with advanced reasoning capabilities and multi-model orchestration.",
      tech: ["C#", "Azure", "Claude API", "Redis"],
      link: "#",
      featured: true,
    },
    {
      title: "Libre Researcher",
      description:
        "Autonomous research platform that combines web search, document analysis, and synthesis for deep research workflows.",
      tech: ["Python", "GRPO", "TypeScript", "Azure"],
      link: "#",
      featured: true,
    },
    {
      title: "Cross-Platform Terminal",
      description:
        "Modern terminal application with unified experience across Windows and macOS, featuring AI-assisted command suggestions.",
      tech: ["Rust", "TypeScript", "Tauri"],
      link: "#",
      featured: false,
    },
    {
      title: "Remote Dev Environments",
      description:
        "Seamless remote development setup using Tailscale and WSL2 for secure, low-latency development workflows.",
      tech: ["Go", "Tailscale", "WSL2", "Docker"],
      link: "#",
      featured: false,
    },
    {
      title: "AI Evaluation Framework",
      description:
        "Comprehensive testing and evaluation framework for LLM outputs, including factuality, safety, and capability benchmarks.",
      tech: ["Python", "PyTorch", "FastAPI"],
      link: "#",
      featured: false,
    },
  ],

  contact: {
    heading: "Let's Connect",
    subheading:
      "Open to discussing AI infrastructure, GenAI platforms, or potential collaborations.",
  },
};

export type ResumeData = typeof resumeData;
