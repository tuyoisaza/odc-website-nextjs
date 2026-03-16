"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <main className="container" style={{ padding: "10rem 0", textAlign: "center" }}>
        <CheckCircle size={64} style={{ color: "var(--accent)", marginBottom: "2rem" }} />
        <h1>{t("success")}</h1>
        <p>{t("successDesc")}</p>
        <button onClick={() => window.location.href = "/"} style={{ 
          background: "var(--foreground)", color: "var(--background)", padding: "1rem 2rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: 700 
        }}>
          {t("backHome")}
        </button>
      </main>
    );
  }

  const inputStyle = { width: "100%", padding: "1rem", borderRadius: "0.5rem", background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)", fontFamily: "inherit", fontSize: "1rem" };

  return (
    <main className="container" style={{ padding: "6rem 0" }}>
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          {t.rich("title", {
            systems: (chunks) => <span className="gradient-text">{chunks}</span>
          })}
        </h1>
        <p style={{ marginBottom: "3rem" }}>{t("subtitle")}</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>{t("name")}</label>
            <input required type="text" placeholder="Andrés Jaramillo" style={inputStyle}
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>{t("email")}</label>
            <input required type="email" placeholder="andres@empresa.com" style={inputStyle}
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>{t("company")}</label>
            <input type="text" placeholder="ODC Systems" style={inputStyle}
              value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>{t("context")}</label>
            <textarea rows={4} style={{ ...inputStyle, resize: "none" as const }}
              value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
          </div>

          <button disabled={formState === "loading"} type="submit" style={{ 
            background: "var(--foreground)", color: "var(--background)", padding: "1rem", borderRadius: "0.5rem", 
            border: "none", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"
          }}>
            {formState === "loading" ? t("sending") : <>{t("send")} <Send size={18} /></>}
          </button>
          {formState === "error" && <p style={{ color: "#ef4444", fontSize: "0.9rem" }}>{t("error")}</p>}
        </form>
      </div>
    </main>
  );
}
