"use client";

import { useTranslations } from "next-intl";

export function TeamSection() {
  const t = useTranslations("Team");

  return (
    <section style={{ padding: "6rem 0" }}>
      <h2 style={{ fontSize: "3rem", marginBottom: "4rem" }}>
        {t.rich("title", {
          partners: (chunks) => <span className="gradient-text">{chunks}</span>
        })}
      </h2>
      <div className="editorial-grid">
        <div className="card" style={{ gridColumn: "span 6" }}>
          <img src="/Andres_Jaramillo.jpeg" alt="Andrés Felipe Jaramillo" style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "1.5rem" }} loading="lazy" />
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t("andresName")}</h3>
          <p style={{ fontWeight: 600, color: "var(--accent)", marginBottom: "1.5rem", fontSize: "0.9rem", textTransform: "uppercase" }}>
            {t("andresTitle")}
          </p>
          <p>{t("andresBio")}</p>
        </div>
        <div className="card" style={{ gridColumn: "span 6" }}>
          <img src="/Tuyo_Isaza.jpg" alt="Tuyo Isaza" style={{ width: "100%", height: "500px", objectFit: "cover", objectPosition: "top", borderRadius: "0.5rem", marginBottom: "1.5rem" }} loading="lazy" />
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t("tuyoName")}</h3>
          <p style={{ fontWeight: 600, color: "var(--accent-magenta)", marginBottom: "1.5rem", fontSize: "0.9rem", textTransform: "uppercase" }}>
            {t("tuyoTitle")}
          </p>
          <p>{t("tuyoBio")}</p>
        </div>
      </div>
    </section>
  );
}
