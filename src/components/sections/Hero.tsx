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
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent-indigo/[0.03] rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent-pink/[0.03] rounded-full blur-[120px] z-0" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div className="flex flex-col gap-8">
          <FadeIn delay={0.2}>
            <span className="inline-flex items-center gap-3 text-[11px] font-mono tracking-[4px] uppercase text-text-secondary">
              <span className="w-10 h-[1px] bg-white/20" />
              Frontend Developer
            </span>
          </FadeIn>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tighter leading-[1.05]">
            <TextReveal delay={0.3}>Neel</TextReveal>
            <br />
            <span className="gradient-text-accent">
              <TextReveal delay={0.5}>KING</TextReveal>
            </span>
          </h1>

          <div className="space-y-4">
            <FadeIn delay={0.7}>
              <p className="text-xl sm:text-2xl text-text-primary max-w-lg font-medium tracking-tight">
                Building in Public — Day 12
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <p className="text-base sm:text-lg text-text-muted max-w-lg leading-relaxed">
                A junior developer documenting every step of the learning journey.
                Turning curiosity into craft — one project at a time.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.9}>
            <div className="flex flex-wrap gap-3 mt-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass rounded-xl px-6 py-5 min-w-[130px] flex-1 sm:flex-none flex flex-col justify-center border-t-white/10 group hover:bg-white/[0.02] transition-colors duration-500"
                >
                  <p className="text-3xl font-semibold font-heading text-white">
                    <AnimatedCounter end={stat.value} suffix="+" duration={2000} />
                  </p>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-muted mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={1.0}>
            <div className="flex flex-wrap gap-4 mt-6">
              <MagneticButton
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold text-[#050505] bg-white hover:bg-gray-200 transition-colors duration-300"
              >
                <span className="relative z-10">View Projects</span>
                <motion.span
                  className="relative z-10 text-lg leading-none"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-white border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
              >
                Get in Touch
              </MagneticButton>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.6} direction="left" className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-indigo/10 to-accent-pink/10 rounded-[2.5rem] blur-2xl transform rotate-3 scale-105 opacity-50" />
          <div className="relative glass-strong rounded-[2.5rem] p-12 transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out shadow-2xl">
            <div className="relative text-center">
              <div className="w-28 h-28 mx-auto mb-8 rounded-2xl bg-gradient-to-tr from-accent-indigo to-accent-pink flex items-center justify-center text-4xl font-bold font-heading text-white shadow-[0_0_40px_rgba(129,140,248,0.3)]">
                NK
              </div>
              <h3 className="text-3xl font-bold font-heading tracking-tight text-white mb-2">Neel King</h3>
              <p className="text-text-muted text-sm font-mono tracking-widest uppercase mb-8">Frontend Developer</p>

              <div className="flex flex-wrap gap-2 justify-center">
                {["HTML5", "CSS3", "Bootstrap", "TypeScript"].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 text-xs font-mono rounded-full bg-black/40 border border-white/10 text-text-secondary hover:text-white hover:border-white/30 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
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
