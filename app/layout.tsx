import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { resumeData } from "@/data/resume";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
  description: `${resumeData.personal.bio} - ${resumeData.personal.tagline}`,
  keywords: [
    "Akshay Bhatnagar",
    "software engineer",
    "AI infrastructure",
    "GenAI",
    "Microsoft",
    "Partner Engineer",
    "machine learning",
    "LLMs",
    "portfolio",
    "resume",
  ],
  authors: [{ name: resumeData.personal.name }],
  creator: resumeData.personal.name,
  publisher: resumeData.personal.name,
  openGraph: {
    title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
    description: resumeData.personal.bio,
    type: "website",
    locale: "en_US",
    siteName: `${resumeData.personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
    description: resumeData.personal.bio,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    types: {
      "application/json": "/resume.json",
    },
  },
  other: {
    "ai-context": "/CLAUDE.md",
    "ai-skills": "/SKILLS.md",
    "ai-sessions": "/SESSIONS.md",
  },
};

// JSON-LD structured data for Person schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resumeData.personal.name,
  jobTitle: resumeData.personal.title,
  worksFor: {
    "@type": "Organization",
    name: resumeData.personal.company,
  },
  email: `mailto:${resumeData.personal.email}`,
  url: "https://akshaybhatnagar.dev",
  sameAs: [
    `https://github.com/${resumeData.personal.github}`,
    resumeData.personal.linkedin,
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Large Language Models",
    "Cloud Computing",
    "Azure",
    "Python",
    "TypeScript",
    "Distributed Systems",
  ],
  description: resumeData.about.summary.join(" "),
  alumniOf: {
    "@type": "Organization",
    name: "Microsoft",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD Structured Data for SEO and AI parsers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Links to AI-friendly metadata files */}
        <link rel="alternate" type="application/json" href="/resume.json" title="JSON Resume" />
        <link rel="author" href="/CLAUDE.md" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
