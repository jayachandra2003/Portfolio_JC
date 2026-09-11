import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { Project } from "@/lib/types";

const COLLECTION = "projects";

/**
 * Fetches all projects ordered for display.
 * Components must call this — never import `db` or touch Firestore directly.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return PROJECT_SEED_DATA;
    }
    return snapshot.docs.map((doc) => doc.data() as Project);
  } catch {
    return PROJECT_SEED_DATA;
  }
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
    repoUrl: null,
    demoUrl: null,
    featured: false,
    order: 2,
  },
  {
    id: "bullymail-threat-intelligence",
    slug: "bullymail-threat-intelligence",
    title: "BullyMail-Threat-Intelligence",
    description:
      "An enterprise digital forensic email threat intelligence and cyberbullying detection platform with multi-vector threat decomposition, hybrid ML analysis, and SOC operations.",
    tech: [
      "Python",
      "Flask",
      "Scikit-learn",
      "NLP",
      "Linear SVC",
      "Logistic Regression",
      "MySQL",
      "SQLite",
      "Fernet AES-128",
      "Pytest",
    ],
    features: [
      "Multi-vector forensic decomposition (NLP Cyberbullying, Phishing, Social Engineering, Attachment Malware, Image Forensics)",
      "Supervised ML text classification with TF-IDF, Linear SVC, and Logistic Regression",
      "Phishing & typosquatting detection with normalized Levenshtein distance and URL Shannon entropy",
      "Static attachment forensics with magic byte verification and double-extension detection",
      "SOC dashboard with explainable risk aggregation and calibrated threat scoring",
    ],
    repoUrl: "https://github.com/jayachandra2003/BullyMail-Threat-Intelligence",
    demoUrl: null,
    featured: false,
    order: 3,
  },
  {
    id: "cybersentinel-ai",
    slug: "cybersentinel-ai",
    title: "CyberSentinel-AI",
    description:
      "An enterprise-grade defensive cybersecurity and compliance platform for authorized domain security posture assessment, vulnerability scanning, and reporting.",
    tech: [
      "FastAPI",
      "Python",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "SQLAlchemy",
      "Celery",
      "Redis",
      "Docker",
    ],
    features: [
      "Interface-driven modular scanner framework with clean SOLID architecture",
      "Asynchronous security scan orchestration & reporting powered by Celery and Redis",
      "Comprehensive domain security posture, compliance, and vulnerability evaluations",
      "Enterprise observability with structured JSON logging, Prometheus metrics, and OpenTelemetry",
      "Multi-stage Docker containerization and automated CI/CD security workflows",
    ],
    repoUrl: "https://github.com/jayachandra2003/CyberSentinel-AI",
    demoUrl: null,
    featured: false,
    order: 4,
  },
];
