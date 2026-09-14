"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";
import type { SiteContent } from "@/lib/types";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

function ProfilePhoto({ name, className = "" }: { name: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative shrink-0 ${className}`}
    >
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-accent/30 via-cyan-500/20 to-teal-400/25 blur-2xl scale-95" />
      <div className="relative h-48 w-48 overflow-hidden rounded-full ring-2 ring-accent/70 ring-offset-4 ring-offset-background sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-[270px] lg:w-[270px] xl:h-[295px] xl:w-[295px] shadow-xl shadow-black/30">
        <Image
          src="/images/profile-photo.png"
          alt={name}
          fill
          sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 270px, 295px"
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}

export function Hero({ profile }: { profile: SiteContent }) {
  const activeRoles = (profile.roles && profile.roles.length > 0
    ? profile.roles
    : ["Software Development Engineer", "Full Stack Developer", "AI/ML Engineer"]
  ).filter((r) => !r.toLowerCase().includes("computer vision"));

  const role = useTypewriter({
    words: activeRoles.length > 0 ? activeRoles : ["Software Development Engineer", "Full Stack Developer", "AI/ML Engineer"],
    typingSpeedMs: 70,
    deletingSpeedMs: 35,
    pauseMs: 1600,
  });

  return (
    <section
      id="home"
      className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-0"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
        {/* Left Column: Text Content */}
        <div className="flex flex-col lg:col-span-7 xl:col-span-7">
          {/* Location Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/40 px-4 py-1.5 font-body text-xs sm:text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm"
          >
            <MapPin size={14} className="text-accent" />
            <span>{profile.location}</span>
          </motion.div>

          {/* Dominant Name Heading */}
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[3.85rem] italic leading-[1.1] tracking-tight text-foreground"
          >
            {profile.name}
          </motion.h1>

          {/* Dynamic Rotating Role with Typewriter & Cursor (Decreased size) */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="mt-3 flex items-center font-body text-xl font-medium text-accent sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] min-h-[2rem] sm:min-h-[2.25rem]"
          >
            <span>{role}</span>
            <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse bg-accent align-middle" />
          </motion.p>

          {/* Concise Professional Introduction */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="mt-5 max-w-2xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed"
          >
            {profile.summary}
          </motion.p>

          {/* Polished CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/#projects"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className:
                  "gap-2 rounded-full font-body font-semibold transition-all px-8 py-3.5 text-sm sm:text-base shadow-lg shadow-accent/20 hover:shadow-accent/30",
              })}
            >
              View Projects <ArrowRight size={16} />
            </Link>
            <Link
              href="/#contact"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "rounded-full font-body font-medium transition-all px-8 py-3.5 text-sm sm:text-base bg-card/40 border-border hover:bg-card/70",
              })}
            >
              Contact Me
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Profile Photo */}
        <div className="flex justify-center pt-4 lg:col-span-5 lg:justify-end lg:pt-0">
          <ProfilePhoto name={profile.name} />
        </div>
      </div>
    </section>
  );
}
