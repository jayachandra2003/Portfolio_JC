"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ExternalLink, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { UNCONFIRMED_DATE } from "@/lib/data/certifications";
import type { Certification } from "@/lib/types";

function formatDate(date: string): string | null {
  if (date === UNCONFIRMED_DATE) return null; // don't show a fake-looking date
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function CertificationsGrid({ certifications }: { certifications: Certification[] }) {
  const [enlarged, setEnlarged] = useState<string | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => {
          const displayDate = formatDate(cert.date);
          return (
            <Card key={cert.id} glass>
              {cert.imagePath && (
                <button
                  onClick={() => setEnlarged(cert.imagePath)}
                  className="block w-full overflow-hidden rounded-t-xl border-b border-border"
                  aria-label={`Enlarge ${cert.name} certificate image`}
                >
                  <Image
                    src={cert.imagePath}
                    alt={`${cert.name} certificate`}
                    width={400}
                    height={280}
                    quality={100}
                    unoptimized
                    className="h-40 w-full object-cover transition-transform hover:scale-105"
                  />
                </button>
              )}
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Award size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-body font-medium text-card-foreground">{cert.name}</p>
                  <p className="mt-1 font-body text-sm text-muted-foreground">{cert.issuer}</p>
                  {displayDate && (
                    <p className="mt-1 font-body text-xs text-muted-foreground">{displayDate}</p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                        className: "mt-2 gap-1.5 px-0",
                      })}
                    >
                      <ExternalLink size={12} /> View credential
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Simple lightbox — click a thumbnail to see the full certificate */}
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
