"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Paperclip, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  attachmentFilename: string | null;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadMessages() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/api/admin/messages");
      const data = await res.json();
      if (!res.ok) {
        // This was being silently swallowed before — now surfaced properly.
        setError(data.error ?? `Request failed with status ${res.status}`);
        return;
      }
      setMessages(data.messages ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this message permanently? This can't be undone.")) return;
    setDeletingId(id);
    try {
      await fetchWithAuth("/api/admin/messages", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-8 py-20">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-accent"
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      <h1 className="mb-8 font-display text-3xl italic text-foreground">
        Messages
      </h1>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-card" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 font-body text-sm text-red-400">
          Failed to load messages: {error}
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border p-12 text-center">
          <Mail className="text-muted-foreground" size={28} />
          <p className="font-body text-muted-foreground">No messages yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <Card key={msg.id} glass>
              <CardContent className="pt-6">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body font-medium text-card-foreground">{msg.name}</p>
                    <a
                      href={`mailto:${msg.email}`}
                      className="font-body text-sm text-accent hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    disabled={deletingId === msg.id}
                    aria-label="Delete message"
                    className="shrink-0 text-muted-foreground hover:text-red-400 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="mb-2 whitespace-pre-wrap font-body text-sm text-muted-foreground">
                  {msg.message}
                </p>
                <div className="flex items-center gap-3 font-body text-xs text-muted-foreground">
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  {msg.attachmentFilename && (
                    <span className="flex items-center gap-1">
                      <Paperclip size={11} /> {msg.attachmentFilename}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
