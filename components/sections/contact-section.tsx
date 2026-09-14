"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Check, Copy } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { SOCIALS } from "@/lib/data/socials";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(SOCIALS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="scroll-mt-16 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="font-display text-4xl italic text-foreground md:text-5xl">
            Contact
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm text-muted-foreground md:text-base">
            Have a role, a project, or just want to talk about AI/ML and full-stack development? Send a message, or reach out directly below.
          </p>
        </div>

        {/* Direct Channels Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Email button with copy / open */}
          <div className="flex items-center rounded-xl border border-border bg-card/80 p-1 backdrop-blur-sm transition-all duration-200 hover:border-accent/40 shadow-sm">
            <a
              href={`mailto:${SOCIALS.email}`}
              className="flex items-center gap-2 px-3 py-1.5 font-body text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={15} className="text-accent" />
              <span>{SOCIALS.email}</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/30 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Copy email address"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={13} className="text-emerald-400" />
              ) : (
                <Copy size={13} />
              )}
            </button>
          </div>

          {/* GitHub */}
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2 font-body text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:text-foreground shadow-sm"
          >
            <Github size={15} className="text-accent" />
            <span>GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2 font-body text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:text-foreground shadow-sm"
          >
            <Linkedin size={15} className="text-accent" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Form Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass-interactive relative mt-10 overflow-hidden rounded-2xl p-6 sm:p-10 shadow-xl transition-all duration-300"
        >
          {/* Subtle ambient light glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
