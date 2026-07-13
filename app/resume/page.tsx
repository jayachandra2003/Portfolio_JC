import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { RESUME_PATH } from "@/lib/data/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download or preview Vennam Jaya Chandra's resume.",
};

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-4xl px-8 py-20 md:px-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl italic text-foreground md:text-5xl">
          Resume
        </h1>
        <a
          href={RESUME_PATH}
          download
          className={buttonVariants({ variant: "primary", className: "gap-2" })}
        >
          <Download size={16} /> Download PDF
        </a>
      </div>

      {/* Inline PDF preview — most browsers render this natively.
          If a browser can't preview inline, the fallback link below
          still lets the visitor open/download it directly. */}
      <div className="overflow-hidden rounded-xl border border-border">
        <iframe
          src={RESUME_PATH}
          title="Jaya Chandra's Resume"
          className="h-[80vh] w-full"
        />
      </div>

      <p className="mt-4 flex items-center gap-1.5 font-body text-sm text-muted-foreground">
        <FileText size={14} />
        Preview not loading?{" "}
        <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          Open it directly
        </a>
        .
      </p>
    </section>
  );
}
