"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Activity, Zap, Layers } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Home() {
  const t = useTranslations("Index");
  const locale = useLocale();

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
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href={`/${locale}/services`} style={{ textDecoration: "none" }}>
              <button style={{ 
                background: "var(--foreground)", 
                color: "var(--background)", 
                padding: "1rem 2rem", 
                borderRadius: "0.5rem",
                fontWeight: 700,
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer"
              }}>
                {t("cta")} <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="editorial-grid" style={{ padding: "6rem 0" }}>
        <div className="card" style={{ gridColumn: "span 4" }}>
          <Activity style={{ color: "var(--accent)", marginBottom: "1.5rem" }} />
          <h3>{useTranslations("Services")("strategicGrowth")}</h3>
          <p>{useTranslations("Services")("strategicGrowthDesc")}</p>
        </div>
        <div className="card" style={{ gridColumn: "span 4" }}>
          <Zap style={{ color: "var(--accent-magenta)", marginBottom: "1.5rem" }} />
          <h3>{useTranslations("Services")("digitalTransformation")}</h3>
          <p>{useTranslations("Services")("digitalTransformationDesc")}</p>
        </div>
        <div className="card" style={{ gridColumn: "span 4" }}>
          <Layers style={{ color: "var(--accent)", marginBottom: "1.5rem" }} />
          <h3>{useTranslations("Services")("innovationEcosystems")}</h3>
          <p>{useTranslations("Services")("innovationEcosystemsDesc")}</p>
        </div>
      </section>

      <section id="team" style={{ padding: "6rem 0" }}>
        <h2 style={{ fontSize: "3rem", marginBottom: "4rem" }}>
          {useTranslations("Team").rich("title", {
            partners: (chunks) => <span className="gradient-text">{chunks}</span>
          })}
        </h2>
        <div className="editorial-grid">
          <div className="card" style={{ gridColumn: "span 6" }}>
            <img src="/Andres_Jaramillo.jpeg" alt="Andrés Felipe Jaramillo" style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "1.5rem" }} loading="lazy" />
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{useTranslations("Team")("andresName")}</h3>
            <p style={{ fontWeight: 600, color: "var(--accent)", marginBottom: "1.5rem", fontSize: "0.9rem", textTransform: "uppercase" }}>
              {useTranslations("Team")("andresTitle")}
            </p>
            <p>{useTranslations("Team")("andresBio")}</p>
          </div>
          <div className="card" style={{ gridColumn: "span 6" }}>
            <img src="/Tuyo_Isaza.jpg" alt="Tuyo Isaza" style={{ width: "100%", height: "500px", objectFit: "cover", objectPosition: "top", borderRadius: "0.5rem", marginBottom: "1.5rem" }} loading="lazy" />
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{useTranslations("Team")("tuyoName")}</h3>
            <p style={{ fontWeight: 600, color: "var(--accent-magenta)", marginBottom: "1.5rem", fontSize: "0.9rem", textTransform: "uppercase" }}>
              {useTranslations("Team")("tuyoTitle")}
            </p>
            <p>{useTranslations("Team")("tuyoBio")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
