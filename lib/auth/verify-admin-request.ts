import type { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

/**
 * The REAL security boundary for every admin API route. Verifies the
 * Firebase ID token sent in the Authorization header, and additionally
 * checks the token's email matches ADMIN_EMAIL exactly — not just "any
 * authenticated Firebase user" — since this project only ever expects
 * one legitimate admin account.
 *
 * Returns the verified { uid, email } on success, or null on any
 * failure (missing header, invalid/expired token, wrong email). Callers
 * MUST treat null as "reject this request" — never proceed on a null
 * result.
 */
export async function verifyAdminRequest(
  req: NextRequest
): Promise<{ uid: string; email: string } | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    console.error("verifyAdminRequest: missing or malformed Authorization header");
    return null;
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const allowedEmail = process.env.ADMIN_EMAIL;

    if (!allowedEmail) {
      console.error("verifyAdminRequest: ADMIN_EMAIL env var is empty/missing on the server");
      return null;
    }
    if (decoded.email !== allowedEmail) {
      console.error(
        `verifyAdminRequest: email mismatch — token has "${decoded.email}", ADMIN_EMAIL is "${allowedEmail}"`
      );
      return null;
    }

    return { uid: decoded.uid, email: decoded.email ?? "" };
  } catch (err) {
    console.error("verifyAdminRequest: token verification threw an error:", err);
    return null;
  }
}
