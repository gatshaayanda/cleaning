import { Suspense } from "react";
import type { Metadata } from "next";
import AfrichikoPortal from "@/components/AfrichikoPortal";

export const metadata: Metadata = {
  title: "My orders",
  description: "Review your Geerams order history.",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<main className="af-site"><p>Loading your enquiries…</p></main>}>
      <AfrichikoPortal page="account" />
    </Suspense>
  );
}
