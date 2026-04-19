"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import GlassCard from "@/components/ui/GlassCard";

const projects = [
  {
    title: "Iron Will Fitness",
    description:
      "A fitness and discipline tracking dashboard. Built to practice semantic HTML structure, CSS Grid layout, and responsive design across screen sizes.",
    tags: ["HTML5", "CSS3", "Grid"],
    period: "Day 3 — 4",
    color: "#f97316",
  },
  {
    title: "Dev Hub",
    description:
      "A developer resource landing page built with Bootstrap 5. First time combining a CSS framework with custom styles. Cards, badges, navbar, and responsive breakpoints.",
    tags: ["HTML5", "CSS3", "Bootstrap"],
    period: "Day 7 — 8",
    color: "#8b5cf6",
  },
  {
    title: "Eventrix",
    description:
      "An event listing and registration UI. Built to practice Flexbox component alignment, CSS animations for entrance effects, and integrating Bootstrap with a custom design system.",
    tags: ["HTML5", "CSS3", "Bootstrap", "Design"],
    period: "Day 10 — 11",
    color: "#06b6d4",
  },
];

const tagColors: Record<string, string> = {
  HTML5: "#f97316",
  CSS3: "#3b82f6",
  Grid: "#3b82f6",
  Bootstrap: "#8b5cf6",
  Design: "#14b8a6",
};

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <FadeIn>
        <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[3px] uppercase text-accent-pink">
          {"// Portfolio"}
        </span>
      </FadeIn>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-3">
        <TextReveal delay={0.1}>Projects</TextReveal>{" "}
        <span className="gradient-text">
          <TextReveal delay={0.3}>Built</TextReveal>
        </span>
      </h2>

      <FadeIn delay={0.2}>
        <p className="text-text-secondary text-lg max-w-xl mb-12">
          Three real projects. Every one pushed to production and deployed live.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <FadeIn key={project.title} delay={0.1 + i * 0.15}>
            <GlassCard className="h-full group hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden p-8">
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)` }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-medium text-text-muted tracking-widest uppercase">{project.period}</span>
                  <motion.a
                    href="#"
                    whileHover={{ rotate: -45, scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                    data-cursor-hover
                  >
                    ↗
                  </motion.a>
                </div>

                <h3 className="text-2xl font-bold font-heading mb-4 text-white group-hover:text-accent-indigo transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-[11px] font-mono rounded-md border border-white/5 bg-black/40 text-text-secondary group-hover:border-white/10 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
