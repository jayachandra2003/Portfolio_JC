import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

// Next.js automatically renders this for any unmatched route.
export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 px-8 text-center">
      <Compass size={40} className="text-accent" />
      <h1 className="font-display text-5xl italic text-foreground">404</h1>
      <p className="max-w-sm font-body text-muted-foreground">
        This page doesn&apos;t exist — it may have moved, or the link was
        typed wrong.
      </p>
      <Link href="/" className={buttonVariants({ variant: "primary", className: "mt-2" })}>
        Back to Home
      </Link>
    </div>
  );
}
