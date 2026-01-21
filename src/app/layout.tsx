import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "VoyageAI - Organizador de Viajes Inteligente",
  description: "Encuentra vuelos baratos, estancias perfectas y organiza tus viajes con inteligencia artificial",
  keywords: "viajes, vuelos, hoteles, IA, inteligencia artificial, reservas, ofertas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.variable}>
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            <Header />
            <div className="page-content">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
