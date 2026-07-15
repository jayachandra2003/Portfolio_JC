import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Server-only Admin SDK singleton. Used by API routes (e.g. the contact
// form handler) that need to write to Firestore, bypassing client-side
// security rules. NEVER import this from a client component — it reads
// a private key and must only run on the server.
//
// Credentials come from environment variables (not serviceAccountKey.json)
// because that file is gitignored and only exists on your local machine —
// Vercel deployment needs these as dashboard-configured env vars instead.
function getAdminApp(): App {
  if (getApps().length) return getApps()[0]!;
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // Private keys from env vars often have literal "\n" instead of
      // real newlines — this restores them so the key parses correctly.
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminDb = getFirestore(getAdminApp());
export const adminAuth = getAuth(getAdminApp());
