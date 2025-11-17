import type { Metadata } from "next";
import { Inter, Bangers } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { DashboardHeader } from "@/components/dashboard/header";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Simpsons Explorer | Characters, Episodes & Locations",
  description: "Explore 1182+ characters, 768+ episodes, and 477+ locations from The Simpsons universe. Built with Next.js and The Simpsons API.",
  keywords: ["The Simpsons", "Characters", "Episodes", "Locations", "Springfield"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bangers.variable} antialiased bg-background text-foreground`}
      >
        <QueryProvider>
          <div className="min-h-screen relative">
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-yellow-50/30" />
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <DashboardHeader />
            <Navbar />
            <Breadcrumbs />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
