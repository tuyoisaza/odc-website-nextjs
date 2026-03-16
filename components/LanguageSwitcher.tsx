"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/i18n/request";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const currentLocale = pathname.split("/")[1] || "es";

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLanguageChange(locale)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: currentLocale === locale ? "var(--accent)" : "var(--muted)",
            fontSize: "0.8rem",
            fontWeight: currentLocale === locale ? "700" : "400",
            textTransform: "uppercase",
            padding: "0.25rem"
          }}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
