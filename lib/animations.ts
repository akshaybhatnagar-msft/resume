"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Check for reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Default animation config
export const defaultEase = "power4.out";
export const defaultDuration = 1;

// Hero section animations
export const animateHero = (container: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(container.querySelectorAll(".hero-animate"), { opacity: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: defaultEase } });

  // Profile image
  tl.fromTo(
    container.querySelector(".hero-image"),
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8 }
  );

  // Name
  tl.fromTo(
    container.querySelector(".hero-name"),
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    "-=0.4"
  );

  // Title
  tl.fromTo(
    container.querySelector(".hero-title"),
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    "-=0.5"
  );

  // Bio
  tl.fromTo(
    container.querySelector(".hero-bio"),
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    "-=0.4"
  );

  // Social links (staggered)
  tl.fromTo(
    container.querySelectorAll(".hero-social"),
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
    "-=0.3"
  );

  // Scroll indicator
  tl.fromTo(
    container.querySelector(".scroll-indicator"),
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.5 },
    "-=0.2"
  );

  return tl;
};

// Scroll-triggered fade in from bottom
export const createScrollFadeIn = (
  element: HTMLElement,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return;
  }

  const { y = 60, duration = 0.8, delay = 0, start = "top 80%" } = options;

  gsap.fromTo(
    element,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: defaultEase,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Staggered children animation
export const createStaggeredReveal = (
  container: HTMLElement,
  childSelector: string,
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
    start?: string;
  } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(container.querySelectorAll(childSelector), { opacity: 1, y: 0 });
    return;
  }

  const {
    y = 40,
    stagger = 0.15,
    duration = 0.6,
    start = "top 80%",
  } = options;

  gsap.fromTo(
    container.querySelectorAll(childSelector),
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: defaultEase,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Skill bar animation
export const animateSkillBars = (container: HTMLElement) => {
  if (prefersReducedMotion()) {
    container.querySelectorAll(".skill-bar-fill").forEach((bar) => {
      const width = (bar as HTMLElement).dataset.level;
      gsap.set(bar, { width: `${width}%` });
    });
    return;
  }

  container.querySelectorAll(".skill-bar-fill").forEach((bar) => {
    const width = (bar as HTMLElement).dataset.level;
    gsap.fromTo(
      bar,
      { width: "0%" },
      {
        width: `${width}%`,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};

// Slide in from left animation
export const createSlideInLeft = (
  element: HTMLElement,
  options: {
    x?: number;
    duration?: number;
    delay?: number;
    start?: string;
  } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, x: 0 });
    return;
  }

  const { x = -60, duration = 0.8, delay = 0, start = "top 80%" } = options;

  gsap.fromTo(
    element,
    { x, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease: defaultEase,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Parallax effect
export const createParallax = (
  element: HTMLElement,
  options: {
    y?: number;
    speed?: number;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const { y = 100 } = options;

  gsap.to(element, {
    y,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Clean up all scroll triggers
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
