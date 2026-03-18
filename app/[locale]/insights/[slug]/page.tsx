import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ArticlePage({ params }: { params: { locale: string, slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug, published: true }
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <Link href={`/${params.locale}/insights`} style={{ color: "var(--muted)", textDecoration: "none", marginBottom: "2rem", display: "inline-block" }}>
        ← Volver a Insights
      </Link>
      
      <span style={{ display: "block", color: "var(--accent)", fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem" }}>
        {new Date(article.createdAt).toLocaleDateString(params.locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </span>
      <h1 style={{ fontSize: "3.5rem", marginBottom: "2rem", lineHeight: 1.2 }}>
        {article.title}
      </h1>
      
      {article.excerpt && (
        <p style={{ fontSize: "1.25rem", color: "var(--muted)", marginBottom: "3rem", fontStyle: "italic" }}>
          {article.excerpt}
        </p>
      )}

      <div style={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
        {/* En una app realista, usaríamos un parser de Markdown (e.g. react-markdown).
            Por simplicidad, estamos renderizando texto con splits por saltos de línea. */}
        {article.content.split('\n').map((paragraph, idx) => (
          <p key={idx} style={{ marginBottom: "1.5rem" }}>
            {paragraph}
          </p>
        ))}
      </div>
    </main>
  );
}
