"use client";

import { useState } from "react";
import { getClientLogos, type ClientLogoAsset } from "@/lib/client-branding";

function LogoImage({ asset, compact }: { asset: ClientLogoAsset; compact: boolean }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const failed = failedSource === asset.src;
  const dark = asset.background === "oscuro";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: compact ? 64 : "100%", maxWidth: 200, height: compact ? 48 : 112, padding: compact ? 6 : 14, borderRadius: 8, background: dark ? "#162039" : "#ffffff", color: dark ? "#ffffff" : "#182033" }}>
      {failed ? <span role="img" aria-label={asset.label}>{asset.label.charAt(0)}</span> : (
        // Original brand assets can include SVGs; keep them local and unaltered.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset.src} alt={`${asset.label} logo`} style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain" }} onError={() => setFailedSource(asset.src)} />
      )}
    </div>
  );
}

export function ClientLogo({ name, logo, compact = false }: { name: string; logo: string | null; compact?: boolean }) {
  const assets = getClientLogos(name, logo);
  if (!assets.length) {
    return <span role="img" aria-label={name} style={{ display: "grid", placeItems: "center", width: 64, height: 64, borderRadius: "50%", background: "var(--border)", color: "var(--muted)", fontSize: "1.5rem" }}>{name.charAt(0)}</span>;
  }
  return (
    <div style={{ display: "flex", flexDirection: compact ? "row" : "column", alignItems: "center", gap: 8, width: compact ? "auto" : "100%" }}>
      {assets.map((asset) => <LogoImage key={asset.src} asset={asset} compact={compact} />)}
    </div>
  );
}
