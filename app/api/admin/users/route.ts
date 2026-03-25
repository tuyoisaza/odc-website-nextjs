import { NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  await requireRole(["super_admin", "admin"]);
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true }
  });
  return NextResponse.json(users);
}
