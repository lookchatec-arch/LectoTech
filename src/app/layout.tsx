import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LectoTech | Fortalecimiento de la Lectoescritura Digital",
  description: "Plataforma Integral para el Fortalecimiento de la Lectoescritura Digital. Aprende, juega y mejora tu comprensión lectora.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A5C82]"></div></div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
