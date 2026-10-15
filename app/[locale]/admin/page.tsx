import Link from "next/link";
import { requireRole } from "@/lib/rbac";
import { adminLoginUrl, authLocale } from "@/lib/auth-navigation";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  const locale = authLocale(requestedLocale);
  await requireRole(["super_admin", "admin", "team_leader", "member"], adminLoginUrl(locale));
  const links = [
    { path: "clients", label: "Clientes" },
    { path: "insights", label: "Artículos" },
    { path: "users", label: "Usuarios" },
    { path: "system", label: "Sistema" },
  ];

  return (
    <section style={{ padding: "4rem 0" }}>
      <h1>Panel de Administración</h1>
      <nav aria-label="Administración" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {links.map(link => <Link key={link.path} href={`/${locale}/admin/${link.path}`}>{link.label}</Link>)}
      </nav>
      <Link href={`/api/auth/signout?callbackUrl=${encodeURIComponent(`/${locale}/login`)}`}>
        Cerrar sesión
      </Link>
    </section>
  );
}
