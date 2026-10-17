import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { ClientLogo } from "@/components/ClientLogo";
import { getClientUrl } from "@/lib/client-branding";

export default async function ClientsPage() {
  const t = await getTranslations("Clients");

  let industries: { name: string; clients: { name: string; url: string | undefined; logo: string | null }[] }[] = [];

  try {
    const categories = await prisma.clientCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        clients: {
          orderBy: { order: "asc" }
        }
      }
    });

    industries = categories.filter(cat => cat.clients.length > 0).map(cat => ({
      name: cat.name,
      clients: cat.clients.map(cli => ({
        name: cli.name,
        url: getClientUrl(cli.name, cli.url),
        logo: cli.logo
      }))
    }));
  } catch (err) {
    console.error("Failed to load clients:", err);
  }

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
        }
        .client-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
      `}</style>

      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", marginBottom: "4rem" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "2rem" }}>
              {ind.clients.map((c, j) => {
                const card = <div className="client-card"><ClientLogo name={c.name} logo={c.logo} />{c.name}</div>;
                return c.url ? (
                  <a key={j} href={c.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>{card}</a>
                ) : <div key={j}>{card}</div>;
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
