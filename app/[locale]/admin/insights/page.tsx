import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteArticle } from "@/lib/actions";

export default async function AdminInsightsPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem" }}>Gestión de Artículos</h1>
        <Link href="/es/admin/insights/new">
          <button style={{ background: "var(--foreground)", color: "var(--background)", padding: "0.5rem 1rem", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "bold" }}>
            + Nuevo Artículo
          </button>
        </Link>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
            <th style={{ padding: "1rem" }}>Título</th>
            <th style={{ padding: "1rem" }}>Slug</th>
            <th style={{ padding: "1rem" }}>Estado</th>
            <th style={{ padding: "1rem" }}>Fecha</th>
            <th style={{ padding: "1rem" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "1rem" }}>{article.title}</td>
              <td style={{ padding: "1rem" }}>{article.slug}</td>
              <td style={{ padding: "1rem" }}>{article.published ? "Publicado" : "Borrador"}</td>
              <td style={{ padding: "1rem" }}>{new Date(article.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
                <Link href={`/es/admin/insights/${article.id}/edit`} style={{ color: "var(--accent)" }}>Editar</Link>
                <form action={async () => {
                  "use server";
                  await deleteArticle(article.id);
                }}>
                  <button type="submit" style={{ color: "red", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Eliminar</button>
                </form>
              </td>
            </tr>
          ))}
          {articles.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--muted)" }}>
                No hay artículos todavía. Crea el primero.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
