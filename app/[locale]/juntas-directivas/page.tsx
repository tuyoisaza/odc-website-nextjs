"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Layers, Target, Shield, Activity, TrendingUp } from "lucide-react";

export default function JuntasDirectivasPage() {
  const t = useTranslations("Juntas");

  return (
    <main className="container" style={{ padding: "6rem 0", lineHeight: "1.7" }}>
      {/* Hero Section */}
      <section style={{ marginBottom: "5rem", maxWidth: "900px" }}>
        <p style={{ color: "var(--accent)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
          AI Strategic Oversight Update for Board Members
        </p>
        <h1 style={{ fontSize: "4.5rem", marginBottom: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          AI <span className="gradient-text">Governance</span> for Boards
        </h1>
        <p style={{ fontSize: "1.5rem", color: "var(--muted)", maxWidth: "800px" }}>
          El objetivo del programa no es enseñar tecnología, sino fortalecer la capacidad de la Junta Directiva para supervisar estratégicamente la adopción de IA dentro de la organización.
        </p>
      </section>

      {/* Introducción */}
      <section style={{ marginBottom: "6rem", maxWidth: "800px" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Introducción</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
          La Inteligencia Artificial se está convirtiendo en uno de los principales factores de transformación económica y competitiva a nivel global.
        </p>
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--foreground)" }}>Las decisiones relacionadas con IA ya afectan:</h3>
          <ul style={{ paddingLeft: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <li>Estrategia corporativa</li>
            <li>Eficiencia operativa</li>
            <li>Modelos de negocio</li>
            <li>Gestión de riesgos</li>
            <li>Reputación empresarial</li>
          </ul>
        </div>
        
        <p style={{ fontSize: "1.2rem", fontWeight: 600, borderLeft: "4px solid var(--accent-magenta)", paddingLeft: "1.5rem", marginBottom: "2rem" }}>
          Sin embargo, en muchas organizaciones existe una brecha importante:<br/><br/>
          Las decisiones tecnológicas relacionadas con IA están siendo tomadas por la gerencia o por equipos técnicos, mientras que la Junta Directiva no cuenta con los marcos necesarios para supervisar estas decisiones estratégicas.
        </p>
        
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", fontWeight: "bold" }}>Esto genera tres riesgos principales:</h3>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "3rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li>Falta de visibilidad del Board sobre inversiones en IA</li>
          <li>Exposición a riesgos regulatorios y reputacionales</li>
          <li>Pérdida de oportunidades estratégicas frente a competidores</li>
        </ul>
        <p style={{ fontSize: "1.25rem", color: "var(--accent)" }}>
          El programa <strong>AI Governance for Boards</strong> está diseñado para cerrar esta brecha.
        </p>
      </section>

      {/* Servicios */}
      <section style={{ marginBottom: "6rem" }}>
        <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Servicios del Programa</h2>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "3rem", maxWidth: "700px" }}>
          El programa se estructura en tres servicios complementarios que crean una progresión natural desde la comprensión estratégica hasta la supervisión continua.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {/* Servicio 1 */}
          <div className="card" style={{ padding: "3rem", borderLeft: "4px solid var(--accent)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
              <div style={{ flex: "1 1 500px" }}>
                <span style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Servicio 1</span>
                <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 1rem" }}>AI Board Briefing</h3>
                <p style={{ fontSize: "1.2rem", color: "var(--accent)", marginBottom: "2rem" }}>Strategic AI Briefing for Board Members</p>
                <p style={{ marginBottom: "2rem" }}>
                  <strong>Objetivo:</strong> Proporcionar a la Junta Directiva una comprensión clara, estratégica y accionable del impacto de la Inteligencia Artificial en su industria, su empresa y su modelo de negocio.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Formato</h4>
                    <p><strong>Duración:</strong> 3 horas</p>
                    <p><strong>Modalidad:</strong> Presencial o Virtual</p>
                    <p><strong>Participantes:</strong> Miembros del Board, CEO. (Opcional: equipo ejecutivo)</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Entregables</h4>
                    <ul style={{ paddingLeft: "1.2rem" }}>
                      <li>AI Board Memo</li>
                      <li>AI Risk & Opportunity Snapshot</li>
                      <li>Board AI Questions Framework</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{ flex: "1 1 300px", background: "var(--background)", padding: "2rem", borderRadius: "0.5rem" }}>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--accent)" }}>Contenido</h4>
                <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <li><strong>AI Landscape:</strong> Panorama de cómo la IA está transformando industrias.</li>
                  <li><strong>Strategic Implications:</strong> Impacto estratégico en el modelo de negocio.</li>
                  <li><strong>AI Risk Landscape:</strong> Riesgos regulatorios, reputacionales y operativos.</li>
                  <li><strong>AI Opportunity Map:</strong> Identificación de oportunidades estratégicas.</li>
                  <li><strong>Board Oversight Framework:</strong> Qué debe supervisar el Board.</li>
                </ul>
              </div>
            </div>
            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
              <p><strong>Resultados Esperados:</strong> Lenguaje común para discutir IA • Claridad sobre riesgos y oportunidades • Mejores conversaciones estratégicas con la gerencia</p>
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="card" style={{ padding: "3rem", borderLeft: "4px solid var(--accent-magenta)" }}>
            <span style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Servicio 2</span>
            <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 1rem" }}>AI Governance Blueprint</h3>
            <p style={{ fontSize: "1.2rem", color: "var(--accent-magenta)", marginBottom: "2rem" }}>Designing the Governance Model for AI</p>
            <p style={{ marginBottom: "2rem", maxWidth: "800px" }}>
              <strong>Objetivo:</strong> Diseñar el modelo de gobernanza que permitirá a la Junta Directiva supervisar la adopción de Inteligencia Artificial dentro de la organización.
            </p>
            
            <h4 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Proceso (4 etapas)</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              <div style={{ padding: "1.5rem", background: "var(--background)", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
                <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>1. Executive Interviews</h5>
                <p style={{ fontSize: "0.9rem" }}>Entrevistas con CEO y equipo directivo para entender iniciativas actuales e identificar prioridades estratégicas.</p>
              </div>
              <div style={{ padding: "1.5rem", background: "var(--background)", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
                <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>2. AI Maturity Assessment</h5>
                <p style={{ fontSize: "0.9rem" }}>Evaluación de la madurez organizacional en: Estrategia, Datos, Tecnología, Talento, Gobernanza y Riesgos.</p>
              </div>
              <div style={{ padding: "1.5rem", background: "var(--background)", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
                <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>3. Strategic Mapping</h5>
                <p style={{ fontSize: "0.9rem" }}>Identificación estructurada de riesgos y oportunidades estratégicas.</p>
              </div>
              <div style={{ padding: "1.5rem", background: "var(--background)", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
                <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>4. Governance Model Design</h5>
                <p style={{ fontSize: "0.9rem" }}>Diseño del modelo incluyendo responsabilidades, comités, procesos de supervisión y métricas de seguimiento.</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Entregables</h4>
                <ul style={{ paddingLeft: "1.2rem", columnCount: 2 }}>
                  <li>AI Risk Map</li>
                  <li>AI Opportunity Map</li>
                  <li>AI Governance Framework</li>
                  <li>AI Investment Decision Framework</li>
                  <li>AI Strategic Roadmap (12–24 meses)</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Resultados Esperados</h4>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  <li>Claridad sobre madurez en IA y prioridades estratégicas.</li>
                  <li>Modelo claro de supervisión del Board.</li>
                  <li>Criterios definidos para evaluar inversiones en IA.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Servicio 3 */}
          <div className="card" style={{ padding: "3rem", borderLeft: "4px solid var(--foreground)" }}>
            <span style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Servicio 3</span>
            <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 1rem" }}>AI Board Advisor</h3>
            <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Continuous Strategic Oversight</p>
            <p style={{ marginBottom: "3rem", maxWidth: "800px" }}>
              <strong>Objetivo:</strong> Acompañar a la Junta Directiva en la supervisión estratégica continua de la adopción de IA.
            </p>

            <h4 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Alcance del Acompañamiento</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
              <span className="badge" style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "2rem" }}>Board Sessions (Trimestrales)</span>
              <span className="badge" style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "2rem" }}>Strategic AI Review</span>
              <span className="badge" style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "2rem" }}>AI Investment Review</span>
              <span className="badge" style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "2rem" }}>AI Risk Monitoring</span>
              <span className="badge" style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "2rem" }}>Technology & Regulatory Updates</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Entregables</h4>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  <li>AI Governance Dashboard</li>
                  <li>AI Risk Register</li>
                  <li>Board AI Review Reports</li>
                  <li>Strategic AI Insights</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Resultados Esperados</h4>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  <li>Mayor capacidad de supervisión estratégica.</li>
                  <li>Mejor evaluación de inversiones tecnológicas.</li>
                  <li>Mayor claridad sobre riesgos emergentes.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Bundles */}
      <section style={{ marginBottom: "6rem" }}>
        <h2 style={{ fontSize: "3rem", marginBottom: "3rem", textAlign: "center" }}>Pricing & Bundles</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          <div style={{ border: "1px solid var(--border)", padding: "2rem", borderRadius: "0.5rem", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>AI Board Briefing</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>USD $20,000</p>
            <p style={{ color: "var(--muted)", margin: "1rem 0" }}>Extended Briefing: USD $25,000</p>
          </div>
          <div style={{ border: "1px solid var(--border)", padding: "2rem", borderRadius: "0.5rem", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>AI Governance Blueprint</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-magenta)" }}>USD $45,000</p>
            <p style={{ color: "var(--muted)", margin: "1rem 0" }}>Extended Blueprint: USD $60,000</p>
          </div>
          <div style={{ border: "1px solid var(--border)", padding: "2rem", borderRadius: "0.5rem", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>AI Board Advisor</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--foreground)" }}>USD $8,000 <span style={{fontSize: "1rem", fontWeight: "normal"}}>/ mes</span></p>
            <p style={{ color: "var(--muted)", margin: "1rem 0" }}>Enhanced Advisor: USD $12,000 / mes</p>
          </div>
        </div>

        <h3 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Program Bundles</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
          <div className="card" style={{ flex: "1 1 400px", background: "url('/noise.png')", backgroundColor: "var(--card)", padding: "3rem", borderRadius: "1rem", border: "2px solid var(--border)" }}>
            <h4 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Governance Launch Package</h4>
            <ul style={{ paddingLeft: "1.2rem", marginBottom: "2rem", fontSize: "1.1rem" }}>
              <li>AI Board Briefing</li>
              <li>AI Governance Blueprint</li>
            </ul>
            <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent)" }}>USD $55,000</p>
          </div>
          
          <div style={{ flex: "1 1 400px", background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-magenta) 100%)", color: "white", padding: "3rem", borderRadius: "1rem", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
            <h4 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Full Governance Program</h4>
            <ul style={{ paddingLeft: "1.2rem", marginBottom: "2rem", fontSize: "1.1rem" }}>
              <li>AI Board Briefing</li>
              <li>AI Governance Blueprint</li>
              <li>AI Board Advisor (12 meses)</li>
            </ul>
            <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>USD $140,000</p>
          </div>
        </div>
      </section>

      {/* Resultado Final */}
      <section style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "4rem 0", borderTop: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>El Resultado Final</h2>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
          El objetivo del programa <strong>AI Governance for Boards</strong> es proporcionar a la Junta Directiva los marcos, herramientas y acompañamiento necesarios para supervisar uno de los cambios tecnológicos más importantes de las próximas décadas.
        </p>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent)", lineHeight: 1.4 }}>
          La Inteligencia Artificial no es solo un tema tecnológico.<br/>
          <span style={{ color: "var(--foreground)" }}>Es un tema estratégico de gobierno corporativo.</span>
        </p>
      </section>

    </main>
  );
}
