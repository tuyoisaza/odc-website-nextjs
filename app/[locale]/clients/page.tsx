import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";

export default async function ClientsPage() {
  const t = await getTranslations("Clients");

  const categories = await prisma.clientCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      clients: {
        orderBy: { order: "asc" }
      }
    }
  });

  const industries = categories.map(cat => ({
    name: cat.name,
    clients: cat.clients.map(cli => ({
      name: cli.name,
      url: cli.url || "#",
      logo: cli.logo
    }))
  }));

  return (
    <main className="container" style={{ padding: "6rem 0" }}>
      <style>{`
        .client-card {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 2rem;
          border-radius: 0.5rem;
          text-align: center;
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          height: 100%;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .client-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
      `}</style>

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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2rem" }}>
              {ind.clients.map((c, j) => (
                <a key={j} href={c.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="client-card">
                    {c.logo ? (
                      <img 
                         src={`https://logo.clearbit.com/${c.logo}`} 
                         alt={`${c.name} logo`} 
                         style={{ width: "64px", height: "64px", objectFit: "contain" }} 
                         onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                      />
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
