"use client";

import { useTranslations } from "next-intl";

export default function ClientsPage() {
  const t = useTranslations("Clients");

  const industries = [
    { name: "Tecnología", clients: ["Boostogether", "Hyland", "RobinFood", "WOPP"] },
    { name: "Bebidas", clients: ["AB InBev", "Diageo", "Pepsico"] },
    { name: "Transporte", clients: ["Avianca", "Blu Logistics"] },
    { name: "Salud", clients: ["Pfizer", "Merck", "InSer"] },
  ];

  return (
    <main className="container" style={{ padding: "6rem 0" }}>
      <h1 style={{ fontSize: "3.5rem", marginBottom: "4rem" }}>
        {t.rich("title", {
          partners: (chunks) => <span className="gradient-text">{chunks}</span>
        })}
      </h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {industries.map((ind, i) => (
          <div key={i}>
            <h2 style={{ fontSize: "1.2rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
              {ind.name}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
              {ind.clients.map((c, j) => (
                <div key={j} style={{ 
                  background: "var(--card)", 
                  border: "1px solid var(--border)",
                  padding: "2rem", 
                  borderRadius: "0.5rem", 
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "1.1rem"
                }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
