import { Github, Linkedin, Mail, Download, FileText, ExternalLink } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { CertificationsGrid } from "@/components/sections/certifications-grid";
import { ContactForm } from "@/components/sections/contact-form";
import { getProjects } from "@/lib/data/projects";
import { getCertifications } from "@/lib/data/certifications";
import { getSiteContent } from "@/lib/data/site-content";
import { SOCIALS } from "@/lib/data/socials";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Revalidate at most once per hour — same reasoning as the old standalone
// Projects/Certifications pages: avoids hitting Firestore on every request.
export const revalidate = 3600;

// Single scrolling page — Home, About, Projects, Certifications, Resume,
// and Contact are now sections on one page instead of separate routes.
// Old URLs (/about, /projects, etc.) redirect here via next.config.mjs.
// Each section has a matching id + scroll-mt-16 (offset for the sticky
// navbar) so the navbar's anchor links and smooth-scroll land correctly.
export default async function HomePage() {
  const [projects, certifications, siteContent] = await Promise.all([
    getProjects(),
    getCertifications(),
    getSiteContent(),
  ]);

  return (
    <>
      <div id="home">
        <Hero profile={siteContent} />
      </div>

      <div id="about" className="scroll-mt-16">
        <About profile={siteContent} />
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

      <section id="resume" className="scroll-mt-16 mx-auto max-w-3xl px-8 py-20 md:px-16">
        <h2 className="mb-10 font-display text-4xl italic text-foreground md:text-5xl">
          Resume
        </h2>

        <Card glass className="mx-auto max-w-md text-center">
          <CardContent className="flex flex-col items-center gap-4 pt-10 pb-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
              <FileText size={28} />
            </div>
            <div>
              <p className="font-display text-xl text-card-foreground">
                {siteContent.name}
              </p>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                Full resume — education, projects, skills, and certifications.
              </p>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a
                href={siteContent.resumePath}
                download
                className={buttonVariants({ variant: "primary", className: "gap-2" })}
              >
                <Download size={16} /> Download PDF
              </a>
              <a
                href={siteContent.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", className: "gap-2" })}
              >
                <ExternalLink size={16} /> Open in New Tab
              </a>
            </div>
          </CardContent>
        </Card>
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
