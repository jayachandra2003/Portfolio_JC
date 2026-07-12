"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/sections/project-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = useMemo(() => {
    const allTech = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => allTech.add(t)));
    return ["All", ...Array.from(allTech).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.tech.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              buttonVariants({
                variant: activeFilter === filter ? "primary" : "outline",
                size: "sm",
              })
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="font-body text-muted-foreground">
          No projects match this filter.
        </p>
      ) : (
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
