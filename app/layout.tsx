import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fluxel.rs"),
  title: "<fluxel.rs/>",
  description:
    "Fluxel je srpska web agencija iz Novog Sada. Gradimo sajtove, web aplikacije i digitalne strategije koje donose rezultate.",
  openGraph: {
    title: "<fluxel.rs/>",
    description:
      "Fluxel je srpska web agencija iz Novog Sada. Gradimo sajtove, web aplikacije i digitalne strategije koje donose rezultate.",
    images: [
      {
        url: "/fluxelog.png",
        width: 1200,
        height: 630,
        alt: "Fluxel preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "<fluxel.rs/>",
    description:
      "Fluxel je srpska web agencija iz Novog Sada. Gradimo sajtove, web aplikacije i digitalne strategije koje donose rezultate.",
    images: ["/fluxelog.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
