"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Next.js error boundaries MUST be client components. This catches
// runtime errors anywhere in the route tree below it and shows a
// friendly fallback instead of a raw stack trace to visitors.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logged to the browser console for debugging — in production this
    // is where you'd wire up a real error-tracking service if desired.
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 px-8 text-center">
      <AlertTriangle size={40} className="text-accent" />
      <h1 className="font-display text-3xl italic text-foreground">
        Something went wrong
      </h1>
      <p className="max-w-sm font-body text-muted-foreground">
        An unexpected error occurred loading this page. You can try again,
        or head back to the homepage.
      </p>
      <Button variant="primary" onClick={reset} className="mt-2">
        Try again
      </Button>
    </div>
  );
}
