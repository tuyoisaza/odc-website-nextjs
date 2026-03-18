"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const nav = useTranslations("Navbar");
  const locale = useLocale();

  return (
    <nav style={{ padding: "2rem 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link href={`/${locale}`} style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.05em", textDecoration: "none", color: "var(--foreground)" }}>
        ODC<span className="gradient-text">.</span>
      </Link>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link href={`/${locale}/services`} style={{ color: "var(--muted)", fontSize: "0.9rem", textDecoration: "none" }}>{nav("services")}</Link>
        <Link href={`/${locale}/insights`} style={{ color: "var(--muted)", fontSize: "0.9rem", textDecoration: "none" }}>{nav("insights")}</Link>
        <Link href={`/${locale}/clients`} style={{ color: "var(--muted)", fontSize: "0.9rem", textDecoration: "none" }}>{nav("clients")}</Link>
        <Link href={`/${locale}/juntas-directivas`} style={{ color: "var(--muted)", fontSize: "0.9rem", textDecoration: "none" }}>{nav("juntas")}</Link>
        <Link href={`/${locale}#team`} style={{ color: "var(--muted)", fontSize: "0.9rem", textDecoration: "none" }}>Team</Link>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Link href={`/${locale}/contact`} style={{ 
          background: "var(--accent)", 
          color: "white", 
          padding: "0.5rem 1.25rem", 
          borderRadius: "0.5rem",
          fontSize: "0.9rem",
          fontWeight: 600,
          textDecoration: "none"
        }}>
          {nav("cta")}
        </Link>
      </div>
    </nav>
  );
}
