"use client";

import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
}

/**
 * Cycles through `words`, typing each one out, pausing, then deleting it
 * before moving to the next. Loops forever. Pure client-side state — no
 * timers running during SSR.
 */
export function useTypewriter({
  words,
  typingSpeedMs = 80,
  deletingSpeedMs = 40,
  pauseMs = 1800,
}: UseTypewriterOptions): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const currentWord = words[wordIndex % words.length] ?? "";

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        const t = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          typingSpeedMs
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(t);
    }

    // deleting
    if (text.length > 0) {
      const t = setTimeout(
        () => setText(currentWord.slice(0, text.length - 1)),
        deletingSpeedMs
      );
      return () => clearTimeout(t);
    }
    setWordIndex((i) => (i + 1) % words.length);
    setPhase("typing");
  }, [text, phase, wordIndex, words, typingSpeedMs, deletingSpeedMs, pauseMs]);

  return text;
}
