import { AuthProvider } from "@/components/providers/auth-provider";

// Wraps EVERYTHING under /admin (both the public login page and the
// protected dashboard routes) with auth context. The actual "must be
// logged in" guard lives one level deeper, in the (protected) route
// group's layout — this level just makes useAuth() available everywhere.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
