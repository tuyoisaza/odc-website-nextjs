import { NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireRole(["super_admin"]);
  try {
    const { id } = await params;
    const body = await req.json();
    
    const data: any = {};
    if (body.isEnabled !== undefined) data.isEnabled = body.isEnabled;
    if (body.global !== undefined) data.global = body.global;
    if (body.name !== undefined) data.name = body.name;

    const flag = await prisma.featureFlag.update({
      where: { id },
      data
    });

    await createAuditLog("UPDATE_FEATURE_FLAG", { id, updates: data });
    return NextResponse.json(flag);
  } catch (e) {
    return NextResponse.json({ error: "Failed to update feature flag" }, { status: 500 });
  }
}
