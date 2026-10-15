import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { adminLoginUrl } from "@/lib/auth-navigation";

export type Role = "super_admin" | "admin" | "team_leader" | "member";

export function sessionHasRole(session: Session | null, allowedRoles: Role[]): boolean {
  if (!session?.user) return false;
  const user = session.user as NonNullable<Session['user']> & { role?: string };
  const role = (user.role as Role) || "member";
  return allowedRoles.includes(role);
}

export async function hasRole(allowedRoles: Role[]): Promise<boolean> {
  return sessionHasRole(await getServerSession(authOptions), allowedRoles);
}

export async function getApiRoleError(allowedRoles: Role[]): Promise<Response | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return Response.json({ error: 'Authentication required' }, { status: 401 });
  if (!sessionHasRole(session, allowedRoles)) return Response.json({ error: 'Forbidden' }, { status: 403 });
  return null;
}

export async function requireRole(allowedRoles: Role[], redirectTo = adminLoginUrl('en')) {
  const isAllowed = await hasRole(allowedRoles);
  if (!isAllowed) {
    redirect(redirectTo);
  }
}

export async function getCurrentUserRole(): Promise<Role> {
  const session = await getServerSession(authOptions);
  // @ts-expect-error - role added to session by callbacks
  return (session?.user?.role as Role) || "member";
}
