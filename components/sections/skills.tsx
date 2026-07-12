"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SKILLS } from "@/lib/data/skills";
import type { Skill } from "@/lib/types";

const CATEGORY_LABELS: Record<Skill["category"], string> = {
  language: "Languages",
  framework: "Frameworks & Libraries",
  database: "Databases",
  tool: "Tools",
};

const CATEGORY_ORDER: Skill["category"][] = ["language", "framework", "database", "tool"];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
};

export function Skills() {
  return (
    <section className="mx-auto max-w-3xl px-8 py-20 md:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 font-display text-3xl italic text-foreground md:text-4xl"
      >
        Skills
      </motion.h2>

      <div className="flex flex-col gap-8">
        {CATEGORY_ORDER.map((category) => {
          const skillsInCategory = SKILLS.filter((s) => s.category === category);
          if (skillsInCategory.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="mb-3 font-body text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {CATEGORY_LABELS[category]}
              </h3>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={container}
                className="flex flex-wrap gap-2"
              >
                {skillsInCategory.map((skill) => (
                  <motion.div key={skill.name} variants={item}>
                    <Badge variant="accent">{skill.name}</Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
