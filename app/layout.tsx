import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

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
    <html
      lang="sr"
      className={`${archivo.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
