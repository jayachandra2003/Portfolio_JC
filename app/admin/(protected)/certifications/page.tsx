"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import type { Certification } from "@/lib/types";

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/api/admin/certifications");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? `Request failed (${res.status})`);
        return;
      }
      setCerts(data.certifications ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}" permanently? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await fetchWithAuth(`/api/admin/certifications/${id}`, { method: "DELETE" });
      setCerts((prev) => prev.filter((c) => c.id !== id));
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
        <h1 className="font-display text-3xl italic text-foreground">Certifications</h1>
        <Link href="/admin/certifications/new" className={buttonVariants({ variant: "primary", size: "sm", className: "gap-1.5" })}>
          <Plus size={14} /> New Certification
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-card" />)}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 font-body text-sm text-red-400">
          Failed to load: {error}
        </div>
      ) : certs.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border p-12 text-center">
          <Award className="text-muted-foreground" size={28} />
          <p className="font-body text-muted-foreground">No certifications yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {certs.map((cert) => (
            <Card key={cert.id} glass>
              <CardContent className="flex items-center justify-between gap-4 pt-6">
                <div className="min-w-0">
                  <p className="truncate font-body font-medium text-card-foreground">{cert.name}</p>
                  <p className="truncate font-body text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link href={`/admin/certifications/${cert.id}/edit`} aria-label="Edit" className="text-muted-foreground hover:text-accent">
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(cert.id, cert.name)}
                    disabled={deletingId === cert.id}
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
