import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card glass className="flex h-full flex-col transition-transform hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>
            {project.caseStudySlug ? (
              <Link href={`/projects/${project.caseStudySlug}`} className="hover:text-accent">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </CardTitle>
          {project.featured && <Badge variant="accent">Featured</Badge>}
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-wrap gap-2">
        {/* Only render links that actually exist — no fake/placeholder hrefs */}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1.5" })}
          >
            <Github size={14} /> View Code
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "ghost", size: "sm", className: "gap-1.5" })}
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        )}
        {project.caseStudySlug && (
          <Link
            href={`/projects/${project.caseStudySlug}`}
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            Case Study
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
