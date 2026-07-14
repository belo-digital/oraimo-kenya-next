import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "oraimo Kenya Official Online Store",
  description: "Explore the latest earbuds, smartwatches, power banks, smart home and other smart devices at oraimo online store. Keep Exploring!",
  keywords: ["Bluetooth Earbuds", "Power banks", "Smart Watches", "Personal Care", "Home Appliances"],
  openGraph: {
    title: "oraimo Kenya Official Online Store",
    description: "Explore the latest earbuds, smartwatches, power banks, smart home and other smart devices at oraimo online store.",
    url: "https://ke.oraimo.com",
    siteName: "oraimo",
    images: [
      {
        url: "https://cdn-img.oraimo.com/social/logo-green.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "oraimo Kenya Official Online Store",
    description: "Explore the latest earbuds, smartwatches, power banks, smart home and other smart devices at oraimo online store.",
    images: ["https://cdn-img.oraimo.com/social/logo-green.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
