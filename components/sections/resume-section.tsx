"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, ExternalLink, Eye, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import type { SiteContent } from "@/lib/types";

interface ResumeSectionProps {
  profile: SiteContent;
}

export function ResumeSection({ profile }: ResumeSectionProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { resumePath, name } = profile;

  // Handle Escape key to close modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsPreviewOpen(false);
      }
    }
    if (isPreviewOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isPreviewOpen]);

  return (
    <section id="resume" className="scroll-mt-16 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16 md:py-24">
      <div className="mb-10 lg:mb-12">
        <span className="font-body text-xs sm:text-sm font-bold tracking-widest text-accent uppercase">
          CURRICULUM VITAE
        </span>
        <h2 className="mt-2 font-display text-4xl italic text-foreground md:text-5xl tracking-tight">
          Resume
        </h2>
      </div>

      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass-interactive relative overflow-hidden rounded-2xl p-8 sm:p-10 shadow-xl transition-all duration-300"
        >
          {/* Subtle ambient light glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            {/* Document Details */}
            <div className="space-y-1.5">
              <h3 className="font-display text-2xl text-card-foreground sm:text-3xl">
                {name}
              </h3>
              <p className="font-body text-sm font-medium text-accent">
                Software Engineer & AI/ML Developer
              </p>
              <p className="mx-auto max-w-md pt-2 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Full resume covering education at VIT-AP, production engineering projects, enterprise certifications, and technical skills.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={resumePath}
                download
                className={buttonVariants({
                  variant: "primary",
                  className: "gap-2 px-6 py-2.5 font-body text-sm font-semibold shadow-md",
                })}
              >
                <Download size={16} /> Download PDF
              </a>

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreviewOpen(true)}
                className="gap-2 px-5 py-2.5 font-body text-sm hover:border-accent/40"
              >
                <Eye size={15} /> Quick Preview
              </Button>

              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "ghost",
                  className: "gap-1.5 px-4 py-2.5 font-body text-sm text-muted-foreground hover:text-foreground",
                })}
              >
                <ExternalLink size={15} /> Open in New Tab
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Interactive PDF Lightbox / Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md"
            onClick={() => setIsPreviewOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Resume Document Preview"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Topbar */}
              <div className="flex items-center justify-between border-b border-border bg-card/95 px-5 py-3.5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-card-foreground">
                      {name} — Resume
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      Jaya_Chandra_Resume.pdf
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={resumePath}
                    download
                    className={buttonVariants({
                      variant: "primary",
                      size: "sm",
                      className: "gap-1.5 text-xs font-medium",
                    })}
                  >
                    <Download size={14} /> Download
                  </a>
                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "gap-1 text-xs text-muted-foreground hover:text-foreground",
                    })}
                  >
                    <ExternalLink size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Close resume preview"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PDF Embed Viewer */}
              <div className="relative flex-1 bg-muted/20">
                <iframe
                  src={`${resumePath}#toolbar=0`}
                  title="Resume PDF Preview"
                  className="h-full w-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
