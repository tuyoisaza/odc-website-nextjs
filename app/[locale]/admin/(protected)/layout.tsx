import { requireRole } from "@/lib/rbac";
import { adminLoginUrl } from "@/lib/auth-navigation";

export default async function ProtectedLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireRole(["super_admin", "admin", "team_leader", "member"], adminLoginUrl(locale));
  return <>{children}</>;
}
