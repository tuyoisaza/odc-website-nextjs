import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  // Simple hardcoded token for the agent/admin to trigger securely one time
  if (token !== "ODC2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Create a System User for authors
    let systemUser = await prisma.user.findFirst({ where: { email: "system@odcway.com" } });
    if (!systemUser) {
      systemUser = await prisma.user.create({
        data: {
          name: "ODC System",
          email: "system@odcway.com",
          role: "super_admin",
        }
      });
    }

    // 2. Seed Client Categories & Clients
    const techCategory = await prisma.clientCategory.upsert({
      where: { name: "Tecnología y Startups" },
      update: {},
      create: { name: "Tecnología y Startups", order: 1 }
    });

    const fmcgCategory = await prisma.clientCategory.upsert({
      where: { name: "Consumo Masivo y Retail" },
      update: {},
      create: { name: "Consumo Masivo y Retail", order: 2 }
    });

    const clientsData = [
      { name: "Boostogether", url: "https://boostogether.com", categoryId: techCategory.id, logo: "placeholder", order: 1 },
      { name: "Hyland", url: "https://hyland.com", categoryId: techCategory.id, logo: "placeholder", order: 2 },
      { name: "RobinFood", url: "https://robinfood.com", categoryId: techCategory.id, logo: "placeholder", order: 3 },
    ];

    for (const client of clientsData) {
      const exists = await prisma.client.findFirst({ where: { name: client.name } });
      if (!exists) {
        await prisma.client.create({ data: client });
      }
    }

    const articlesData = [
      {
        title: "El futuro de las Juntas Directivas y la Inteligencia Artificial",
        slug: "futuro-juntas-directivas-ia",
        content: "La adopción tecnológica ya no es exclusiva de las gerencias de TI. Hoy, una Junta Directiva que no entiende el impacto de la Inteligencia Artificial está exponiendo su organización a un riesgo sistémico. Según estudios recientes...",
        excerpt: "Una reflexión sobre por qué el gobierno corporativo necesita marcos de supervisión cognitiva de urgencia.",
        image: "placeholder",
        published: true,
        authorId: systemUser.id
      },
      {
        title: "Growth System: Más allá del Growth Hacking",
        slug: "growth-system-mas-alla-growth-hacking",
        content: "Durante la última década la industria se obsesionó con el táctico del embudo (funnel optimization). Sin embargo, el verdadero crecimiento escalable y defendible se da cuando integramos la marca, el producto y las tecnologías en un modelo operativo.",
        excerpt: "Cómo diseñar un ecosistema en lugar de depender de micro-optimizaciones puntuales.",
        image: "placeholder",
        published: true,
        authorId: systemUser.id
      },
      {
        title: "Estrategia Digital: El puente entre el negocio y la tecnología",
        slug: "estrategia-digital-puente",
        content: "La brecha entre la estrategia de negocio y la implementación tecnológica sigue siendo el principal obstáculo para la transformación digital. Cerramos esta brecha alineando objetivos de negocio con capacidades tecnológicas concretas.",
        excerpt: "Cómo alinear objetivos de negocio con capacidades tecnológicas para una transformación efectiva.",
        image: "placeholder",
        published: true,
        authorId: systemUser.id
      }
    ];

    for (const article of articlesData) {
      const exists = await prisma.article.findUnique({ where: { slug: article.slug } });
      if (!exists) {
        await prisma.article.create({ data: article });
      }
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to seed DB", details: message }, { status: 500 });
  }
}
