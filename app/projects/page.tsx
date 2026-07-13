import type { Metadata } from "next";
import { getProjects } from "@/lib/data/projects";
import { ProjectsGrid } from "@/components/sections/projects-grid";

// Revalidate at most once per hour — avoids hitting Firestore on every
// single page request while still picking up seed-data changes reasonably
// soon after you re-run `npm run seed`.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Vennam Jaya Chandra, including SkyWrite, Fabric Marketplace, and Python mini-projects.",
};

// Server component — fetches directly from Firestore via the data-access
// layer (lib/data/projects.ts). No client-side fetch/loading spinner needed
// for the initial data since this runs on the server before the page ships.
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="mx-auto max-w-4xl px-8 py-20 md:px-16">
      <h1 className="mb-10 font-display text-4xl italic text-foreground md:text-5xl">
        Projects
      </h1>
      <ProjectsGrid projects={projects} />
    </section>
  );
}
