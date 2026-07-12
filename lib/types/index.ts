export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  order: number;
  /** Present only for projects with a full case-study page (e.g. SkyWrite) */
  caseStudySlug?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string; // ISO string, e.g. "2025-03-01"
  credentialUrl: string | null;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "database" | "tool";
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
