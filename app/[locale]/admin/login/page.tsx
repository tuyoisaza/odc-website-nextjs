import { redirect } from 'next/navigation';
import { adminLoginUrl } from '@/lib/auth-navigation';

export default async function LegacyAdminLogin({ params }: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(adminLoginUrl(locale));
}
