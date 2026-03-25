import { NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireRole(["super_admin"]); // Only super_admin can change roles
  
  try {
    const { id } = await params;
    const body = await req.json();
    const { role } = body;

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true }
    });

    await createAuditLog("UPDATE_USER_ROLE", { targetUserId: id, newRole: role });
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
