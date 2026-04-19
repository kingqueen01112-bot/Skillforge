"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
});

const stats = [
  { value: 12, label: "DAYS OF LEARNING" },
  { value: 3, label: "PROJECTS BUILT" },
  { value: 4, label: "SKILLS" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <HeroScene />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-indigo/10 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-pink/10 rounded-full blur-[120px] z-0" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div className="flex flex-col gap-6">
          <FadeIn delay={0.2}>
            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[3px] uppercase text-text-secondary">
              <span className="w-8 h-[1px] bg-accent-indigo" />
              Frontend Developer
            </span>
          </FadeIn>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95]">
            <TextReveal delay={0.3}>Neel</TextReveal>
            <br />
            <span className="gradient-text">
              <TextReveal delay={0.5}>KING</TextReveal>
            </span>
          </h1>

          <FadeIn delay={0.7}>
            <p className="text-lg sm:text-xl text-text-secondary max-w-lg leading-relaxed">
              Building in Public — Day 12
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <p className="text-base text-text-muted max-w-lg leading-relaxed">
              A junior developer documenting every step of the learning journey.
              Turning curiosity into craft — one project at a time.
            </p>
          </FadeIn>

          <FadeIn delay={0.9}>
            <div className="flex flex-wrap gap-4 mt-2">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass rounded-xl px-5 py-4 min-w-[120px] text-center group hover:border-accent-indigo/30 transition-all duration-300"
                >
                  <p className="text-2xl font-bold font-heading gradient-text">
                    <AnimatedCounter end={stat.value} suffix="+" duration={2000} />
                  </p>
                  <p className="text-[10px] tracking-[2px] uppercase text-text-muted mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={1.0}>
            <div className="flex flex-wrap gap-4 mt-4">
              <MagneticButton
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white bg-accent-indigo hover:bg-accent-indigo/90 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white border border-white/10 hover:border-accent-indigo/50 hover:bg-white/[0.03] transition-all duration-300"
              >
                Get in Touch
              </MagneticButton>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.6} direction="left" className="hidden lg:block">
          <div className="relative">
            <div className="glass rounded-3xl p-1 rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="rounded-[20px] overflow-hidden bg-surface-light aspect-[3/4] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/20 via-transparent to-accent-pink/20" />
                <div className="relative text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-indigo to-accent-pink flex items-center justify-center text-4xl font-bold font-heading">
                    NK
                  </div>
                  <h3 className="text-2xl font-bold font-heading">Neel KING</h3>
                  <p className="text-text-secondary mt-2">Frontend Developer</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {["HTML5", "CSS3", "Bootstrap", "TypeScript"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-cyan/20 rounded-full blur-[60px]" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-pink/20 rounded-full blur-[60px]" />
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={1.3} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs tracking-[3px] uppercase">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="opacity-50">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <motion.circle
              cx="8"
              cy="8"
              r="2"
              fill="currentColor"
              animate={{ cy: [8, 16, 8] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </FadeIn>
    </section>
  );
}
