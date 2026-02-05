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
    "software engineer",
    "AI infrastructure",
    "GenAI",
    "Microsoft",
    "portfolio",
    "machine learning",
    "LLMs",
  ],
  authors: [{ name: resumeData.personal.name }],
  openGraph: {
    title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
    description: resumeData.personal.bio,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
    description: resumeData.personal.bio,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
