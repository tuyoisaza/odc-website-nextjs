"use client";

import { useTranslations } from "next-intl";
import { TeamSection } from "@/components/TeamSection";

export default function Home() {
  const t = useTranslations("Index");
  const services = useTranslations("Services");

  const serviceList = [
    { title: services("strategicGrowth"), desc: services("strategicGrowthDesc"), icon: "📈" },
    { title: services("digitalTransformation"), desc: services("digitalTransformationDesc"), icon: "🧠" },
    { title: services("brandStrategy"), desc: services("brandStrategyDesc"), icon: "✨" },
    { title: services("innovationEcosystems"), desc: services("innovationEcosystemsDesc"), icon: "🌐" },
    { title: services("storytelling"), desc: services("storytellingDesc"), icon: "🎤" },
  ];

  return (
    <main className="container">
      <section style={{ padding: "8rem 0 4rem" }}>
        <div style={{ maxWidth: "800px" }}>
          <h1 style={{ fontSize: "4.5rem", marginBottom: "2rem" }}>
            {t.rich("title", {
              system: (chunks) => <span className="gradient-text">{chunks}</span>
            })}
          </h1>
          <p style={{ fontSize: "1.25rem", maxWidth: "600px", marginBottom: "3rem" }}>
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="editorial-grid" style={{ padding: "6rem 0" }}>
        {serviceList.map((s, i) => (
          <div key={i} className="card" style={{ gridColumn: "span 6" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
            <h2>{s.title}</h2>
            <p>{s.desc}</p>
          </div>
        ))}
      </section>

      <TeamSection />
    </main>
  );
}
