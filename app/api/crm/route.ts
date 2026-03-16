import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = leadSchema.parse(body);

    const lead = await prisma.crmLead.create({
      data: {
        ...validatedData,
        source: "website_contact_form",
      },
    });

    // Here we could also trigger a HubSpot/Attio integration if configured
    console.log("New lead captured:", lead.email);

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("CRM API Error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request or server error" },
      { status: 400 }
    );
  }
}
