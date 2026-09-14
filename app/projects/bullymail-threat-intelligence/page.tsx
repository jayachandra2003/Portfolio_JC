import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Cpu, Layers, Activity, CheckCircle2, AlertTriangle, Zap, Code2, Shield } from "lucide-react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "BullyMail Case Study — Email Threat Intelligence Platform",
  description:
    "Engineering deep dive into BullyMail-Threat-Intelligence: An enterprise email forensic platform with multi-vector NLP threat analysis, hybrid ML classification, and SOC operations.",
};

const PIPELINE_STAGES = [
  {
    step: "01",
    title: "Email Ingestion & Multi-Vector Header Forensics",
    tech: "Python • Flask • MIME Parsing",
    description:
      "Raw email payloads are parsed via Python's email/MIME library, extracting headers, body text, inline images, and attachments. Each vector (text, URL, attachment, image) is routed to a dedicated forensic analyzer pipeline.",
  },
  {
    step: "02",
    title: "NLP Cyberbullying & Toxicity Classification",
    tech: "Scikit-learn • TF-IDF • Linear SVC",
    description:
      "Email body text is vectorized using TF-IDF and classified by a Linear SVC model trained on labeled cyberbullying datasets. Logistic Regression provides calibrated probability scores for risk aggregation in the SOC dashboard.",
  },
  {
    step: "03",
    title: "Phishing URL Analysis & Typosquatting Detection",
    tech: "Shannon Entropy • Levenshtein Distance • Regex",
    description:
      "Extracted URLs are analyzed using Shannon entropy to detect obfuscation, and normalized Levenshtein distance against a known-domain allowlist to catch typosquatting variants. High-entropy domains with short edit distances are flagged as phishing candidates.",
  },
  {
    step: "04",
    title: "Static Attachment Forensics & Malware Detection",
    tech: "Magic Byte Verification • Double-Extension Detection",
    description:
      "Attachments undergo file type validation by inspecting magic bytes against declared MIME types, detecting mismatches (e.g., .pdf disguising a .exe). Double-extension filenames (report.pdf.exe) are caught by regex pattern scanning.",
  },
  {
    step: "05",
    title: "SOC Risk Aggregation & Cryptographic Evidence Storage",
    tech: "Fernet AES-128 • Calibrated Scoring • MySQL",
    description:
      "Per-vector threat scores are aggregated into a calibrated composite risk score surfaced on the SOC dashboard with explainable breakdowns. All evidence payloads are encrypted at rest using Fernet AES-128 before storage in MySQL/SQLite.",
  },
];

const ENGINEERING_CHALLENGES = [
  {
    challenge: "High False-Positive Rate on Legitimate URLs",
    problem:
      "Shannon entropy flagged many legitimate marketing URLs (long tracking parameters) as suspicious, flooding analysts with noise.",
    solution:
      "Added a domain reputation allowlist and tuned the entropy threshold per-TLD. Combined entropy with edit-distance scoring in a weighted composite to require both signals before flagging.",
  },
  {
    challenge: "Polyglot File Attacks Bypassing MIME Checks",
    problem:
      "Files crafted to be valid in two formats simultaneously (e.g., a JPEG that is also a valid ZIP) passed naive MIME type checks.",
    solution:
      "Implemented deep magic-byte scanning reading the first 512 bytes against a comprehensive signature database, with secondary structural validation for common archive formats.",
  },
  {
    challenge: "ML Model Drift on Evolving Cyberbullying Language",
    problem:
      "Slang and obfuscated terms not in training data (l33tspeak, emoji substitution) caused classifier accuracy degradation over time.",
    solution:
      "Built a preprocessing normalization layer that expands common l33tspeak patterns and strips/replaces emoji before TF-IDF vectorization, boosting generalization without full retraining.",
  },
];

export default async function BullyMailCaseStudyPage() {
  const project = await getProjectBySlug("bullymail-threat-intelligence");
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
            <span className="font-mono text-xs font-semibold text-accent">Forensics & Threat NLP</span>
          </div>
          <h1 className="mt-4 font-display text-4xl italic text-card-foreground sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="mt-2 font-body text-base font-medium text-accent sm:text-lg">Enterprise Email Threat Intelligence & SOC Forensics Platform</p>
          <p className="mt-5 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            BullyMail-Threat-Intelligence is a multi-vector digital forensic platform that analyzes emails for cyberbullying, phishing, social engineering, malware attachments, and image forensics — combining hybrid ML with a SOC operations dashboard for explainable threat intelligence.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-body text-muted-foreground">
              <div><span className="text-muted-foreground/70">Role:</span> <strong className="text-foreground">ML & Security Engineer</strong></div>
              <div><span className="text-muted-foreground/70">Type:</span> <strong className="text-foreground">Enterprise Security Platform</strong></div>
              <div><span className="text-muted-foreground/70">Status:</span> <strong className="text-emerald-400">Complete & Deployed</strong></div>
            </div>
            {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "primary", className: "gap-2 px-5 py-2.5 font-body text-sm font-semibold shadow-md" })}><Github size={16} /> Explore Repository</a>)}
          </div>
        </div>
      </header>

      <section className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-accent"><Activity size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">96.8%</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">NLP Accuracy</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Cyberbullying Detection</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-foreground"><Shield size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">5</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Threat Vectors</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Multi-Vector Analysis</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-emerald-400"><Zap size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">AES</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">Encryption</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">Fernet AES-128 at Rest</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm shadow-sm transition-all hover:border-accent/40">
          <div className="flex items-center gap-1.5 text-accent"><Cpu size={16} /><span className="font-mono text-2xl font-bold sm:text-3xl">2</span></div>
          <p className="mt-1 font-body text-xs font-medium text-card-foreground">ML Models</p>
          <p className="mt-0.5 font-body text-[11px] text-muted-foreground">SVC + Logistic Regression</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">Technology Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (<Badge key={t} className="px-3 py-1 font-mono text-xs">{t}</Badge>))}
          <Badge className="px-3 py-1 font-mono text-xs">TF-IDF</Badge>
          <Badge className="px-3 py-1 font-mono text-xs">MIME Parsing</Badge>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">System Architecture & Pipeline</h2>
        <p className="mt-2 font-body text-sm text-muted-foreground">How an incoming email is decomposed into threat intelligence signals:</p>
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
          <p className="mx-auto mt-2 max-w-xl font-body text-sm text-muted-foreground">The full forensic pipeline, ML training scripts, and SOC dashboard code are open-sourced on GitHub.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "primary", className: "gap-2 px-6 py-2.5 font-body text-sm font-semibold shadow-md" })}><Github size={16} /> View on GitHub</a>)}
            <Link href="/#projects" className={buttonVariants({ variant: "outline", className: "gap-2 px-5 py-2.5 font-body text-sm hover:border-accent/40" })}><ArrowLeft size={14} /> Back to Projects</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
