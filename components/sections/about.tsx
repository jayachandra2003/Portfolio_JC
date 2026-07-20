"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SiteContent } from "@/lib/types";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function About({ profile }: { profile: SiteContent }) {
  const { education } = profile;

  return (
    <section className="mx-auto max-w-3xl px-8 py-20 md:px-16">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        variants={fadeUp}
        className="mb-8 font-display text-4xl italic text-foreground md:text-5xl"
      >
        About
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
        variants={fadeUp}
        className="mb-10 font-body text-lg leading-relaxed text-muted-foreground"
      >
        {profile.summary}
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
        variants={fadeUp}
      >
        <Card glass>
          <CardContent className="flex items-start gap-4 pt-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <GraduationCap size={18} />
            </div>
            <div>
              <p className="font-display text-lg text-card-foreground">
                {education.degree}
              </p>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                {education.institution}, {education.location}
              </p>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                {education.startYear} – {education.endYear} &middot; CGPA: {education.cgpa}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
