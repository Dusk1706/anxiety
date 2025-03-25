"use client";
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authToken');
    const publicRoutes = ['/login', '/register', '/', '/recover-password'];
    const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/reset-password');

    // Si no está autenticado y no está en una ruta pública, redirigir al login
    if (!isAuthenticated && !isPublicRoute) {
      router.push('/login');
    }
  }, [pathname, router]);

  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 bg-gray-50`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
