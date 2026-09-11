"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteContentForm } from "@/components/admin/site-content-form";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import type { SiteContent } from "@/lib/types";

export default function AdminSiteContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchWithAuth("/api/admin/site-content");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Failed to load");
          return;
        }
        setContent(data.siteContent);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-8 py-20">
      <Link href="/admin" className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-accent">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>
      <h1 className="mb-8 font-display text-3xl italic text-foreground">Site Content</h1>

      {loading ? (
        <div className="h-96 animate-pulse rounded-xl bg-card" />
      ) : error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 font-body text-sm text-red-400">
          {error}
        </div>
      ) : content ? (
        <SiteContentForm initial={content} />
      ) : null}
    </div>
  );
}
