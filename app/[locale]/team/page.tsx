"use client";

import { TeamSection } from "@/components/TeamSection";

export default function TeamPage() {
  return (
    <main className="container" style={{ padding: "6rem 0" }}>
      <TeamSection />

      <section style={{ padding: "2rem 0 0" }}>
        <h2 style={{ fontSize: "3rem", margin: 0 }}>Our work style</h2>
        <p style={{ fontSize: "1.25rem", maxWidth: "700px", marginTop: "1.5rem", lineHeight: 1.7 }}>
          We are an AI-first consulting team. We leverage cutting-edge tools and methodologies to deliver substantial work in quick, focused bursts — reducing costs and timelines for our clients.
        </p>
      </section>
    </main>
  );
}
