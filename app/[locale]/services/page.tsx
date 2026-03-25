"use client";

import { useTranslations } from "next-intl";

export default function ServicesPage() {
  const t = useTranslations("Services");

  const services = [
    { title: t("strategicGrowth"), desc: t("strategicGrowthDesc"), icon: "📈" },
    { title: t("digitalTransformation"), desc: t("digitalTransformationDesc"), icon: "🧠" },
    { title: t("brandStrategy"), desc: t("brandStrategyDesc"), icon: "✨" },
    { title: t("innovationEcosystems"), desc: t("innovationEcosystemsDesc"), icon: "🌐" },
    { title: t("storytelling"), desc: t("storytellingDesc"), icon: "🎤" },
  ];

  return (
    <main className="container" style={{ padding: "6rem 0" }}>
      <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
        {t.rich("title", {
          services: (chunks) => <span className="gradient-text">{chunks}</span>
        })}
      </h1>
      <p style={{ fontSize: "1.25rem", color: "var(--muted)", marginBottom: "3rem", maxWidth: "700px" }}>
        {t("subtitle")}
      </p>
      <div className="editorial-grid">
        {services.map((s, i) => (
          <div key={i} className="card" style={{ gridColumn: "span 6" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
            <h2>{s.title}</h2>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

