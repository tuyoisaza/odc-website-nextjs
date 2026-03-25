"use client";

import { useLocale } from "next-intl";

const content = {
  es: {
    heroSurtitle: "AI Strategic Oversight Update for Board Members",
    heroSubtitle: "El objetivo del programa no es enseñar tecnología, sino fortalecer la capacidad de la Junta Directiva para supervisar estratégicamente la adopción de IA dentro de la organización.",
    intro1: "La Inteligencia Artificial se está convirtiendo en uno de los principales factores de transformación económica y competitiva a nivel global.",
    introListTitle1: "Las decisiones relacionadas con IA ya afectan:",
    introList1: ["Estrategia corporativa", "Eficiencia operativa", "Modelos de negocio", "Gestión de riesgos", "Reputación empresarial"],
    introBrecha: "Sin embargo, en muchas organizaciones existe una brecha importante:\n\nLas decisiones tecnológicas relacionadas con IA están siendo tomadas por la gerencia o por equipos técnicos, mientras que la Junta Directiva no cuenta con los marcos necesarios para supervisar estas decisiones estratégicas.",
    introListTitle2: "Esto genera tres riesgos principales:",
    introList2: [
      "Falta de visibilidad del Board sobre inversiones en IA",
      "Exposición a riesgos regulatorios y reputacionales",
      "Pérdida de oportunidades estratégicas frente a competidores"
    ],
    introConclusion: "El programa AI Governance for Boards está diseñado para cerrar esta brecha.",
    servicesTitle: "Servicios del Programa",
    servicesSubtitle: "El programa se estructura en tres servicios complementarios que crean una progresión natural desde la comprensión estratégica hasta la supervisión continua.",
    s1Tag: "Servicio 1",
    s1Desc: "Proporcionar a la Junta Directiva una comprensión clara, estratégica y accionable del impacto de la Inteligencia Artificial en su industria, su empresa y su modelo de negocio.",
    s1FormatTitle: "Formato",
    s1Duration: "Duración:",
    s1Modality: "Modalidad:",
    s1Participants: "Participantes:",
    s1DurVal: "3 horas",
    s1ModVal: "Presencial o Virtual",
    s1PartVal: "Miembros del Board, CEO. (Opcional: equipo ejecutivo)",
    s1DelivTitle: "Entregables",
    s1ContentTitle: "Contenido",
    s1Content1: "Panorama de cómo la IA está transformando industrias.",
    s1Content2: "Impacto estratégico en el modelo de negocio.",
    s1Content3: "Riesgos regulatorios, reputacionales y operativos.",
    s1Content4: "Identificación de oportunidades estratégicas.",
    s1Content5: "Qué debe supervisar el Board.",
    s1Results: "Lenguaje común para discutir IA • Claridad sobre riesgos y oportunidades • Mejores conversaciones estratégicas con la gerencia",
    s2Tag: "Servicio 2",
    s2Desc: "Diseñar el modelo de gobernanza que permitirá a la Junta Directiva supervisar la adopción de Inteligencia Artificial dentro de la organización.",
    s2ProcessTitle: "Proceso (4 etapas)",
    s2P1Desc: "Entrevistas con CEO y equipo directivo para entender iniciativas actuales e identificar prioridades estratégicas.",
    s2P2Desc: "Evaluación de la madurez organizacional en: Estrategia, Datos, Tecnología, Talento, Gobernanza y Riesgos.",
    s2P3Desc: "Identificación estructurada de riesgos y oportunidades estratégicas.",
    s2P4Desc: "Diseño del modelo incluyendo responsabilidades, comités, procesos de supervisión y métricas de seguimiento.",
    s2DelivTitle: "Entregables",
    s2ResultsTitle: "Resultados Esperados",
    s2Results1: "Claridad sobre madurez en IA y prioridades estratégicas.",
    s2Results2: "Modelo claro de supervisión del Board.",
    s2Results3: "Criterios definidos para evaluar inversiones en IA.",
    s3Tag: "Servicio 3",
    s3Desc: "Acompañar a la Junta Directiva en la supervisión estratégica continua de la adopción de IA.",
    s3ScopeTitle: "Alcance del Acompañamiento",
    s3Pills: ["Board Sessions (Trimestrales)", "Strategic AI Review", "AI Investment Review", "AI Risk Monitoring", "Technology & Regulatory Updates"],
    s3DelivTitle: "Entregables",
    s3ResultsTitle: "Resultados Esperados",
    s3Results1: "Mayor capacidad de supervisión estratégica.",
    s3Results2: "Mejor evaluación de inversiones tecnológicas.",
    s3Results3: "Mayor claridad sobre riesgos emergentes.",

    conclusionTitle: "El Resultado Final",
    conclusionText: "El objetivo del programa AI Governance for Boards es proporcionar a la Junta Directiva los marcos, herramientas y acompañamiento necesarios para supervisar uno de los cambios tecnológicos más importantes de las próximas décadas.",
    conclusionStrong1: "La Inteligencia Artificial no es solo un tema tecnológico.",
    conclusionStrong2: "Es un tema estratégico de gobierno corporativo."
  },
  en: {
    heroSurtitle: "AI Strategic Oversight Update for Board Members",
    heroSubtitle: "The objective of the program is not to teach technology, but to strengthen the Board of Directors' capacity to strategically oversee the adoption of AI within the organization.",
    intro1: "Artificial Intelligence is becoming one of the main drivers of economic and competitive transformation globally.",
    introListTitle1: "AI-related decisions already affect:",
    introList1: ["Corporate strategy", "Operational efficiency", "Business models", "Risk management", "Corporate reputation"],
    introBrecha: "However, a significant gap exists in many organizations:\n\nTechnological decisions regarding AI are being made by management or technical teams, while the Board of Directors lacks the necessary frameworks to oversee these strategic decisions.",
    introListTitle2: "This creates three main risks:",
    introList2: [
      "Lack of Board visibility into AI investments",
      "Exposure to regulatory and reputational risks",
      "Loss of strategic opportunities to competitors"
    ],
    introConclusion: "The AI Governance for Boards program is designed to close this gap.",
    servicesTitle: "Program Services",
    servicesSubtitle: "The program is structured around three complementary services that create a natural progression from strategic understanding to continuous oversight.",
    s1Tag: "Service 1",
    s1Desc: "Provide the Board of Directors with a clear, strategic, and actionable understanding of the impact of Artificial Intelligence on their industry, company, and business model.",
    s1FormatTitle: "Format",
    s1Duration: "Duration:",
    s1Modality: "Modality:",
    s1Participants: "Participants:",
    s1DurVal: "3 hours",
    s1ModVal: "In-person or Virtual",
    s1PartVal: "Board Members, CEO. (Optional: executive team)",
    s1DelivTitle: "Deliverables",
    s1ContentTitle: "Content",
    s1Content1: "Overview of how AI is transforming industries.",
    s1Content2: "Strategic impact on the business model.",
    s1Content3: "Regulatory, reputational, and operational risks.",
    s1Content4: "Identification of strategic opportunities.",
    s1Content5: "What the Board should oversee.",
    s1Results: "Common language to discuss AI • Clarity on risks and opportunities • Better strategic conversations with management",
    s2Tag: "Service 2",
    s2Desc: "Design the governance model that will enable the Board of Directors to oversee the adoption of Artificial Intelligence within the organization.",
    s2ProcessTitle: "Process (4 stages)",
    s2P1Desc: "Interviews with the CEO and executive team to understand current initiatives and identify strategic priorities.",
    s2P2Desc: "Evaluation of organizational maturity in: Strategy, Data, Technology, Talent, Governance, and Risks.",
    s2P3Desc: "Structured identification of strategic risks and opportunities.",
    s2P4Desc: "Design of the model including responsibilities, committees, oversight processes, and tracking metrics.",
    s2DelivTitle: "Deliverables",
    s2ResultsTitle: "Expected Results",
    s2Results1: "Clarity on AI maturity and strategic priorities.",
    s2Results2: "Clear Board oversight model.",
    s2Results3: "Defined criteria for evaluating AI investments.",
    s3Tag: "Service 3",
    s3Desc: "Accompany the Board of Directors in continuous strategic oversight of AI adoption.",
    s3ScopeTitle: "Scope of Accompaniment",
    s3Pills: ["Board Sessions (Quarterly)", "Strategic AI Review", "AI Investment Review", "AI Risk Monitoring", "Technology & Regulatory Updates"],
    s3DelivTitle: "Deliverables",
    s3ResultsTitle: "Expected Results",
    s3Results1: "Greater capacity for strategic oversight.",
    s3Results2: "Better evaluation of technological investments.",
    s3Results3: "Greater clarity on emerging risks.",

    conclusionTitle: "The Final Result",
    conclusionText: "The goal of the AI Governance for Boards program is to provide the Board of Directors with the necessary frameworks, tools, and support to oversee one of the most important technological shifts of the coming decades.",
    conclusionStrong1: "Artificial Intelligence is not just a technological issue.",
    conclusionStrong2: "It is a strategic corporate governance issue."
  }
};

export default function JuntasDirectivasPage() {
  const locale = useLocale();
  const c = content[locale as keyof typeof content] || content.es; // fallback to es

  return (
    <main className="container" style={{ padding: "6rem 0", lineHeight: "1.7" }}>
      {/* Hero Section */}
      <section style={{ marginBottom: "5rem", maxWidth: "900px" }}>
        <p style={{ color: "var(--accent)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
          {c.heroSurtitle}
        </p>
        <h1 style={{ fontSize: "4.5rem", marginBottom: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          AI <span className="gradient-text">Governance</span> for Boards
        </h1>
        <p style={{ fontSize: "1.5rem", color: "var(--muted)", maxWidth: "800px" }}>
          {c.heroSubtitle}
        </p>
      </section>

      {/* Introducción (Title removed per feedback) */}
      <section style={{ marginBottom: "6rem", maxWidth: "800px" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
          {c.intro1}
        </p>
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--foreground)" }}>{c.introListTitle1}</h3>
          <ul style={{ paddingLeft: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            {c.introList1.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        
        <p style={{ fontSize: "1.2rem", fontWeight: 600, borderLeft: "4px solid var(--accent-magenta)", paddingLeft: "1.5rem", marginBottom: "2rem", whiteSpace: "pre-wrap" }}>
          {c.introBrecha}
        </p>
        
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", fontWeight: "bold" }}>{c.introListTitle2}</h3>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "3rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
           {c.introList2.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <p style={{ fontSize: "1.25rem", color: "var(--accent)" }}>
          {/* We keep 'AI Governance for Boards' as a brand name without translation */}
          {c.introConclusion.split('AI Governance for Boards')[0]}
          <strong>AI Governance for Boards</strong>
          {c.introConclusion.split('AI Governance for Boards')[1]}
        </p>
      </section>

      {/* Servicios */}
      <section style={{ marginBottom: "6rem" }}>
        <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>{c.servicesTitle}</h2>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "3rem", maxWidth: "700px" }}>
          {c.servicesSubtitle}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {/* Servicio 1 */}
          <div className="card" style={{ padding: "3rem", borderLeft: "4px solid var(--accent)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
              <div style={{ flex: "1 1 500px" }}>
                <span style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>{c.s1Tag}</span>
                <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 1rem" }}>AI Board Briefing</h3>
                <p style={{ fontSize: "1.2rem", color: "var(--accent)", marginBottom: "2rem" }}>Strategic AI Briefing for Board Members</p>
                <p style={{ marginBottom: "2rem" }}>
                  <strong>Objetivo:</strong> {c.s1Desc}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>{c.s1FormatTitle}</h4>
                    <p><strong>{c.s1Duration}</strong> {c.s1DurVal}</p>
                    <p><strong>{c.s1Modality}</strong> {c.s1ModVal}</p>
                    <p><strong>{c.s1Participants}</strong> {c.s1PartVal}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>{c.s1DelivTitle}</h4>
                    <ul style={{ paddingLeft: "1.2rem" }}>
                      <li>AI Board Memo</li>
                      <li>AI Risk & Opportunity Snapshot</li>
                      <li>Board AI Questions Framework</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{ flex: "1 1 300px", background: "var(--background)", padding: "2rem", borderRadius: "0.5rem" }}>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--accent)" }}>{c.s1ContentTitle}</h4>
                <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <li><strong>AI Landscape:</strong> {c.s1Content1}</li>
                  <li><strong>Strategic Implications:</strong> {c.s1Content2}</li>
                  <li><strong>AI Risk Landscape:</strong> {c.s1Content3}</li>
                  <li><strong>AI Opportunity Map:</strong> {c.s1Content4}</li>
                  <li><strong>Board Oversight Framework:</strong> {c.s1Content5}</li>
                </ul>
              </div>
            </div>
            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
              <p><strong>Resultados Esperados:</strong> {c.s1Results}</p>
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="card" style={{ padding: "3rem", borderLeft: "4px solid var(--accent-magenta)" }}>
            <span style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>{c.s2Tag}</span>
            <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 1rem" }}>AI Governance Blueprint</h3>
            <p style={{ fontSize: "1.2rem", color: "var(--accent-magenta)", marginBottom: "2rem" }}>Designing the Governance Model for AI</p>
            <p style={{ marginBottom: "2rem", maxWidth: "800px" }}>
              <strong>Objetivo:</strong> {c.s2Desc}
            </p>
            
            <h4 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>{c.s2ProcessTitle}</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              <div style={{ padding: "1.5rem", background: "var(--background)", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
                <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>1. Executive Interviews</h5>
                <p style={{ fontSize: "0.9rem" }}>{c.s2P1Desc}</p>
              </div>
              <div style={{ padding: "1.5rem", background: "var(--background)", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
                <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>2. AI Maturity Assessment</h5>
                <p style={{ fontSize: "0.9rem" }}>{c.s2P2Desc}</p>
              </div>
              <div style={{ padding: "1.5rem", background: "var(--background)", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
                <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>3. Strategic Mapping</h5>
                <p style={{ fontSize: "0.9rem" }}>{c.s2P3Desc}</p>
              </div>
              <div style={{ padding: "1.5rem", background: "var(--background)", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
                <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>4. Governance Model Design</h5>
                <p style={{ fontSize: "0.9rem" }}>{c.s2P4Desc}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>{c.s2DelivTitle}</h4>
                <ul style={{ paddingLeft: "1.2rem", columnCount: 2 }}>
                  <li>AI Risk Map</li>
                  <li>AI Opportunity Map</li>
                  <li>AI Governance Framework</li>
                  <li>AI Investment Decision Framework</li>
                  <li>AI Strategic Roadmap (12–24 meses)</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>{c.s2ResultsTitle}</h4>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  <li>{c.s2Results1}</li>
                  <li>{c.s2Results2}</li>
                  <li>{c.s2Results3}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Servicio 3 */}
          <div className="card" style={{ padding: "3rem", borderLeft: "4px solid var(--foreground)" }}>
            <span style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>{c.s3Tag}</span>
            <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 1rem" }}>AI Board Advisor</h3>
            <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Continuous Strategic Oversight</p>
            <p style={{ marginBottom: "3rem", maxWidth: "800px" }}>
              <strong>Objetivo:</strong> {c.s3Desc}
            </p>

            <h4 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>{c.s3ScopeTitle}</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
              {c.s3Pills.map((pill, i) => (
                <span key={i} className="badge" style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "2rem" }}>
                  {pill}
                </span>
              ))}
             </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>{c.s3DelivTitle}</h4>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  <li>AI Governance Dashboard</li>
                  <li>AI Risk Register</li>
                  <li>Board AI Review Reports</li>
                  <li>Strategic AI Insights</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>{c.s3ResultsTitle}</h4>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  <li>{c.s3Results1}</li>
                  <li>{c.s3Results2}</li>
                  <li>{c.s3Results3}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Resultado Final */}
      <section style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "4rem 0", borderTop: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>{c.conclusionTitle}</h2>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
          {c.conclusionText}
        </p>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent)", lineHeight: 1.4 }}>
          {c.conclusionStrong1}<br/>
          <span style={{ color: "var(--foreground)" }}>{c.conclusionStrong2}</span>
        </p>
      </section>

    </main>
  );
}
