"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Layers } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function About({ profile }: { profile: SiteContent }) {
  const { education } = profile;

  return (
    <section id="about" className="scroll-mt-20 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-16 pb-8 md:pt-24 md:pb-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 lg:mb-16"
      >
        <span className="font-body text-sm sm:text-base md:text-lg font-bold tracking-wider text-accent uppercase">
          ABOUT ME
        </span>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] italic leading-[1.2] tracking-tight text-foreground">
          Building software and intelligent systems.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Narrative & Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 lg:col-span-7 xl:col-span-7"
        >
          <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
            I&apos;m an Integrated M.Tech Computer Science and Engineering student
            at VIT-AP University, focused on software development and AI/ML.
            I enjoy building practical applications that combine strong software
            engineering with intelligent systems.
          </p>

          <p className="font-body text-sm leading-relaxed text-muted-foreground/80 sm:text-base">
            My projects include full-stack web applications, machine-learning
            systems, and scalable web solutions using technologies such as
            Python, Flask, TensorFlow, React, Next.js, and modern databases.
          </p>

          {/* Key Engineering Pillars */}
          <div className="mt-2 flex flex-col gap-4 border-t border-border/60 pt-6">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Code2 size={20} />
              </div>
              <div>
                <h4 className="font-body text-base font-semibold text-foreground">Full-Stack Development</h4>
                <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                  Building responsive, performant web applications and robust API architectures.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Brain size={20} />
              </div>
              <div>
                <h4 className="font-body text-base font-semibold text-foreground">AI & Machine Learning</h4>
                <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                  Designing data pipelines, neural models, and integrating AI into practical software.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="font-body text-base font-semibold text-foreground">Systems & Architecture</h4>
                <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                  Focused on clean code, database optimization, and scalable modular designs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Polished Profile & Academic Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-5 xl:col-span-5"
        >
          <div className="liquid-glass-interactive relative flex flex-col gap-6 rounded-3xl p-7 sm:p-8 shadow-xl transition-all duration-300">
            {/* Identity & Header */}
            <div>
              <span className="font-body text-xs font-semibold tracking-wider text-accent uppercase">
                Academic Background
              </span>
              <h3 className="mt-1.5 font-display text-2xl sm:text-3xl italic text-foreground">
                {profile.name}
              </h3>
              <p className="mt-1 font-body text-sm font-medium text-muted-foreground">
                {education.degree}
              </p>
            </div>

            <div className="h-px w-full bg-border/60" />

            {/* Academic Information Grid */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <span className="font-body text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Institution
                </span>
                <p className="mt-1.5 font-body text-sm sm:text-base font-semibold text-foreground">
                  {education.institution}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {education.location}
                </p>
              </div>

              <div>
                <span className="font-body text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Graduation
                </span>
                <p className="mt-1.5 font-body text-sm sm:text-base font-semibold text-foreground">
                  {education.startYear} — {education.endYear}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  Dual Degree
                </p>
              </div>

              <div>
                <span className="font-body text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  CGPA
                </span>
                <p className="mt-1 font-display text-2xl font-bold italic text-accent">
                  7.68{" "}
                  <span className="font-body text-xs font-normal text-muted-foreground">
                    / 10
                  </span>
                </p>
              </div>

              <div>
                <span className="font-body text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Status
                </span>
                <div className="mt-1.5 flex items-center gap-2 font-body text-xs sm:text-sm font-semibold text-emerald-400">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  Open to Opportunities
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-border/60" />

            {/* Focus Areas */}
            <div>
              <span className="font-body text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Focus Areas
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-xl border border-border/80 bg-muted/40 px-3.5 py-1.5 font-body text-xs font-medium text-foreground transition-colors hover:border-accent/40">
                  Software Development
                </span>
                <span className="inline-flex items-center rounded-xl border border-border/80 bg-muted/40 px-3.5 py-1.5 font-body text-xs font-medium text-foreground transition-colors hover:border-accent/40">
                  AI & Machine Learning
                </span>
                <span className="inline-flex items-center rounded-xl border border-border/80 bg-muted/40 px-3.5 py-1.5 font-body text-xs font-medium text-foreground transition-colors hover:border-accent/40">
                  Full-Stack Web
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}