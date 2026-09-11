import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Eye,
  Terminal,
  Code2,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SkyWrite Case Study — Touchless AI Whiteboard",
  description:
    "Engineering deep dive into SkyWrite: A real-time touchless virtual whiteboard combining MediaPipe 21-point hand tracking, gesture state machines, and CNN-based character recognition.",
};

const PIPELINE_STAGES = [
  {
    step: "01",
    title: "Video Ingestion & 21-Point Landmark Tracking",
    tech: "OpenCV • MediaPipe Hands",
    description:
      "Captures frames at 60 FPS via OpenCV and passes RGB buffers to Google MediaPipe Hands, extracting 21 normalized 3D keypoints per frame to pinpoint index fingertip trajectory with sub-pixel precision.",
  },
  {
    step: "02",
    title: "Stateful Gesture State Machine",
    tech: "Euclidean Distance • Vector Math",
    description:
      "Computes inter-finger angular vectors and euclidean distances to reliably classify hand states: Index extended = DRAW_MODE, Index + Middle = HOVER_MODE, Closed Fist = CLEAR_CANVAS.",
  },
  {
    step: "03",
    title: "Temporal Stroke Smoothing & Canvas Blending",
    tech: "Exponential Moving Average • NumPy",
    description:
      "Eliminates webcam frame-to-frame noise and micro-tremors using an Exponential Moving Average (EMA) filter, rendering crisp anti-aliased Bézier paths over a dual-layer alpha canvas.",
  },
  {
    step: "04",
    title: "Contour Segmentation & Preprocessing",
    tech: "OpenCV Morphology • Bounding Box Normalization",
    description:
      "When drawing pauses, the canvas extracts the active stroke bounding box, normalizes aspect ratios, centers the glyph with 4px padding, and resizes to 28x28 grayscale to match the EMNIST distribution.",
  },
  {
    step: "05",
    title: "Deep CNN Classification & Transcription",
    tech: "TensorFlow • Keras • EMNIST ByClass",
    description:
      "A convolutional neural network with Conv2D, BatchNormalization, Dropout, and Dense softmax layers predicts the drawn alphanumeric character with ~87.4% test accuracy in under 15ms.",
  },
];

const ENGINEERING_CHALLENGES = [
  {
    challenge: "High-Frequency Hand Jitter & Webcam Noise",
    problem:
      "Raw fingertip coordinates suffered from frame-by-frame sensor noise, leading to jagged, disconnected handwriting on screen.",
    solution:
      "Implemented a weighted temporal smoothing pipeline (EMA) that dynamically adjusts smoothing factors based on fingertip velocity — preserving sharp corners while eliminating resting jitter.",
  },
  {
    challenge: "False Positives in Gesture Disambiguation",
    problem:
      "Natural hand rotations in 3D space frequently triggered unintended drawing strokes when users merely intended to gesture or pause.",
    solution:
      "Built a stateful thresholding system checking both fingertip elevation relative to the PIP joints and distance to the thumb MCP, preventing accidental pen-down triggers.",
  },
  {
    challenge: "Inference Latency Bottlenecking Rendering",
    problem:
      "Running synchronous deep learning predictions on every frame caused significant frame drops and stuttered video feeds.",
    solution:
      "Decoupled canvas drawing from character classification using asynchronous non-blocking worker threads, sustaining smooth 60 FPS drawing alongside instant recognition.",
  },
];

export default async function SkyWriteCaseStudyPage() {
  const project = await getProjectBySlug("skywrite");
  if (!project) return notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 sm:px-8 md:py-24">
      {/* Top Breadcrumb */}
      <Link
        href="/#projects"
        className="group mb-8 inline-flex items-center gap-2 font-body text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Projects
      </Link>

      {/* Hero Header Card */}
      <header className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/95 via-card/85 to-card/95 p-8 sm:p-12 shadow-xl backdrop-blur-md">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="accent">
              Featured Case Study
            </Badge>
            <span className="font-mono text-xs font-semibold text-accent">
              Computer Vision • Deep Learning
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl italic text-card-foreground sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-2 font-body text-base font-medium text-accent sm:text-lg">
            Real-Time Touchless AI Whiteboard & Character Recognition
          </p>

          <p className="mt-5 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            SkyWrite is a computer vision-driven interface that transforms any standard webcam into an interactive touchless drawing canvas. By pairing sub-pixel hand landmark tracking with a deep convolutional neural network, users can draw characters in mid-air and have them recognized and digitized in real time.
          </p>

          {/* Quick Meta Row & Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-body text-muted-foreground">
              <div>
                <span className="text-muted-foreground/70">Role:</span>{" "}
                <strong className="text-foreground">AI/ML & Vision Engineer</strong>
              </div>
              <div>
                <span className="text-muted-foreground/70">Type:</span>{" "}
                <strong className="text-foreground">Open Source System</strong>
              </div>
              <div>
                <span className="text-muted-foreground/70">Status:</span>{" "}
                <strong className="text-emerald-400">Complete & Deployed</strong>
              </div>
            </div>

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "primary",
                  className: "gap-2 px-5 py-2.5 font-body text-sm font-semibold shadow-md",
                })}
              >
                <Github size={16} /> Explore Repository
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Key Performance Metrics (KPIs) */}
      <section className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-accent">
            <Activity size={16} />
            <span className="font-mono text-2xl font-bold sm:text-3xl">87.4%</span>
          </div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">CNN Accuracy</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">EMNIST ByClass Dataset</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-foreground">
            <Layers size={16} />
            <span className="font-mono text-2xl font-bold sm:text-3xl">21-Pt</span>
          </div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Hand Tracking</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Real-Time MediaPipe</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Zap size={16} />
            <span className="font-mono text-2xl font-bold sm:text-3xl">60 FPS</span>
          </div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Rendering Pipeline</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Ultra-Low Latency</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-accent">
            <Cpu size={16} />
            <span className="font-mono text-2xl font-bold sm:text-3xl">&lt;15ms</span>
          </div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Inference Time</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Async Background Thread</p>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="mt-14">
        <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">
          Technology Stack
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} className="px-3 py-1 font-mono text-xs">
              {t}
            </Badge>
          ))}
          <Badge className="px-3 py-1 font-mono text-xs">NumPy</Badge>
          <Badge className="px-3 py-1 font-mono text-xs">SciPy</Badge>
          <Badge className="px-3 py-1 font-mono text-xs">Keras</Badge>
        </div>
      </section>

      {/* Step-by-Step Engineering Architecture Pipeline */}
      <section className="mt-16">
        <div>
          <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">
            System Architecture & Pipeline
          </h2>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            How data flows from camera sensor to neural network transcription:
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {PIPELINE_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/90 p-6 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40 sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 font-mono text-lg font-bold text-accent shadow-inner">
                  {stage.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-body text-lg font-bold text-card-foreground">
                      {stage.title}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-accent">
                      {stage.tech}
                    </span>
                  </div>
                  <p className="mt-2.5 font-body text-sm leading-relaxed text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Challenges & Solutions */}
      <section className="mt-16">
        <div>
          <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">
            Key Technical Challenges & Solutions
          </h2>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            Non-trivial algorithmic hurdles solved during implementation:
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ENGINEERING_CHALLENGES.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-accent/40"
            >
              <div>
                <div className="flex items-center gap-2 font-body text-sm font-bold text-card-foreground">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                  <span>{item.challenge}</span>
                </div>
                <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground">
                  {item.problem}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4">
                <div className="flex items-center gap-1.5 font-body text-xs font-semibold text-accent">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>Solution</span>
                </div>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-card-foreground/90">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code & Repository Callout */}
      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-gradient-to-r from-card via-card/95 to-card p-8 sm:p-10 shadow-lg text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/30 shadow-inner">
            <Code2 size={28} />
          </div>
          <h3 className="mt-5 font-display text-2xl text-card-foreground sm:text-3xl">
            Explore the Source Code
          </h3>
          <p className="mx-auto mt-2 max-w-xl font-body text-sm text-muted-foreground">
            The full codebase including gesture state machines, training pipelines, and dataset scripts is open-sourced on GitHub.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "primary",
                  className: "gap-2 px-6 py-2.5 font-body text-sm font-semibold shadow-md",
                })}
              >
                <Github size={16} /> View on GitHub
              </a>
            )}
            <Link
              href="/#projects"
              className={buttonVariants({
                variant: "outline",
                className: "gap-2 px-5 py-2.5 font-body text-sm hover:border-accent/40",
              })}
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
