import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebase/admin";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address"),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  // Save to Firestore first — this is the source of truth. If it fails,
  // the whole request fails, since we have nowhere else to record it.
  try {
    await adminDb.collection("messages").add({
      ...parsed.data,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email directly." },
      { status: 500 }
    );
  }

  // Email notification is best-effort. Even if email fails,
  // the message has already been saved to Firestore.
  try {
    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_NOTIFICATION_EMAIL ?? "",
      replyTo: parsed.data.email,
      subject: `New portfolio message from ${parsed.data.name}`,
      text: `From: ${parsed.data.name} (${parsed.data.email})\n\n${parsed.data.message}`,
    });
  } catch (err) {
    console.error("Contact message saved, but email notification failed:", err);
  }

  return NextResponse.json({ success: true });
}