"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Github,
  ExternalLink,
  Activity,
  Layers,
  Cpu,
  Shield,
  Lock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Project } from "@/lib/types";

interface ProjectSpotlightConfig {
  badgeLabel?: string;
  category: string;
  subtitle: string;
  metrics: Array<{
    label: string;
    value: string;
    icon: typeof Activity;
    colorClass?: string;
  }>;
  pipeline: {
    title: string;
    status: string;
    panels: Array<{
      label: string;
      value: string;
      valueColorClass?: string;
      progressBar?: { percent: number; colorClass?: string };
      subtext?: string;
      subHighlight?: { label: string; value: string };
    }>;
  };
}

const SPOTLIGHT_CONFIGS: Record<string, ProjectSpotlightConfig> = {
  skywrite: {
    badgeLabel: "Featured Project",
    category: "Computer Vision • Deep Learning",
    subtitle: "Real-Time Touchless AI Whiteboard",
    metrics: [
      { label: "CNN Recognition", value: "~87%", icon: Activity, colorClass: "text-accent" },
      { label: "MediaPipe Tracking", value: "21-Point", icon: Layers, colorClass: "text-foreground" },
      { label: "Real-Time Inference", value: "60 FPS", icon: Cpu, colorClass: "text-emerald-400" },
    ],
    pipeline: {
      title: "Live Vision Pipeline",
      status: "60 FPS ACTIVE",
      panels: [
        {
          label: "Landmark Detection",
          value: "Index Tip (x: 482, y: 290)",
          valueColorClass: "text-accent",
          progressBar: { percent: 80, colorClass: "bg-accent" },
        },
        {
          label: "Canvas Gesture State",
          value: "DRAWING_ACTIVE",
          valueColorClass: "text-emerald-400",
          subtext: "Temporal Stroke Smoothing: 0.85 • Resolution: 1920x1080",
        },
        {
          label: "CNN Model Classifier",
          value: "EMNIST ByClass",
          valueColorClass: "text-accent",
          subHighlight: { label: "Detected Character:", value: '"A" (91.2%)' },
        },
      ],
    },
  },
  "fabric-marketplace": {
    category: "AI Computer Vision • Marketplace",
    subtitle: "Intelligent Defect Detection & Trading Platform",
    metrics: [
      { label: "AI Defect Accuracy", value: "~94%", icon: Activity, colorClass: "text-accent" },
      { label: "RBAC Architecture", value: "3 Roles", icon: Layers, colorClass: "text-foreground" },
      { label: "Pipeline Latency", value: "<150ms", icon: Cpu, colorClass: "text-emerald-400" },
    ],
    pipeline: {
      title: "AI Defect Inspection Pipeline",
      status: "MODEL ACTIVE",
      panels: [
        {
          label: "Fabric Texture Classifier",
          value: "Defect Confidence: 94.2%",
          valueColorClass: "text-accent",
          progressBar: { percent: 94, colorClass: "bg-accent" },
        },
        {
          label: "Marketplace Role Gate",
          value: "VERIFIED_SELLER_ACTIVE",
          valueColorClass: "text-emerald-400",
          subtext: "Admin Audit • Buyer Escrow • Seller Inventory Management",
        },
        {
          label: "Inspection Telemetry",
          value: "TensorFlow & OpenCV",
          valueColorClass: "text-accent",
          subHighlight: { label: "Analysis Result:", value: "YARN_HOLE_DETECTED" },
        },
      ],
    },
  },
  "bullymail-threat-intelligence": {
    category: "Forensics & Threat NLP",
    subtitle: "Enterprise Email Threat & SOC Forensics Platform",
    metrics: [
      { label: "Hybrid ML Engine", value: "Linear SVC", icon: Shield, colorClass: "text-accent" },
      { label: "Payload Forensics", value: "Magic Bytes", icon: Lock, colorClass: "text-foreground" },
      { label: "Cryptographic Guard", value: "AES-128", icon: Cpu, colorClass: "text-emerald-400" },
    ],
    pipeline: {
      title: "SOC Email Threat Forensics",
      status: "REAL-TIME ML",
      panels: [
        {
          label: "NLP Toxicity & Cyberbullying",
          value: "Confidence: 96.8%",
          valueColorClass: "text-accent",
          progressBar: { percent: 96, colorClass: "bg-accent" },
        },
        {
          label: "Heuristic URL Entropy",
          value: "ENTROPY_ANALYSIS_CLEAN",
          valueColorClass: "text-emerald-400",
          subtext: "Shannon Entropy: 4.82 • Levenshtein Distance: 0.91",
        },
        {
          label: "Threat Mitigation Engine",
          value: "Multi-Vector SOC Aggregator",
          valueColorClass: "text-accent",
          subHighlight: { label: "Verdict:", value: "HIGH_RISK_QUARANTINED" },
        },
      ],
    },
  },
  "cybersentinel-ai": {
    category: "Cybersecurity & Compliance",
    subtitle: "Automated Posture & Vulnerability Scanner",
    metrics: [
      { label: "Scan Orchestration", value: "Celery+Redis", icon: Activity, colorClass: "text-accent" },
      { label: "Design Pattern", value: "SOLID Arch", icon: Layers, colorClass: "text-foreground" },
      { label: "Observability", value: "OpenTelemetry", icon: Cpu, colorClass: "text-emerald-400" },
    ],
    pipeline: {
      title: "Automated Posture Evaluation",
      status: "ORCHESTRATION ACTIVE",
      panels: [
        {
          label: "Celery Scanner Workers",
          value: "Task Queue: 0 Pending",
          valueColorClass: "text-accent",
          progressBar: { percent: 100, colorClass: "bg-emerald-400" },
        },
        {
          label: "Security & Compliance Gate",
          value: "COMPLIANCE_GRADE_A+",
          valueColorClass: "text-emerald-400",
          subtext: "Structured JSON Logging • Prometheus Metrics • Multi-Stage Docker",
        },
        {
          label: "Vulnerability Telemetry",
          value: "FastAPI & SQLAlchemy Core",
          subHighlight: { label: "Postured Domain Score:", value: "98 / 100" },
        },
      ],
    },
  },
  cocanvas: {
    category: "WebSockets • Real-Time Collaboration",
    subtitle: "Real-Time Multiplayer Collaborative Whiteboard",
    metrics: [
      { label: "Sync Latency", value: "<30ms", icon: Activity, colorClass: "text-accent" },
      { label: "Brush Engine", value: "9 Brushes", icon: Layers, colorClass: "text-foreground" },
      { label: "Concurrency", value: "Multi-Room", icon: Cpu, colorClass: "text-emerald-400" },
    ],
    pipeline: {
      title: "Multiplayer Event Stream Pipeline",
      status: "WEBSOCKET ACTIVE",
      panels: [
        {
          label: "Socket.io Room State",
          value: "Connected (Sync Active)",
          valueColorClass: "text-accent",
          progressBar: { percent: 100, colorClass: "bg-emerald-400" },
        },
        {
          label: "Drawing & Interaction Engine",
          value: "MULTI_USER_BROADCAST",
          valueColorClass: "text-emerald-400",
          subtext: "Host Presentation Mode • Multi-Page Isolated Cursors",
        },
        {
          label: "Voice & ChatSpace Pipeline",
          value: "Web Speech Recognition API",
          valueColorClass: "text-accent",
          subHighlight: { label: "Voice Engine:", value: "CONTINUOUS_TRANSCRIBING" },
        },
      ],
    },
  },
};

function getProjectConfig(project: Project): ProjectSpotlightConfig {
  const existing = SPOTLIGHT_CONFIGS[project.slug];
  if (existing) {
    return existing;
  }
  return {
    badgeLabel: project.featured ? "Featured Project" : undefined,
    category: project.tech.slice(0, 2).join(" • ") || "Full-Stack Software",
    subtitle: project.features?.[0] || "Scalable Engineering Application",
    metrics: [
      { label: "Performance", value: "Optimized", icon: Activity, colorClass: "text-accent" },
      { label: "Architecture", value: "Modular", icon: Layers, colorClass: "text-foreground" },
      { label: "Status", value: "Production", icon: Cpu, colorClass: "text-emerald-400" },
    ],
    pipeline: {
      title: "System Architecture & Execution",
      status: "ACTIVE",
      panels: [
        {
          label: "Component Execution",
          value: "Service Ready",
          valueColorClass: "text-accent",
          progressBar: { percent: 100, colorClass: "bg-accent" },
        },
        {
          label: "Framework Stack",
          value: project.tech.slice(0, 3).join(", "),
          valueColorClass: "text-emerald-400",
          subtext: project.description.slice(0, 80) + "...",
        },
        {
          label: "Core Capability",
          value: project.features?.[1] || "Production Scalable",
          subHighlight: { label: "State:", value: "VERIFIED" },
        },
      ],
    },
  };
}

const INITIAL_LIMIT = 3;

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [showAll, setShowAll] = useState(false);

  if (!projects || projects.length === 0) {
    return (
      <p className="font-body text-muted-foreground">
        No projects found.
      </p>
    );
  }

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_LIMIT);

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="flex flex-col gap-8 sm:gap-10">
        {visibleProjects.map((project, idx) => {
          const config = getProjectConfig(project);

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="liquid-glass-interactive relative overflow-hidden rounded-3xl p-6 sm:p-9 md:p-10 shadow-2xl transition-all duration-300"
            >
              {/* Ambient gradient glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

              {/* Badge + Category — top-right corner */}
              <div className="absolute right-6 top-6 flex flex-wrap items-center justify-end gap-2 sm:right-9 sm:top-9 md:right-10 md:top-10">
                {config.badgeLabel && (
                  <Badge variant="accent">
                    {config.badgeLabel}
                  </Badge>
                )}
                <span className="font-mono text-xs font-semibold text-accent">
                  {config.category}
                </span>
              </div>

              <div className="grid grid-cols-1 items-center gap-8 pt-10 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-10">
                {/* Left Column (7 cols): Narrative & Performance Metrics */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    {/* Spacer so title doesn't sit under the absolute badge on small screens */}
                    <div className="mb-3 h-6 lg:hidden" />

                    <h3 className="font-display text-3xl text-card-foreground sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-body text-sm font-medium text-accent sm:text-base">
                      {config.subtitle}
                    </p>

                    <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {project.description}
                    </p>

                    {/* Key Telemetry & Architecture Metrics */}
                    <div className="mt-6 grid grid-cols-3 gap-3 border-y border-border/60 py-4 sm:gap-4">
                      {config.metrics.map((m, mIdx) => {
                        const MetricIcon = m.icon;
                        return (
                          <div key={mIdx}>
                            <div className={`flex items-center gap-1.5 ${m.colorClass || "text-accent"}`}>
                              <MetricIcon size={14} />
                              <span className="font-mono text-lg font-bold sm:text-2xl">{m.value}</span>
                            </div>
                            <p className="mt-0.5 font-body text-[11px] text-muted-foreground sm:text-xs">
                              {m.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
                    {project.caseStudySlug && (
                      <Link
                        href={`/projects/${project.caseStudySlug}`}
                        className={buttonVariants({
                          variant: "primary",
                          className: "gap-2 px-5 py-2.5 font-body text-sm font-semibold shadow-md",
                        })}
                      >
                        Case Study <ArrowRight size={15} />
                      </Link>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
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

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: "outline",
                          className: "gap-2 px-4 py-2.5 font-body text-sm font-medium hover:border-accent/40",
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
                        {config.pipeline.title}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> {config.pipeline.status}
                      </span>
                    </div>

                    {/* Pipeline Stats & Simulated Output */}
                    <div className="space-y-3.5 p-5 font-mono text-xs">
                      {config.pipeline.panels.map((panel, pIdx) => (
                        <div key={pIdx} className="rounded-xl border border-border/50 bg-card/90 p-3.5 shadow-sm">
                          <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                            <span>{panel.label}</span>
                            <span className={`font-semibold ${panel.valueColorClass || "text-accent"}`}>
                              {panel.value}
                            </span>
                          </div>

                          {panel.progressBar && (
                            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                              <div
                                className={`h-full rounded-full transition-all ${panel.progressBar.colorClass || "bg-accent"}`}
                                style={{ width: `${panel.progressBar.percent}%` }}
                              />
                            </div>
                          )}

                          {panel.subtext && (
                            <p className="mt-1 font-body text-[11px] text-muted-foreground">
                              {panel.subtext}
                            </p>
                          )}

                          {panel.subHighlight && (
                            <div className="mt-2 flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                              <span className="text-[11px] text-muted-foreground">{panel.subHighlight.label}</span>
                              <span className="font-mono text-sm font-bold text-accent">
                                {panel.subHighlight.value}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination: View More Projects toggle button */}
      {projects.length > INITIAL_LIMIT && (
        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="gap-2 rounded-full font-body font-medium transition-all px-8 py-3 bg-card/50 border-border hover:bg-card/80 hover:border-accent/40 text-sm shadow-md"
          >
            {showAll ? (
              <>
                Show Less Projects <ChevronUp size={16} />
              </>
            ) : (
              <>
                View More Projects ({projects.length - INITIAL_LIMIT} more) <ChevronDown size={16} />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
