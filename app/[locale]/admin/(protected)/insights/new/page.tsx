import { createArticle } from "@/lib/actions";

export default function NewArticlePage() {
  return (
    <div className="container" style={{ padding: "4rem 0", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Crear Nuevo Artículo</h1>
      
      <form action={createArticle} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Título</label>
          <input name="title" required style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Slug (URL)</label>
          <input name="slug" required style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Extracto (Excerpt)</label>
          <textarea name="excerpt" rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }}></textarea>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Contenido (Markdown soportado)</label>
          <textarea name="content" required rows={15} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }}></textarea>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="checkbox" name="published" id="published" />
          <label htmlFor="published">¿Publicar ahora? (Visible al público)</label>
        </div>

        <button type="submit" style={{ padding: "1rem", background: "var(--foreground)", color: "var(--background)", fontWeight: "bold", border: "none", borderRadius: "0.5rem", cursor: "pointer", marginTop: "1rem" }}>
          Guardar Artículo
        </button>
      </form>
    </div>
  );
}
