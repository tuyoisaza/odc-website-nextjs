const supportedLocales = new Set(['en', 'es', 'pt']);

export function authLocale(value: unknown): string {
  return typeof value === 'string' && supportedLocales.has(value) ? value : 'es';
}

export function adminCallbackPath(locale: unknown, candidate?: string | null): string {
  const prefix = `/${authLocale(locale)}/admin`;
  if (!candidate || candidate.includes('\\') || /[\u0000-\u0020]/.test(candidate)) return prefix;
  // Keep callbacks inside this locale's admin area; never redirect to another origin or login.
  try {
    const decoded = decodeURIComponent(candidate);
    if (decoded.includes('\\') || /[\u0000-\u0020]/.test(decoded)) return prefix;
    const url = new URL(decoded, 'https://local.invalid');
    if (url.origin !== 'https://local.invalid' ||
        !(url.pathname === prefix || url.pathname.startsWith(`${prefix}/`)) ||
        url.pathname === `${prefix}/login`) return prefix;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return prefix;
  }
}

export function adminLoginUrl(locale: unknown, callback?: string): string {
  const selectedLocale = authLocale(locale);
  return `/${selectedLocale}/login?callbackUrl=${encodeURIComponent(adminCallbackPath(selectedLocale, callback))}`;
}
