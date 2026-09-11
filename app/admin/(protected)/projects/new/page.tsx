import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-2xl px-8 py-20">
      <Link href="/admin/projects" className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-accent">
        <ArrowLeft size={14} /> Back to Projects
      </Link>
      <h1 className="mb-8 font-display text-3xl italic text-foreground">New Project</h1>
      <ProjectForm />
    </div>
  );
}
