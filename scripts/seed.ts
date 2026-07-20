/**
 * One-time seed script — pushes seed data from lib/data/*.ts into Firestore.
 *
 * Uses the Admin SDK (not the client SDK) because Firestore is in
 * production mode — the Admin SDK authenticates via a service account
 * and bypasses security rules entirely, which is the correct way to
 * run a trusted, local, one-off script like this.
 *
 * Run with: npm run seed
 *
 * Requires serviceAccountKey.json in the project root (see README for
 * how to download it). That file is gitignored — never commit it.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync(new URL("../serviceAccountKey.json", import.meta.url), "utf-8")
);

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

async function main() {
  console.log("Seeding Firestore...");

  // IMPORTANT: these are dynamic imports, not static ones, and that's
  // deliberate. Static `import` statements are hoisted to the top of the
  // file by JS module semantics — ABOVE the dotenv config() call above,
  // regardless of where they're textually written. Since these modules
  // transitively import lib/firebase/config.ts (which calls getAuth() at
  // load time, and that throws immediately on a missing API key), a
  // static import here would run before .env.local is loaded and crash.
  // Dynamic import() is a real expression evaluated in sequence, not
  // hoisted, so this order actually works.
  const { PROJECT_SEED_DATA } = await import("../lib/data/projects");
  const { CERTIFICATION_SEED_DATA } = await import("../lib/data/certifications");
  const { SITE_CONTENT_SEED_DATA } = await import("../lib/data/site-content");

  const projectBatch = db.batch();
  for (const project of PROJECT_SEED_DATA) {
    projectBatch.set(db.collection("projects").doc(project.id), project);
  }
  await projectBatch.commit();
  console.log(`✅ Seeded ${PROJECT_SEED_DATA.length} projects`);

  const certBatch = db.batch();
  for (const cert of CERTIFICATION_SEED_DATA) {
    certBatch.set(db.collection("certifications").doc(cert.id), cert);
  }
  await certBatch.commit();
  console.log(`✅ Seeded ${CERTIFICATION_SEED_DATA.length} certifications`);

  await db.collection("siteContent").doc("main").set(SITE_CONTENT_SEED_DATA);
  console.log("✅ Seeded site content (Hero/About/Resume text)");

  console.log("Done. Note: Fabric Marketplace repoUrl, Python Mini Projects");
  console.log("repoUrl, and certification dates are still null/placeholder —");
  console.log("re-run this script after updating lib/data/*.ts with real values.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
