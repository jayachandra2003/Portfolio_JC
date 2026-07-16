"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadProjects() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/api/admin/projects");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? `Request failed (${res.status})`);
        return;
      }
      setProjects(data.projects ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}" permanently? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await fetchWithAuth(`/api/admin/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-8 py-20">
      <Link href="/admin" className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-accent">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl italic text-foreground">Projects</h1>
        <Link href="/admin/projects/new" className={buttonVariants({ variant: "primary", size: "sm", className: "gap-1.5" })}>
          <Plus size={14} /> New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-card" />)}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 font-body text-sm text-red-400">
          Failed to load projects: {error}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border p-12 text-center">
          <Briefcase className="text-muted-foreground" size={28} />
          <p className="font-body text-muted-foreground">No projects yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Card key={project.id} glass>
              <CardContent className="flex items-center justify-between gap-4 pt-6">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="truncate font-body font-medium text-card-foreground">{project.title}</p>
                    {project.featured && <Badge variant="accent">Featured</Badge>}
                  </div>
                  <p className="truncate font-body text-xs text-muted-foreground">
                    /{project.slug} &middot; order {project.order}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    aria-label="Edit"
                    className="text-muted-foreground hover:text-accent"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    disabled={deletingId === project.id}
                    aria-label="Delete"
                    className="text-muted-foreground hover:text-red-400 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
