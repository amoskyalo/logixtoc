import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeWrapper } from "@/Context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logixtoc Africa",
  description: "Admin Service of MSQ Pay",
  icons: { icon: "/iconlogo.png", apple: "/iconlogo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeWrapper>
        <body className={inter.className}>{children}</body>
      </ThemeWrapper>
    </html>
  );
}
