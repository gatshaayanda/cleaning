import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PwaRegister from "@/app/pwa-register";
import "./globals.css";
import "./pwa.css";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Facilities | Cleaning & Maintenance", template: "%s | Facilities" },
  description: "Facilities management and maintenance support in Botswana for commercial properties, offices, schools, retail sites and hospitality facilities.",
  applicationName: "Facilities",
  keywords: ["Facilities management Botswana", "commercial cleaning", "planned maintenance", "property maintenance", "facilities support"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: siteUrl, siteName: "Facilities", title: "Facilities | Cleaning & Maintenance", description: "Cleaning and facilities maintenance in Botswana. Tell us what your property needs." },
  twitter: { card: "summary", title: "Facilities | Cleaning & Maintenance", description: "Cleaning and facilities maintenance in Botswana. Tell us what your property needs." },
  icons: { icon: "/facilities-icon.svg", apple: "/facilities-icon.svg" },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Facilities", statusBarStyle: "default" },
};

export const viewport: Viewport = { themeColor: "#0f766e", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PwaRegister />{children}<Analytics /><SpeedInsights /></body></html>;
}
