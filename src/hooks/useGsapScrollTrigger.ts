"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScrollTrigger() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((el) => {
        gsap.to(el, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax-fast").forEach((el) => {
        gsap.to(el, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      const timelinePath = document.querySelector(".timeline-path") as SVGPathElement | null;
      if (timelinePath) {
        const pathLength = timelinePath.getTotalLength();
        gsap.set(timelinePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
        gsap.to(timelinePath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: timelinePath.closest("section"),
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".scale-on-scroll").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}
