import { NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  await requireRole(["super_admin", "admin"]);
  const flags = await prisma.featureFlag.findMany();
  return NextResponse.json(flags);
}

export async function POST(req: Request) {
  await requireRole(["super_admin"]);
  
  try {
    const { name, isEnabled, global, tenant, expiresAt } = await req.json();

    const flag = await prisma.featureFlag.create({
      data: { name, isEnabled, global, tenant, expiresAt: expiresAt ? new Date(expiresAt) : null }
    });

    await createAuditLog("CREATE_FEATURE_FLAG", { name, isEnabled });
    return NextResponse.json(flag);
  } catch (e) {
    return NextResponse.json({ error: "Failed to create feature flag" }, { status: 500 });
  }
}
