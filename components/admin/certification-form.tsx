"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import type { Certification } from "@/lib/types";

interface CertificationFormProps {
  initialCert?: Certification;
}

const inputClasses =
  "w-full rounded-lg border border-border bg-card px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const labelClasses = "mb-1.5 block font-body text-sm font-medium text-foreground";

export function CertificationForm({ initialCert }: CertificationFormProps) {
  const router = useRouter();
  const isEditing = !!initialCert;

  const [id, setId] = useState(initialCert?.id ?? "");
  const [name, setName] = useState(initialCert?.name ?? "");
  const [issuer, setIssuer] = useState(initialCert?.issuer ?? "");
  const [date, setDate] = useState(initialCert?.date ?? "");
  const [credentialUrl, setCredentialUrl] = useState(initialCert?.credentialUrl ?? "");
  const [imagePath, setImagePath] = useState(initialCert?.imagePath ?? "");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      issuer: issuer.trim(),
      date: date.trim(),
      credentialUrl: credentialUrl.trim() || null,
      imagePath: imagePath.trim() || null,
    };

    try {
      const res = await fetchWithAuth(
        isEditing ? `/api/admin/certifications/${initialCert!.id}` : "/api/admin/certifications",
        {
          method: isEditing ? "PUT" : "POST",
          body: JSON.stringify(isEditing ? payload : { id: id.trim(), ...payload }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      router.push("/admin/certifications");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {!isEditing && (
        <div>
          <label className={labelClasses}>ID (used as the Firestore document ID)</label>
          <input
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. aws-cloud-practitioner"
            className={inputClasses}
          />
        </div>
      )}

      <div>
        <label className={labelClasses}>Name</label>
        <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Issuer</label>
        <input required value={issuer} onChange={(e) => setIssuer(e.target.value)} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Date issued</label>
        <input
          required
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Credential URL (optional)</label>
        <input
          value={credentialUrl}
          onChange={(e) => setCredentialUrl(e.target.value)}
          placeholder="https://..."
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Image path (optional)</label>
        <input
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          placeholder="/certifications/example.jpg"
          className={inputClasses}
        />
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-border bg-card p-3 font-body text-xs text-muted-foreground">
          <Info size={14} className="mt-0.5 shrink-0" />
          This only sets the path — the actual image file still needs to be
          manually added to public/certifications in your code and
          redeployed. There's no file upload here since the site has no
          Storage backend (by design, to stay on Firebase's free plan).
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 font-body text-sm text-red-400">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Certification"}
      </Button>
    </form>
  );
}
