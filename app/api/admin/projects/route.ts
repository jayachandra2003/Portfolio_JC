import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminRequest } from "@/lib/auth/verify-admin-request";

const projectSchema = z.object({
  id: z.string().trim().min(1).max(100),
  slug: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(1000),
  tech: z.array(z.string().trim().min(1)),
  features: z.array(z.string().trim().min(1)),
  repoUrl: z.string().trim().url().nullable(),
  demoUrl: z.string().trim().url().nullable(),
  featured: z.boolean(),
  order: z.number(),
  caseStudySlug: z.string().trim().optional(),
});

export async function GET(req: NextRequest) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snapshot = await adminDb.collection("projects").orderBy("order", "asc").get();
  const projects = snapshot.docs.map((doc) => doc.data());
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  await adminDb.collection("projects").doc(parsed.data.id).set(parsed.data);
  revalidatePath("/");
  revalidatePath("/projects/skywrite");
  return NextResponse.json({ success: true });
}
