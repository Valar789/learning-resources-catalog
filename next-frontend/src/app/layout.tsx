import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppLayout from "@/components/AppLayout/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Resources Catalog",
  description: "A catalog for learning resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>
          <main className="container mx-auto py-8 px-4">{children}</main>
        </AppLayout>
      </body>
    </html>
  );
}
