import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 1st Anniversary Sharma Ji ❤️ Forever & Always",
  description: "Celebrating 1 year of love, laughter, and endless beautiful moments with my beloved wife Sharma Ji.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: "/icon.png",
  },
  openGraph: {
    title: "Happy 1st Anniversary, Sharma Ji! ❤️",
    description: "365 days of endless love, togetherness and wonderful memories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-950 text-white selection:bg-pink-500 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
