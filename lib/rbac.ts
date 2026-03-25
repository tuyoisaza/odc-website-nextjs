import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export type Role = "super_admin" | "admin" | "team_leader" | "member";

export async function hasRole(allowedRoles: Role[]): Promise<boolean> {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const role = (session?.user?.role as Role) || "member";
  return allowedRoles.includes(role);
}

export async function requireRole(allowedRoles: Role[], redirectTo = "/en/admin/login") {
  const isAllowed = await hasRole(allowedRoles);
  if (!isAllowed) {
    redirect(redirectTo);
  }
}

export async function getCurrentUserRole(): Promise<Role> {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  return (session?.user?.role as Role) || "member";
}
