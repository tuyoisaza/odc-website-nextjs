import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InsightsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("Insights");
  
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="container" style={{ padding: "6rem 0" }}>
      <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
        {t.rich("title", {
          insights: (chunks) => <span className="gradient-text">{chunks}</span>
        })}
      </h1>
      <p style={{ marginBottom: "4rem", maxWidth: "600px" }}>{t("subtitle")}</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {articles.map((a) => (
          <article key={a.id} style={{ paddingBottom: "4rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700 }}>
              {new Date(a.createdAt).toLocaleDateString(params.locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long' })}
            </span>
            <h2 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>{a.title}</h2>
            <p style={{ maxWidth: "700px", marginBottom: "1rem" }}>{a.excerpt}</p>
            <Link href={`/${params.locale}/insights/${a.slug}`}>
              <button style={{ background: "transparent", color: "var(--foreground)", padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "0.5rem", cursor: "pointer" }}>
                {t("readMore")}
              </button>
            </Link>
          </article>
        ))}
        {articles.length === 0 && (
          <p style={{ color: "var(--muted)" }}>No hay artículos disponibles por el momento.</p>
        )}
      </div>
    </main>
  );
}
