"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { UNCONFIRMED_DATE } from "@/lib/data/certifications";
import type { Certification } from "@/lib/types";

function formatDate(date: string): string | null {
  if (date === UNCONFIRMED_DATE) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function CertificationsGrid({ certifications }: { certifications: Certification[] }) {
  const [enlarged, setEnlarged] = useState<string | null>(null);

  return (
    <>
      {/* Full-bleed wrapper — breaks out of the parent section's
          max-w-6xl/padding constraint so the row spans the full viewport
          width edge-to-edge, instead of starting/ending mid-screen inside
          the centered container. Standard CSS full-bleed trick: 100vw
          width offset by -50vw margins, regardless of ancestor width. */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-8 pb-6 pt-2 md:px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {certifications.map((cert, i) => {
            const displayDate = formatDate(cert.date);
            const tags = cert.tags ?? [];
            const featured = cert.featured ?? false;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="glass relative w-[320px] shrink-0 snap-start rounded-xl border border-border sm:w-[360px]"
              >
                {featured && (
                  <span className="absolute -top-2.5 left-4 z-10">
                    <Badge variant="accent">Featured</Badge>
                  </span>
                )}

                {cert.imagePath && (
                  <button
                    onClick={() => setEnlarged(cert.imagePath!)}
                    className="block w-full overflow-hidden rounded-t-xl border-b border-border"
                    aria-label={`Enlarge ${cert.name} certificate image`}
                  >
                    <Image
                      src={cert.imagePath}
                      alt={`${cert.name} certificate`}
                      width={400}
                      height={220}
                      quality={100}
                      unoptimized
                      className="h-40 w-full object-cover transition-transform hover:scale-105"
                    />
                  </button>
                )}

                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-start gap-3">
                    {!cert.imagePath && (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Award size={18} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-body font-medium leading-snug text-card-foreground">
                        {cert.name}
                      </p>
                      <p className="mt-1 font-body text-sm text-muted-foreground">{cert.issuer}</p>
                      {displayDate && (
                        <p className="mt-0.5 font-body text-xs text-muted-foreground">{displayDate}</p>
                      )}
                    </div>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                        className: "mt-1 w-fit gap-1.5",
                      })}
                    >
                      <ExternalLink size={13} /> View Credential
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox — click a thumbnail to see the full certificate */}
      {enlarged && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
          onClick={() => setEnlarged(null)}
        >
          <button
            className="absolute right-6 top-6 text-white"
            onClick={() => setEnlarged(null)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <div className="relative h-[85vh] w-[90vw] max-w-4xl">
            <Image
              src={enlarged}
              alt="Enlarged certificate"
              fill
              sizes="90vw"
              quality={100}
              unoptimized
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
