import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flavor Fusion",
  description: "Taste The Flavor Fusion — premium burgers delivered fresh",
  authors: [{ name: "Flavor Fusion" }],
  openGraph: {
    title: "Flavor Fusion",
    description: "Taste The Flavor Fusion — premium burgers delivered fresh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
