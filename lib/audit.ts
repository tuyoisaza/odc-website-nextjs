import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createAuditLog(action: string, details?: any) {
  try {
    const session = await getServerSession(authOptions);
    
    await prisma.auditLog.create({
      data: {
        // @ts-ignore
        userId: session?.user?.id || "system",
        userEmail: session?.user?.email || "system",
        action,
        details: details ? JSON.stringify(details) : null,
      }
    });
  } catch (e) {
    console.error("Audit log creation failed", e);
  }
}
