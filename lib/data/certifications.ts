import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { Certification } from "@/lib/types";

const COLLECTION = "certifications";

// Sentinel value used in the seed data below for dates not yet confirmed.
// The Certifications UI checks against this and hides the date rather
// than displaying a fake-looking specific date to site visitors.
export const UNCONFIRMED_DATE = "2025-01-01";

export async function getCertifications(): Promise<Certification[]> {
  // Deliberately no orderBy("order") here — Firestore's orderBy excludes
  // documents that don't have that field at all, which would silently
  // hide any certification added before this field existed. Sorting in
  // code guarantees nothing disappears; certs missing "order" just sort
  // to the end via the ?? 999 fallback below.
  const q = query(collection(db, COLLECTION));
  const snapshot = await getDocs(q);
  const certifications = snapshot.docs.map((doc) => doc.data() as Certification);
  return certifications.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/** Seed data — run once via the Phase 4 seed script. */
export const CERTIFICATION_SEED_DATA: Certification[] = [
  {
    id: "oci-ai-foundations",
    name: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
    issuer: "Oracle",
    date: UNCONFIRMED_DATE, // TODO: confirm exact issue date
    credentialUrl: null,
    imagePath: "/certifications/oci-ai-foundations.jpg",
    tags: [], // TODO: add real skill tags via admin panel
    featured: false,
    order: 1,
  },
  {
    id: "genai-essentials",
    name: "Career Essentials in Generative AI",
    issuer: "Microsoft / LinkedIn Learning",
    date: UNCONFIRMED_DATE, // TODO: confirm exact issue date
    credentialUrl: null,
    imagePath: "/certifications/genai-essentials.jpg",
    tags: [], // TODO: add real skill tags via admin panel
    featured: false,
    order: 2,
  },
  {
    id: "hf-agents-course",
    name: "Agents Course — Certificate of Excellence",
    issuer: "Hugging Face",
    date: UNCONFIRMED_DATE, // TODO: confirm exact issue date
    credentialUrl: null,
    imagePath: "/certifications/hf-agents-course.jpg",
    tags: [], // TODO: add real skill tags via admin panel
    featured: false,
    order: 3,
  },
  {
    id: "gemini-academy",
    name: "Gemini Academy 2025",
    issuer: "Google",
    date: UNCONFIRMED_DATE, // TODO: confirm exact issue date
    credentialUrl: null,
    imagePath: "/certifications/gemini-academy.jpg",
    tags: [], // TODO: add real skill tags via admin panel
    featured: false,
    order: 4,
  },
];
