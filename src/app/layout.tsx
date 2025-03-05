import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import OrganizationSchema from "@/components/seo/OrganizationSchema";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Festive Window Projections - Magical Holiday Window Displays",
  description: "Transform your home with magical window projections for every season and holiday. Browse our collection of festive window projection videos for Christmas, Halloween, Easter, and more.",
  keywords: "window projections, holiday projections, Christmas window display, Halloween projections, festive window decorations, ambient videos, festive ambience",
  authors: [{ name: "Festive Window Projections" }],
  creator: "Festive Window Projections",
  publisher: "Festive Window Projections",
  metadataBase: new URL("https://festiveambience.com"),
  alternates: {
    canonical: "https://festiveambience.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Festive Window Projections",
    title: "Festive Window Projections - Magical Holiday Displays",
    description: "Transform your home with magical window projections for every holiday. Browse festive videos for Christmas, Halloween, Easter & more.",
    url: "https://festiveambience.com",
    images: [
      {
        url: "https://festiveambience.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Festive Window Projections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Festive Window Projections - Magical Holiday Displays",
    description: "Transform your home with magical window projections for every holiday. Browse festive videos for Christmas, Halloween, Easter & more.",
    images: ["https://festiveambience.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
