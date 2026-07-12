import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names (clsx) and resolves conflicting
 * Tailwind utility classes (tailwind-merge). Used by every UI primitive
 * so callers can override default styles via a `className` prop without
 * fighting specificity.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
