"use client";

import { useTranslations } from "next-intl";

export default function JuntasDirectivasPage() {
  const t = useTranslations("Juntas");

  return (
    <main className="container" style={{ padding: "6rem 0" }}>
      <h1 style={{ fontSize: "3.5rem", marginBottom: "2rem" }}>
        {t.rich("title", {
          highlight: (chunks) => <span className="gradient-text">{chunks}</span>
        })}
      </h1>
      <p style={{ fontSize: "1.25rem", maxWidth: "800px", marginBottom: "4rem" }}>
        {t("subtitle")}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        <div className="card" style={{ padding: "2rem", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent)" }}>{t("value1Title")}</h2>
          <p>{t("value1Desc")}</p>
        </div>
        <div className="card" style={{ padding: "2rem", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-magenta)" }}>{t("value2Title")}</h2>
          <p>{t("value2Desc")}</p>
        </div>
        <div className="card" style={{ padding: "2rem", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent)" }}>{t("value3Title")}</h2>
          <p>{t("value3Desc")}</p>
        </div>
      </div>
    </main>
  );
}
