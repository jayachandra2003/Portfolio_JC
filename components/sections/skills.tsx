"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SKILL_CATEGORIES, type BubbleSkill, type SkillCategory } from "@/lib/data/skills";

const MONOCHROME_ICONS = new Set(["github", "flask", "vercel"]);

const SIZE_CLASSES = {
  xl: "tech-item size-xl",
  lg: "tech-item size-lg",
  md: "tech-item size-md",
  sm: "tech-item size-sm",
} as const;

function InteractiveBubbleCloud({ skills }: { skills: BubbleSkill[] }) {
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const itemEls = Array.from(cloud.querySelectorAll<HTMLElement>(".tech-item"));
    if (prefersReducedMotion || !itemEls.length) return;

    interface BubbleState {
      el: HTMLElement;
      current: { x: number; y: number };
      clusterTarget: { x: number; y: number };
      ambientTarget: { x: number; y: number };
      inCluster: boolean;
    }

    const state: BubbleState[] = itemEls.map((el) => ({
      el,
      current: { x: 0, y: 0 },
      clusterTarget: { x: 0, y: 0 },
      ambientTarget: { x: 0, y: 0 },
      inCluster: false,
    }));

    let baseCenters: Array<{ cx: number; cy: number; w: number; h: number }> = [];
    let cloudCenter = { cx: 0, cy: 0 };

    function measureBaseCenters() {
      state.forEach((s) => {
        s.el.style.transform = "translate3d(0px, 0px, 0)";
      });
      baseCenters = state.map((s) => {
        const r = s.el.getBoundingClientRect();
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width, h: r.height };
      });
      const cloudRect = cloud!.getBoundingClientRect();
      cloudCenter = { cx: cloudRect.left + cloudRect.width / 2, cy: cloudRect.top + cloudRect.height / 2 };
    }

    measureBaseCenters();
    window.addEventListener("resize", measureBaseCenters, { passive: true });

    const CLUSTER_RADIUS = 150;
    const CLUSTER_PULL = 0.5;
    const OVERLAP_ALLOW = 0.55;
    const EASE = 0.28;
    const CURSOR_RADIUS = 90;
    const CURSOR_MAX = 5;
    const GROUP_FOLLOW_MAX = 80;
    const BOMBARD_DISTANCE = 70;
    const BOMBARD_HOLD_MS = 220;

    let anchorEl: HTMLElement | null = null;
    let rafId: number | null = null;
    let groupOffset = { x: 0, y: 0 };
    let bombardTimeout: ReturnType<typeof setTimeout> | null = null;

    function setCluster(anchorIdx: number) {
      const anchor = baseCenters[anchorIdx];
      if (!anchor) return;

      state.forEach((s, i) => {
        if (i === anchorIdx) {
          s.clusterTarget.x = 0;
          s.clusterTarget.y = 0;
          s.inCluster = true;
          return;
        }
        const c = baseCenters[i];
        if (!c) return;

        const dx = c.cx - anchor.cx;
        const dy = c.cy - anchor.cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < CLUSTER_RADIUS) {
          const minDist = (anchor.w / 2 + c.w / 2) * OVERLAP_ALLOW;
          let newDist = dist - (dist - minDist) * CLUSTER_PULL;
          if (newDist < minDist) newDist = minDist;
          const ux = dx / dist;
          const uy = dy / dist;
          s.clusterTarget.x = anchor.cx + ux * newDist - c.cx;
          s.clusterTarget.y = anchor.cy + uy * newDist - c.cy;
          s.inCluster = true;
        } else {
          s.clusterTarget.x = 0;
          s.clusterTarget.y = 0;
          s.inCluster = false;
        }
      });
    }

    function clearCluster() {
      state.forEach((s) => {
        s.clusterTarget.x = 0;
        s.clusterTarget.y = 0;
        s.inCluster = false;
      });
      groupOffset.x = 0;
      groupOffset.y = 0;
    }

    function activateAnchor(item: HTMLElement, idx: number) {
      anchorEl = item;
      itemEls.forEach((el) => el.classList.remove("is-anchor", "is-clustered"));
      item.classList.add("is-anchor");
      itemEls.forEach((el) => {
        if (el !== item) el.classList.add("is-clustered");
      });
      setCluster(idx);
      ensureLoop();
    }

    function deactivateAnchor(item: HTMLElement) {
      if (anchorEl !== item) return;
      anchorEl = null;
      itemEls.forEach((el) => el.classList.remove("is-anchor", "is-clustered"));
      clearCluster();
      ensureLoop();
    }

    itemEls.forEach((item, idx) => {
      item.addEventListener("mouseenter", () => activateAnchor(item, idx));
      item.addEventListener("mouseleave", () => deactivateAnchor(item));
      item.addEventListener("focus", () => activateAnchor(item, idx));
      item.addEventListener("blur", () => deactivateAnchor(item));
    });

    function handleMouseMove(e: MouseEvent) {
      if (anchorEl) {
        const anchorIdx = itemEls.indexOf(anchorEl);
        const anchorBase = baseCenters[anchorIdx];
        if (anchorBase) {
          let gx = e.clientX - anchorBase.cx;
          let gy = e.clientY - anchorBase.cy;
          const gDist = Math.sqrt(gx * gx + gy * gy);
          if (gDist > GROUP_FOLLOW_MAX) {
            const scale = GROUP_FOLLOW_MAX / gDist;
            gx *= scale;
            gy *= scale;
          }
          groupOffset.x = gx;
          groupOffset.y = gy;
          ensureLoop();
        }
        return;
      }

      state.forEach((s, i) => {
        const c = baseCenters[i];
        if (!c) return;
        const dx = e.clientX - c.cx;
        const dy = e.clientY - c.cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < CURSOR_RADIUS) {
          const strength = (1 - dist / CURSOR_RADIUS) * CURSOR_MAX;
          s.ambientTarget.x = (dx / dist) * strength;
          s.ambientTarget.y = (dy / dist) * strength;
        } else {
          s.ambientTarget.x = 0;
          s.ambientTarget.y = 0;
        }
      });
      ensureLoop();
    }

    function handleMouseLeave() {
      state.forEach((s) => {
        s.ambientTarget.x = 0;
        s.ambientTarget.y = 0;
      });
      ensureLoop();
    }

    function bombard() {
      if (bombardTimeout) clearTimeout(bombardTimeout);
      itemEls.forEach((el) => el.classList.remove("is-anchor", "is-clustered"));
      anchorEl = null;
      groupOffset.x = 0;
      groupOffset.y = 0;

      state.forEach((s, i) => {
        const c = baseCenters[i];
        if (!c) return;
        const dx = c.cx - cloudCenter.cx;
        const dy = c.cy - cloudCenter.cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        s.clusterTarget.x = ux * BOMBARD_DISTANCE;
        s.clusterTarget.y = uy * BOMBARD_DISTANCE;
        s.inCluster = false;
      });
      ensureLoop();

      bombardTimeout = setTimeout(() => {
        clearCluster();
        ensureLoop();
      }, BOMBARD_HOLD_MS);
    }

    cloud.addEventListener("mousemove", handleMouseMove, { passive: true });
    cloud.addEventListener("mouseleave", handleMouseLeave);
    cloud.addEventListener("click", bombard);

    function animate() {
      let moving = false;
      state.forEach((s) => {
        const tx = s.clusterTarget.x + s.ambientTarget.x + (s.inCluster ? groupOffset.x : 0);
        const ty = s.clusterTarget.y + s.ambientTarget.y + (s.inCluster ? groupOffset.y : 0);
        const dx = tx - s.current.x;
        const dy = ty - s.current.y;
        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) moving = true;
        s.current.x += dx * EASE;
        s.current.y += dy * EASE;
        s.el.style.transform = `translate3d(${s.current.x.toFixed(2)}px, ${s.current.y.toFixed(2)}px, 0)`;
      });
      rafId = moving ? requestAnimationFrame(animate) : null;
    }

    function ensureLoop() {
      if (!rafId) rafId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", measureBaseCenters);
      cloud.removeEventListener("mousemove", handleMouseMove);
      cloud.removeEventListener("mouseleave", handleMouseLeave);
      cloud.removeEventListener("click", bombard);
      if (rafId) cancelAnimationFrame(rafId);
      if (bombardTimeout) clearTimeout(bombardTimeout);
    };
  }, [skills]);

  return (
    <div ref={cloudRef} className="tech-cloud">
      {skills.map((skill: BubbleSkill) => {
        const isMonochrome = MONOCHROME_ICONS.has(skill.iconKey);
        return (
          <div
            key={skill.name}
            className={SIZE_CLASSES[skill.size]}
            tabIndex={0}
            aria-label={skill.name}
            style={{
              ["--float-delay" as string]: `${skill.floatDelay}s`,
            }}
          >
            <div className="bubble-float">
              <div className="tech-icon">
                <img
                  src={`/icons/skills/${skill.iconKey}.svg`}
                  alt={`${skill.name} icon`}
                  loading="lazy"
                  className={`object-contain transition-transform duration-200 ${
                    isMonochrome ? "invert [.light_&]:invert-0" : ""
                  }`}
                />
              </div>
            </div>
            <div className="tech-name">{skill.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-16 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      {/* Header — Left Aligned */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="lg:-translate-x-6 xl:-translate-x-10"
      >
        <h2 className="font-display text-4xl italic text-foreground md:text-5xl tracking-tight">
          Skills
        </h2>
      </motion.div>

      {/* 4-Column Generously Proportioned Category Pods Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 w-full lg:-translate-x-6 xl:-translate-x-10">
        {SKILL_CATEGORIES.map((category: SkillCategory, idx: number) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            className="liquid-glass-interactive group relative flex flex-col items-center justify-between rounded-2xl sm:rounded-3xl p-6 sm:p-7 overflow-hidden min-h-[330px] sm:min-h-[350px]"
          >
            {/* Subtle inner radial glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(20, 184, 166, 0.08) 0%, transparent 70%)",
              }}
            />

            {/* Category Title Pill */}
            <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <h3 className="font-body text-xs sm:text-sm font-semibold tracking-wide text-foreground">
                {category.name}
              </h3>
            </div>

            {/* Clustered Circular Bubble Cloud */}
            <div className="relative z-10 flex w-full flex-1 items-center justify-center py-2">
              <InteractiveBubbleCloud skills={category.skills} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scoped CSS for Bubble Cloud matching reference box proportions */}
      <style jsx global>{`
        /* Tech Cloud Flex Wrap in Pods */
        .tech-cloud {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px 14px;
          width: 100%;
          margin: 0 auto;
        }

        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          position: relative;
          cursor: pointer;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          z-index: 1;
          user-select: none;
        }

        .tech-item.is-anchor {
          z-index: 25;
        }

        .tech-item.is-clustered {
          z-index: 10;
        }

        .tech-item:focus-visible {
          outline: 2px solid hsl(var(--accent));
          outline-offset: 3px;
          border-radius: 50%;
        }

        /* Subtle organic stagger */
        .tech-item:nth-child(3n) { margin-top: 6px; }
        .tech-item:nth-child(4n) { margin-top: -6px; }

        /* Floating Animation Layer */
        .bubble-float {
          animation: cloudFloat 6s ease-in-out infinite;
          animation-delay: var(--float-delay, 0s);
          will-change: transform;
        }

        .tech-item:nth-child(2n) .bubble-float { animation-duration: 7s; }
        .tech-item:nth-child(3n) .bubble-float { animation-duration: 5.4s; }

        @keyframes cloudFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* Glassmorphism Bubble */
        .tech-icon {
          width: var(--bubble-size, 54px);
          height: var(--bubble-size, 54px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(150deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow:
            0 6px 18px rgba(0, 0, 0, 0.28),
            inset 0 1.5px 4px rgba(255, 255, 255, 0.2),
            inset 0 -4px 8px rgba(0, 0, 0, 0.2);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .light .tech-icon {
          background: linear-gradient(150deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.6));
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow:
            0 6px 16px rgba(0, 0, 0, 0.06),
            inset 0 1.5px 4px rgba(255, 255, 255, 0.95),
            inset 0 -4px 8px rgba(0, 0, 0, 0.03);
        }

        .tech-icon img {
          width: 54%;
          height: 54%;
        }

        .tech-name {
          font-family: var(--font-body), sans-serif;
          color: hsl(var(--foreground));
          font-size: 11px;
          font-weight: 600;
          opacity: 0.85;
          text-align: center;
          transition: opacity 0.25s ease, color 0.25s ease;
          pointer-events: none;
        }

        /* Hovered Anchor highlight */
        .tech-item.is-anchor .tech-icon {
          border-color: hsl(var(--accent));
          box-shadow:
            0 0 20px hsl(var(--accent) / 0.35),
            inset 0 1.5px 5px rgba(255, 255, 255, 0.35);
        }

        .tech-item.is-anchor .tech-name {
          opacity: 1;
          color: hsl(var(--accent));
        }

        /* Proportional Bubble Sizes */
        .tech-item.size-xl { --bubble-size: 58px; }
        .tech-item.size-lg { --bubble-size: 54px; }
        .tech-item.size-md { --bubble-size: 50px; }
        .tech-item.size-sm { --bubble-size: 46px; }

        .tech-item.size-xl .tech-name { font-size: 11.5px; font-weight: 600; }
        .tech-item.size-lg .tech-name { font-size: 11px; font-weight: 500; }
        .tech-item.size-md .tech-name { font-size: 10.5px; }
        .tech-item.size-sm .tech-name { font-size: 10px; }

        @media (max-width: 768px) {
          .tech-cloud {
            gap: 10px 10px;
          }

          .tech-item.size-xl { --bubble-size: 52px; }
          .tech-item.size-lg { --bubble-size: 48px; }
          .tech-item.size-md { --bubble-size: 44px; }
          .tech-item.size-sm { --bubble-size: 40px; }

          .tech-item:nth-child(3n),
          .tech-item:nth-child(4n) {
            margin-top: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bubble-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}