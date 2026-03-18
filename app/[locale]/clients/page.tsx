"use client";

import { useTranslations } from "next-intl";

export default function ClientsPage() {
  const t = useTranslations("Clients");

  const industries = [
    { name: "Tecnología", clients: [
      { name: "Boostogether", url: "https://boostogether.com", logo: "boostogether.com" },
      { name: "Hyland", url: "https://www.hyland.com", logo: "hyland.com" },
      { name: "RobinFood", url: "https://www.robinfood.com", logo: "robinfood.com" },
      { name: "WOPP", url: "https://wopp.agency", logo: "wopp.agency" }
    ] },
    { name: "Bebidas", clients: [
      { name: "AB InBev", url: "https://www.ab-inbev.com", logo: "ab-inbev.com" },
      { name: "Diageo", url: "https://www.diageo.com", logo: "diageo.com" },
      { name: "Pepsico", url: "https://www.pepsico.com", logo: "pepsico.com" },
      { name: "Flores", url: "#", logo: null },
      { name: "Petalli", url: "#", logo: null },
      { name: "Blumelii", url: "#", logo: null }
    ] },
    { name: "Transporte", clients: [
      { name: "Avianca", url: "https://www.avianca.com", logo: "avianca.com" },
      { name: "Blu Logistics", url: "https://www.blulogistics.com", logo: "blulogistics.com" }
    ] },
    { name: "Alimentos y Retail", clients: [
      { name: "Sigma", url: "https://www.sigma-alimentos.com", logo: "sigma-alimentos.com" },
      { name: "Higgs", url: "#", logo: null },
      { name: "Mr Bricolage", url: "https://www.mr-bricolage.fr", logo: "mr-bricolage.fr" },
      { name: "Distribuciones DPJD", url: "#", logo: null },
      { name: "Distribuciones La Integridad", url: "https://laintegridad.com.co", logo: "laintegridad.com.co" }
    ] },
    { name: "Manufactura y Energía", clients: [
      { name: "Cerámica Italia", url: "https://www.ceramicaitalia.com", logo: "ceramicaitalia.com" },
      { name: "Schneider Electric", url: "https://www.se.com", logo: "se.com" },
      { name: "Motul", url: "https://www.motul.com", logo: "motul.com" }
    ] },
    { name: "Salud y Cuidado Personal", clients: [
      { name: "InSer (Fertility)", url: "https://www.inser.com.co", logo: "inser.com.co" },
      { name: "Pfizer", url: "https://www.pfizer.com", logo: "pfizer.com" },
      { name: "Merck C", url: "https://www.merckgroup.com", logo: "merckgroup.com" },
      { name: "Botanique", url: "#", logo: null },
      { name: "Guaapa", url: "#", logo: null }
    ] },
    { name: "Seguros", clients: [
      { name: "Grupo Bolívar", url: "https://www.grupobolivar.com", logo: "grupobolivar.com" }
    ] },
    { name: "Sin fines de lucro", clients: [
      { name: "Fundación Texmodas", url: "#", logo: null },
      { name: "Cámara de Comercio de Cúcuta", url: "https://www.cccucuta.org.co/", logo: "cccucuta.org.co" }
    ] },
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
                <a key={j} href={c.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ 
                    background: "var(--card)", 
                    border: "1px solid var(--border)",
                    padding: "2rem", 
                    borderRadius: "0.5rem", 
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    {c.logo ? (
                      <img src={`https://logo.clearbit.com/${c.logo}`} alt={`${c.name} logo`} style={{ width: "64px", height: "64px", objectFit: "contain" }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    ) : (
                      <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", color: "var(--muted)" }}>
                        {c.name.charAt(0)}
                      </div>
                    )}
                    {c.name}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
