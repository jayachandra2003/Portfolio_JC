"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";
import { PROFILE } from "@/lib/data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

function ProfilePhoto({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative shrink-0 ${className}`}
    >
      <div className="absolute inset-0 -z-10 rounded-full bg-accent/25 blur-2xl" />
      <div className="relative h-40 w-40 overflow-hidden rounded-full ring-2 ring-accent/40 ring-offset-4 ring-offset-background md:h-64 md:w-64 lg:h-80 lg:w-80">
        <Image
          src="/images/profile-photo.png"
          alt={PROFILE.name}
          fill
          sizes="(max-width: 768px) 160px, (max-width: 1024px) 256px, 320px"
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const role = useTypewriter({ words: [...PROFILE.roles] });

  return (
    <section className="gradient-mesh relative flex min-h-[calc(100vh-4rem)] flex-col justify-center px-8 py-20 md:px-16">
      {/* Mobile: photo stacked above text, normal flow */}
      <div className="mb-8 flex justify-center md:hidden">
        <ProfilePhoto />
      </div>

      {/* Text content — completely unconstrained by the photo, exactly as
          it was originally, so the heading stays on one line. */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
        className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 font-body text-xs text-muted-foreground"
      >
        <MapPin size={12} />
        {PROFILE.location}
      </motion.div>

      <motion.h1
        initial="hidden"
        animate="visible"
        custom={0.1}
        variants={fadeUp}
        className="font-display text-5xl italic text-foreground md:text-7xl"
      >
        {PROFILE.name}
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        custom={0.2}
        variants={fadeUp}
        className="mt-4 font-body text-xl text-accent md:text-2xl"
        aria-live="polite"
      >
        {role}
        <span className="ml-0.5 animate-pulse">|</span>
      </motion.p>

      <motion.p
        initial="hidden"
        animate="visible"
        custom={0.3}
        variants={fadeUp}
        className="mt-6 max-w-xl font-body text-muted-foreground"
      >
        {PROFILE.summary}
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.4}
        variants={fadeUp}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Link
          href="/#projects"
          className={buttonVariants({ variant: "primary", size: "lg", className: "gap-2" })}
        >
          View Projects <ArrowRight size={16} />
        </Link>
        <Link href="/#contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Contact Me
        </Link>
      </motion.div>

      {/* Desktop: photo positioned independently in the right-side space,
          roughly midway between the text block and the right edge —
          doesn't affect text width/wrapping at all since it's absolutely
          positioned relative to the section, not in the text's flex flow. */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-end md:flex">
        <div className="pointer-events-auto mr-[8%] lg:mr-[12%]">
          <ProfilePhoto />
        </div>
      </div>
    </section>
  );
}
