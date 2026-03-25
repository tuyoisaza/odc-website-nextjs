import { NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  await requireRole(["super_admin"]);
  const settings = await prisma.systemSetting.findMany();
  // Transform to dict
  const dict = settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
  return NextResponse.json(dict);
}

export async function POST(req: Request) {
  await requireRole(["super_admin"]);
  
  try {
    const { key, value } = await req.json();

    const setting = await prisma.systemSetting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) }
    });

    await createAuditLog("UPDATE_SYSTEM_SETTING", { key, value });
    
    return NextResponse.json(setting);
  } catch (e) {
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }
}
