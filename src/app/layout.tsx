import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--roboto-default",
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CusenseForDeveloper",
  description: "Add device on cusense",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
