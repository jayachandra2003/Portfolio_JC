"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-card px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="text-accent" size={32} />
        <p className="font-display text-xl text-card-foreground">Message sent</p>
        <p className="font-body text-sm text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg flex-col gap-4">
      <div>
        <label htmlFor="name" className="sr-only">Your name</label>
        <input
          id="name"
          {...register("name")}
          placeholder="Your name"
          className={cn(inputClasses, errors.name && "ring-2 ring-red-500/50")}
        />
        {errors.name && (
          <p className="mt-1 font-body text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="sr-only">Your email</label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="Your email"
          className={cn(inputClasses, errors.email && "ring-2 ring-red-500/50")}
        />
        {errors.email && (
          <p className="mt-1 font-body text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="sr-only">Your message</label>
        <textarea
          id="message"
          {...register("message")}
          placeholder="Your message"
          rows={5}
          className={cn(inputClasses, "resize-none", errors.message && "ring-2 ring-red-500/50")}
        />
        {errors.message && (
          <p className="mt-1 font-body text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 font-body text-sm text-red-400">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {errorMessage}
        </div>
      )}

      <Button type="submit" variant="primary" disabled={status === "submitting"} className="gap-2">
        {status === "submitting" ? "Sending..." : (
          <>
            <Send size={16} /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}
