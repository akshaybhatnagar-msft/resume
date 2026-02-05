"use client";

import { resumeData } from "@/data/resume";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { personal } = resumeData;

  return (
    <footer className="py-8 border-t border-border/30">
      <div className="container">
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
    </footer>
  );
}
