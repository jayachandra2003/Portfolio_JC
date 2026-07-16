import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CertificationForm } from "@/components/admin/certification-form";

export default function NewCertificationPage() {
  return (
    <div className="mx-auto max-w-2xl px-8 py-20">
      <Link href="/admin/certifications" className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-accent">
        <ArrowLeft size={14} /> Back to Certifications
      </Link>
      <h1 className="mb-8 font-display text-3xl italic text-foreground">New Certification</h1>
      <CertificationForm />
    </div>
  );
}
