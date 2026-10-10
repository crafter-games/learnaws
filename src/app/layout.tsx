import type { Metadata, Viewport } from "next";
import { Lilita_One, Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Nav } from "@/components/nav";
import { Onboarding } from "@/components/onboarding";
import { esMX } from "@clerk/localizations";
import { arcadeAppearance } from "@/lib/clerk-appearance";
import "./globals.css";

const lilita = Lilita_One({ variable: "--font-lilita", weight: "400", subsets: ["latin"] });
const nunito = Nunito({ variable: "--font-nunito", weight: ["600", "700", "800", "900"], subsets: ["latin"] });

const DESCRIPTION = "Aprueba AWS Solutions Architect Associate (SAA-C03) jugando rondas de 4 minutos, con métodos de estudio basados en evidencia.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://learnaws.crafter.games"),
  title: "Learn AWS · SAA-C03",
  description: DESCRIPTION,
  openGraph: { title: "Learn AWS · SAA-C03", description: DESCRIPTION, siteName: "Learn AWS", locale: "es_419", type: "website" },
  twitter: { card: "summary_large_image", title: "Learn AWS · SAA-C03", description: DESCRIPTION },
  appleWebApp: { capable: true, title: "Learn AWS", statusBarStyle: "black-translucent" },
  icons: { apple: "/icons/180" },
};

export const viewport: Viewport = {
  themeColor: "#3346d6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider appearance={arcadeAppearance} localization={esMX}>
      <html lang="es" className={`${lilita.variable} ${nunito.variable} h-full antialiased`}>
        <body className="min-h-full font-sans">
          <Nav />
          <main className="mx-auto w-full max-w-3xl px-4 pb-32 pt-4 sm:pt-6">{children}</main>
          <Onboarding />
        </body>
      </html>
    </ClerkProvider>
  );
}
