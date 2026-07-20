import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminRequest } from "@/lib/auth/verify-admin-request";

const certUpdateSchema = z.object({
  name: z.string().trim().min(1).max(300),
  issuer: z.string().trim().min(1).max(200),
  date: z.string().trim().min(1),
  credentialUrl: z.string().trim().url().nullable(),
  imagePath: z.string().trim().nullable(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = certUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  await adminDb.collection("certifications").doc(id).set({ id, ...parsed.data });
  revalidatePath("/");
  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await adminDb.collection("certifications").doc(id).delete();
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
