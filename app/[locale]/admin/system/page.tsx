"use client";

import { useState, useEffect } from "react";

export default function AdminSystemPage() {
  const [activeTab, setActiveTab] = useState<"settings" | "flags" | "audit">("settings");
  
  const [settings, setSettings] = useState<any>({});
  const [flags, setFlags] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [report, setReport] = useState<any>(null);

  const [flagForm, setFlagForm] = useState({ name: "", isEnabled: false, global: true });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === "settings") {
        const res = await fetch("/api/admin/system-settings");
        setSettings(await res.json());
      } else if (activeTab === "flags") {
        const res = await fetch("/api/admin/feature-flags");
        setFlags(await res.json());
      } else if (activeTab === "audit") {
        const res = await fetch("/api/admin/audit-logs");
        setLogs(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleDebug = async () => {
    const newVal = settings.DEBUG_MODE === "true" ? "false" : "true";
    await fetch("/api/admin/system-settings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "DEBUG_MODE", value: newVal })
    });
    fetchData();
  };

  const fetchDebugReport = async () => {
    const res = await fetch("/api/admin/debug-report");
    const data = await res.json();
    setReport(data);
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Copiado al portapapeles:\n" + JSON.stringify(data, null, 2));
  };

  const handleCreateFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/feature-flags", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flagForm)
    });
    setFlagForm({ name: "", isEnabled: false, global: true });
    fetchData();
  };

  const handleToggleFlag = async (id: string, currentStatus: boolean) => {
    await fetch(`/api/admin/feature-flags/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isEnabled: !currentStatus })
    });
    fetchData();
  };

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem" }}>System Status & Observability</h1>
        <button onClick={fetchDebugReport} style={{ padding: "0.5rem 1rem", background: "var(--foreground)", color: "var(--background)", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "bold" }}>
          Copiar Reporte de Debug
        </button>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        {["settings", "flags", "audit"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            style={{
              padding: "0.5rem 1rem",
              background: activeTab === tab ? "var(--foreground)" : "transparent",
              color: activeTab === tab ? "var(--background)" : "inherit",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              cursor: "pointer",
              textTransform: "capitalize"
            }}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      {activeTab === "settings" && (
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Controles de Debugging</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "2rem", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Modo Debug Global (Verbose Logs)</span>
            <button 
              onClick={handleToggleDebug}
              style={{
                marginLeft: "auto",
                padding: "0.5rem 2rem",
                borderRadius: "2rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                background: settings.DEBUG_MODE === "true" ? "#10b981" : "var(--muted)",
                color: "white"
              }}
            >
              {settings.DEBUG_MODE === "true" ? "ACTIVO" : "INACTIVO"}
            </button>
          </div>
        </div>
      )}

      {activeTab === "flags" && (
        <div>
          <form onSubmit={handleCreateFlag} style={{ display: "flex", gap: "1rem", marginBottom: "2rem", alignItems: "flex-end", padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>Nombre del Feature Flag</label>
              <input required value={flagForm.name} onChange={e => setFlagForm({ ...flagForm, name: e.target.value })} style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="checkbox" checked={flagForm.isEnabled} onChange={e => setFlagForm({ ...flagForm, isEnabled: e.target.checked })} /> Enable at launch
            </label>
            <button type="submit" style={{ padding: "0.5rem 1rem", background: "var(--accent)", color: "white", borderRadius: "0.25rem", border: "none", cursor: "pointer" }}>Guardar</button>
          </form>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
                <th style={{ padding: "1rem" }}>Flag Name</th>
                <th style={{ padding: "1rem" }}>Status</th>
                <th style={{ padding: "1rem" }}>Global</th>
                <th style={{ padding: "1rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flags.map(f => (
                <tr key={f.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>{f.name}</td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ color: f.isEnabled ? "#10b981" : "red" }}>{f.isEnabled ? "ON" : "OFF"}</span>
                  </td>
                  <td style={{ padding: "1rem" }}>{f.global ? "Yes" : "No"}</td>
                  <td style={{ padding: "1rem" }}>
                    <button onClick={() => handleToggleFlag(f.id, f.isEnabled)} style={{ padding: "0.25rem 0.5rem", cursor: "pointer", background: "var(--border)", border: "none", color: "var(--foreground)", borderRadius: "0.25rem" }}>
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "audit" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
              <th style={{ padding: "1rem" }}>Fecha</th>
              <th style={{ padding: "1rem" }}>Usuario</th>
              <th style={{ padding: "1rem" }}>Acción</th>
              <th style={{ padding: "1rem" }}>Detalles (JSON)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "1rem", whiteSpace: "nowrap" }}>{new Date(log.timestamp).toLocaleString()}</td>
                <td style={{ padding: "1rem" }}>{log.userEmail || log.userId}</td>
                <td style={{ padding: "1rem", fontWeight: "bold", color: "var(--accent)" }}>{log.action}</td>
                <td style={{ padding: "1rem", fontFamily: "monospace", fontSize: "0.85rem", maxWidth: "400px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
