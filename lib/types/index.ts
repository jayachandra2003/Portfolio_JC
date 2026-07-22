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
  /** Path under /public, e.g. "/certifications/oci-ai-foundations.png". Null until you add the image. */
  imagePath: string | null;
  /** Skill tags shown as badges, e.g. ["Cloud", "AI"]. Empty until filled in via admin. */
  tags: string[];
  /** Highlights this cert with a "Featured" badge on the public site. */
  featured: boolean;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "database" | "tool";
}

export interface SiteContent {
  name: string;
  location: string;
  roles: string[];
  summary: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    startYear: number;
    endYear: number;
    cgpa: string;
  };
  /** Path under /public, e.g. "/resume/Jaya_Chandra_Resume.pdf". The actual
   * PDF file still needs to be manually added to /public and redeployed —
   * this only stores the path (no Storage backend for real file uploads). */
  resumePath: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
