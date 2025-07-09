import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Sets up the Inter font as specified in the prompt
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quote Generator",
  description: "Generate random quotes or search for a specific topic to find inspiration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}