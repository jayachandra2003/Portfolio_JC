import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { CertificationsGrid } from "@/components/sections/certifications-grid";
import { ResumeSection } from "@/components/sections/resume-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getProjects } from "@/lib/data/projects";
import { getCertifications } from "@/lib/data/certifications";
import { getSiteContent } from "@/lib/data/site-content";

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
    <div className="relative">
      {/* Single fixed background layer for the ENTIRE page — this is the
          fix for the "separate boxes" seam problem. Previously each
          section had its own gradient-mesh background, and the visible
          hard edge where one ended and the next began is what looked
          like disconnected boxes. A fixed layer stays anchored to the
          viewport as everything scrolls over it, so there's only ever
          one continuous background, never a seam. */}
      {/* Single fixed atmospheric background */}
      <div className="gradient-mesh pointer-events-none fixed inset-0 -z-10" />

      <Hero profile={siteContent} />

      <About profile={siteContent} />

      <Skills />

      <section id="projects" className="scroll-mt-16 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16 md:py-20">
        <h2 className="mb-10 font-display text-4xl italic text-foreground md:text-5xl">
          Projects
        </h2>
        <ProjectsGrid projects={projects} />
      </section>

      <section id="certifications" className="scroll-mt-16 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16 md:py-20">
        <h2 className="mb-10 font-display text-4xl italic text-foreground md:text-5xl">
          Certifications
        </h2>
        <CertificationsGrid certifications={certifications} />
      </section>

      <ResumeSection profile={siteContent} />

      <ContactSection />
    </div>
  );
}