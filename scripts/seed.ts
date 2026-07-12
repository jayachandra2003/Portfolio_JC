/**
 * One-time seed script — pushes PROJECT_SEED_DATA and
 * CERTIFICATION_SEED_DATA (from lib/data/*.ts) into Firestore.
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
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { PROJECT_SEED_DATA } from "../lib/data/projects";
import { CERTIFICATION_SEED_DATA } from "../lib/data/certifications";

const serviceAccount = JSON.parse(
  readFileSync(new URL("../serviceAccountKey.json", import.meta.url), "utf-8")
);

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

async function seedProjects() {
  const batch = db.batch();
  for (const project of PROJECT_SEED_DATA) {
    const ref = db.collection("projects").doc(project.id);
    batch.set(ref, project);
  }
  await batch.commit();
  console.log(`✅ Seeded ${PROJECT_SEED_DATA.length} projects`);
}

async function seedCertifications() {
  const batch = db.batch();
  for (const cert of CERTIFICATION_SEED_DATA) {
    const ref = db.collection("certifications").doc(cert.id);
    batch.set(ref, cert);
  }
  await batch.commit();
  console.log(`✅ Seeded ${CERTIFICATION_SEED_DATA.length} certifications`);
}

async function main() {
  console.log("Seeding Firestore...");
  await seedProjects();
  await seedCertifications();
  console.log("Done. Note: Fabric Marketplace repoUrl, Python Mini Projects");
  console.log("repoUrl, and certification dates are still null/placeholder —");
  console.log("re-run this script after updating lib/data/*.ts with real values.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
