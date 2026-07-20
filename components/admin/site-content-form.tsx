"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";
import type { SiteContent } from "@/lib/types";

const inputClasses =
  "w-full rounded-lg border border-border bg-card px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const labelClasses = "mb-1.5 block font-body text-sm font-medium text-foreground";

export function SiteContentForm({ initial }: { initial: SiteContent }) {
  const router = useRouter();

  const [name, setName] = useState(initial.name);
  const [location, setLocation] = useState(initial.location);
  const [roles, setRoles] = useState(initial.roles.join("\n"));
  const [summary, setSummary] = useState(initial.summary);
  const [degree, setDegree] = useState(initial.education.degree);
  const [institution, setInstitution] = useState(initial.education.institution);
  const [eduLocation, setEduLocation] = useState(initial.education.location);
  const [startYear, setStartYear] = useState(initial.education.startYear);
  const [endYear, setEndYear] = useState(initial.education.endYear);
  const [cgpa, setCgpa] = useState(initial.education.cgpa);
  const [resumePath, setResumePath] = useState(initial.resumePath);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    const payload: SiteContent = {
      name: name.trim(),
      location: location.trim(),
      roles: roles.split("\n").map((r) => r.trim()).filter(Boolean),
      summary: summary.trim(),
      education: {
        degree: degree.trim(),
        institution: institution.trim(),
        location: eduLocation.trim(),
        startYear: Number(startYear),
        endYear: Number(endYear),
        cgpa: cgpa.trim(),
      },
      resumePath: resumePath.trim(),
    };

    try {
      const res = await fetchWithAuth("/api/admin/site-content", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      setSuccess(true);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className={labelClasses}>Name</label>
        <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Location</label>
        <input required value={location} onChange={(e) => setLocation(e.target.value)} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Roles (one per line — these cycle in the Hero typewriter)</label>
        <textarea
          required
          rows={4}
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div>
        <label className={labelClasses}>Summary (used in both Hero and About)</label>
        <textarea
          required
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <h2 className="mt-2 font-display text-lg text-foreground">Education</h2>

      <div>
        <label className={labelClasses}>Degree</label>
        <input required value={degree} onChange={(e) => setDegree(e.target.value)} className={inputClasses} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses}>Institution</label>
          <input required value={institution} onChange={(e) => setInstitution(e.target.value)} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Location</label>
          <input required value={eduLocation} onChange={(e) => setEduLocation(e.target.value)} className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={labelClasses}>Start Year</label>
          <input type="number" required value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>End Year</label>
          <input type="number" required value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>CGPA</label>
          <input required value={cgpa} onChange={(e) => setCgpa(e.target.value)} className={inputClasses} />
        </div>
      </div>

      <h2 className="mt-2 font-display text-lg text-foreground">Resume</h2>

      <div>
        <label className={labelClasses}>Resume file path</label>
        <input
          required
          value={resumePath}
          onChange={(e) => setResumePath(e.target.value)}
          placeholder="/resume/Jaya_Chandra_Resume.pdf"
          className={inputClasses}
        />
        <p className="mt-1.5 font-body text-xs text-muted-foreground">
          This only sets the path — the actual PDF file still needs to be
          manually placed in public/resume in your code and redeployed
          (no file upload here, same reasoning as certification images).
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 font-body text-sm text-red-400">
          <AlertCircle size={16} className="shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 font-body text-sm text-accent">
          <CheckCircle2 size={16} className="shrink-0" /> Saved — refresh the home page to see changes.
        </div>
      )}

      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
