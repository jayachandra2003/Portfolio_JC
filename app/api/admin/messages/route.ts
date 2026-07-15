import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminRequest } from "@/lib/auth/verify-admin-request";

export async function GET(req: NextRequest) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snapshot = await adminDb.collection("messages").orderBy("createdAt", "desc").get();
  const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return NextResponse.json({ messages });
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json().catch(() => ({ id: null }));
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Missing message id" }, { status: 400 });
  }

  await adminDb.collection("messages").doc(id).delete();
  return NextResponse.json({ success: true });
}
