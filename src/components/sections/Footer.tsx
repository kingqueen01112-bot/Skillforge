"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 pb-8">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-accent-indigo/30 to-transparent mb-12" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <a href="#hero" onClick={handleScrollTop} className="text-xl font-heading font-bold" data-cursor-hover>
                Skill<span className="gradient-text">Forge</span>
              </a>
              <p className="text-sm text-text-muted mt-2">
                Built with Next.js, Three.js, and Framer Motion by Neel King
              </p>
            </div>

            <div className="flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-text-muted hover:text-white transition-colors duration-300"
                  data-cursor-hover
                >
                  {link.label}
                </a>
              ))}
            </div>

            <motion.button
              onClick={handleScrollTop}
              whileHover={{ y: -3 }}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-accent-indigo/50 transition-all duration-300"
              data-cursor-hover
              aria-label="Back to top"
            >
              ↑
            </motion.button>
          </div>
        </FadeIn>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Neel King. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
