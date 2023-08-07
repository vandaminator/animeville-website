import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Menu from "@/components/Menu";
import AirSched from "@/components/AIrSched/AirSched";
import animixstreamKeywords from "@/utils/keywords";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const logoFont = localFont({
  src: "./zekton rg.otf",
  variable: "--logoFont",
});

export const metadata: Metadata = {
  title: "Animixstream",
  description:
    "HD Streaming: Enjoy anime in stunning high-definition quality. Animixstream ensures you experience the rich visuals and animations the way they were meant to be seen, making your anime-watching experience truly unforgettable.",
  keywords: animixstreamKeywords,
  category: "Anime",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${logoFont.variable}`}>
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <Script
          async
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8410022083362673"
        />
      </head>
      <body className={inter.className}>
        <div className="main">
          <Navbar />
          <div className="mt-[100px] px-2 lg:mx-auto lg:grid lg:w-[1024px] lg:grid-cols-layout xl:w-[1280px]">
            <main>{children}</main>
            <div className="menu-comp" id="menu-comp">
              <Menu />
            </div>
            <div className="air-comp" id="air-comp">
              <AirSched />
            </div>
          </div>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
