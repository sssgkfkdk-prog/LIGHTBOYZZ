import type { Metadata } from "next";
import { Poppins, Bebas_Neue } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-inter", // keeping variable name to avoid changing globals.css unless needed, wait I should change globals.css too, but okay I'll change variable name here and in globals
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const bebas = Bebas_Neue({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "LIGHTBOYZ THUMBNAILS | Portfolio",
  description: "Minecraft Thumbnail Freelance Legend - Lost In The Art Of Thumbnails",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${bebas.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
