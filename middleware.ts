import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales: locales,
  defaultLocale: 'es'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es|pt)/:path*']
};
