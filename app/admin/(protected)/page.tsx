"use client";

import Link from "next/link";
import { LogOut, Mail, Briefcase, Award, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";

export default function AdminDashboardPage() {
  const { user, signOut } = useAuth();

  const links = [
    { href: "/admin/messages", label: "Messages", icon: Mail, desc: "View contact form submissions" },
    { href: "/admin/projects", label: "Projects", icon: Briefcase, desc: "Add, edit, or remove projects" },
    { href: "/admin/certifications", label: "Certifications", icon: Award, desc: "Manage certifications" },
    { href: "/admin/site-content", label: "Site Content", icon: FileEdit, desc: "Edit Hero/About/Resume text" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-8 py-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl italic text-foreground">Admin Dashboard</h1>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            Signed in as {user?.email}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={signOut} className="gap-1.5">
          <LogOut size={14} /> Sign Out
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card glass className="h-full transition-transform hover:-translate-y-1">
              <CardContent className="flex flex-col items-start gap-2 pt-6">
                <link.icon className="text-accent" size={20} />
                <p className="font-body font-medium text-card-foreground">{link.label}</p>
                <p className="font-body text-xs text-muted-foreground">{link.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
