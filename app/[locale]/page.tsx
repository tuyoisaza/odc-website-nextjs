"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Activity, Zap, Layers } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Home() {
  const t = useTranslations("Index");
  const nav = useTranslations("Navbar");
  const locale = useLocale();

  return (
    <main className="container">
      <nav style={{ padding: "2rem 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.05em" }}>
          ODC<span className="gradient-text">.</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href={`/${locale}/services`} style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{nav("services")}</Link>
          <Link href={`/${locale}/insights`} style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{nav("insights")}</Link>
          <Link href={`/${locale}/clients`} style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{nav("clients")}</Link>
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Link href={`/${locale}/contact`} style={{ 
            background: "var(--accent)", 
            color: "white", 
            padding: "0.5rem 1.25rem", 
            borderRadius: "0.5rem",
            fontSize: "0.9rem",
            fontWeight: 600
          }}>
            {nav("cta")}
          </Link>
        </div>
      </nav>

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
    </main>
  );
}
