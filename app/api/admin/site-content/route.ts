import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminRequest } from "@/lib/auth/verify-admin-request";

const siteContentSchema = z.object({
  name: z.string().trim().min(1).max(200),
  location: z.string().trim().min(1).max(200),
  roles: z.array(z.string().trim().min(1)).min(1),
  summary: z.string().trim().min(1).max(2000),
  education: z.object({
    degree: z.string().trim().min(1).max(300),
    institution: z.string().trim().min(1).max(200),
    location: z.string().trim().min(1).max(200),
    startYear: z.number().int(),
    endYear: z.number().int(),
    cgpa: z.string().trim().min(1).max(50),
  }),
  resumePath: z.string().trim().min(1),
});

export async function GET(req: NextRequest) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snapshot = await adminDb.collection("siteContent").doc("main").get();
  if (!snapshot.exists) {
    return NextResponse.json({ error: "Site content not found — run npm run seed first" }, { status: 404 });
  }
  return NextResponse.json({ siteContent: snapshot.data() });
}

export async function PUT(req: NextRequest) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = siteContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  await adminDb.collection("siteContent").doc("main").set(parsed.data);
  return NextResponse.json({ success: true });
}
