import {ReactNode} from "react";
import type { Metadata } from "next";
import { Geist_Mono,Roboto } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import {ThemeProvider} from "@mui/system";

import "./globals.css";
import {theme} from "@/app/theme";
import {AuthProvider} from "@/app/components/AuthContext";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Bookshelf",
    description: "Discover new books for your reading journey!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${geistMono.variable} antialiased`}
      >
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                  <AuthProvider>
                      {children}
                  </AuthProvider>
              </ThemeProvider>
          </AppRouterCacheProvider>
      </body>
    </html>
  );
}
