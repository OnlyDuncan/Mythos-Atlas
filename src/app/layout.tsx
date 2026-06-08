import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ProviderWrapper from "@/components/ProviderWrapper";
import NavBar from "@/components/NavBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mythos Atlas — Interactive Mythology & Dream Archive",
  description:
    "Explore myths, urban legends, and dream symbolism through an interactive knowledge graph.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProviderWrapper>
          <NavBar />
          <main className="flex-1 pt-16">{children}</main>
        </ProviderWrapper>
      </body>
    </html>
  );
}
