import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Розсувні решітки, власне виробництво розсувних решіток | Майстерня Решіток",
  description:
    "Виробник розсувних решіток. Будь-яка складність та конфігурація. Максимальна якість за доступними цінами. Працюємо всією Україною.",
  keywords: [
    "розсувні решітки",
    "на вікна та двері",
    "власне виробництво",
    "виробник",
    "майстерня решіток",
    "по Україні",
  ],
  verification: {
    yandex: "fd2870506ef814d0",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
                ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
