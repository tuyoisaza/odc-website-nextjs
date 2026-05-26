"use client";

import { useState } from "react";

export function ClientLogo({ name, logo }: { name: string; logo: string | null }) {
  const [imgError, setImgError] = useState(false);

  if (!logo || imgError) {
    return (
      <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", color: "var(--muted)" }}>
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={`https://logo.clearbit.com/${logo}`}
      alt={`${name} logo`}
      style={{ width: "64px", height: "64px", objectFit: "contain" }}
      onError={() => setImgError(true)}
    />
  );
}
