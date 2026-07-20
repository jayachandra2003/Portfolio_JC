import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { SiteContent } from "@/lib/types";

const COLLECTION = "siteContent";
const DOC_ID = "main";

/** Fetches the single site-content document (Hero/About/Resume text). */
export async function getSiteContent(): Promise<SiteContent> {
  const snapshot = await getDoc(doc(db, COLLECTION, DOC_ID));
  if (!snapshot.exists()) {
    // Falls back to the seed data below if the doc hasn't been seeded yet —
    // keeps the site working even before `npm run seed` has been re-run.
    return SITE_CONTENT_SEED_DATA;
  }
  return snapshot.data() as SiteContent;
}

/** Seed data — run once via the seed script, matches the original static
 * lib/data/profile.ts / education.ts / resume.ts values. */
export const SITE_CONTENT_SEED_DATA: SiteContent = {
  name: "Vennam Jaya Chandra",
  location: "Andhra Pradesh, India",
  roles: [
    "Software Development Engineer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Computer Vision Engineer",
  ],
  summary:
    "Integrated M.Tech Computer Science Engineering (AI/ML) student at VIT-AP University with hands-on experience building full-stack web applications and computer vision systems using Python, Flask, OpenCV, and TensorFlow. Passionate about building AI-powered applications that solve real-world problems.",
  education: {
    degree: "Integrated M.Tech, Computer Science and Engineering (AI & ML)",
    institution: "VIT-AP University",
    location: "Andhra Pradesh, India",
    startYear: 2022,
    endYear: 2027,
    cgpa: "7.68 / 10",
  },
  resumePath: "/resume/Jaya_Chandra_Resume.pdf",
};
