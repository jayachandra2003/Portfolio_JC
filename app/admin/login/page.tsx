"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";

export default function AdminLoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.push("/admin");
    } catch {
      // Deliberately generic — don't reveal whether it was a wrong email
      // or wrong password, which would help someone guess valid accounts.
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-card px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-8">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Lock className="text-accent" size={28} />
          <h1 className="font-display text-2xl italic text-foreground">Admin Login</h1>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={inputClasses}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={inputClasses}
          />
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 font-body text-sm text-red-400">
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" disabled={submitting} className="w-full">
          {submitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
