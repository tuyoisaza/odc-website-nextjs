"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ADMIN_USER = "adminodc";
const ADMIN_PASS = "123asdqwe";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthed(sessionStorage.getItem("admin_auth") === "true");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("admin_auth", "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="card" style={{ maxWidth: 380, width: "100%", padding: "3rem 2rem", textAlign: "center", border: "1px solid var(--border)", borderRadius: "1rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            <span className="gradient-text">ODC</span> Admin
          </h1>
          <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>Ingresa tus credenciales</p>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: 500 }}>Usuario</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", boxSizing: "border-box" }}
                autoFocus
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: 500 }}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", boxSizing: "border-box" }}
              />
            </div>
            {error && <p style={{ color: "red", fontSize: "0.9rem", margin: 0 }}>{error}</p>}
            <button type="submit" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "none", background: "var(--foreground)", color: "var(--background)", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const links = [
    { href: "clients", label: "Clientes", desc: "Gestionar clientes y categorías" },
    { href: "insights", label: "Artículos", desc: "Crear y administrar artículos" },
    { href: "users", label: "Usuarios", desc: "Administrar roles y permisos" },
    { href: "system", label: "Sistema", desc: "Configuración y feature flags" },
  ];

  return (
    <div style={{ padding: "4rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem" }}>Panel de Administración</h1>
        <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", background: "none", border: "1px solid var(--border)", borderRadius: "0.5rem", cursor: "pointer", color: "var(--foreground)" }}>
          Cerrar sesión
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
            <div className="card" style={{ padding: "2rem", border: "1px solid var(--border)", borderRadius: "0.75rem", cursor: "pointer", transition: "border-color 0.2s" }}>
              <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.5rem", color: "var(--accent)" }}>{link.label}</h2>
              <p style={{ margin: 0, color: "var(--muted)" }}>{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
