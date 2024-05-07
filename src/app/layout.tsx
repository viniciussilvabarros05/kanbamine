import { AuthContextProvider } from "@/providers/authContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mediaboard",
  description:
    "Dashboard oficial do ministério de mídia da assembleia de Deus área 5 em São Luís-MA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        <Toaster/>
      </body>
    </html>
  );
}
