"use client";

import { DataProvider } from "@/context/dataContext";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DataProvider>
        {children}
      </DataProvider>
    </ThemeProvider>
  );
}