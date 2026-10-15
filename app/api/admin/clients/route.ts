import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getApiRoleError } from "@/lib/rbac";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { order: "asc" },
      include: {
        category: true
      }
    });
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const accessError = await getApiRoleError(["super_admin", "admin"]);
  if (accessError) return accessError;
  try {
    const body = await req.json();
    const { name, logo, url, categoryId, order } = body;
    
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const client = await prisma.client.create({
      data: { 
        name, 
        logo, 
        url, 
        categoryId, 
        order: order || 0 
      },
    });
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
