"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

// This is a route group — the parentheses in the folder name "(protected)"
// mean it does NOT appear in the URL. A page at
// app/admin/(protected)/messages/page.tsx is served at /admin/messages,
// not /admin/protected/messages.
//
// This layout is the CLIENT-SIDE guard: while auth state is loading, show
// a spinner (avoids a flash of protected content); once resolved, redirect
// to /admin/login if there's no user. Remember: this only controls what
// renders in the browser — it is NOT the real security boundary. Every
// admin API route must independently verify the Firebase ID token
// server-side, since someone could bypass this UI redirect entirely by
// calling the API directly without ever loading this page.
export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
      </div>
    );
  }

  if (!user) {
    // Brief flash before the redirect effect above fires — render nothing.
    return null;
  }

  return <>{children}</>;
}
