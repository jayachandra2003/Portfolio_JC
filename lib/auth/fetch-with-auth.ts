"use client";

import { auth } from "@/lib/firebase/config";

/**
 * A fetch() wrapper for admin pages — automatically attaches the current
 * user's Firebase ID token as a Bearer token, which verify-admin-request.ts
 * checks server-side on every admin API route. Throws if there's no
 * signed-in user, since that should never happen inside the protected
 * route group (the layout guard redirects unauthenticated users away
 * before any page using this could render).
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not signed in — cannot make an authenticated admin request.");
  }

  const idToken = await user.getIdToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  });
}
