import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { Project } from "@/lib/types";

const COLLECTION = "projects";

/**
 * Fetches all projects ordered for display.
 * Components must call this — never import `db` or touch Firestore directly.
 */
export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Project);
}

export async function getFeaturedProject(): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.featured) ?? null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

/**
 * Seed data for the `projects` Firestore collection. Run once via the
 * seed script (Phase 4) to populate Firestore — this is source-of-truth
 * content, not a fallback used at runtime.
 *
 * NOTE: Fabric Marketplace repoUrl is intentionally `null`, not a fake
 * link — that URL hasn't been confirmed yet. Fill it in before seeding.
 */
export const PROJECT_SEED_DATA: Project[] = [
  {
    id: "skywrite",
    slug: "skywrite",
    title: "SkyWrite",
    description:
      "A real-time touchless virtual whiteboard using computer vision — draw in the air and have handwritten characters recognized automatically.",
    tech: ["Python", "OpenCV", "MediaPipe", "TensorFlow", "CNN", "EMNIST"],
    features: [
      "21-point hand tracking",
      "Gesture-based drawing",
      "Character recognition (~87% accuracy)",
      "Line smoothing",
      "Real-time inference",
    ],
    repoUrl: "https://github.com/jayachandra2003/SkyWrite-Smart-AI-Whiteboard",
    demoUrl: null,
    featured: true,
    order: 1,
    caseStudySlug: "skywrite",
  },
  {
    id: "fabric-marketplace",
    slug: "fabric-marketplace",
    title: "Fabric Marketplace with AI-Based Fabric Defect Detection",
    description:
      "A multi-role marketplace (admin, seller, buyer) with an AI defect-detection pipeline that flags fabric defects from uploaded images.",
    tech: ["Flask", "TensorFlow", "OpenCV", "MySQL"],
    features: [
      "Admin, seller, and buyer roles",
      "AI defect detection (~94% accuracy)",
      "Authentication",
      "Full CRUD across roles",
    ],
    repoUrl: null, // TODO: confirm and add repo URL before seeding Firestore
    demoUrl: null,
    featured: false,
    order: 2,
  },
  {
    id: "python-mini-projects",
    slug: "python-mini-projects",
    title: "Python Mini Projects",
    description:
      "A collection of five small Python projects covering automation, games, and utilities.",
    tech: ["Python"],
    features: [
      "Pomodoro Timer",
      "Password Manager",
      "Snake Game",
      "Hangman",
      "LinkedIn Automation",
    ],
    repoUrl: null, // TODO: add repo URL(s) — combined card, may need multiple links
    demoUrl: null,
    featured: false,
    order: 3,
  },
];
