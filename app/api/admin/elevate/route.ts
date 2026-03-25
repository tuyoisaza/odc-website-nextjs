import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (token !== "ElevateODC") {
    return NextResponse.json({ error: "Unauthorized. Use token=ElevateODC" }, { status: 401 });
  }
  
  if (!email) {
    return NextResponse.json({ error: "Email required. Ex: ?email=your@email.com&token=ElevateODC" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return NextResponse.json({ error: "User not found in the database. Ensure you have logged in via Google at least once so your account exists." }, { status: 404 });
    }

    await prisma.user.update({
      where: { email },
      data: { role: "super_admin" }
    });

    return NextResponse.json({ 
      success: true, 
      message: `El usuario ${email} ahora tiene el rol de super_admin! Ya puedes entrar a /admin/insights y administrar el sitio.` 
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to elevate user", details: error.message }, { status: 500 });
  }
}
