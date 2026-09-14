"use client";

import { motion } from "framer-motion";
import { SKILL_CATEGORIES, type SkillCategory } from "@/lib/data/skills";

const MONOCHROME_ICONS = new Set(["github", "flask", "vercel"]);

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-16 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16 md:py-24"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 lg:mb-12"
      >
        <span className="font-body text-xs sm:text-sm font-bold tracking-widest text-accent uppercase">
          TECHNICAL STACK
        </span>
        <h2 className="mt-2 font-display text-4xl italic text-foreground md:text-5xl tracking-tight">
          Skills & Technologies
        </h2>
      </motion.div>

      {/* 4-Column Balanced Category Pods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
        {SKILL_CATEGORIES.map((category: SkillCategory, catIdx: number) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: catIdx * 0.08 }}
            className="liquid-glass-interactive group relative flex h-full flex-col items-center rounded-3xl p-6 sm:p-7 shadow-xl transition-all duration-300"
          >
            {/* Ambient inner glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 20%, rgba(20, 184, 166, 0.12) 0%, transparent 70%)",
              }}
            />

            {/* Category Header Badge */}
            <div className="relative z-10 mb-6 flex w-full justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <h3 className="font-body text-xs sm:text-sm font-semibold tracking-wide text-foreground whitespace-nowrap">
                  {category.name}
                </h3>
              </div>
            </div>

            {/* Symmetrical Grid of Skills */}
            <div className="relative z-10 grid w-full flex-1 grid-cols-2 gap-4 place-items-center sm:gap-5">
              {category.skills.map((skill, skillIdx) => {
                const isMonochrome = MONOCHROME_ICONS.has(skill.iconKey);
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: catIdx * 0.05 + skillIdx * 0.03,
                    }}
                    className="group/skill flex flex-col items-center gap-2 cursor-pointer"
                  >
                    {/* Liquid Glass Circular Bubble */}
                    <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-md backdrop-blur-md transition-all duration-300 group-hover/skill:scale-110 group-hover/skill:border-accent group-hover/skill:shadow-[0_0_20px_rgba(20,184,166,0.35)] dark:bg-white/[0.06] dark:border-white/15">
                      <img
                        src={`/icons/skills/${skill.iconKey}.svg`}
                        alt={`${skill.name} icon`}
                        loading="lazy"
                        className={`h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform duration-300 group-hover/skill:scale-105 ${
                          isMonochrome ? "invert [.light_&]:invert-0" : ""
                        }`}
                      />
                    </div>

                    {/* Skill Label */}
                    <span className="font-body text-xs font-medium text-foreground/80 transition-colors duration-200 group-hover/skill:text-accent text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}