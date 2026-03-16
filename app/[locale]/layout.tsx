import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getMessages } from "next-intl/server";
import { Providers } from "./providers";
import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "ODC | On-Demand Consulting",
  description: "Strategic consulting for designing and activating growth systems.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={plusJakarta.variable}>
        <Providers locale={locale} messages={messages}>
          <div className="systems-bg"></div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
