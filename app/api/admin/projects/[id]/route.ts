import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminRequest } from "@/lib/auth/verify-admin-request";

const projectUpdateSchema = z.object({
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = projectUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  await adminDb.collection("projects").doc(id).set({ id, ...parsed.data });
  revalidatePath("/");
  revalidatePath("/projects/skywrite");
  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await adminDb.collection("projects").doc(id).delete();
  revalidatePath("/");
  revalidatePath("/projects/skywrite");
  return NextResponse.json({ success: true });
}
