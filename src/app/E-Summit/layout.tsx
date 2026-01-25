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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Cell IIT Ropar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DataProvider>
              <NavBar />
              <div className="pt-24">
                {children}
              </div>
              <Footer />
            </DataProvider>
            <Toaster expand={true} richColors closeButton={true} />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
