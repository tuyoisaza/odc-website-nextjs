"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminClientsPage() {
  const [activeTab, setActiveTab] = useState<"clients" | "categories">("clients");
  const [categories, setCategories] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingClient, setEditingClient] = useState<any>(null);

  const [categoryForm, setCategoryForm] = useState({ name: "", order: 0 });
  const [clientForm, setClientForm] = useState({ name: "", url: "", logo: "", categoryId: "", order: 0 });

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [catRes, cliRes] = await Promise.all([
        fetch("/api/admin/client-categories"),
        fetch("/api/admin/clients")
      ]);
      const cats = await catRes.json();
      const clis = await cliRes.json();
      setCategories(cats);
      setClients(clis);
    } catch (e) {
      console.error(e);
      alert("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await fetch(`/api/admin/client-categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryForm),
        });
      } else {
        await fetch("/api/admin/client-categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryForm),
        });
      }
      setEditingCategory(null);
      setCategoryForm({ name: "", order: 0 });
      fetchData();
    } catch (e) {
      alert("Error saving category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/admin/client-categories/${id}`, { method: "DELETE" });
      fetchData();
    } catch (e) {
      alert("Error deleting category");
    }
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await fetch(`/api/admin/clients/${editingClient.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clientForm),
        });
      } else {
        await fetch("/api/admin/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clientForm),
        });
      }
      setEditingClient(null);
      setClientForm({ name: "", url: "", logo: "", categoryId: "", order: 0 });
      fetchData();
    } catch (e) {
      alert("Error saving client");
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
      fetchData();
    } catch (e) {
      alert("Error deleting client");
    }
  };

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem" }}>Gestión de Clientes</h1>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => setActiveTab("clients")}
          style={{
            padding: "0.5rem 1rem",
            background: activeTab === "clients" ? "var(--foreground)" : "transparent",
            color: activeTab === "clients" ? "var(--background)" : "inherit",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            cursor: "pointer"
          }}
        >
          Clientes
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          style={{
            padding: "0.5rem 1rem",
            background: activeTab === "categories" ? "var(--foreground)" : "transparent",
            color: activeTab === "categories" ? "var(--background)" : "inherit",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            cursor: "pointer"
          }}
        >
          Categorías
        </button>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : activeTab === "categories" ? (
        <div>
          <form onSubmit={handleSaveCategory} style={{ display: "flex", gap: "1rem", marginBottom: "2rem", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>Nombre de la Categoría</label>
              <input required value={categoryForm.name} onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })} style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>Orden</label>
              <input type="number" required value={categoryForm.order} onChange={e => setCategoryForm({ ...categoryForm, order: Number(e.target.value) })} style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", width: "100px" }} />
            </div>
            <button type="submit" style={{ padding: "0.5rem 1rem", background: "var(--accent)", color: "white", borderRadius: "0.25rem", border: "none", cursor: "pointer", height: "40px" }}>
              {editingCategory ? "Actualizar Categoría" : "Añadir Categoría"}
            </button>
            {editingCategory && (
              <button type="button" onClick={() => { setEditingCategory(null); setCategoryForm({ name: "", order: 0 }); }} style={{ padding: "0.5rem 1rem", height: "40px", cursor: "pointer", borderRadius: "0.25rem", background: "none", color: "var(--foreground)", border: "1px solid var(--border)" }}>
                Cancelar
              </button>
            )}
          </form>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
                <th style={{ padding: "1rem" }}>Nombre</th>
                <th style={{ padding: "1rem" }}>Orden</th>
                <th style={{ padding: "1rem" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem" }}>{cat.name}</td>
                  <td style={{ padding: "1rem" }}>{cat.order}</td>
                  <td style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
                    <button onClick={() => { setEditingCategory(cat); setCategoryForm({ name: cat.name, order: cat.order }); }} style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer" }}>Editar</button>
                    <button onClick={() => handleDeleteCategory(cat.id)} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && <tr><td colSpan={3} style={{ padding: "2rem", textAlign: "center" }}>No hay categorías.</td></tr>}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSaveClient} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>Nombre del Cliente</label>
              <input required value={clientForm.name} onChange={e => setClientForm({ ...clientForm, name: e.target.value })} style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>URL del Cliente</label>
              <input value={clientForm.url} onChange={e => setClientForm({ ...clientForm, url: e.target.value })} style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>Logo (Dominio, ej: adidas.com)</label>
              <input value={clientForm.logo} onChange={e => setClientForm({ ...clientForm, logo: e.target.value })} style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>Categoría</label>
              <select required value={clientForm.categoryId} onChange={e => setClientForm({ ...clientForm, categoryId: e.target.value })} style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }}>
                <option value="">Selecciona Categoría...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>Orden</label>
              <input type="number" required value={clientForm.order} onChange={e => setClientForm({ ...clientForm, order: Number(e.target.value) })} style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="submit" style={{ padding: "0.5rem 1rem", background: "var(--accent)", color: "white", borderRadius: "0.25rem", border: "none", cursor: "pointer", height: "40px", flex: 1 }}>
                {editingClient ? "Actualizar Cliente" : "Añadir Cliente"}
              </button>
              {editingClient && (
                <button type="button" onClick={() => { setEditingClient(null); setClientForm({ name: "", url: "", logo: "", categoryId: "", order: 0 }); }} style={{ padding: "0.5rem 1rem", height: "40px", cursor: "pointer", borderRadius: "0.25rem", background: "none", color: "var(--foreground)", border: "1px solid var(--border)" }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
                <th style={{ padding: "1rem" }}>Logo</th>
                <th style={{ padding: "1rem" }}>Nombre</th>
                <th style={{ padding: "1rem" }}>URL</th>
                <th style={{ padding: "1rem" }}>Categoría</th>
                <th style={{ padding: "1rem" }}>Orden</th>
                <th style={{ padding: "1rem" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((cli) => (
                <tr key={cli.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem" }}>
                    {cli.logo ? (
                      <img src={`https://logo.clearbit.com/${cli.logo}`} alt={cli.name} style={{ width: "32px", height: "32px", objectFit: "contain" }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    ) : (
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>{cli.name.charAt(0)}</div>
                    )}
                  </td>
                  <td style={{ padding: "1rem" }}>{cli.name}</td>
                  <td style={{ padding: "1rem" }}>{cli.url}</td>
                  <td style={{ padding: "1rem" }}>{cli.category?.name}</td>
                  <td style={{ padding: "1rem" }}>{cli.order}</td>
                  <td style={{ padding: "1rem", display: "flex", gap: "1rem", alignItems: "center", height: "100%" }}>
                    <button onClick={() => { setEditingClient(cli); setClientForm({ name: cli.name, url: cli.url || "", logo: cli.logo || "", categoryId: cli.categoryId || "", order: cli.order }); }} style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer" }}>Editar</button>
                    <button onClick={() => handleDeleteClient(cli.id)} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center" }}>No hay clientes.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
