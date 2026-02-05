"use client";

import { resumeData } from "@/data/resume";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { personal } = resumeData;

  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>
            &copy; {currentYear} {personal.name}
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Available
          </p>
        </div>
      </div>
    </footer>
  );
}
