"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/project-form";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import type { Project } from "@/lib/types";

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        // Reuses the same list endpoint rather than adding a separate
        // single-project route — fine at this data scale (a handful of
        // projects), avoids an extra API route for marginal benefit.
        const res = await fetchWithAuth("/api/admin/projects");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Failed to load");
          return;
        }
        const found = (data.projects as Project[]).find((p) => p.id === params.id);
        if (!found) {
          setError("Project not found");
          return;
        }
        setProject(found);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  return (
    <div className="mx-auto max-w-2xl px-8 py-20">
      <Link href="/admin/projects" className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-accent">
        <ArrowLeft size={14} /> Back to Projects
      </Link>
      <h1 className="mb-8 font-display text-3xl italic text-foreground">Edit Project</h1>

      {loading ? (
        <div className="h-64 animate-pulse rounded-xl bg-card" />
      ) : error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 font-body text-sm text-red-400">
          {error}
        </div>
      ) : project ? (
        <ProjectForm initialProject={project} />
      ) : null}
    </div>
  );
}
