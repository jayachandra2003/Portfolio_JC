import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { SOCIALS } from "@/lib/data/socials";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vennam Jaya Chandra.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-8 py-20 md:px-16">
      <h1 className="mb-4 font-display text-4xl italic text-foreground md:text-5xl">
        Contact
      </h1>
      <p className="mb-10 max-w-lg font-body text-muted-foreground">
        Have a role, a project, or just want to talk about AI/ML and
        full-stack development? Send a message, or reach out directly below.
      </p>

      <div className="mb-10 flex flex-wrap gap-4">
        <a
          href={`mailto:${SOCIALS.email}`}
          className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-accent"
        >
          <Mail size={16} /> {SOCIALS.email}
        </a>
        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-accent"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href={SOCIALS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-accent"
        >
          <Linkedin size={16} /> LinkedIn
        </a>
      </div>

      <ContactForm />
    </section>
  );
}
