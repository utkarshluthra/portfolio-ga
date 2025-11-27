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
  title: {
    template: '%s | Utkarsh Luthra',
    default: 'Utkarsh Luthra | Software Engineer & Entrepreneur',
  },
  description: 'Portfolio of Utkarsh Luthra, a Software Engineer and Entrepreneur passionate about building impactful solutions.',
  keywords: ['Software Engineer', 'Entrepreneur', 'Full Stack', 'React', 'Next.js', 'Utkarsh Luthra'],
  icons: {
    icon: '/favicon.png',
  },
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
