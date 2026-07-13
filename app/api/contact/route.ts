import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebase/admin";

const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3MB — see contact-form.tsx for why

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address"),
  message: z.string().trim().min(1, "Message is required").max(2000),
  attachment: z
    .object({
      filename: z.string().trim().min(1).max(200),
      contentType: z.string().trim().min(1).max(100),
      contentBase64: z.string().trim().min(1),
    })
    .optional(),
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

  const { name, email, message, attachment } = parsed.data;

  // Server-side size check — never trust the client-side 3MB check alone,
  // since a request could be sent directly to this endpoint bypassing the
  // form entirely. Base64 is ~4/3 the size of the raw file, so we check
  // the decoded byte length, not the string length.
  if (attachment) {
    const decodedSizeBytes = Math.ceil((attachment.contentBase64.length * 3) / 4);
    if (decodedSizeBytes > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Attachment is too large — max 3MB." },
        { status: 400 }
      );
    }
  }

  // Save to Firestore first — this is the source of truth. If it fails,
  // the whole request fails, since we have nowhere else to record it.
  // Only the attachment's FILENAME is stored, never the file content —
  // Firestore documents have a 1MB size limit, and we have no Storage
  // backend to put the actual file in. The real file only ever exists
  // in the emailed copy below.
  try {
    await adminDb.collection("messages").add({
      name,
      email,
      message,
      attachmentFilename: attachment?.filename ?? null,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email directly." },
      { status: 500 }
    );
  }

  // Email notification (with attachment, if any) is best-effort, separate
  // from the save above. If Resend is unreachable or misconfigured, the
  // message is still safely stored in Firestore.
  try {
    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_NOTIFICATION_EMAIL ?? "",
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      attachments: attachment
        ? [{ filename: attachment.filename, content: attachment.contentBase64 }]
        : undefined,
    });
  } catch (err) {
    console.error("Contact message saved, but email notification failed:", err);
  }

  return NextResponse.json({ success: true });
}
