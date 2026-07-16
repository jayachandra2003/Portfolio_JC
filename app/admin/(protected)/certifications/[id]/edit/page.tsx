"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CertificationForm } from "@/components/admin/certification-form";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import type { Certification } from "@/lib/types";

export default function EditCertificationPage() {
  const params = useParams<{ id: string }>();
  const [cert, setCert] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchWithAuth("/api/admin/certifications");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Failed to load");
          return;
        }
        const found = (data.certifications as Certification[]).find((c) => c.id === params.id);
        if (!found) {
          setError("Certification not found");
          return;
        }
        setCert(found);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  return (
    <div className="mx-auto max-w-2xl px-8 py-20">
      <Link href="/admin/certifications" className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-accent">
        <ArrowLeft size={14} /> Back to Certifications
      </Link>
      <h1 className="mb-8 font-display text-3xl italic text-foreground">Edit Certification</h1>

      {loading ? (
        <div className="h-64 animate-pulse rounded-xl bg-card" />
      ) : error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 font-body text-sm text-red-400">
          {error}
        </div>
      ) : cert ? (
        <CertificationForm initialCert={cert} />
      ) : null}
    </div>
  );
}
