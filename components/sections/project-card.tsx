"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Shield, Mail, ShoppingBag, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/lib/types";

// Metadata per project for categorization
const PROJECT_META: Record<
  string,
  {
    category: string;
    icon: typeof Shield;
    metrics: string[];
  }
> = {
  "cybersentinel-ai": {
    category: "Cybersecurity & Compliance",
    icon: Shield,
    metrics: ["Celery & Redis Orchestration", "SOLID Scanner Architecture", "Dockerized CI/CD"],
  },
  "bullymail-threat-intelligence": {
    category: "Forensics & NLP",
    icon: Mail,
    metrics: ["Multi-Vector Threat SOC", "Linear SVC & TF-IDF", "Fernet AES-128 Encryption"],
  },
  "fabric-marketplace": {
    category: "AI Computer Vision & Marketplace",
    icon: ShoppingBag,
    metrics: ["~94% Defect Detection", "Role-Based Access (Admin/Buyer/Seller)", "MySQL CRUD Pipeline"],
  },
};

export function ProjectCard({ project }: { project: Project }) {
  const meta = PROJECT_META[project.slug] ?? {
    category: "Full Stack & AI",
    icon: Shield,
    metrics: project.features ? project.features.slice(0, 3) : [],
  };

  const Icon = meta.icon;
  const visibleTech = project.tech.slice(0, 5);

  return (
    <div className="liquid-glass-interactive group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-7">
      <div>
        {/* Card Header: Icon & Category */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent shadow-inner">
            <Icon size={20} />
          </div>
          <span className="font-mono text-[11px] font-medium text-accent">
            {meta.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="mt-4 font-display text-xl text-card-foreground sm:text-2xl">
          {project.caseStudySlug ? (
            <Link
              href={`/projects/${project.caseStudySlug}`}
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        {/* Description */}
        <p className="mt-2.5 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm line-clamp-3">
          {project.description}
        </p>

        {/* Key Feature Highlights */}
        <div className="mt-4 space-y-1.5 border-t border-border/50 pt-3">
          {meta.metrics.map((metric, idx) => (
            <div key={idx} className="flex items-center gap-2 font-body text-xs text-muted-foreground">
              <CheckCircle2 size={12} className="text-accent shrink-0" />
              <span className="truncate">{metric}</span>
            </div>
          ))}
        </div>

        {/* Technology Badges */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {visibleTech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-border/50 pt-4">
        {project.caseStudySlug && (
          <Link
            href={`/projects/${project.caseStudySlug}`}
            className={buttonVariants({
              variant: "primary",
              size: "sm",
              className: "gap-1.5 text-xs font-medium",
            })}
          >
            Case Study <ArrowRight size={13} />
          </Link>
        )}

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "gap-1.5 text-xs font-medium hover:border-accent/40",
            })}
          >
            <Github size={13} /> View Code
          </a>
        )}

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground",
            })}
          >
            <ExternalLink size={13} /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
