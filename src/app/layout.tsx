import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Public_Sans,
  Spline_Sans_Mono,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
});

const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline",
});

export const metadata: Metadata = {
  title: "What automation actually looks like · Davin Willis",
  description:
    "Live, plain-language demos of small business automation. Watch messy work organize itself. All data simulated, everything runs in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${publicSans.variable} ${splineMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
