// Static by design — see the same reasoning as lib/data/skills.ts.
export const SOCIALS = {
  github: "https://github.com/jayachandra2003",
  linkedin: "https://www.linkedin.com/in/jaya-chandra-vennam/",
  email: "jayachandravennam.jc@gmail.com",
} as const;

// Anchor links for the single-scroll home page. "/projects/skywrite" is
// the one exception that's still a real standalone route.
export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Resume", href: "/#resume" },
  { label: "Contact", href: "/#contact" },
] as const;
