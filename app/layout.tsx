import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oss.arcabot.ai"),
  title: "Arca OSS — public software, upstream work, receipts",
  description:
    "The public engineering index for Arca: open-source projects we maintain, ecosystems we support, and upstream work with verifiable receipts.",
  alternates: {
    canonical: "https://oss.arcabot.ai",
    types: { "application/json": "https://oss.arcabot.ai/oss.json" },
  },
  openGraph: {
    title: "Arca OSS",
    description: "Public software. Upstream work. Receipts attached.",
    url: "https://oss.arcabot.ai",
    siteName: "Arca OSS",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Arca OSS public engineering ledger" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arca OSS",
    description: "Public software. Upstream work. Receipts attached.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
