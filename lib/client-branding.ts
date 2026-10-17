import brands from "./client-brands.json";

export interface ClientLogoAsset {
  src: string;
  background: string;
  label: string;
}

function normalizeName(name: string) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findBrand(name: string) {
  return brands.find((brand) => normalizeName(brand.name) === normalizeName(name));
}

function isWebUrl(value: string) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function getClientLogos(name: string, logo: string | null): ClientLogoAsset[] {
  const configured = logo?.trim() || "";
  // Explicit image paths/URLs remain editable in the CMS. Legacy domain strings
  // and placeholder values use the collected local assets rather than Clearbit.
  if ((configured.startsWith("/") && !configured.startsWith("//")) || isWebUrl(configured)) {
    return [{ src: configured, background: "claro", label: name }];
  }
  return findBrand(name)?.logos || [];
}

export function getClientUrl(name: string, url: string | null): string | undefined {
  const configured = url?.trim() || "";
  if (isWebUrl(configured)) return configured;
  return findBrand(name)?.url || undefined;
}
