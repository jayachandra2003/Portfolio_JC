import { Github, Linkedin, Mail, Download, FileText } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { CertificationsGrid } from "@/components/sections/certifications-grid";
import { ContactForm } from "@/components/sections/contact-form";
import { getProjects } from "@/lib/data/projects";
import { getCertifications } from "@/lib/data/certifications";
import { SOCIALS } from "@/lib/data/socials";
import { RESUME_PATH } from "@/lib/data/resume";
import { buttonVariants } from "@/components/ui/button";

// Revalidate at most once per hour — same reasoning as the old standalone
// Projects/Certifications pages: avoids hitting Firestore on every request.
export const revalidate = 3600;

// Single scrolling page — Home, About, Projects, Certifications, Resume,
// and Contact are now sections on one page instead of separate routes.
// Old URLs (/about, /projects, etc.) redirect here via next.config.mjs.
// Each section has a matching id + scroll-mt-16 (offset for the sticky
// navbar) so the navbar's anchor links and smooth-scroll land correctly.
export default async function HomePage() {
  const [projects, certifications] = await Promise.all([
    getProjects(),
    getCertifications(),
  ]);

  return (
    <>
      <div id="home">
        <Hero />
      </div>

      <div id="about" className="scroll-mt-16">
        <About />
      </div>

      <Skills />

      <section id="projects" className="scroll-mt-16 mx-auto max-w-4xl px-8 py-20 md:px-16">
        <h2 className="mb-10 font-display text-4xl italic text-foreground md:text-5xl">
          Projects
        </h2>
        <ProjectsGrid projects={projects} />
      </section>

      <section id="certifications" className="scroll-mt-16 mx-auto max-w-3xl px-8 py-20 md:px-16">
        <h2 className="mb-10 font-display text-4xl italic text-foreground md:text-5xl">
          Certifications
        </h2>
        <CertificationsGrid certifications={certifications} />
      </section>

      <section id="resume" className="scroll-mt-16 mx-auto max-w-4xl px-8 py-20 md:px-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-4xl italic text-foreground md:text-5xl">
            Resume
          </h2>
          <a
            href={RESUME_PATH}
            download
            className={buttonVariants({ variant: "primary", className: "gap-2" })}
          >
            <Download size={16} /> Download PDF
          </a>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <iframe src={RESUME_PATH} title="Jaya Chandra's Resume" className="h-[80vh] w-full" />
        </div>
        <p className="mt-4 flex items-center gap-1.5 font-body text-sm text-muted-foreground">
          <FileText size={14} />
          Preview not loading?{" "}
          <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Open it directly
          </a>
          .
        </p>
      </section>

      <section id="contact" className="scroll-mt-16 mx-auto max-w-3xl px-8 py-20 md:px-16">
        <h2 className="mb-4 font-display text-4xl italic text-foreground md:text-5xl">
          Contact
        </h2>
        <p className="mb-10 max-w-lg font-body text-muted-foreground">
          Have a role, a project, or just want to talk about AI/ML and
          full-stack development? Send a message, or reach out directly below.
        </p>
        <div className="mb-10 flex flex-wrap gap-4">
          <a href={`mailto:${SOCIALS.email}`} className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-accent">
            <Mail size={16} /> {SOCIALS.email}
          </a>
          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-accent">
            <Github size={16} /> GitHub
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-accent">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
