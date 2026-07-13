import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SkyWrite Case Study",
  description:
    "How SkyWrite works: a real-time touchless whiteboard combining hand tracking, gesture-based drawing, and CNN-based character recognition.",
};

// The architecture description below is inferred directly from the
// project's confirmed tech stack and feature list (MediaPipe hand
// tracking, gesture drawing, CNN on EMNIST) — it describes how these
// pieces fit together technically. It is NOT a personal narrative about
// challenges faced or a development timeline, since no real data for
// those exists yet. Add that content later and I'll wire in those
// sections properly instead of inventing it.
const ARCHITECTURE_STEPS = [
  {
    title: "Hand tracking",
    detail:
      "MediaPipe tracks 21 landmark points per hand from the webcam feed in real time, giving precise fingertip position without any physical input device.",
  },
  {
    title: "Gesture recognition",
    detail:
      "Specific finger positions are interpreted as drawing gestures (pen up/down), so the system knows when the user intends to draw versus just move their hand.",
  },
  {
    title: "Canvas rendering + line smoothing",
    detail:
      "Raw fingertip coordinates are noisy frame to frame; smoothing is applied to the drawn path so strokes look continuous rather than jittery.",
  },
  {
    title: "Character recognition",
    detail:
      "Once a character is drawn, the segmented stroke is passed to a CNN trained on the EMNIST dataset, which classifies it as a recognized character.",
  },
];

// Server component — fetches the single project via the same
// data-access-layer function used everywhere else (lib/data/projects.ts),
// consistent with the rest of the app. No direct Firestore access here.
export default async function SkyWriteCaseStudyPage() {
  const project = await getProjectBySlug("skywrite");

  if (!project) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-8 py-20 md:px-16">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-accent"
      >
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      <h1 className="mb-4 font-display text-4xl italic text-foreground md:text-5xl">
        {project.title}
      </h1>
      <p className="mb-6 max-w-2xl font-body text-lg text-muted-foreground">
        {project.description}
      </p>

      <div className="mb-10 flex flex-wrap items-center gap-3">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1.5" })}
          >
            <Github size={14} /> View Code
          </a>
        )}
      </div>

      <section className="mb-12">
        <h2 className="mb-3 font-display text-xl text-foreground">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="accent">{t}</Badge>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-display text-xl text-foreground">Features</h2>
        <ul className="list-inside list-disc space-y-1.5 font-body text-muted-foreground">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-display text-xl text-foreground">How It Works</h2>
        <div className="flex flex-col gap-4">
          {ARCHITECTURE_STEPS.map((step, i) => (
            <Card key={step.title} glass>
              <CardContent className="flex gap-4 pt-6">
                <span className="font-display text-lg italic text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-body font-medium text-card-foreground">{step.title}</p>
                  <p className="mt-1 font-body text-sm text-muted-foreground">{step.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-display text-xl text-foreground">Results</h2>
        <Card glass className="inline-block">
          <CardContent className="pt-6">
            <p className="font-display text-3xl text-accent">~87%</p>
            <p className="mt-1 font-body text-sm text-muted-foreground">
              Character recognition accuracy (CNN trained on EMNIST)
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl text-foreground">Screenshots</h2>
        <div className="rounded-xl border border-dashed border-border p-10 text-center font-body text-sm text-muted-foreground">
          Screenshots and a demo clip coming soon.
        </div>
      </section>
    </article>
  );
}
