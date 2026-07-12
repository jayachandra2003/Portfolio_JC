import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIALS } from "@/lib/data/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-body text-sm text-muted-foreground">
          © {year} Vennam Jaya Chandra. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            <Github size={18} />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${SOCIALS.email}`}
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
