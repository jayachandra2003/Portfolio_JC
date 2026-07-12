import type { Metadata } from "next";
import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About — Jaya Chandra",
  description:
    "About Vennam Jaya Chandra — education, background, and focus areas in AI/ML and full-stack development.",
};

export default function AboutPage() {
  return <About />;
}
