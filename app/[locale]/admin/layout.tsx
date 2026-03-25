import fs from "fs";
import path from "path";
import Link from "next/link";
import { requireRole } from "@/lib/rbac";

export default async function AdminLayout({ 
  children,
  params
}: { 
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  // Global Auth protection for ALL admin routes to at least be a member
  await requireRole(["super_admin", "admin", "team_leader", "member"]);

  let version = "unknown";
  try {
    const pkgPath = path.resolve(process.cwd(), "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    version = pkg.version;
  } catch (e) {}

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ background: "var(--card)", padding: "1rem 2rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "var(--accent)" }}>ODC Control Center</div>
        <nav style={{ display: "flex", gap: "1.5rem" }}>
          <Link href={`/${locale}/admin/clients`} style={{ textDecoration: "none", color: "var(--foreground)", fontWeight: 500 }}>Clients</Link>
          <Link href={`/${locale}/admin/insights`} style={{ textDecoration: "none", color: "var(--foreground)", fontWeight: 500 }}>Insights</Link>
          <Link href={`/${locale}/admin/users`} style={{ textDecoration: "none", color: "var(--foreground)", fontWeight: 500 }}>Users</Link>
          <Link href={`/${locale}/admin/system`} style={{ textDecoration: "none", color: "var(--foreground)", fontWeight: 500 }}>System</Link>
        </nav>
      </header>
      
      <main style={{ flex: 1, position: "relative" }}>
        {children}
      </main>

      <footer style={{ padding: "1.5rem", textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--muted)", fontSize: "0.9rem", background: "var(--background)" }}>
        <strong>ODC Admin</strong> • Version {version} • UTC {new Date().toISOString()} • 🔒 RBAC Secure
      </footer>
    </div>
  );
}
