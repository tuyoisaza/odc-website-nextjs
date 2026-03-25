"use client";

import { useState, useEffect } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        alert("Unauthorized or failed to fetch users");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole })
      });
      fetchUsers(); // Refresh list to confirm the DB mutation
    } catch (e) {
      alert("Error updating role");
    }
  };

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Gestión de Usuarios (RBAC)</h1>
      {isLoading ? <p>Cargando usuarios...</p> : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
              <th style={{ padding: "1rem" }}>Nombre</th>
              <th style={{ padding: "1rem" }}>Email</th>
              <th style={{ padding: "1rem" }}>ID</th>
              <th style={{ padding: "1rem" }}>Modificar Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "1rem" }}>{u.name || "Sin nombre"}</td>
                <td style={{ padding: "1rem" }}>{u.email}</td>
                <td style={{ padding: "1rem", color: "var(--muted)", fontSize: "0.85rem" }}>{u.id}</td>
                <td style={{ padding: "1rem" }}>
                  <select 
                    value={u.role} 
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="team_leader">Team Leader</option>
                    <option value="member">Member</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
