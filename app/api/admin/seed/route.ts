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

    // 2. Seed Client Categories & Clients (from ODC Credenciales PDF)
    const catBebidas = await prisma.clientCategory.upsert({ where: { name: "Bebidas" }, update: {}, create: { name: "Bebidas", order: 1 } });
    const catFlores = await prisma.clientCategory.upsert({ where: { name: "Flores" }, update: {}, create: { name: "Flores", order: 2 } });
    const catTecnologia = await prisma.clientCategory.upsert({ where: { name: "Tecnología" }, update: {}, create: { name: "Tecnología", order: 3 } });
    const catTransporte = await prisma.clientCategory.upsert({ where: { name: "Transporte" }, update: {}, create: { name: "Transporte", order: 4 } });
    const catManufactura = await prisma.clientCategory.upsert({ where: { name: "Manufactura y Energía" }, update: {}, create: { name: "Manufactura y Energía", order: 5 } });
    const catSalud = await prisma.clientCategory.upsert({ where: { name: "Salud y Cuidado Personal" }, update: {}, create: { name: "Salud y Cuidado Personal", order: 6 } });
    const catAlimentos = await prisma.clientCategory.upsert({ where: { name: "Alimentos y Retail" }, update: {}, create: { name: "Alimentos y Retail", order: 7 } });
    const catSeguros = await prisma.clientCategory.upsert({ where: { name: "Seguros" }, update: {}, create: { name: "Seguros", order: 8 } });
    const catSinFinesLucro = await prisma.clientCategory.upsert({ where: { name: "Sin fines de lucro" }, update: {}, create: { name: "Sin fines de lucro", order: 9 } });

    const clientsData = [
      { name: "AB InBev", url: "https://www.ab-inbev.com/", categoryId: catBebidas.id, logo: "placeholder", order: 1 },
      { name: "Diageo", url: "https://www.diageo.com/", categoryId: catBebidas.id, logo: "placeholder", order: 2 },
      { name: "Pepsico", url: "https://www.pepsico.com/", categoryId: catBebidas.id, logo: "placeholder", order: 3 },
      { name: "Petalli / Blumelii", url: "https://www.blumelii.com/", categoryId: catFlores.id, logo: "placeholder", order: 1 },
      { name: "Boostogether", url: "https://boostogether.com/", categoryId: catTecnologia.id, logo: "placeholder", order: 1 },
      { name: "Hyland", url: "https://www.hyland.com/", categoryId: catTecnologia.id, logo: "placeholder", order: 2 },
      { name: "RobinFood", url: "https://www.robinfood.com/", categoryId: catTecnologia.id, logo: "placeholder", order: 3 },
      { name: "WOPP", url: "", categoryId: catTecnologia.id, logo: "placeholder", order: 4 },
      { name: "Avianca", url: "https://www.avianca.com/", categoryId: catTransporte.id, logo: "placeholder", order: 1 },
      { name: "Blu Logistics", url: "https://blulogistics.com/", categoryId: catTransporte.id, logo: "placeholder", order: 2 },
      { name: "Cerámica Italia", url: "https://ceramicaitalia.com/", categoryId: catManufactura.id, logo: "placeholder", order: 1 },
      { name: "Schneider Electric", url: "https://www.se.com/", categoryId: catManufactura.id, logo: "placeholder", order: 2 },
      { name: "Motul", url: "https://www.motul.com/", categoryId: catManufactura.id, logo: "placeholder", order: 3 },
      { name: "InSer (Fertility)", url: "https://www.inser.com.co/", categoryId: catSalud.id, logo: "placeholder", order: 1 },
      { name: "Pfizer", url: "https://www.pfizer.com/", categoryId: catSalud.id, logo: "placeholder", order: 2 },
      { name: "Merck", url: "https://www.merck.com/", categoryId: catSalud.id, logo: "placeholder", order: 3 },
      { name: "C Botanique", url: "https://botanique.com.co/", categoryId: catSalud.id, logo: "placeholder", order: 4 },
      { name: "Guaapa", url: "https://www.guaapa.com/", categoryId: catSalud.id, logo: "placeholder", order: 5 },
      { name: "Sigma", url: "https://www.sigmafoods.com/", categoryId: catAlimentos.id, logo: "placeholder", order: 1 },
      { name: "Higgs", url: "https://higgsfoods.com/", categoryId: catAlimentos.id, logo: "placeholder", order: 2 },
      { name: "Mr Bricolage", url: "https://mr-bricolage.com/", categoryId: catAlimentos.id, logo: "placeholder", order: 3 },
      { name: "Distribuciones DPJD", url: "https://www.dpjd.com/", categoryId: catAlimentos.id, logo: "placeholder", order: 4 },
      { name: "Distribuciones La Integridad", url: "", categoryId: catAlimentos.id, logo: "placeholder", order: 5 },
      { name: "Grupo Bolívar", url: "https://www.grupobolivar.com.co/", categoryId: catSeguros.id, logo: "placeholder", order: 1 },
      { name: "Fundación Texmodas", url: "https://fundaciontexmodas.org.co/", categoryId: catSinFinesLucro.id, logo: "placeholder", order: 1 },
      { name: "Cámara de Comercio de Cúcuta", url: "https://cccucuta.org.co/", categoryId: catSinFinesLucro.id, logo: "placeholder", order: 2 },
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
