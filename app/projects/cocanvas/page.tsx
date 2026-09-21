import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft, Github, ExternalLink, Cpu, Layers, Activity,
  CheckCircle2, AlertTriangle, Zap, Code2,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "CoCanvas Case Study — Real-Time Multiplayer Whiteboard",
  description:
    "Engineering deep dive into CoCanvas: A real-time collaborative multiplayer whiteboard with Socket.io event synchronization, sub-30ms latency, multi-page canvas, and voice typing.",
};

const PIPELINE_STAGES = [
  {
    step: "01",
    title: "WebSocket Room Initialization & Session Management",
    tech: "Socket.io • Node.js • Express",
    description:
      "On connection, the server assigns each client to a named room and broadcasts a full canvas state snapshot to the joining peer. Room lifecycle (host assignment, join/leave events) is managed through Socket.io namespaces with structured event contracts.",
  },
  {
    step: "02",
    title: "Real-Time Drawing Event Broadcast",
    tech: "Socket.io Rooms • Delta Compression",
    description:
      "Every pointer-move event emits a lightweight delta payload (x, y, brushType, color, size) — not full canvas buffers — achieving sub-30ms sync across all peers. The server relays only to room members, keeping bandwidth minimal.",
  },
  {
    step: "03",
    title: "HTML5 Canvas Rendering & 9-Engine Brush Pipeline",
    tech: "HTML5 Canvas API • requestAnimationFrame",
    description:
      "Each incoming draw event is applied to a local canvas via a modular brush engine dispatcher. Nine distinct brush types (pencil, ink, chalk, spray, watercolor, marker, eraser, shapes, pixel) each implement a common draw(ctx, event) interface, enabling hot-swap without state reset.",
  },
  {
    step: "04",
    title: "Multi-Page State Synchronization",
    tech: "Canvas toDataURL • Page Stack Management",
    description:
      "Page switches serialize the current canvas to a base64 PNG, store it in a server-side per-room page stack, and hydrate the destination page for all peers. The infinite canvas mode uses a virtual viewport transform matrix for pan/zoom without re-rendering.",
  },
  {
    step: "05",
    title: "Voice Typing & ChatSpace Pipeline",
    tech: "Web Speech API • SpeechRecognition • WebRTC",
    description:
      "Continuous voice transcription uses the browser SpeechRecognition API in interim+final result mode, streaming recognized text to the canvas cursor position. ChatSpace messages are broadcast as typed Socket.io events rendered in a side panel without disrupting drawing state.",
  },
];

const ENGINEERING_CHALLENGES = [
  {
    challenge: "Cursor Desync on High-Latency Connections",
    problem:
      "Under unstable network conditions, rapid draw events arrived out of order, causing broken strokes and visual tearing on remote clients.",
    solution:
      "Implemented sequence-numbered events with client-side event queue replay. Stale out-of-order events are dropped and the last consistent state is re-broadcast on reconnect.",
  },
  {
    challenge: "Canvas State Explosion on Page Switch",
    problem:
      "Serializing full canvas pixel buffers on every page switch for all connected users caused server memory spikes and noticeable lag.",
    solution:
      "Switched to lazy serialization — canvas is serialized only when the switching user leaves a page, and other users receive compressed diff patches rather than full snapshots.",
  },
  {
    challenge: "Host vs. Collaborator Mode Conflict",
    problem:
      "In presentation mode, collaborators could still emit draw events, overwriting the host canvas and breaking the presentation flow.",
    solution:
      "Added a server-enforced role gate: in PRESENTATION_MODE, draw events from non-host sockets are silently discarded server-side, while the UI shows a locked canvas indicator to collaborators.",
  },
];

export default async function CoCanvasCaseStudyPage() {
  const project = await getProjectBySlug("cocanvas");
  if (!project) return notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 sm:px-8 md:py-24">
      <Link href="/#projects" className="group mb-8 inline-flex items-center gap-2 font-body text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Projects
      </Link>

      <header className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/95 via-card/85 to-card/95 p-8 sm:p-12 shadow-xl backdrop-blur-md">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="accent">Case Study</Badge>
            <span className="font-mono text-xs font-semibold text-accent">WebSockets • Real-Time Collaboration</span>
          </div>
          <h1 className="mt-4 font-display text-4xl italic text-card-foreground sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="mt-2 font-body text-base font-medium text-accent sm:text-lg">Real-Time Multiplayer Collaborative Whiteboard & Team Workspace</p>
          <p className="mt-5 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            CoCanvas is a fully real-time multiplayer whiteboard built on Socket.io, supporting infinite and multi-page canvas modes, 9 brush engines, host presentation mode, voice typing, and a live ChatSpace — all synchronized across clients with sub-30ms latency.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-body text-muted-foreground">
              <div><span className="text-muted-foreground/70">Role:</span> <strong className="text-foreground">Full-Stack & Real-Time Engineer</strong></div>
              <div><span className="text-muted-foreground/70">Type:</span> <strong className="text-foreground">Open Source Web App</strong></div>
              <div><span className="text-muted-foreground/70">Status:</span> <strong className="text-emerald-400">Live & Deployed</strong></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "primary", className: "gap-2 px-5 py-2.5 font-body text-sm font-semibold shadow-md" })}><Github size={16} /> Repository</a>)}
              {project.demoUrl && (<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "gap-2 px-5 py-2.5 font-body text-sm hover:border-accent/40" })}><ExternalLink size={16} /> Live Demo</a>)}
            </div>
          </div>
        </div>
      </header>

      <section className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-accent"><Zap size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">&lt;30ms</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Sync Latency</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">WebSocket Draw Events</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-foreground"><Layers size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">9</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Brush Engines</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Modular Draw Interface</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-emerald-400"><Activity size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">Multi</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Room Support</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Concurrent Sessions</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-accent"><Cpu size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">2</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Canvas Modes</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Infinite + Multi-Page</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">Technology Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (<Badge key={t} className="px-3 py-1 font-mono text-xs">{t}</Badge>))}
          <Badge className="px-3 py-1 font-mono text-xs">Web Speech API</Badge>
          <Badge className="px-3 py-1 font-mono text-xs">Canvas API</Badge>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">System Architecture & Pipeline</h2>
        <p className="mt-2 font-body text-sm text-muted-foreground">How drawing events travel from one browser to every connected peer in real time:</p>
        <div className="mt-8 space-y-4">
          {PIPELINE_STAGES.map((stage) => (
            <div key={stage.step} className="relative overflow-hidden rounded-2xl border border-border bg-card/90 p-6 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 font-mono text-lg font-bold text-accent shadow-inner">{stage.step}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-body text-lg font-bold text-card-foreground">{stage.title}</h3>
                    <span className="font-mono text-xs font-semibold text-accent">{stage.tech}</span>
                  </div>
                  <p className="mt-2.5 font-body text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">Key Technical Challenges & Solutions</h2>
        <p className="mt-2 font-body text-sm text-muted-foreground">Non-trivial engineering problems solved during implementation:</p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ENGINEERING_CHALLENGES.map((item, idx) => (
            <div key={idx} className="flex flex-col justify-between rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-accent/40">
              <div>
                <div className="flex items-center gap-2 font-body text-sm font-bold text-card-foreground"><AlertTriangle size={16} className="text-amber-400 shrink-0" /><span>{item.challenge}</span></div>
                <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground">{item.problem}</p>
              </div>
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4">
                <div className="flex items-center gap-1.5 font-body text-xs font-semibold text-accent"><CheckCircle2 size={14} className="shrink-0" /><span>Solution</span></div>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-card-foreground/90">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-gradient-to-r from-card via-card/95 to-card p-8 sm:p-10 shadow-lg text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/30 shadow-inner"><Code2 size={28} /></div>
          <h3 className="mt-5 font-display text-2xl text-card-foreground sm:text-3xl">Explore the Source Code</h3>
          <p className="mx-auto mt-2 max-w-xl font-body text-sm text-muted-foreground">The full codebase including brush engine implementations, Socket.io event contracts, and canvas serialization logic is open-sourced on GitHub.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "primary", className: "gap-2 px-6 py-2.5 font-body text-sm font-semibold shadow-md" })}><Github size={16} /> View on GitHub</a>)}
            {project.demoUrl && (<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "gap-2 px-5 py-2.5 font-body text-sm hover:border-accent/40" })}><ExternalLink size={16} /> Try Live Demo</a>)}
            <Link href="/#projects" className={buttonVariants({ variant: "outline", className: "gap-2 px-5 py-2.5 font-body text-sm hover:border-accent/40" })}><ArrowLeft size={14} /> Back to Projects</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
