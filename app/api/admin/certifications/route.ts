import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminRequest } from "@/lib/auth/verify-admin-request";

const certSchema = z.object({
  id: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(300),
  issuer: z.string().trim().min(1).max(200),
  date: z.string().trim().min(1),
  credentialUrl: z.string().trim().url().nullable(),
  imagePath: z.string().trim().nullable(),
});

export async function GET(req: NextRequest) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snapshot = await adminDb.collection("certifications").orderBy("date", "desc").get();
  const certifications = snapshot.docs.map((doc) => doc.data());
  return NextResponse.json({ certifications });
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = certSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  await adminDb.collection("certifications").doc(parsed.data.id).set(parsed.data);
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
