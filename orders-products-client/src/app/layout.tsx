'use client';

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";

import StoreProvider from "@/store/StoreProvider";
import TopMenu from "@/components/layout/TopMenu";
import NavigationMenu from "@/components/layout/NavigationMenu";
import AuthGuard from "@/components/auth/AuthGuard";

import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <html lang="ru">
      <body className={inter.className}>
        <StoreProvider>
          <LanguageProvider>
            <AuthGuard>
              {isAuthPage ? (
                <main>{children}</main>
              ) : (
                <div className="d-flex flex-column min-vh-100">
                  <TopMenu />
                  <div className="d-flex flex-grow-1">
                    <NavigationMenu />
                    <main className="flex-grow-1 bg-light p-4">
                      {children}
                    </main>
                  </div>
                </div>
              )}

            </AuthGuard>
          </LanguageProvider>
        </StoreProvider>
      </body>
    </html>
  );
}