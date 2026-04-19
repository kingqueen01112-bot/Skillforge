"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import GlassCard from "@/components/ui/GlassCard";

const SkillsGlobe = dynamic(() => import("@/components/3d/SkillsGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] lg:h-[500px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-indigo/30 border-t-accent-indigo rounded-full animate-spin" />
    </div>
  ),
});

const skills = [
  {
    title: "HTML5",
    count: 3,
    color: "#f97316",
    items: [
      { name: "Semantic Structure", level: 90 },
      { name: "Accessibility", level: 70 },
      { name: "Forms & Validation", level: 85 },
    ],
  },
  {
    title: "CSS3",
    count: 4,
    color: "#3b82f6",
    items: [
      { name: "CSS Grid", level: 85 },
      { name: "Flexbox", level: 80 },
      { name: "Animations", level: 75 },
      { name: "Responsive Design", level: 80 },
    ],
  },
  {
    title: "Bootstrap",
    count: 3,
    color: "#8b5cf6",
    items: [
      { name: "Components", level: 80 },
      { name: "Grid System", level: 85 },
      { name: "Utilities", level: 75 },
    ],
  },
  {
    title: "Design",
    count: 3,
    color: "#14b8a6",
    items: [
      { name: "Typography", level: 80 },
      { name: "Color Theory", level: 75 },
      { name: "Layouts", level: 85 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-text-secondary">{name}</span>
        <span className="text-text-muted font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden relative">
        <FadeIn delay={delay} direction="right">
          <div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              width: `${level}%`,
              background: `linear-gradient(90deg, ${color}, ${color}80)`,
              boxShadow: `0 0 12px ${color}40`,
            }}
          >
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/3 -right-40 w-80 h-80 bg-accent-indigo/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        <div>
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[3px] uppercase text-accent-indigo">
              {"// Expertise"}
            </span>
          </FadeIn>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-3">
            <TextReveal delay={0.1}>Skills &</TextReveal>{" "}
            <span className="gradient-text">
              <TextReveal delay={0.3}>Proficiency</TextReveal>
            </span>
          </h2>

          <FadeIn delay={0.2}>
            <p className="text-text-secondary text-lg max-w-xl mb-8">
              Every skill listed here was earned in the last 12 days of deliberate practice.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Suspense>
              <SkillsGlobe />
            </Suspense>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skills.map((skill, i) => (
            <FadeIn key={skill.title} delay={0.1 + i * 0.1}>
              <GlassCard className="h-full hover:border-white/10 transition-all duration-500 group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${skill.color}15`,
                    color: skill.color,
                    boxShadow: `0 0 20px ${skill.color}10`,
                  }}
                >
                  {skill.title.charAt(0)}
                </div>
                <h3 className="text-xl font-bold font-heading">{skill.title}</h3>
                <p className="text-xs text-text-muted mt-1 font-mono">{skill.count} Skills</p>
                <div className="mt-4">
                  {skill.items.map((item, j) => (
                    <SkillBar
                      key={item.name}
                      name={item.name}
                      level={item.level}
                      color={skill.color}
                      delay={0.3 + i * 0.1 + j * 0.05}
                    />
                  ))}
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
