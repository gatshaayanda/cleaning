import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PwaRegister from "@/app/pwa-register";
import "./globals.css";
import "./pwa.css";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Geerams Cleaning Services | Cleaning Products", template: "%s | Geerams Cleaning Services" },
  description: "Cleaning chemicals and bulk hygiene supplies from Geerams Cleaning Services in Kanye, Botswana.",
  applicationName: "Geerams Cleaning Services",
  keywords: ["Geerams Cleaning Services", "cleaning chemicals Botswana", "dishwashing liquid", "bulk hygiene supplies", "Kanye cleaning products"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: siteUrl, siteName: "Geerams Cleaning Services", title: "Geerams Cleaning Services | Cleaning Products", description: "Cleaning chemicals and bulk hygiene supplies for homes and businesses in Botswana." },
  twitter: { card: "summary", title: "Geerams Cleaning Services | Cleaning Products", description: "Cleaning chemicals and bulk hygiene supplies for homes and businesses in Botswana." },
  icons: { icon: "/facilities-icon.svg", apple: "/facilities-icon.svg" },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Geerams", statusBarStyle: "default" },
};

export const viewport: Viewport = { themeColor: "#1A3B8B", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PwaRegister />{children}<Analytics /><SpeedInsights /></body></html>;
}
