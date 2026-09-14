import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Cpu, Layers, Activity, CheckCircle2, AlertTriangle, Zap, Code2 } from "lucide-react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fabric Marketplace Case Study — AI Defect Detection Platform",
  description:
    "Engineering deep dive into the Fabric Marketplace: A multi-role AI-powered marketplace with TensorFlow defect detection achieving 94% accuracy.",
};

const PIPELINE_STAGES = [
  {
    step: "01",
    title: "Image Ingestion & Preprocessing",
    tech: "OpenCV • NumPy • PIL",
    description:
      "Uploaded fabric images are received via Flask endpoints, validated for format and size, then preprocessed using OpenCV — resized to 224x224, normalized to [0,1], and augmented with random flips and rotations to improve model generalization during training.",
  },
  {
    step: "02",
    title: "Deep Learning Defect Classification",
    tech: "TensorFlow • Keras • CNN",
    description:
      "A fine-tuned convolutional neural network classifies fabric samples into defect categories (yarn hole, thread pull, stain, weave error, clean) achieving ~94% test accuracy. Transfer learning from a pre-trained base significantly reduced training time while maintaining high precision.",
  },
  {
    step: "03",
    title: "Multi-Role Marketplace RBAC",
    tech: "Flask • MySQL • Session Auth",
    description:
      "Three distinct user roles — Admin, Seller, and Buyer — are enforced via a server-side RBAC middleware. Admins moderate listings and users; Sellers manage inventory and upload samples for AI inspection; Buyers browse, filter, and purchase verified fabric listings.",
  },
  {
    step: "04",
    title: "AI Defect Inspection Workflow",
    tech: "TensorFlow Inference • REST API",
    description:
      "When a seller uploads a fabric image, it is passed synchronously through the defect classification API. Results with confidence scores are displayed to the seller before listing. Only samples below a configurable defect-confidence threshold are auto-approved for marketplace listing.",
  },
  {
    step: "05",
    title: "Full CRUD Transaction Management",
    tech: "MySQL • Flask-SQLAlchemy • Jinja2",
    description:
      "Complete Create, Read, Update, Delete operations across all roles are handled by Flask route handlers backed by MySQL. Listings, orders, and user accounts maintain referential integrity through foreign key constraints and transactional queries.",
  },
];

const ENGINEERING_CHALLENGES = [
  {
    challenge: "Imbalanced Defect Training Dataset",
    problem:
      "The defect dataset had far more clean samples than defect samples, causing the model to predict clean for ambiguous cases, reducing recall for actual defects.",
    solution:
      "Applied class-weighted loss function during training and used SMOTE-inspired augmentation to oversample underrepresented defect categories, improving recall by ~12% without adding real labeled data.",
  },
  {
    challenge: "Role Escalation Vulnerability",
    problem:
      "Early testing revealed that crafted requests could access seller/admin endpoints by manipulating session tokens, bypassing the UI-level role checks.",
    solution:
      "Moved all authorization checks to server-side Flask decorators that validate session role against each route independently of client input, making UI state irrelevant to access control.",
  },
  {
    challenge: "Inference Latency on CPU Deployment",
    problem:
      "Running TensorFlow inference synchronously in Flask request handlers caused 3-5 second upload response times, degrading the seller experience.",
    solution:
      "Decoupled inference into a lightweight background worker triggered post-upload. The seller receives an immediate acknowledgment and a real-time status poll updates the defect result asynchronously.",
  },
];

export default async function FabricMarketplaceCaseStudyPage() {
  const project = await getProjectBySlug("fabric-marketplace");
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
            <span className="font-mono text-xs font-semibold text-accent">AI Computer Vision • Marketplace</span>
          </div>
          <h1 className="mt-4 font-display text-4xl italic text-card-foreground sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="mt-2 font-body text-base font-medium text-accent sm:text-lg">Intelligent Defect Detection & Multi-Role Trading Platform</p>
          <p className="mt-5 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            A production-grade fabric marketplace with an integrated AI defect detection pipeline. Sellers upload fabric samples which are automatically classified for defects by a fine-tuned CNN before being approved for listing, ensuring quality control across the entire marketplace.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-body text-muted-foreground">
              <div><span className="text-muted-foreground/70">Role:</span> <strong className="text-foreground">Full-Stack & AI Engineer</strong></div>
              <div><span className="text-muted-foreground/70">Type:</span> <strong className="text-foreground">AI-Powered Web Platform</strong></div>
              <div><span className="text-muted-foreground/70">Status:</span> <strong className="text-emerald-400">Complete</strong></div>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-accent"><Activity size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">~94%</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">AI Accuracy</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Defect Classification</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-foreground"><Layers size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">3</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">User Roles</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Admin, Seller, Buyer</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-emerald-400"><Zap size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">&lt;150ms</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">API Latency</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Async Inference Pipeline</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-accent"><Cpu size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">CNN</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Model Architecture</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Transfer Learning</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">Technology Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (<Badge key={t} className="px-3 py-1 font-mono text-xs">{t}</Badge>))}
          <Badge className="px-3 py-1 font-mono text-xs">Keras</Badge>
          <Badge className="px-3 py-1 font-mono text-xs">NumPy</Badge>
          <Badge className="px-3 py-1 font-mono text-xs">Jinja2</Badge>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">System Architecture & Pipeline</h2>
        <p className="mt-2 font-body text-sm text-muted-foreground">How a fabric image flows from upload to marketplace listing:</p>
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
          <h3 className="mt-5 font-display text-2xl text-card-foreground sm:text-3xl">Project Overview</h3>
          <p className="mx-auto mt-2 max-w-xl font-body text-sm text-muted-foreground">This project demonstrates end-to-end AI integration in a production web platform, from model training to asynchronous inference in a multi-role marketplace.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#projects" className={buttonVariants({ variant: "primary", className: "gap-2 px-6 py-2.5 font-body text-sm font-semibold shadow-md" })}><ArrowLeft size={14} /> Back to Projects</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
