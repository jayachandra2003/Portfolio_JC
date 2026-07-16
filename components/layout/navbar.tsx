"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NAV_LINKS } from "@/lib/data/socials";
import { cn } from "@/lib/utils";

// The section ids that exist on the single-scroll home page. Used to
// detect which section is currently in view for active-link highlighting.
// Nav links point to "/#id", so on OTHER pages (e.g. the SkyWrite case
// study, admin pages) these ids simply don't exist — the observer below
// just finds nothing to watch, which is fine, it means no link highlights.
const SECTION_IDS = ["home", "about", "projects", "certifications", "resume", "contact"];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Treat a section as "active" once it crosses the vertical center
      // of the viewport, not just any partial overlap.
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="glass sticky top-0 z-50 w-full">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/#home" className="font-display text-lg italic text-foreground">
          Jaya Chandra
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.split("#")[1];
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-body text-sm transition-colors hover:text-accent",
                    isActive ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <ul className="glass flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.split("#")[1];
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block py-2 font-body text-sm",
                    isActive ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
