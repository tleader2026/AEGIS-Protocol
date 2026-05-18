import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AEGIS Protocol",
  description:
    "Adaptive Execution & Governance Integrity Standard for AI provenance, agent identity, runtime trust, and semantic lineage.",
  metadataBase: new URL("https://aegis-protocol.dev"),
  openGraph: {
    title: "AEGIS Protocol",
    description:
      "The trust and provenance layer for autonomous AI systems.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
