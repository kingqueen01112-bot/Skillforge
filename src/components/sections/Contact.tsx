"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";

const socialLinks = [
  { label: "Email", value: "hello@neelking.dev", icon: "✉", href: "mailto:hello@neelking.dev" },
  { label: "Github", value: "@neelking", icon: "⟁", href: "#" },
  { label: "LinkedIn", value: "@neelking", icon: "◈", href: "#" },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section id="contact" className="relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <FadeIn>
        <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[3px] uppercase text-accent-indigo">
          {"// Contact"}
        </span>
      </FadeIn>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-3">
        <TextReveal delay={0.1}>Let&apos;s</TextReveal>{" "}
        <span className="gradient-text">
          <TextReveal delay={0.3}>Connect</TextReveal>
        </span>
      </h2>

      <FadeIn delay={0.2}>
        <p className="text-text-secondary text-lg max-w-xl mb-12">
          Open to feedback, collaboration, and opportunities.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <FadeIn delay={0.3}>
          <div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-white">
              Always open to{" "}
              <span className="gradient-text-accent">Conversations</span>
            </h3>
            <p className="text-text-secondary leading-relaxed mb-8">
              I&apos;m a junior developer 12 days into a deliberate learning journey. If you want to give
              feedback on my projects, collaborate on something, or just say hello — I want to hear from you.
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, i) => (
                <FadeIn key={link.label} delay={0.4 + i * 0.1}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-5 glass rounded-2xl p-4 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500"
                    data-cursor-hover
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-xl text-text-secondary group-hover:text-white group-hover:border-white/20 transition-all duration-500">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] mb-1">{link.label}</p>
                      <p className="text-sm font-medium text-white group-hover:text-accent-indigo transition-colors duration-300">
                        {link.value}
                      </p>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} direction="left">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-indigo/5 rounded-full blur-[80px] pointer-events-none" />

            {(["name", "email", "message"] as const).map((field) => (
              <div key={field} className="relative z-10">
                <label
                  htmlFor={field}
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono uppercase tracking-wider ${
                    focused === field || formState[field]
                      ? "-top-2.5 text-white/80 text-[10px] bg-[#0a0a0a] px-2 py-0.5 rounded-full"
                      : "top-4 text-text-muted text-[11px]"
                  }`}
                >
                  {field}
                </label>
                {field === "message" ? (
                  <textarea
                    id={field}
                    rows={4}
                    value={formState[field]}
                    onChange={(e) => setFormState((s) => ({ ...s, [field]: e.target.value }))}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 pt-5 pb-3 text-sm text-white focus:border-white/30 focus:bg-white/5 focus:outline-none transition-all duration-300 resize-none"
                  />
                ) : (
                  <input
                    id={field}
                    type={field === "email" ? "email" : "text"}
                    value={formState[field]}
                    onChange={(e) => setFormState((s) => ({ ...s, [field]: e.target.value }))}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 pt-5 pb-3 text-sm text-white focus:border-white/30 focus:bg-white/5 focus:outline-none transition-all duration-300"
                  />
                )}
              </div>
            ))}

            <MagneticButton
              className="w-full relative z-10 group flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-sm font-semibold text-[#050505] bg-white hover:bg-gray-200 transition-colors duration-300 overflow-hidden"
            >
              <span className="relative z-10">Send Message</span>
              <motion.span
                className="relative z-10 text-lg leading-none"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </MagneticButton>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
