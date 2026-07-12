// Static by design — see the same reasoning as lib/data/skills.ts.
export const SOCIALS = {
  github: "https://github.com/jayachandra2003",
  linkedin: "https://www.linkedin.com/in/jaya-chandra-vennam/",
  email: "jayachandravennam.jc@gmail.com",
} as const;

// Routes used by the navbar — pages for each are built in later phases.
// Linking to them now is intentional: it surfaces 404s as a visible
// reminder of what's left to build, rather than silently going nowhere.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
] as const;
