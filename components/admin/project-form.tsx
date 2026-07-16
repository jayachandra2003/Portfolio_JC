"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import type { Project } from "@/lib/types";

interface ProjectFormProps {
  initialProject?: Project; // omit for "create new"
}

const inputClasses =
  "w-full rounded-lg border border-border bg-card px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const labelClasses = "mb-1.5 block font-body text-sm font-medium text-foreground";

export function ProjectForm({ initialProject }: ProjectFormProps) {
  const router = useRouter();
  const isEditing = !!initialProject;

  const [title, setTitle] = useState(initialProject?.title ?? "");
  const [slug, setSlug] = useState(initialProject?.slug ?? "");
  const [description, setDescription] = useState(initialProject?.description ?? "");
  const [tech, setTech] = useState(initialProject?.tech.join(", ") ?? "");
  const [features, setFeatures] = useState(initialProject?.features.join("\n") ?? "");
  const [repoUrl, setRepoUrl] = useState(initialProject?.repoUrl ?? "");
  const [demoUrl, setDemoUrl] = useState(initialProject?.demoUrl ?? "");
  const [caseStudySlug, setCaseStudySlug] = useState(initialProject?.caseStudySlug ?? "");
  const [featured, setFeatured] = useState(initialProject?.featured ?? false);
  const [order, setOrder] = useState(initialProject?.order ?? 1);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const id = isEditing ? initialProject!.id : slug.trim();
    const payload = {
      slug: slug.trim(),
      title: title.trim(),
      description: description.trim(),
      tech: tech.split(",").map((t) => t.trim()).filter(Boolean),
      features: features.split("\n").map((f) => f.trim()).filter(Boolean),
      // Empty string means "no link" — convert to null rather than
      // sending an empty string, which would fail the API's URL validation.
      repoUrl: repoUrl.trim() || null,
      demoUrl: demoUrl.trim() || null,
      caseStudySlug: caseStudySlug.trim() || undefined,
      featured,
      order: Number(order),
    };

    try {
      const res = await fetchWithAuth(
        isEditing ? `/api/admin/projects/${id}` : "/api/admin/projects",
        {
          method: isEditing ? "PUT" : "POST",
          body: JSON.stringify(isEditing ? payload : { id, ...payload }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      router.push("/admin/projects");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className={labelClasses}>Title</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>
          Slug {isEditing && <span className="text-muted-foreground">(cannot be changed)</span>}
        </label>
        <input
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={isEditing}
          placeholder="e.g. fabric-marketplace"
          className={`${inputClasses} disabled:opacity-50`}
        />
      </div>

      <div>
        <label className={labelClasses}>Description</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div>
        <label className={labelClasses}>Tech (comma-separated)</label>
        <input
          required
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          placeholder="Python, Flask, MySQL"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Features (one per line)</label>
        <textarea
          required
          rows={4}
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder={"Admin, seller, buyer roles\nAI defect detection"}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses}>Repo URL (optional)</label>
          <input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/..."
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Demo URL (optional)</label>
          <input
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://..."
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses}>Case Study Slug (optional)</label>
          <input
            value={caseStudySlug}
            onChange={(e) => setCaseStudySlug(e.target.value)}
            placeholder="e.g. skywrite"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Display Order</label>
          <input
            type="number"
            required
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className={inputClasses}
          />
        </div>
      </div>

      <label className="flex w-fit items-center gap-2 font-body text-sm text-foreground">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-border accent-accent"
        />
        Featured project
      </label>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 font-body text-sm text-red-400">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Project"}
      </Button>
    </form>
  );
}
