"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronDown, ChevronUp, ExternalLink, X, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { UNCONFIRMED_DATE } from "@/lib/data/certifications";
import type { Certification } from "@/lib/types";

function formatDate(date: string): string | null {
  if (!date || date === UNCONFIRMED_DATE) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

interface ActiveModalCert {
  imagePath: string;
  name: string;
}

const INITIAL_LIMIT = 4;

export function CertificationsGrid({
  certifications,
}: {
  certifications: Certification[];
}) {
  const [showAll, setShowAll] = useState(false);
  const [activeCert, setActiveCert] = useState<ActiveModalCert | null>(null);

  const visibleCertifications = showAll
    ? certifications
    : certifications.slice(0, INITIAL_LIMIT);

  // Close modal on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveCert(null);
      }
    }
    if (activeCert) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scrolling while modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeCert]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleCertifications.map((cert, i) => {
          const displayDate = formatDate(cert.date);
          const tags = cert.tags ?? [];
          const featured = cert.featured ?? false;

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3), ease: "easeOut" }}
              className="liquid-glass-interactive group relative flex h-full flex-col overflow-hidden rounded-2xl shadow-md transition-all duration-300"
            >
              {/* Featured Badge */}
              {featured && (
                <div className="absolute right-3 top-3 z-10">
                  <Badge variant="accent">Featured</Badge>
                </div>
              )}

              {/* Certificate Image / Thumbnail */}
              {cert.imagePath ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveCert({
                      imagePath: cert.imagePath!,
                      name: cert.name,
                    })
                  }
                  className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden border-b border-border bg-muted/30 transition-colors"
                  aria-label={`View full certificate for ${cert.name}`}
                >
                  <Image
                    src={cert.imagePath}
                    alt={`${cert.name} certificate`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={95}
                    unoptimized
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-md bg-background/90 px-2.5 py-1 font-body text-xs font-medium text-foreground shadow">
                      <ZoomIn size={13} /> Click to Enlarge
                    </span>
                  </div>
                </button>
              ) : (
                <div className="flex aspect-[16/10] w-full items-center justify-center border-b border-border bg-muted/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Award size={28} />
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-body text-base font-semibold leading-snug text-card-foreground">
                    {cert.name}
                  </h3>
                  <p className="mt-1 font-body text-sm font-medium text-accent">
                    {cert.issuer}
                  </p>
                  {displayDate && (
                    <p className="mt-1 font-body text-xs text-muted-foreground">
                      Issued: {displayDate}
                    </p>
                  )}

                  {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                        className: "gap-1.5 text-xs",
                      })}
                    >
                      <ExternalLink size={13} /> Verify Credential
                    </a>
                  )}
                  {cert.imagePath && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCert({
                          imagePath: cert.imagePath!,
                          name: cert.name,
                        })
                      }
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                        className: "gap-1 text-xs text-muted-foreground hover:text-foreground",
                      })}
                    >
                      Preview
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Show All / Show Less Toggle Button */}
      {certifications.length > INITIAL_LIMIT && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              const nextState = !showAll;
              setShowAll(nextState);
              // If collapsing, scroll smoothly back to top of certifications section
              if (!nextState) {
                const section = document.getElementById("certifications");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className="gap-2 px-6 py-2.5 font-body text-sm font-medium"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                Show All Certifications <ChevronDown size={16} />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Clean Modal / Lightbox for Certificate View */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6"
            onClick={() => setActiveCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.name}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background hover:text-accent sm:right-6 sm:top-6"
              onClick={() => setActiveCert(null)}
              aria-label="Close certificate preview"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex max-h-[90vh] max-w-4xl flex-col items-center overflow-hidden rounded-xl border border-border bg-card p-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] h-auto max-h-[75vh] w-[90vw] max-w-3xl">
                <Image
                  src={activeCert.imagePath}
                  alt={activeCert.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 1000px"
                  quality={100}
                  unoptimized
                  className="rounded-lg object-contain"
                />
              </div>
              <div className="mt-2.5 w-full text-center">
                <p className="font-body text-sm font-medium text-card-foreground">
                  {activeCert.name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
