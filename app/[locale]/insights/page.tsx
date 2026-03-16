"use client";

import { useTranslations } from "next-intl";

export default function InsightsPage() {
  const t = useTranslations("Insights");

  const articles = [
    { title: "El Crecimiento Sostenible como Sistema", date: "Marzo 2026", excerpt: "Por qué las tácticas aisladas fallan en el largo plazo..." },
    { title: "IA Cognitiva en la Estrategia", date: "Febrero 2026", excerpt: "Integrando modelos de lenguaje en el core del negocio..." },
    { title: "Arquitectura de Marcas Modernas", date: "Enero 2026", excerpt: "Narrativas que resuenan en ecosistemas fragmentados..." },
  ];

  return (
    <main className="container" style={{ padding: "6rem 0" }}>
      <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
        {t.rich("title", {
          insights: (chunks) => <span className="gradient-text">{chunks}</span>
        })}
      </h1>
      <p style={{ marginBottom: "4rem", maxWidth: "600px" }}>{t("subtitle")}</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {articles.map((a, i) => (
          <article key={i} style={{ paddingBottom: "4rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700 }}>{a.date}</span>
            <h2 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>{a.title}</h2>
            <p style={{ maxWidth: "700px" }}>{a.excerpt}</p>
            <button style={{ background: "transparent", color: "var(--foreground)", padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "0.5rem", cursor: "pointer" }}>
              {t("readMore")}
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
