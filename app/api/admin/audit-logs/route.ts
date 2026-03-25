import { NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await requireRole(["super_admin"]);
  const logs = await prisma.auditLog.findMany({
    orderBy: { timestamp: "desc" },
    take: 100 // Limit for safety
  });
  return NextResponse.json(logs);
}
