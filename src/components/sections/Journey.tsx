"use client";

import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";

const milestones = [
  { day: "DAY 01", title: "HTML Fundamentals", description: "Semantic structure, headings, paragraphs, links, images. Built first full HTML page from scratch.", tags: ["HTML5"], color: "#f97316" },
  { day: "DAY 02", title: "CSS Selectors & Box Model", description: "Margins, padding, borders, display types. First time a page started looking intentional.", tags: ["CSS3"], color: "#3b82f6" },
  { day: "DAY 03 — 04", title: "CSS Grid — Iron Will", description: "Grid layout from scratch. Built Iron Will fitness dashboard. First project deployed to Vercel.", tags: ["CSS3", "Grid"], color: "#3b82f6" },
  { day: "DAY 05", title: "Flexbox Mastery", description: "Flex direction, wrap, alignment axes. Built a component library of Flexbox patterns.", tags: ["Flexbox"], color: "#3b82f6" },
  { day: "DAY 06", title: "CSS Animations", description: "Keyframes, transitions, timing functions. Added motion to existing projects without breaking anything.", tags: ["Animations"], color: "#3b82f6" },
  { day: "DAY 07 — 08", title: "Bootstrap 5 — Dev Hub", description: "First CSS framework project. Bootstrap grid, navbar, cards, and responsive utilities combined with custom styles.", tags: ["Bootstrap"], color: "#8b5cf6" },
  { day: "DAY 10 — 11", title: "Design Systems — Eventrix", description: "CSS Custom Properties, design tokens, spacing systems. Built Eventrix with full variable-driven design.", tags: ["Design", "Variables"], color: "#14b8a6" },
  { day: "DAY 12", title: "SkillForge — This Dashboard", description: "Applying everything learned to build a full portfolio. 3D techniques, design systems, and responsive layout.", tags: ["HTML5", "CSS3", "Bootstrap"], color: "#6366f1" },
];

const tagColors: Record<string, string> = {
  HTML5: "#f97316", CSS3: "#3b82f6", Grid: "#3b82f6", Flexbox: "#3b82f6",
  Animations: "#3b82f6", Bootstrap: "#8b5cf6", Design: "#14b8a6", Variables: "#14b8a6",
};

export default function Journey() {
  return (
    <section id="journey" className="relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <FadeIn>
        <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[3px] uppercase text-accent-cyan">
          // Journey
        </span>
      </FadeIn>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-3">
        <TextReveal delay={0.1}>12-Day</TextReveal>{" "}
        <span className="gradient-text">
          <TextReveal delay={0.3}>Journey</TextReveal>
        </span>
      </h2>

      <FadeIn delay={0.2}>
        <p className="text-text-secondary text-lg max-w-xl mb-16">
          Every day logged. Every milestone earned. This is what consistent daily practice looks like.
        </p>
      </FadeIn>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-indigo/50 via-accent-pink/50 to-accent-cyan/50" />

        <div className="space-y-12">
          {milestones.map((milestone, i) => {
            const isLeft = i % 2 === 0;
            return (
              <FadeIn
                key={milestone.day}
                delay={0.1 + i * 0.08}
                direction={isLeft ? "right" : "left"}
              >
                <div className={`relative flex items-start gap-8 md:gap-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}>
                  <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="glass rounded-2xl p-6 hover:border-white/10 transition-all duration-500 group">
                      <span
                        className="text-xs font-mono font-bold tracking-[2px]"
                        style={{ color: milestone.color }}
                      >
                        {milestone.day}
                      </span>
                      <h3 className="text-lg font-bold font-heading mt-2 mb-2 group-hover:text-white transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {milestone.description}
                      </p>
                      <div className={`flex flex-wrap gap-2 mt-4 ${isLeft ? "justify-end" : ""}`}>
                        {milestone.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-[10px] font-mono rounded-full border"
                            style={{
                              borderColor: `${tagColors[tag]}30`,
                              color: tagColors[tag],
                              background: `${tagColors[tag]}08`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10"
                    style={{
                      borderColor: milestone.color,
                      background: `${milestone.color}30`,
                      boxShadow: `0 0 12px ${milestone.color}40`,
                    }}
                  />

                  <div className="md:hidden pl-10">
                    <span className="text-xs font-mono font-bold tracking-[2px]" style={{ color: milestone.color }}>
                      {milestone.day}
                    </span>
                    <h3 className="text-lg font-bold font-heading mt-1 mb-2">{milestone.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{milestone.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {milestone.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[10px] font-mono rounded-full border"
                          style={{ borderColor: `${tagColors[tag]}30`, color: tagColors[tag], background: `${tagColors[tag]}08` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:pl-12" : "md:pr-12"}`} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
