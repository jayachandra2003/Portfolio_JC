"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Activity, Layers, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/sections/project-card";
import type { Project } from "@/lib/types";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <p className="font-body text-muted-foreground">
        No projects found.
      </p>
    );
  }

  // Identify featured project (SkyWrite) and the other projects
  const featuredProject = projects.find((p) => p.featured || p.slug === "skywrite") ?? projects[0];
  const gridProjects = featuredProject ? projects.filter((p) => p.id !== featuredProject.id) : projects;

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 1. Featured Spotlight Hero Project */}
      {featuredProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="liquid-glass-interactive relative overflow-hidden rounded-3xl p-6 sm:p-9 md:p-10 shadow-2xl transition-all duration-300"
        >
          {/* Subtle glowing ambient accent in corner */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Column (7 cols): Narrative & Performance Metrics */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="accent">
                    Featured Project
                  </Badge>
                  <span className="font-mono text-xs font-semibold text-accent">
                    Computer Vision • Deep Learning
                  </span>
                </div>

                <h3 className="font-display text-3xl text-card-foreground sm:text-4xl">
                  {featuredProject.title}
                </h3>
                <p className="mt-1 font-body text-sm font-medium text-accent sm:text-base">
                  Real-Time Touchless AI Whiteboard
                </p>

                <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {featuredProject.description}
                </p>

                {/* Key Telemetry & Architecture Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-3 border-y border-border/60 py-4 sm:gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-accent">
                      <Activity size={14} />
                      <span className="font-mono text-xl font-bold sm:text-2xl">~87%</span>
                    </div>
                    <p className="mt-0.5 font-body text-[11px] text-muted-foreground sm:text-xs">
                      CNN Recognition
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-foreground">
                      <Layers size={14} />
                      <span className="font-mono text-xl font-bold sm:text-2xl">21-Point</span>
                    </div>
                    <p className="mt-0.5 font-body text-[11px] text-muted-foreground sm:text-xs">
                      MediaPipe Tracking
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Cpu size={14} />
                      <span className="font-mono text-xl font-bold sm:text-2xl">60 FPS</span>
                    </div>
                    <p className="mt-0.5 font-body text-[11px] text-muted-foreground sm:text-xs">
                      Real-Time Inference
                    </p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {featuredProject.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
                {featuredProject.caseStudySlug && (
                  <Link
                    href={`/projects/${featuredProject.caseStudySlug}`}
                    className={buttonVariants({
                      variant: "primary",
                      className: "gap-2 px-5 py-2.5 font-body text-sm font-semibold shadow-md",
                    })}
                  >
                    Case Study <ArrowRight size={15} />
                  </Link>
                )}

                {featuredProject.repoUrl && (
                  <a
                    href={featuredProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      className: "gap-2 px-4 py-2.5 font-body text-sm font-medium hover:border-accent/40",
                    })}
                  >
                    <Github size={15} /> View Code
                  </a>
                )}

                {featuredProject.demoUrl && (
                  <a
                    href={featuredProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      variant: "ghost",
                      className: "gap-1.5 px-3 py-2.5 font-body text-sm text-muted-foreground hover:text-foreground",
                    })}
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Right Column (5 cols): Interactive App Window Preview */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/70 shadow-2xl backdrop-blur-md">
                {/* Pipeline Header */}
                <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-4 py-3">
                  <span className="font-mono text-xs font-semibold text-foreground">
                    Live Vision Pipeline
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 60 FPS ACTIVE
                  </span>
                </div>

                {/* Pipeline Stats & Simulated Output */}
                <div className="space-y-3.5 p-5 font-mono text-xs">
                  <div className="rounded-xl border border-border/50 bg-card/90 p-3.5 shadow-sm">
                    <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                      <span>Landmark Detection</span>
                      <span className="font-semibold text-accent">Index Tip (x: 482, y: 290)</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                      <div className="h-full w-4/5 rounded-full bg-accent transition-all" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-card/90 p-3.5 shadow-sm">
                    <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                      <span>Canvas Gesture State</span>
                      <span className="font-semibold text-emerald-400">DRAWING_ACTIVE</span>
                    </div>
                    <p className="mt-1 font-body text-[11px] text-muted-foreground">
                      Temporal Stroke Smoothing: 0.85 • Resolution: 1920x1080
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-card/90 p-3.5 shadow-sm">
                    <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                      <span>CNN Model Classifier</span>
                      <span className="font-semibold text-accent">EMNIST ByClass</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                      <span className="text-[11px] text-muted-foreground">Detected Character:</span>
                      <span className="font-mono text-sm font-bold text-accent">"A" (91.2%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. Grid for the Other 3 Projects */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gridProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.4,
              delay: Math.min(i * 0.08, 0.3),
              ease: "easeOut",
            }}
            className="h-full"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
