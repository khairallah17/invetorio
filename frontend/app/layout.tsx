import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardWrapper from "./dashboardWrapper";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "demo invetorio - khairallah",
  description: "Inventory Management system Demo",
  icons: ["favicon.ico"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>
          {children}
        </DashboardWrapper>
      </body>
    </html>
  );
}
