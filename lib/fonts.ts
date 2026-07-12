import { Fraunces, Manrope } from "next/font/google";

// Fraunces: a characterful serif for display text (name, section titles).
// Deliberately not Inter/Roboto/system fonts — see frontend design notes.
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Manrope: clean geometric sans for body copy and UI chrome.
export const fontBody = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
