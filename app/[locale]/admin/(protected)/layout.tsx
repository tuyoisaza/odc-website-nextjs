import { requireRole } from "@/lib/rbac";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["super_admin", "admin", "team_leader", "member"]);
  return <>{children}</>;
}
