"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Layers, GraduationCap } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function About({ profile }: { profile: SiteContent }) {
  const { education } = profile;

  return (
    <section
      id="about"
      className="scroll-mt-20 mx-auto max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 pb-16 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28"
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        {/* Left Column (headline fits single line, text spans towards middle) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:col-span-7 xl:col-span-7 max-w-2xl xl:max-w-3xl lg:-translate-x-8 xl:-translate-x-14 2xl:-translate-x-20"
        >
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[2px] text-accent uppercase">
              ABOUT ME
            </span>
          </div>

          {/* Headline - Scaled to fit on a single clean line on desktop */}
          <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.15rem] xl:text-[2.5rem] 2xl:text-[2.75rem] italic leading-tight tracking-tight text-foreground lg:whitespace-nowrap">
            Building software and intelligent systems.
          </h2>

          {/* Narrative Paragraphs - Adjusted towards middle to cover negative space */}
          <div className="mt-5 space-y-4 font-body max-w-xl xl:max-w-2xl">
            <p className="text-base sm:text-[16.5px] leading-[1.75] text-muted-foreground">
              I&apos;m an Integrated M.Tech Computer Science and Engineering student
              at VIT-AP University, focused on software development and AI/ML.
              I enjoy building practical applications that combine strong software
              engineering with intelligent systems.
            </p>
            <p className="text-sm sm:text-[15px] leading-[1.75] text-muted-foreground/90">
              My projects include full-stack web applications, machine-learning
              systems, and scalable web solutions using technologies such as
              Python, Flask, TensorFlow, React, Next.js, and modern databases.
            </p>
          </div>

          {/* Horizontal Divider */}
          <div className="my-6 sm:my-7 h-px w-full max-w-xl xl:max-w-2xl bg-border/60" />

          {/* 3 Key Engineering Pillars */}
          <div className="flex flex-col gap-5 sm:gap-6 max-w-xl xl:max-w-2xl">
            {/* Pillar 1 */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 text-accent shadow-sm">
                <Code2 size={20} />
              </div>
              <div>
                <h4 className="font-body text-base sm:text-[18px] font-semibold text-foreground">
                  Full-Stack Development
                </h4>
                <p className="mt-1 font-body text-xs sm:text-[14px] leading-relaxed text-muted-foreground">
                  Building responsive, performant web applications and robust API architectures.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 text-accent shadow-sm">
                <Brain size={20} />
              </div>
              <div>
                <h4 className="font-body text-base sm:text-[18px] font-semibold text-foreground">
                  AI & Machine Learning
                </h4>
                <p className="mt-1 font-body text-xs sm:text-[14px] leading-relaxed text-muted-foreground">
                  Designing data pipelines, neural models, and integrating AI into practical software.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 text-accent shadow-sm">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="font-body text-base sm:text-[18px] font-semibold text-foreground">
                  Systems & Architecture
                </h4>
                <p className="mt-1 font-body text-xs sm:text-[14px] leading-relaxed text-muted-foreground">
                  Focused on clean code, database optimization, and scalable modular designs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Enlarged Academic Background Card pulled down slightly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex justify-center lg:col-span-5 xl:col-span-5 lg:justify-end w-full lg:pt-6 xl:pt-10 lg:translate-x-8 xl:translate-x-14 2xl:translate-x-20"
        >
          <div className="liquid-glass-interactive relative flex flex-col rounded-3xl p-8 sm:p-9 xl:p-10 shadow-xl border border-border/80 transition-all duration-300 w-full max-w-[540px] xl:max-w-[570px]">
            {/* Subtle inner radial glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.12) 0%, transparent 60%)",
              }}
            />

            {/* Top Pill Badge */}
            <div className="relative z-10 flex items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/40 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-teal-400 shadow-sm">
                <GraduationCap size={14} className="text-teal-400" />
                <span>Academic Background</span>
              </div>
            </div>

            {/* Name & Degree */}
            <div className="relative z-10 mt-5 space-y-1">
              <h3 className="font-display text-2xl sm:text-[1.85rem] xl:text-[2rem] italic text-foreground tracking-tight">
                {profile.name}
              </h3>
              <p className="font-body text-xs sm:text-sm text-muted-foreground leading-snug">
                {education.degree}
              </p>
            </div>

            {/* Divider */}
            <div className="relative z-10 my-5 h-px w-full bg-border/60" />

            {/* Academic Information 2x2 Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-x-5 gap-y-5 sm:gap-x-7">
              {/* Institution */}
              <div>
                <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  INSTITUTION
                </span>
                <p className="mt-1 font-body text-sm sm:text-[15px] font-semibold text-foreground">
                  {education.institution}
                </p>
                <p className="mt-0.5 font-body text-xs text-muted-foreground">
                  {education.location}
                </p>
              </div>

              {/* Graduation */}
              <div>
                <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  GRADUATION
                </span>
                <p className="mt-1 font-body text-sm sm:text-[15px] font-semibold text-foreground">
                  {education.startYear} — {education.endYear}
                </p>
                <p className="mt-0.5 font-body text-xs text-muted-foreground">
                  Dual Degree
                </p>
              </div>

              {/* CGPA */}
              <div>
                <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  CGPA
                </span>
                <p className="mt-1 font-display text-3xl font-bold italic text-accent">
                  7.68{" "}
                  <span className="font-body text-xs font-normal text-muted-foreground">
                    / 10
                  </span>
                </p>
              </div>

              {/* Status */}
              <div>
                <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  STATUS
                </span>
                <div className="mt-1.5 flex items-center gap-2 font-body text-xs sm:text-sm font-semibold text-emerald-400">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  <span>Open to Opportunities</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative z-10 my-5 h-px w-full bg-border/60" />

            {/* Focus Areas */}
            <div className="relative z-10">
              <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                FOCUS AREAS
              </span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center rounded-full border border-border/80 bg-white/5 dark:bg-white/[0.04] px-4 py-1.5 font-body text-xs sm:text-[13px] font-medium text-foreground transition-colors hover:border-accent/40 shadow-sm">
                  Software Development
                </span>
                <span className="inline-flex items-center rounded-full border border-border/80 bg-white/5 dark:bg-white/[0.04] px-4 py-1.5 font-body text-xs sm:text-[13px] font-medium text-foreground transition-colors hover:border-accent/40 shadow-sm">
                  AI & Machine Learning
                </span>
                <span className="inline-flex items-center rounded-full border border-border/80 bg-white/5 dark:bg-white/[0.04] px-4 py-1.5 font-body text-xs sm:text-[13px] font-medium text-foreground transition-colors hover:border-accent/40 shadow-sm">
                  Full-Stack Web
                </span>
                <span className="inline-flex items-center rounded-full border border-border/80 bg-white/5 dark:bg-white/[0.04] px-4 py-1.5 font-body text-xs sm:text-[13px] font-medium text-foreground transition-colors hover:border-accent/40 shadow-sm">
                  Computer Vision
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}