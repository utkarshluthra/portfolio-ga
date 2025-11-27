import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Utkarsh Luthra | Portfolio",
  description: "Software Engineer & Entrepreneur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
