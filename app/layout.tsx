import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteName = "Lic. Nicolás López Asís";
const siteDescription =
  "Licenciado en Nutrición. Acompañamiento profesional para cuidar tu salud a través de la alimentación: consultas, planes personalizados y nutrición clínica y deportiva.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nicolaslopezasis.com"),
  title: {
    default: `${siteName} | Nutrición que cuida tu cerebro y tu cuerpo`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "nutricionista",
    "licenciado en nutrición",
    "nutrición clínica",
    "nutrición deportiva",
    "plan nutricional",
    "Nicolás López Asís",
  ],
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
    locale: "es_AR",
    siteName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}