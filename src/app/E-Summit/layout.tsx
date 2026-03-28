import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from "@/context/E-Summit/dataContext";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/context/AuthProvider";
import NavBar from "@/components/E-Summit/NavBar";
import Footer from "@/components/E-Summit/footer";
import SocialSidebar from "@/components/E-Summit/SocialMediaSection";
import CursorTrail from "@/components/E-Summit/CursorTrail"

import SplashCursor from '@/components/SplashCursor'
import { Playfair_Display } from "next/font/google";
import { CursorProvider } from "@/components/animate-ui/components/animate/cursor";
import { Cursor } from "@/components/animate-ui/components/animate/cursor";
import BlobCursor from "@/components/E-Summit/CursorTrail";

const calligraphy = Playfair_Display({
  variable: "--font-calligraphy",
  subsets: ["latin"],
  weight: ["900"], // very thick
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Summit 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${calligraphy.variable} antialiased min-h-screen`}
    >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DataProvider>
              <CursorProvider>
                {/* <Cursor className="text-blue-100" /> */}
                {/* <BlobCursor/> */}
                <NavBar />
                {/* <SocialSidebar/> */}
                <div className="pt-20">
                  {/* <SplashCursor /> */}
                  {children}
                </div>
                <Footer />
              </CursorProvider>
            </DataProvider>
            <Toaster expand={true} richColors closeButton={true} />
          </ThemeProvider>
        </AuthProvider>
    </div>
  );
}
