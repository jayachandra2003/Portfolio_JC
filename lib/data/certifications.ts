import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { Certification } from "@/lib/types";

const COLLECTION = "certifications";

// Sentinel value used in the seed data below for dates not yet confirmed.
// The Certifications UI checks against this and hides the date rather
// than displaying a fake-looking specific date to site visitors.
export const UNCONFIRMED_DATE = "2025-01-01";

export async function getCertifications(): Promise<Certification[]> {
  const q = query(collection(db, COLLECTION), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Certification);
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
  },
  {
    id: "genai-essentials",
    name: "Career Essentials in Generative AI",
    issuer: "Microsoft / LinkedIn Learning",
    date: UNCONFIRMED_DATE, // TODO: confirm exact issue date
    credentialUrl: null,
    imagePath: "/certifications/genai-essentials.jpg",
  },
  {
    id: "hf-agents-course",
    name: "Agents Course — Certificate of Excellence",
    issuer: "Hugging Face",
    date: UNCONFIRMED_DATE, // TODO: confirm exact issue date
    credentialUrl: null,
    imagePath: "/certifications/hf-agents-course.jpg",
  },
  {
    id: "gemini-academy",
    name: "Gemini Academy 2025",
    issuer: "Google",
    date: UNCONFIRMED_DATE, // TODO: confirm exact issue date
    credentialUrl: null,
    imagePath: "/certifications/gemini-academy.jpg",
  },
];
