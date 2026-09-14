"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Layers, GraduationCap } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function About({ profile }: { profile: SiteContent }) {
  const { education } = profile;

  return (
    <section
      id="about"
      className="scroll-mt-20 mx-auto max-w-[1240px] px-6 sm:px-8 lg:px-10 pt-24 pb-20 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28"
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* Left Column (58-60% width on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:col-span-7"
        >
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-accent uppercase">
              ABOUT ME
            </span>
          </div>

          {/* Headline */}
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] italic leading-[1.1] tracking-tight text-foreground">
            Building software and intelligent systems.
          </h2>

          {/* Narrative Paragraphs */}
          <div className="mt-6 space-y-4 font-body max-w-xl xl:max-w-[560px]">
            <p className="text-base sm:text-[17px] leading-[1.65] text-muted-foreground">
              I&apos;m an Integrated M.Tech Computer Science and Engineering student
              at VIT-AP University, focused on software development and AI/ML.
              I enjoy building practical applications that combine strong software
              engineering with intelligent systems.
            </p>
            <p className="text-sm sm:text-[15px] leading-[1.65] text-muted-foreground/85">
              My projects include full-stack web applications, machine-learning
              systems, and scalable web solutions using technologies such as
              Python, Flask, TensorFlow, React, Next.js, and modern databases.
            </p>
          </div>

          {/* Horizontal Divider */}
          <div className="my-7 h-px w-full max-w-xl xl:max-w-[560px] bg-border/60" />

          {/* 3 Key Engineering Pillars */}
          <div className="flex flex-col gap-5 max-w-xl xl:max-w-[560px]">
            {/* Pillar 1 */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent shadow-sm">
                <Code2 size={18} />
              </div>
              <div>
                <h4 className="font-body text-[15px] sm:text-base font-semibold text-foreground">
                  Full-Stack Development
                </h4>
                <p className="mt-0.5 font-body text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  Building responsive, performant web applications and robust API architectures.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent shadow-sm">
                <Brain size={18} />
              </div>
              <div>
                <h4 className="font-body text-[15px] sm:text-base font-semibold text-foreground">
                  AI & Machine Learning
                </h4>
                <p className="mt-0.5 font-body text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  Designing data pipelines, neural models, and integrating AI into practical software.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent shadow-sm">
                <Layers size={18} />
              </div>
              <div>
                <h4 className="font-body text-[15px] sm:text-base font-semibold text-foreground">
                  Systems & Architecture
                </h4>
                <p className="mt-0.5 font-body text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  Focused on clean code, database optimization, and scalable modular designs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Polished Academic Background Card (40-42% width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="lg:col-span-5 w-full max-w-[480px] lg:max-w-none"
        >
          <div className="liquid-glass-interactive relative flex flex-col rounded-3xl p-6 sm:p-7 shadow-xl border border-border/80 transition-all duration-300">
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
              <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-950/40 px-3 py-1 text-xs font-semibold tracking-wide text-teal-400 shadow-sm">
                <GraduationCap size={13} className="text-teal-400" />
                <span>Academic Background</span>
              </div>
            </div>

            {/* Name & Degree */}
            <div className="relative z-10 mt-4 space-y-0.5">
              <h3 className="font-display text-2xl sm:text-[1.65rem] italic text-foreground tracking-tight">
                {profile.name}
              </h3>
              <p className="font-body text-xs sm:text-sm text-muted-foreground leading-snug">
                {education.degree}
              </p>
            </div>

            {/* Divider */}
            <div className="relative z-10 my-4 h-px w-full bg-border/60" />

            {/* Academic Information 2x2 Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-4">
              {/* Institution */}
              <div>
                <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  INSTITUTION
                </span>
                <p className="mt-1 font-body text-sm font-semibold text-foreground">
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
                <p className="mt-1 font-body text-sm font-semibold text-foreground">
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
                <p className="mt-1 font-display text-2xl font-bold italic text-accent">
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
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  <span>Open to Opportunities</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative z-10 my-4 h-px w-full bg-border/60" />

            {/* Focus Areas */}
            <div className="relative z-10">
              <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                FOCUS AREAS
              </span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-border/80 bg-white/5 dark:bg-white/[0.04] px-3 py-1 font-body text-xs font-medium text-foreground transition-colors hover:border-accent/40 shadow-sm">
                  Software Development
                </span>
                <span className="inline-flex items-center rounded-full border border-border/80 bg-white/5 dark:bg-white/[0.04] px-3 py-1 font-body text-xs font-medium text-foreground transition-colors hover:border-accent/40 shadow-sm">
                  AI & Machine Learning
                </span>
                <span className="inline-flex items-center rounded-full border border-border/80 bg-white/5 dark:bg-white/[0.04] px-3 py-1 font-body text-xs font-medium text-foreground transition-colors hover:border-accent/40 shadow-sm">
                  Full-Stack Web
                </span>
                <span className="inline-flex items-center rounded-full border border-border/80 bg-white/5 dark:bg-white/[0.04] px-3 py-1 font-body text-xs font-medium text-foreground transition-colors hover:border-accent/40 shadow-sm">
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