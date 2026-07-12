import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { Certification } from "@/lib/types";

const COLLECTION = "certifications";

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
    date: "2025-01-01", // TODO: confirm exact issue date
    credentialUrl: null,
  },
  {
    id: "genai-essentials",
    name: "Career Essentials in Generative AI",
    issuer: "Microsoft / LinkedIn Learning",
    date: "2025-01-01", // TODO: confirm exact issue date
    credentialUrl: null,
  },
  {
    id: "hf-agents-course",
    name: "Agents Course — Certificate of Excellence",
    issuer: "Hugging Face",
    date: "2025-01-01", // TODO: confirm exact issue date
    credentialUrl: null,
  },
  {
    id: "gemini-academy",
    name: "Gemini Academy 2025",
    issuer: "Google",
    date: "2025-01-01", // TODO: confirm exact issue date
    credentialUrl: null,
  },
];
