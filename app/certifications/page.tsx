import type { Metadata } from "next";
import { getCertifications } from "@/lib/data/certifications";
import { CertificationsGrid } from "@/components/sections/certifications-grid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certifications earned by Vennam Jaya Chandra in AI, cloud, and generative AI.",
};

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <section className="mx-auto max-w-3xl px-8 py-20 md:px-16">
      <h1 className="mb-10 font-display text-4xl italic text-foreground md:text-5xl">
        Certifications
      </h1>
      <CertificationsGrid certifications={certifications} />
    </section>
  );
}
