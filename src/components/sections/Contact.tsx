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
            <h3 className="text-2xl font-bold font-heading mb-4">
              Always open to{" "}
              <span className="gradient-text">Conversations</span>
            </h3>
            <p className="text-text-muted leading-relaxed mb-8">
              I&apos;m a junior developer 12 days into a deliberate learning journey. If you want to give
              feedback on my projects, collaborate on something, or just say hello — I want to hear from you.
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, i) => (
                <FadeIn key={link.label} delay={0.4 + i * 0.1}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-4 glass rounded-xl p-4 hover:border-white/10 transition-all duration-300"
                    data-cursor-hover
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg group-hover:bg-accent-indigo/10 transition-colors duration-300">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">{link.label}</p>
                      <p className="text-sm text-text-primary group-hover:text-accent-indigo transition-colors">
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
            className="glass rounded-2xl p-8 space-y-6"
          >
            {(["name", "email", "message"] as const).map((field) => (
              <div key={field} className="relative">
                <label
                  htmlFor={field}
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono text-xs uppercase tracking-wider ${
                    focused === field || formState[field]
                      ? "-top-2.5 text-accent-indigo text-[10px] bg-surface px-1"
                      : "top-4 text-text-muted"
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
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 pt-5 pb-3 text-sm text-white focus:border-accent-indigo focus:outline-none transition-colors duration-300 resize-none"
                  />
                ) : (
                  <input
                    id={field}
                    type={field === "email" ? "email" : "text"}
                    value={formState[field]}
                    onChange={(e) => setFormState((s) => ({ ...s, [field]: e.target.value }))}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 pt-5 pb-3 text-sm text-white focus:border-accent-indigo focus:outline-none transition-colors duration-300"
                  />
                )}
              </div>
            ))}

            <MagneticButton
              onClick={() => {}}
              className="w-full py-4 rounded-xl font-medium text-white bg-accent-indigo hover:bg-accent-indigo/90 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Send Message</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-pink"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </MagneticButton>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
